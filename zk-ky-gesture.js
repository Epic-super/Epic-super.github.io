/* ===========================================================
   手势翻题模块 · 双线作战台（zk-ky.html）
   —— 经典 IIFE，仿 pet-core.js 的摄像头/权限处理风格
   —— 握拳 → 上一题（quizPrev）；张开手掌 → 下一题（quizNext）

   · 手势识别：MediaPipe Tasks Vision HandLandmarker（本地托管 lib/mediapipe/，断网可用）
   · 摄像头流仅本地处理，audio 关、不录制、不上传（与蕾娜桌宠同语义）
   · 安全上下文（localhost / https）才可用；file:// 直开自动降级，不影响按钮刷题
   · 开关按钮 + 状态提示由本模块注入 #quizToolbar，zk-ky.html 只需引入本脚本
   =========================================================== */
(function(){
  'use strict';

  /* ---------- 资源路径（相对 zk-ky.html，二者同在 _master 根） ---------- */
  var VISION   = './lib/mediapipe/vision_bundle.mjs';   // ES module，动态 import
  var WASM_DIR = './lib/mediapipe/wasm';                 // FilesetResolver 的 wasm 根
  var MODEL    = './lib/mediapipe/hand_landmarker.task'; // 手部关键点模型

  /* ---------- 状态 ---------- */
  var state = { on:false, loading:false, landmarker:null, vision:null, stream:null };
  var visionPromise = null;   // 缓存 loadVision，避免重复拉模型
  var video = null, btn = null, tipEl = null;
  var rafId = 0;
  var cooldownUntil = 0;      // 防误触冷却

  /* ---------- 手势判定阈值（按需微调） ----------
     HandLandmarker 返回 21 个归一化 landmarks：0=腕，4/8/12/16/20=指尖，9=中指MCP。
     判定法：四指(食/中/无名/小)指尖到腕的归一化距离，除以中指MCP到腕的距离做基准，
     消除手大小差异。张开时食中无名小指尖都显著越过基准（ratio>OPEN ratio），
     握拳时四指蜷回（ratio<FIST ratio）。 */
  var OPEN_RATIO = 1.18;   // 平均 ratio 高于此 → 判定为张开手掌
  var FIST_RATIO = 0.92;   // 平均 ratio 低于此 → 判定为握拳
  var COOLDOWN_MS = 900;   // 相邻手势触发最小间隔，避免一帧内连翻

  var TIPS   = [8, 12, 16, 20];  // 食/中/无名/小 指尖
  function dist(a, b){
    var dx = a.x - b.x, dy = a.y - b.y;   // z 方向抖动大，忽略
    return Math.sqrt(dx * dx + dy * dy);
  }

  function whichGesture(lm){
    var wrist = lm[0], midMCP = lm[9];
    var base = dist(midMCP, wrist);
    if (base < 0.05) return null;         // 跟踪不稳定(手贴屏/极端)时放弃
    var sum = 0;
    for (var i = 0; i < TIPS.length; i++) sum += dist(lm[TIPS[i]], wrist) / base;
    var avg = sum / TIPS.length;
    if (avg >= OPEN_RATIO) return 'open';
    if (avg <= FIST_RATIO) return 'fist';
    return null;
  }

  function handleGesture(g){
    var now = Date.now();
    if (now < cooldownUntil) return;
    cooldownUntil = now + COOLDOWN_MS;
    var fn = (g === 'fist') ? window.quizPrev : window.quizNext;
    if (typeof fn === 'function') {
      try { fn(); flash(); } catch (e) { /* 翻题引擎内部错误，忽略 */ }
    }
  }
  function flash(){  // 短暂提亮按钮，给个"识别到了"的视觉反馈
    if (!btn) return;
    var old = btn.style.transition;
    btn.style.transition = 'none';
    btn.style.transform = 'scale(1.12)';
    btn.style.background = 'rgba(34,197,94,.22)';
    setTimeout(function(){
      btn.style.transition = 'transform .18s, background .18s';
      btn.style.transform = '';
      btn.style.background = '';
      btn.style.transition = old;
    }, 180);
  }

  /* ---------- 工具 ---------- */
  function $id(s){ return document.getElementById(s); }
  function setBtn(t){ if (btn) btn.textContent = t; }
  function tip(t){ if (tipEl) tipEl.textContent = t; }

  /* ---------- MediaPipe 懒加载 ---------- */
  function createLM(fileset, delegate){
    return state.vision.HandLandmarker.createFromOptions(fileset, {
      baseOptions: { modelAssetPath: MODEL, delegate: delegate },
      runningMode: 'VIDEO',
      numHands: 1,
      minHandDetectionConfidence: 0.5,
      minHandPresenceConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
  }
  function loadVision(){
    if (state.landmarker) return Promise.resolve(true);
    if (visionPromise) return visionPromise;
    visionPromise = import(VISION)
      .then(function(v){
        state.vision = v;
        return v.FilesetResolver.forVisionTasks(WASM_DIR);
      })
      .then(function(fileset){
        // GPU 优先，失败自动降级 CPU（老设备无 WebGL2）
        return createLM(fileset, 'GPU').catch(function(){ return createLM(fileset, 'CPU'); });
      })
      .then(function(lm){ state.landmarker = lm; return true; })
      .catch(function(e){ visionPromise = null; throw e; });
    return visionPromise;
  }

  /* ---------- 摄像头预览小窗（右上角悬浮） ---------- */
  function createVideo(){
    video = document.createElement('video');
    video.id = 'gestureVideo';
    video.muted = true; video.playsInline = true;
    video.setAttribute('playsinline', '1');
    video.setAttribute('webkit-playsinline', '1');
    video.style.cssText =
      'position:fixed;right:10px;top:10px;width:148px;height:111px;' +
      'object-fit:cover;border-radius:8px;z-index:999;' +
      'box-shadow:0 4px 14px rgba(16,24,40,.25);transform:scaleX(-1);background:#000';
    video.setAttribute('aria-hidden', 'true');
    document.body.appendChild(video);
    video.removeAttribute('src');          // 只走 srcObject，防下载器(IDM)抓取打断
    return video;
  }
  function playVideo(attempt){
    video.play().catch(function(err){
      if (state.on && attempt < 5) {       // 播放可能被下载器短暂打断，自愈重试
        setTimeout(function(){ playVideo(attempt + 1); }, 500);
      }
    });
  }

  /* ---------- 主循环 ---------- */
  function loop(ts){
    if (!state.on) return;
    rafId = requestAnimationFrame(loop);
    if (!state.landmarker || !video || video.readyState < 2) return;
    var res;
    try { res = state.landmarker.detectForVideo(video, ts); }
    catch (e) { return; }                 // 单帧识别异常忽略，下一帧继续
    if (res && res.landmarks && res.landmarks.length) {
      var g = whichGesture(res.landmarks[0]);
      if (g) handleGesture(g);
    }
  }

  /* ---------- 开关 ---------- */
  function start(){
    if (state.loading) return;
    if (!window.isSecureContext) { tip('需 localhost/https 才可用摄像头（file:// 已降级），仍可按钮翻题'); return; }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { tip('浏览器不支持摄像头'); return; }
    state.loading = true; setBtn('✋ 加载中…');
    loadVision()
      .then(function(){
        createVideo();
        return navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
          audio: false
        });
      })
      .then(function(stream){
        state.stream = stream;
        video.srcObject = stream;
        playVideo(0);
        state.on = true; state.loading = false;
        setBtn('✋ 关闭手势');
        tip('握拳=上一题，张开手掌=下一题 · 摄像头仅本地处理，不录制、不上传');
        rafId = requestAnimationFrame(loop);
      })
      .catch(function(err){
        state.loading = false;
        stopCam();
        setBtn('✋ 手势翻题');
        tip('开启失败：' + (err && err.name || '已取消') + '（仍可按钮翻题）');
      });
  }

  function stopCam(){
    if (state.stream) { state.stream.getTracks().forEach(function(t){ t.stop(); }); state.stream = null; }
  }
  function stop(){
    state.on = false;
    cancelAnimationFrame(rafId);
    stopCam();
    if (state.landmarker) { try { state.landmarker.close(); } catch (e) {} }
    state.landmarker = null; state.vision = null; visionPromise = null;
    if (video) { video.remove(); video = null; }
    setBtn('✋ 手势翻题');
    tip('');
  }

  function init(){
    var toolbar = $id('quizToolbar');
    if (!toolbar) return;
    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'qm-btn ghost';
    btn.id = 'quizGestureBtn';
    btn.textContent = '✋ 手势翻题';
    btn.addEventListener('click', function(){ state.on ? stop() : start(); });
    toolbar.appendChild(btn);
    tipEl = document.createElement('span');
    tipEl.id = 'quizGestureTip';
    tipEl.style.cssText = 'margin-left:8px;font-size:12px;color:#9aa5b1;white-space:nowrap;';
    toolbar.appendChild(tipEl);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // 离开页面时释放摄像头/推理
  window.addEventListener('pagehide', stop);
})();