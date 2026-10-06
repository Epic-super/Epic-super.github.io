/* ===========================================================
   桌宠核心逻辑 · 自包含 IIFE，不依赖主 IIFE
   - 纯本地表情识别（face-api / @vladmandic fork，模型在 vendor/face-api/weights）
   - 摄像头流只在内存处理，不录制、不上传、不落盘
   - 默认关闭，需手动开启；无摄像头/引擎时降级为纯陪伴桌宠
   - 形象：Q 版 3D 蕾娜（指挥管制官），three.js 程序化建模；
            three 加载失败时自动降级为内联 SVG 矢量头像（PET_SVG）
   =========================================================== */
(function(){
  "use strict";

  var MODEL_URL = "vendor/face-api/weights"; // 相对 index.html（/_master/vendor/...）
  var DETECT_INTERVAL = 120;   // ms，约 8fps；识别更跟手（SSD 在 352 输入下每帧约 20-40ms）
  var SMOOTH = 0.80;           // EMA 平滑系数（新值权重，越大越灵敏）
  var SAY_MIN = 7000;          // 台词最小间隔 ms
  var COMPANION_INTERVAL = 16000; // 陪伴自言自语间隔

  // 人脸检测：优先 SSD（精度远高于 tiny），加载失败自动回落 tiny
  var PREFER_DETECTOR = "ssd";   // "ssd" | "tiny"
  var SSD_INPUT_SIZE = 352;      // SSD 输入边长，越大越准、越耗 CPU
  var TINY_INPUT_SIZE = 224;     // tiny 输入边长（合法范围 ≤224，过大会抛错）
  var EMOTION_MIN = 0.30;        // 情绪置信度低于此 → 平静（原 0.42，降低以更敏感）
  var MOOD_HYST = 0.05;          // 情绪滞回：新情绪须明显超过当前才切换，防抖动
  var FACE_LOST_MS = 2400;       // 脸持续消失这么久 → 判定"你走了"
  var SEEN_COOLDOWN = 5000;      // "看到你"台词冷却，避免反复刷屏
  var CAM_W = 480, CAM_H = 360;  // 摄像头分辨率；480p 细节更好，利于识别

  var EMOTIONS = ["neutral","happy","sad","angry","surprised","fearful","disgusted"];
  var MOOD_TEXT = {neutral:"平静",happy:"开心",sad:"低落",angry:"生气",surprised:"惊讶",fearful:"紧张",disgusted:"嫌弃"};

  var widget, el = {};
  var state = {
    open:false, camOn:false, modelReady:false, modelLoading:false, apiLoading:null,
    stream:null, detectTimer:null, companionTimer:null,
    smooth:{neutral:1,happy:0,sad:0,angry:0,surprised:0,fearful:0,disgusted:0},
    mood:"neutral", lastSay:0,
    detector:null,       // "ssd" | "tiny"，模型加载后确定
    faceSeen:false, noFaceCount:0, lastSeenAt:0
  };
  // 心情直接驱动立绘切换，无需等待异步加载

  function $id(s){ return document.getElementById(s); }

  /* ---------- 桌宠 SVG 形象（降级 fallback，7 种表情组，按 data-mood 切换） ---------- */
  var PET_SVG =
    '<svg class="pet-body" data-mood="neutral" viewBox="0 0 120 120" width="122" height="122" aria-hidden="true">'+
      '<defs>'+
        '<radialGradient id="lenaBg" cx="0.5" cy="0.4" r="0.75">'+
          '<stop offset="0" stop-color="#E9ECF8"/>'+
          '<stop offset="1" stop-color="#C1CBEB"/>'+
        '</radialGradient>'+
        '<linearGradient id="lenaHair" x1="0" y1="0" x2="0" y2="1">'+
          '<stop offset="0" stop-color="#F2EDF8"/>'+
          '<stop offset="1" stop-color="#C6BDDA"/>'+
        '</linearGradient>'+
      '</defs>'+
      '<circle cx="60" cy="60" r="58" fill="url(#lenaBg)"/>'+
      /* 低马尾两侧垂下的浅色长发 */
      '<path d="M20 60 Q18 96 31 116 L45 113 Q35 94 38 70 Q34 52 48 42 Q22 48 20 60 Z" fill="url(#lenaHair)"/>'+
      '<path d="M100 60 Q102 96 89 116 L75 113 Q85 94 82 70 Q86 52 72 42 Q98 48 100 60 Z" fill="url(#lenaHair)"/>'+
      /* 脸 */
      '<ellipse cx="60" cy="67" rx="32" ry="34" fill="#FCE8D9"/>'+
      /* 刘海与顶发 */
      '<path d="M27 66 Q25 40 47 30 Q60 24 73 30 Q95 40 93 66 Q87 50 73 47 Q82 56 80 66 Q72 50 60 50 Q48 50 40 66 Q37 55 46 46 Q33 50 27 66 Z" fill="url(#lenaHair)"/>'+
      /* 发顶高光一缕 */
      '<path d="M60 27 Q60 12 70 9" stroke="url(#lenaHair)" stroke-width="5" fill="none" stroke-linecap="round"/>'+
      /* 白色军服领口 */
      '<path d="M28 100 Q60 90 92 100 L98 118 Q60 110 22 118 Z" fill="#F5F6FC"/>'+
      '<path d="M47 103 L60 115 L73 103 L68 100 L60 107 L52 100 Z" fill="#E3E0F0"/>'+
      /* 红色领饰 */
      '<path d="M46 102 L60 115 L74 102" stroke="#A73244" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
      '<circle cx="60" cy="100" r="4.5" fill="#8E2434"/>'+
      /* 腮红 */
      '<ellipse cx="41" cy="80" rx="6" ry="3.4" fill="rgba(240,120,140,.35)"/>'+
      '<ellipse cx="79" cy="80" rx="6" ry="3.4" fill="rgba(240,120,140,.35)"/>'+
      /* 表情组（蕾娜：红瞳） */
      '<g class="pet-face face-neutral">'+
        '<ellipse cx="49" cy="61" rx="4.6" ry="5.2" fill="#A62E40"/><circle cx="50.6" cy="58.6" r="1.6" fill="#fff"/>'+
        '<ellipse cx="71" cy="61" rx="4.6" ry="5.2" fill="#A62E40"/><circle cx="72.6" cy="58.6" r="1.6" fill="#fff"/>'+
        '<path d="M52 82 Q60 86 68 82" stroke="#7A4A3A" stroke-width="2.2" fill="none" stroke-linecap="round"/>'+
      '</g>'+
      '<g class="pet-face face-happy">'+
        '<path d="M43 62 Q48 55 53 62" stroke="#A62E40" stroke-width="3" fill="none" stroke-linecap="round"/>'+
        '<path d="M67 62 Q72 55 77 62" stroke="#A62E40" stroke-width="3" fill="none" stroke-linecap="round"/>'+
        '<path d="M49 79 Q60 92 71 79 Q60 85 49 79 Z" fill="#C25066"/>'+
      '</g>'+
      '<g class="pet-face face-sad">'+
        '<ellipse cx="48" cy="62" rx="4" ry="3" fill="#A62E40"/><ellipse cx="72" cy="62" rx="4" ry="3" fill="#A62E40"/>'+
        '<circle cx="49.4" cy="60.8" r="1.4" fill="#fff"/><circle cx="73.4" cy="60.8" r="1.4" fill="#fff"/>'+
        '<path d="M53 85 Q60 81 67 85" stroke="#7A4A3A" stroke-width="2.2" fill="none" stroke-linecap="round"/>'+
        '<path d="M44 68 q-2 5 0 9 q2 -4 0 -9 Z" fill="#9FD4FF"/>'+
      '</g>'+
      '<g class="pet-face face-angry">'+
        '<path d="M40 54 L54 60" stroke="#A62E40" stroke-width="3" stroke-linecap="round"/>'+
        '<path d="M80 54 L66 60" stroke="#A62E40" stroke-width="3" stroke-linecap="round"/>'+
        '<circle cx="49" cy="63" r="4" fill="#A62E40"/><circle cx="71" cy="63" r="4" fill="#A62E40"/>'+
        '<circle cx="50.4" cy="61.4" r="1.4" fill="#fff"/><circle cx="72.4" cy="61.4" r="1.4" fill="#fff"/>'+
        '<path d="M52 84 L68 84" stroke="#7A4A3A" stroke-width="3" stroke-linecap="round"/>'+
      '</g>'+
      '<g class="pet-face face-surprised">'+
        '<ellipse cx="48" cy="61" rx="6" ry="7" fill="#A62E40"/><circle cx="50" cy="58.5" r="2" fill="#fff"/>'+
        '<ellipse cx="72" cy="61" rx="6" ry="7" fill="#A62E40"/><circle cx="74" cy="58.5" r="2" fill="#fff"/>'+
        '<ellipse cx="60" cy="84" rx="5" ry="6" fill="#C25066"/>'+
      '</g>'+
      '<g class="pet-face face-fearful">'+
        '<ellipse cx="48" cy="63" rx="3.4" ry="4" fill="#A62E40"/><circle cx="49.4" cy="61.4" r="1.3" fill="#fff"/>'+
        '<ellipse cx="72" cy="63" rx="3.4" ry="4" fill="#A62E40"/><circle cx="73.4" cy="61.4" r="1.3" fill="#fff"/>'+
        '<path d="M53 85 Q56 82 60 85 Q64 88 67 85" stroke="#7A4A3A" stroke-width="2.2" fill="none" stroke-linecap="round"/>'+
        '<path d="M83 54 q3 6 0 9 q-3 -3 0 -9 Z" fill="#9FD4FF"/>'+
      '</g>'+
      '<g class="pet-face face-disgusted">'+
        '<path d="M42 61 Q48 65 54 61" stroke="#A62E40" stroke-width="3" fill="none" stroke-linecap="round"/>'+
        '<path d="M66 61 Q72 65 78 61" stroke="#A62E40" stroke-width="3" fill="none" stroke-linecap="round"/>'+
        '<path d="M52 84 Q60 80 68 84" stroke="#7A4A3A" stroke-width="2.2" fill="none" stroke-linecap="round"/>'+
      '</g>'+
    '</svg>';


  /* ---------- 立绘资源路径 ---------- */
  var USE_PNG_AVATAR = true;    // 使用原有动漫立绘 PNG；SVG 仅作为图片加载失败时的兜底
  var MOOD_IMG = {
    neutral:   "assets/lena-neutral.png",
    happy:     "assets/lena-happy.png",
    sad:       "assets/lena-sad.png",
    angry:     "assets/lena-angry.png",
    surprised: "assets/lena-surprised.png",
    fearful:   "assets/lena-fearful.png",
    disgusted: "assets/lena-disgusted.png"
  };
  var PET_BASE = (function(){
    var s = document.currentScript;
    return (s && s.src) ? s.src.slice(0, s.src.lastIndexOf("/") + 1) : "pet/";
  })();

  function imgSrcFor(mood){
    return PET_BASE + (MOOD_IMG[mood] || MOOD_IMG.neutral);
  }

  /* ---------- 构建浮层 DOM ---------- */
  function build(){
    widget = document.createElement("div");
    widget.id = "petWidget";
    widget.hidden = true;
    widget.innerHTML =
      '<div class="pet-header" id="petHeader">'+
        '<span class="pet-title">蕾娜 · 指挥管制官</span>'+
        '<div class="pet-actions">'+
          '<button type="button" class="pet-btn" id="petCamBtn">开启摄像头</button>'+
          '<button type="button" class="pet-btn" id="petVoiceBtn" aria-label="声音开关">🔊</button>'+
          '<button type="button" class="pet-btn" id="petCloseBtn" aria-label="收起桌宠">—</button>'+
        '</div>'+
      '</div>'+
      '<div class="pet-stage">'+
        '<div class="pet-avatar" id="petAvatar">'+
          PET_SVG+
          '<img class="pet-face-img" id="petFaceImg" src="" alt="蕾娜" draggable="false" onerror="this.style.display=\'none\';this.parentElement.querySelector(\'.pet-body\').style.display=\'block\';">'+
        '</div>'+
        '<div class="pet-bubble" id="petBubble" hidden></div>'+
      '</div>'+
      '<div class="pet-cam" id="petCam" hidden>'+
        '<canvas id="petCamCanvas" width="480" height="360" aria-label="摄像头本地预览"></canvas>'+
        '<div class="pet-cam-tip" id="petCamTip">摄像头仅本地处理，不录制、不上传</div>'+
        '<div class="pet-idm-sync" id="petIdmSync"></div>'+
        '<div class="pet-mood" id="petMoodLabel">心情：平静</div>'+
      '</div>';
    document.body.appendChild(widget);

    el.body = widget.querySelector(".pet-body");
    el.avatar = $id("petAvatar");
    el.bubble = $id("petBubble");
    el.cam = $id("petCam");
    // 视频元素不挂 DOM，避免 IDM 扫描/接管；仅用于本地模型和 Canvas 预览
    el.video = document.createElement("video");
    el.video.playsInline = true;
    el.video.muted = true;
    el.video.autoplay = true;
    el.camCanvas = $id("petCamCanvas");
    el.camCtx = el.camCanvas ? el.camCanvas.getContext("2d", { alpha:false }) : null;
    el.camBtn = $id("petCamBtn");
    el.voiceBtn = $id("petVoiceBtn");
    el.closeBtn = $id("petCloseBtn");
    el.camTip = $id("petCamTip");
    el.moodLabel = $id("petMoodLabel");
    el.header = $id("petHeader");

    el.avatar.addEventListener("click", function(){ poke(); });
    el.camBtn.addEventListener("click", function(){
      if(state.camOn) stopCam(); else startCam();
    });
    el.voiceBtn.addEventListener("click", function(){
      if(!window.PET_VOICE) return;
      var on = window.PET_VOICE.toggleMute();
      el.voiceBtn.textContent = on ? "🔊" : "🔇";
    });
    el.closeBtn.addEventListener("click", function(){ togglePet(); });
    setupDrag();

    window.addEventListener('wb:pet-voice-fallback',function(e){
      if(el.voiceBtn){el.voiceBtn.title=(e.detail&&e.detail.message)||'语音已回退到浏览器朗读';}
      if(el.bubble){el.bubble.textContent=(e.detail&&e.detail.message)||'语音已回退到浏览器朗读';el.bubble.hidden=false;}
    });
    // 初始表情
    el.faceImg = $id("petFaceImg");
    setImgMood("neutral");
    // 声音开关回显本地偏好
    if(window.PET_VOICE && el.voiceBtn){
      el.voiceBtn.textContent = window.PET_VOICE.enabled() ? "🔊" : "🔇";
    }
  }

  /* ---------- 台词 ---------- */
  function pickLine(pool){
    var L = (window.PET_LINES && window.PET_LINES[pool]) || (window.PET_LINES && window.PET_LINES.neutral) || ["…"];
    return L[Math.floor(Math.random()*L.length)];
  }
  function showBubble(text, opts){
    if(!el.bubble) return;
    el.bubble.textContent = text;
    el.bubble.hidden = false;
    widget.classList.add("speaking");
    if(window.PET_VOICE) window.PET_VOICE.say(text, opts || {priority:"system"});
    clearTimeout(el._speakT);
    el._speakT = setTimeout(function(){ widget.classList.remove("speaking"); }, 1600);
  }
  function maybeSay(pool, force, silent){
    // 聊天进行中只保留聊天通道，避免系统陪伴台词串音
    if(window.PET_CHAT_BUSY && !force) return;
    var now = Date.now();
    if(!force && now - state.lastSay < SAY_MIN) return;
    state.lastSay = now;
    // silent=true → 只弹气泡不发声（自动陪伴/待命提示），避免机械提示音反复响起
    showBubble(pickLine(pool), { priority:"system", noVoice: !!silent });
  }
  function camOff(){ return !state.camOn; }

  /* ---------- 心情 / 表情 ---------- */
  function setImgMood(m){
    if(!el.faceImg) return;
    var svg = el.avatar.querySelector(".pet-body");
    // 默认用内联 SVG 蕾娜形象（更贴合 86 蕾娜设定）；要切回立绘 PNG 把 USE_PNG_AVATAR 改 true
    if(!USE_PNG_AVATAR){
      el.faceImg.style.display = "none";
      if(svg) svg.style.display = "block";
      return;
    }
    var src = imgSrcFor(m);
    if(el.faceImg.getAttribute("data-current-src") === src) return;
    el.faceImg.setAttribute("data-current-src", src);
    el.faceImg.onload = function(){
      el.faceImg.style.display = "block";
      if(svg) svg.style.display = "none";
    };
    el.faceImg.onerror = function(){
      el.faceImg.style.display = "none";
      if(svg) svg.style.display = "block";
    };
    el.faceImg.src = src;
    if(el.faceImg.complete && el.faceImg.naturalWidth){
      el.faceImg.style.display = "block";
      if(svg) svg.style.display = "none";
    }
  }
  function setMood(m){
    state.mood = m;
    if(el.moodLabel) el.moodLabel.textContent = "心情：" + (MOOD_TEXT[m] || "平静");
    setImgMood(m);
  }
  function pickMood(s){
    var best = "neutral", bestV = 0;
    ["happy","sad","angry","surprised","fearful","disgusted"].forEach(function(k){
      if(s[k] > bestV){ bestV = s[k]; best = k; }
    });
    if(bestV < EMOTION_MIN) return "neutral";              // 置信度不足 → 平静
    if(state.mood !== "neutral" && state.mood !== best &&
       s[state.mood] > bestV - MOOD_HYST) return state.mood; // 滞回：留住当前情绪
    return best;
  }

  /* ---------- 摄像头 + 表情识别 ---------- */
  /* 加载人脸检测 + 表情模型。
   * 稳定优先：先加载 tiny+表情（轻量、必成），保证摄像头一定能用；
   * 之后在后台尝试升级到 SSD（精度更高）。升级失败不影响已就绪的 tiny。 */
  function loadModels(){
    if(state.modelReady || state.modelLoading) return Promise.resolve(state.modelReady);
    if(!window.faceapi) return Promise.resolve(false);
    state.modelLoading = true;
    var tip = function(t){ if(el.camTip) el.camTip.textContent = t; };
    var chain = Promise.resolve()
      .then(function(){ tip("正在加载人脸检测模型…"); return window.faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL); })
      .then(function(){ state.detector = "tiny"; tip("正在加载表情模型…"); return window.faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL); })
      .then(function(){ state.modelReady = true; return true; })
      .catch(function(e){ console.error("[pet] 基础模型加载失败", e); tip("模型加载失败（如持续请硬刷新 Ctrl+Shift+R）"); return false; });
    // 稳定路径就绪后，后台尝试升级 SSD（失败静默，保持 tiny）
    if(PREFER_DETECTOR === "ssd"){
      chain = chain.then(function(ok){
        if(!ok) return false;
        try {
          window.faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL)
            .then(function(){ state.detector = "ssd"; })
            .catch(function(){ /* 升级失败，保持 tiny */ });
        } catch(_){}
        return true;
      });
    }
    return chain.then(function(r){ state.modelLoading = false; return r; });
  }

  /* face-api 体积约 1.3MB，改为按需懒加载：只有用户主动开摄像头时才拉取（P2-7 首屏优化）。
   * 首屏因此不再阻塞解析；加载失败或引擎缺失时自动回落「纯陪伴模式」。 */
  var FACE_API_SRC = "vendor/face-api/face-api.js";
  function ensureFaceApi(){
    if(window.faceapi) return Promise.resolve(true);
    if(state.apiLoading) return state.apiLoading;
    state.apiLoading = new Promise(function(resolve){
      var s = document.createElement("script");
      s.src = FACE_API_SRC;
      s.async = true;
      s.onload = function(){ resolve(!!window.faceapi); };
      s.onerror = function(){ resolve(false); };
      document.head.appendChild(s);
    }).then(function(ok){ if(!ok) state.apiLoading = null; return ok; });
    return state.apiLoading;
  }

  /* ---------- 摄像头 ↔ IDM 同步（可选，本地辅助 tools/cam-sync） ----------
   * 页面无法直接关桌面程序，但可请求本机常驻辅助：
   *   开摄像头 → 辅助退出 IDM；关摄像头 → 辅助重启 IDM。
   * 辅助没在运行时静默忽略，摄像头照常工作、不影响表情识别。 */
  var CAM_SYNC_URL = "http://127.0.0.1:8765";
  function camSync(cmd){
    try{
      var ctrl = new AbortController();
      var t = setTimeout(function(){ ctrl.abort(); }, 900);
      fetch(CAM_SYNC_URL + "/" + cmd, { method:"GET", cache:"no-store", signal:ctrl.signal })
        .then(function(r){ return r.json(); })
        .then(function(j){ if(j && !j.ok) console.warn("[pet-cam-sync]", j); })
        .catch(function(){ /* 辅助未运行 → 忽略，摄像头照常 */ })
        .finally(function(){ clearTimeout(t); });
    }catch(_){}
  }
  // 探活辅助并更新界面提示（开摄像头时显示"已启动/未启动"）
  function probeCamSync(){
    var n = $id("petIdmSync");
    if(!n) return;
    try{
      var ctrl = new AbortController();
      var t = setTimeout(function(){ ctrl.abort(); setSyncTip(n, false); }, 1200);
      fetch(CAM_SYNC_URL + "/status", { method:"GET", cache:"no-store", signal:ctrl.signal })
        .then(function(r){ return r.json(); })
        .then(function(j){ clearTimeout(t); setSyncTip(n, !!(j && j.ok)); })
        .catch(function(){ clearTimeout(t); setSyncTip(n, false); });
    }catch(_){ setSyncTip(n, false); }
  }
  function setSyncTip(n, ok){
    if(!n) return;
    n.textContent = ok
      ? "IDM 同步辅助：已启动（开摄像头自动退 IDM）"
      : "IDM 同步辅助：未启动（如需自动退 IDM，运行 start-cam-sync.cmd）";
    n.classList.toggle("ok", !!ok);
  }

  function startCam(){
    if(!window.faceapi && !state.apiLoading){
      el.camTip.textContent = "正在加载表情引擎…";
      ensureFaceApi().then(function(ok){
        if(!ok){ el.camTip.textContent = "表情引擎加载失败，已切换为纯陪伴模式（戳我聊天）"; return; }
        startCamInner();
      });
      return;
    }
    startCamInner();
  }
  function startCamInner(){
    if(!window.faceapi){
      el.camTip.textContent = "表情引擎未加载，已切换为纯陪伴模式（戳我聊天）";
      return;
    }
    if(!window.isSecureContext){
      el.camTip.textContent = "当前非安全上下文，摄像头不可用（需用 localhost 或 https 访问）";
      return;
    }
    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
      el.camTip.textContent = "当前环境不支持摄像头（需 localhost 或 https）";
      return;
    }
    el.cam.hidden = false;
    el.camTip.textContent = "正在加载表情模型…";
    camSync("cam-on"); // 提前通知辅助退出 IDM，避免它打断摄像头预览
    probeCamSync();    // 显示同步辅助是否已启动
    loadModels().then(function(ok){
      if(!ok){ el.camTip.textContent = "模型加载失败，纯陪伴模式（戳我聊天）"; return; }
      var eng = state.detector === "ssd" ? "人脸检测已强化" : "精简引擎";
      el.camTip.textContent = "模型就绪（" + eng + "），正在开启摄像头…";
      return navigator.mediaDevices.getUserMedia({ video:{ width:{ideal:CAM_W}, height:{ideal:CAM_H}, facingMode:"user" }, audio:false })
        .then(function(stream){
          state.stream = stream;
          state.camOn = true;
          el.video.srcObject = stream;
          el.video.muted = true;
          el.video.setAttribute("disablepictureinpicture", "true");
          el.video.setAttribute("playsinline", "true");
          el.video.setAttribute("webkit-playsinline", "true");
          // 关键：不给 video 设可被下载的 src（IDM 只认带 src 的媒体 URL 才会接管），
          // 摄像头流只走 srcObject，IDM 抓不到、无法打断预览。
          el.video.removeAttribute("src");
          // 播放可能被下载器扩展（IDM 等）短暂打断，失败自动重试自愈，别一失败就放弃。
          (function retryPlay(attempt){
            el.video.play().then(function(){
              if(el.camTip && state.camOn) el.camTip.textContent = "摄像头已连接，正在本地观察…";
            }).catch(function(err){
              console.warn("[pet] video.play 第" + (attempt + 1) + "次失败（可能被 IDM 拦截）", err);
              if(attempt < 5 && state.camOn){
                setTimeout(function(){ retryPlay(attempt + 1); }, 500);
              } else if(el.camTip && state.camOn){
                el.camTip.textContent = "摄像头预览持续被拦（常见是 IDM），请临时禁用 IDM 的浏览器集成后重试";
              }
            });
          })(0);
          el.camBtn.textContent = "关闭摄像头";
          el.camBtn.classList.add("on");
          el.camTip.textContent = "摄像头仅本地处理，不录制、不上传";
          loopDetect();
        })
        .catch(function(err){
          el.camTip.textContent = "摄像头开启失败：" + (err && err.name ? err.name : "已取消") + "（可纯陪伴模式）";
          state.camOn = false;
        });
    });
  }

  function stopCam(){
    state.camOn = false;
    if(state.detectTimer){ clearInterval(state.detectTimer); state.detectTimer = null; }
    if(state.stream){ state.stream.getTracks().forEach(function(t){ t.stop(); }); state.stream = null; }
    if(el.video) el.video.srcObject = null;
    if(el.camBtn){ el.camBtn.textContent = "开启摄像头"; el.camBtn.classList.remove("on"); }
    camSync("cam-off"); // 摄像头关了，让辅助把 IDM 拉回来
    setMood("neutral");
    maybeSay("neutral", true);
  }

  function loopDetect(){
    if(state.detectTimer) clearInterval(state.detectTimer);
    state.detectTimer = setInterval(function(){
      if(!state.camOn || !state.modelReady || !el.video || el.video.readyState < 2) return;
      // Canvas 只做本地预览，隐藏 video 元素避免 IDM 等下载器接管摄像头流
      if(el.camCtx && el.camCanvas){
        try{ el.camCtx.drawImage(el.video, 0, 0, el.camCanvas.width, el.camCanvas.height); }catch(_){ }
      }
      // 逐帧按当前检测器取参数：tiny 先就绪先用；SSD 升级完成后自动切换
      var opts = state.detector === "ssd"
        ? new window.faceapi.SsdMobilenetv1Options({ minConfidence:0.4 })
        : new window.faceapi.TinyFaceDetectorOptions({ inputSize:TINY_INPUT_SIZE, scoreThreshold:0.4 });
      window.faceapi.detectSingleFace(el.video, opts).withFaceExpressions()
        .then(function(det){ onDetection(det); })
        .catch(function(){ /* 偶尔单帧失败，忽略 */ });
    }, DETECT_INTERVAL);
  }

  function onDetection(det){
    if(det){
      // —— 脸在 ——
      state.noFaceCount = 0;
      if(!state.faceSeen){
        state.faceSeen = true;
        if(Date.now() - state.lastSeenAt > SEEN_COOLDOWN) maybeSay("seen", false);
      }
      state.lastSeenAt = Date.now();
    } else {
      // —— 脸不在：累积消失帧数，达到阈值判定"你走了"并归零情绪记忆 ——
      state.noFaceCount++;
      if(state.faceSeen && state.noFaceCount * DETECT_INTERVAL >= FACE_LOST_MS){
        state.faceSeen = false;
        EMOTIONS.forEach(function(k){ state.smooth[k] = k === "neutral" ? 1 : 0; });
        if(state.mood !== "neutral"){ setMood("neutral"); maybeSay("gone", false); }
      }
      return;
    }
    var exp = det.expressions || {};
    EMOTIONS.forEach(function(k){
      var v = (typeof exp[k] === "number") ? exp[k] : 0;
      state.smooth[k] = state.smooth[k] * (1 - SMOOTH) + v * SMOOTH;
    });
    var m = pickMood(state.smooth);
    if(m !== state.mood){
      setMood(m);
      maybeSay(m, true);
    }
  }

  /* ---------- 交互 ---------- */
  function poke(){
    var pool = camOff() ? "cam_off" : state.mood;
    if(pool === "neutral" && !camOff()) pool = "neutral";
    maybeSay(pool, true);
  }

  function togglePet(){
    state.open = !state.open;
    widget.hidden = !state.open;
    // 打开时收起导航折叠区，避免遮挡浮层
    if(state.open){
      var tb = $id("tabbar"), nm = $id("navMore");
      if(tb) tb.classList.remove("expanded");
      if(nm) nm.setAttribute("aria-expanded","false");
    }
    if(state.open){
      restorePos();
      maybeSay("greet", true);
      if(!state.companionTimer){
        state.companionTimer = setInterval(function(){
          maybeSay(camOff() ? "cam_off" : state.mood, false, true); // 静默陪伴，只弹气泡
        }, COMPANION_INTERVAL);
      }
    } else {
      if(state.camOn) stopCam();
      if(state.companionTimer){ clearInterval(state.companionTimer); state.companionTimer = null; }
    }
  }

  /* ---------- 拖拽 ---------- */
  function setupDrag(){
    var off = {x:0,y:0};
    el.header.addEventListener("pointerdown", function(e){
      if(e.target.closest(".pet-btn")) return; // 按钮不触发拖拽
      widget.classList.add("dragging");
      var r = widget.getBoundingClientRect();
      off.x = e.clientX - r.left;
      off.y = e.clientY - r.top;
      widget.style.right = "auto"; widget.style.bottom = "auto";
      widget.style.left = r.left + "px"; widget.style.top = r.top + "px";
      el.header.setPointerCapture(e.pointerId);
    });
    el.header.addEventListener("pointermove", function(e){
      if(!widget.classList.contains("dragging")) return;
      var x = e.clientX - off.x, y = e.clientY - off.y;
      x = Math.max(4, Math.min(window.innerWidth - widget.offsetWidth - 4, x));
      y = Math.max(4, Math.min(window.innerHeight - 50, y));
      widget.style.left = x + "px"; widget.style.top = y + "px";
    });
    el.header.addEventListener("pointerup", function(e){
      if(!widget.classList.contains("dragging")) return;
      widget.classList.remove("dragging");
      try{ el.header.releasePointerCapture(e.pointerId); }catch(_){}
      try{ localStorage.setItem("wb_pet_pos", JSON.stringify({left:widget.style.left, top:widget.style.top})); }catch(_){}
    });
  }
  function restorePos(){
    try{
      var p = JSON.parse(localStorage.getItem("wb_pet_pos") || "null");
      if(p && p.left && p.top){
        widget.style.right = "auto"; widget.style.bottom = "auto";
        widget.style.left = p.left; widget.style.top = p.top;
      }
    }catch(_){}
  }

  /* ---------- 入口绑定 ---------- */
  function bindNav(){
    var nav = $id("navPet");
    if(!nav) return;
    nav.addEventListener("click", function(e){ e.preventDefault(); togglePet(); });
    nav.addEventListener("keydown", function(e){
      if(e.key === "Enter" || e.key === " "){ e.preventDefault(); togglePet(); }
    });
  }

  /* ---------- 启动 ---------- */
  function init(){
    build();
    bindNav();
  }
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
