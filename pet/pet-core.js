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
  var DETECT_INTERVAL = 170;   // ms，约 6fps，省 CPU
  var SMOOTH = 0.72;           // EMA 平滑系数（新值权重，越大越灵敏）
  var SAY_MIN = 7000;          // 台词最小间隔 ms
  var COMPANION_INTERVAL = 16000; // 陪伴自言自语间隔

  var EMOTIONS = ["neutral","happy","sad","angry","surprised","fearful","disgusted"];
  var MOOD_TEXT = {neutral:"平静",happy:"开心",sad:"低落",angry:"生气",surprised:"惊讶",fearful:"紧张",disgusted:"嫌弃"};

  var widget, el = {};
  var state = {
    open:false, camOn:false, modelReady:false, modelLoading:false, apiLoading:null,
    stream:null, detectTimer:null, companionTimer:null,
    smooth:{neutral:1,happy:0,sad:0,angry:0,surprised:0,fearful:0,disgusted:0},
    mood:"neutral", lastSay:0
  };
  // 心情直接驱动立绘切换，无需等待异步加载

  function $id(s){ return document.getElementById(s); }

  /* ---------- 桌宠 SVG 形象（降级 fallback，7 种表情组，按 data-mood 切换） ---------- */
  var PET_SVG =
    '<svg class="pet-body" data-mood="neutral" viewBox="0 0 120 120" width="122" height="122" aria-hidden="true">'+
      '<defs>'+
        '<radialGradient id="lenaBg" cx="0.5" cy="0.4" r="0.75">'+
          '<stop offset="0" stop-color="#EAF1FB"/>'+
          '<stop offset="1" stop-color="#C3D4EE"/>'+
        '</radialGradient>'+
        '<linearGradient id="lenaHair" x1="0" y1="0" x2="0" y2="1">'+
          '<stop offset="0" stop-color="#F4F7FB"/>'+
          '<stop offset="1" stop-color="#C9D3E2"/>'+
        '</linearGradient>'+
      '</defs>'+
      '<circle cx="60" cy="60" r="58" fill="url(#lenaBg)"/>'+
      '<path d="M20 60 Q18 98 34 118 L42 118 Q30 94 35 66 Q29 50 45 40 Q22 48 20 60 Z" fill="url(#lenaHair)"/>'+
      '<path d="M100 60 Q102 98 86 118 L78 118 Q90 94 85 66 Q91 50 75 40 Q98 48 100 60 Z" fill="url(#lenaHair)"/>'+
      '<ellipse cx="60" cy="68" rx="33" ry="35" fill="#FCE9DA"/>'+
      '<path d="M27 68 Q26 92 41 105 Q30 87 33 66 Z" fill="rgba(0,0,0,.05)"/>'+
      '<path d="M30 103 Q60 95 90 103 L97 119 Q60 112 23 119 Z" fill="#2E4172"/>'+
      '<path d="M47 103 L60 116 L73 103 L67 99 L60 106 L53 99 Z" fill="#EAF0F8"/>'+
      '<path d="M43 99 L60 110 L77 99" stroke="#1F2D52" stroke-width="2" fill="none"/>'+
      '<path d="M27 60 Q24 34 45 27 Q60 21 75 27 Q96 34 93 60 Q86 45 72 43 Q81 52 78 61 Q72 44 60 44 Q48 44 42 61 Q39 52 48 43 Q34 45 27 60 Z" fill="url(#lenaHair)"/>'+
      '<path d="M80 43 Q91 60 84 82 Q82 71 78 60 Q81 51 80 43 Z" fill="#E2556B"/>'+
      '<path d="M60 27 Q60 11 71 8" stroke="url(#lenaHair)" stroke-width="4" fill="none" stroke-linecap="round"/>'+
      '<circle cx="71" cy="8" r="3" fill="#E2556B"/>'+
      '<ellipse cx="43" cy="80" rx="6" ry="3.6" fill="rgba(255,120,140,.40)"/>'+
      '<ellipse cx="77" cy="80" rx="6" ry="3.6" fill="rgba(255,120,140,.40)"/>'+
      '<g class="pet-face face-neutral">'+
        '<circle cx="48" cy="62" r="5" fill="#2E4A7A"/><circle cx="72" cy="62" r="5" fill="#2E4A7A"/>'+
        '<circle cx="49.6" cy="60.4" r="1.6" fill="#fff"/><circle cx="73.6" cy="60.4" r="1.6" fill="#fff"/>'+
        '<path d="M52 82 Q60 86 68 82" stroke="#7A4A3A" stroke-width="2.4" fill="none" stroke-linecap="round"/>'+
      '</g>'+
      '<g class="pet-face face-happy">'+
        '<path d="M42 62 Q48 55 54 62" stroke="#2E4A7A" stroke-width="3.2" fill="none" stroke-linecap="round"/>'+
        '<path d="M66 62 Q72 55 78 62" stroke="#2E4A7A" stroke-width="3.2" fill="none" stroke-linecap="round"/>'+
        '<path d="M49 79 Q60 92 71 79 Q60 85 49 79 Z" fill="#C25066"/>'+
      '</g>'+
      '<g class="pet-face face-sad">'+
        '<path d="M43 60 Q48 64 53 60" stroke="#2E4A7A" stroke-width="3" fill="none" stroke-linecap="round"/>'+
        '<path d="M67 60 Q72 64 77 60" stroke="#2E4A7A" stroke-width="3" fill="none" stroke-linecap="round"/>'+
        '<path d="M53 85 Q60 81 67 85" stroke="#7A4A3A" stroke-width="2.4" fill="none" stroke-linecap="round"/>'+
        '<path d="M44 68 q-2 5 0 9 q2 -4 0 -9 Z" fill="#7FC8FF"/>'+
      '</g>'+
      '<g class="pet-face face-angry">'+
        '<path d="M40 54 L55 60" stroke="#2E4A7A" stroke-width="3" stroke-linecap="round"/>'+
        '<path d="M80 54 L65 60" stroke="#2E4A7A" stroke-width="3" stroke-linecap="round"/>'+
        '<circle cx="49" cy="63" r="4" fill="#2E4A7A"/><circle cx="71" cy="63" r="4" fill="#2E4A7A"/>'+
        '<path d="M52 84 L68 84" stroke="#7A4A3A" stroke-width="3" stroke-linecap="round"/>'+
      '</g>'+
      '<g class="pet-face face-surprised">'+
        '<circle cx="48" cy="62" r="6.5" fill="#2E4A7A"/><circle cx="72" cy="62" r="6.5" fill="#2E4A7A"/>'+
        '<circle cx="50" cy="59.5" r="2" fill="#fff"/><circle cx="74" cy="59.5" r="2" fill="#fff"/>'+
        '<ellipse cx="60" cy="84" rx="5" ry="6" fill="#C25066"/>'+
      '</g>'+
      '<g class="pet-face face-fearful">'+
        '<circle cx="48" cy="63" r="3.6" fill="#2E4A7A"/><circle cx="72" cy="63" r="3.6" fill="#2E4A7A"/>'+
        '<path d="M53 85 Q56 82 60 85 Q64 88 67 85" stroke="#7A4A3A" stroke-width="2.2" fill="none" stroke-linecap="round"/>'+
        '<path d="M83 54 q3 6 0 9 q-3 -3 0 -9 Z" fill="#7FC8FF"/>'+
      '</g>'+
      '<g class="pet-face face-disgusted">'+
        '<path d="M42 61 Q48 65 54 61" stroke="#2E4A7A" stroke-width="3" fill="none" stroke-linecap="round"/>'+
        '<path d="M66 61 Q72 65 78 61" stroke="#2E4A7A" stroke-width="3" fill="none" stroke-linecap="round"/>'+
        '<path d="M52 84 Q60 80 68 84" stroke="#7A4A3A" stroke-width="2.4" fill="none" stroke-linecap="round"/>'+
      '</g>'+
    '</svg>';


  /* ---------- 立绘资源路径 ---------- */
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
        '<video id="petVideo" playsinline muted></video>'+
        '<div class="pet-cam-tip" id="petCamTip">摄像头仅本地处理，不录制、不上传</div>'+
        '<div class="pet-mood" id="petMoodLabel">心情：平静</div>'+
      '</div>';
    document.body.appendChild(widget);

    el.body = widget.querySelector(".pet-body");
    el.avatar = $id("petAvatar");
    el.bubble = $id("petBubble");
    el.cam = $id("petCam");
    el.video = $id("petVideo");
    el.camBtn = $id("petCamBtn");
    el.closeBtn = $id("petCloseBtn");
    el.camTip = $id("petCamTip");
    el.moodLabel = $id("petMoodLabel");
    el.header = $id("petHeader");

    el.avatar.addEventListener("click", function(){ poke(); });
    el.camBtn.addEventListener("click", function(){
      if(state.camOn) stopCam(); else startCam();
    });
    el.closeBtn.addEventListener("click", function(){ togglePet(); });
    setupDrag();

    // 初始表情
    el.faceImg = $id("petFaceImg");
    setImgMood("neutral");
  }

  /* ---------- 台词 ---------- */
  function pickLine(pool){
    var L = (window.PET_LINES && window.PET_LINES[pool]) || (window.PET_LINES && window.PET_LINES.neutral) || ["…"];
    return L[Math.floor(Math.random()*L.length)];
  }
  function showBubble(text){
    if(!el.bubble) return;
    el.bubble.textContent = text;
    el.bubble.hidden = false;
    widget.classList.add("speaking");
    clearTimeout(el._speakT);
    el._speakT = setTimeout(function(){ widget.classList.remove("speaking"); }, 1600);
  }
  function maybeSay(pool, force){
    var now = Date.now();
    if(!force && now - state.lastSay < SAY_MIN) return;
    state.lastSay = now;
    showBubble(pickLine(pool));
  }
  function camOff(){ return !state.camOn; }

  /* ---------- 心情 / 表情 ---------- */
  function setImgMood(m){
    if(!el.faceImg) return;
    var src = imgSrcFor(m);
    if(el.faceImg.getAttribute("data-current-src") === src) return;
    el.faceImg.setAttribute("data-current-src", src);
    var svg = el.avatar.querySelector(".pet-body");
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
    if(bestV < 0.5 && s.neutral > 0.5) return "neutral";
    if(bestV < 0.42) return "neutral";
    return best;
  }

  /* ---------- 摄像头 + 表情识别 ---------- */
  function loadModels(){
    if(state.modelReady || state.modelLoading) return Promise.resolve(state.modelReady);
    if(!window.faceapi) return Promise.resolve(false);
    state.modelLoading = true;
    return Promise.resolve()
      .then(function(){
        return window.faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
          .then(function(){ return window.faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL); });
      })
      .then(function(){ state.modelReady = true; return true; })
      .catch(function(e){ console.error("[pet] 模型加载失败", e); return false; })
      .then(function(r){ state.modelLoading = false; return r; });
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
    loadModels().then(function(ok){
      if(!ok){ el.camTip.textContent = "模型加载失败，纯陪伴模式（戳我聊天）"; return; }
      return navigator.mediaDevices.getUserMedia({ video:{ width:{ideal:320}, height:{ideal:240}, facingMode:"user" }, audio:false })
        .then(function(stream){
          state.stream = stream;
          state.camOn = true;
          el.video.srcObject = stream;
          el.video.play().catch(function(){});
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
    setMood("neutral");
    maybeSay("neutral", true);
  }

  function loopDetect(){
    if(state.detectTimer) clearInterval(state.detectTimer);
    state.detectTimer = setInterval(function(){
      if(!state.camOn || !state.modelReady || !el.video || el.video.readyState < 2) return;
      var opts = new window.faceapi.TinyFaceDetectorOptions({ inputSize:224, scoreThreshold:0.5 });
      window.faceapi.detectSingleFace(el.video, opts).withFaceExpressions()
        .then(function(det){ onDetection(det); })
        .catch(function(){ /* 偶尔单帧失败，忽略 */ });
    }, DETECT_INTERVAL);
  }

  function onDetection(det){
    if(!det){
      if(state.mood !== "neutral"){ setMood("neutral"); maybeSay("neutral", false); }
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
          maybeSay(camOff() ? "cam_off" : state.mood, false);
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
