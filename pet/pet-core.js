/* ===========================================================
   桌宠核心逻辑 · 自包含 IIFE，不依赖主 IIFE
   - 纯本地表情识别（face-api / @vladmandic fork，模型在 vendor/face-api/weights）
   - 摄像头流只在内存处理，不录制、不上传、不落盘
   - 默认关闭，需手动开启；无摄像头/引擎时降级为纯陪伴桌宠
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

  function $id(s){ return document.getElementById(s); }

  /* ---------- 桌宠 SVG 形象（7 种表情组，按 data-mood 切换） ---------- */
  var PET_SVG =
    '<svg class="pet-body" data-mood="neutral" viewBox="0 0 120 120" width="122" height="122" aria-hidden="true">'+
      '<defs>'+
        '<linearGradient id="petGrad" x1="0" y1="0" x2="1" y2="1">'+
          '<stop offset="0" stop-color="#FF6B6B"/><stop offset="1" stop-color="#4ECDC4"/>'+
        '</linearGradient>'+
      '</defs>'+
      '<ellipse cx="60" cy="112" rx="30" ry="6" fill="rgba(0,0,0,.10)"/>'+
      '<circle cx="60" cy="66" r="41" fill="url(#petGrad)"/>'+
      '<ellipse cx="44" cy="80" rx="6.5" ry="4.2" fill="rgba(255,120,140,.45)"/>'+
      '<ellipse cx="76" cy="80" rx="6.5" ry="4.2" fill="rgba(255,120,140,.45)"/>'+
      /* neutral */
      '<g class="pet-face face-neutral">'+
        '<circle cx="48" cy="60" r="4.6" fill="#2b2f36"/><circle cx="72" cy="60" r="4.6" fill="#2b2f36"/>'+
        '<circle cx="49.6" cy="58.4" r="1.5" fill="#fff"/><circle cx="73.6" cy="58.4" r="1.5" fill="#fff"/>'+
        '<path d="M52 79 Q60 82 68 79" stroke="#2b2f36" stroke-width="2.4" fill="none" stroke-linecap="round"/>'+
      '</g>'+
      /* happy */
      '<g class="pet-face face-happy">'+
        '<path d="M42 62 Q48 54 54 62" stroke="#2b2f36" stroke-width="3.2" fill="none" stroke-linecap="round"/>'+
        '<path d="M66 62 Q72 54 78 62" stroke="#2b2f36" stroke-width="3.2" fill="none" stroke-linecap="round"/>'+
        '<path d="M49 77 Q60 92 71 77 Q60 84 49 77 Z" fill="#c25066"/>'+
      '</g>'+
      /* sad */
      '<g class="pet-face face-sad">'+
        '<circle cx="48" cy="62" r="4.2" fill="#2b2f36"/><circle cx="72" cy="62" r="4.2" fill="#2b2f36"/>'+
        '<path d="M52 83 Q60 78 68 83" stroke="#2b2f36" stroke-width="2.4" fill="none" stroke-linecap="round"/>'+
        '<path d="M44 67 q-3 5 0 8 q3 -3 0 -8 Z" fill="#7fc8ff"/>'+
      '</g>'+
      /* angry */
      '<g class="pet-face face-angry">'+
        '<path d="M40 52 L55 58" stroke="#2b2f36" stroke-width="3" stroke-linecap="round"/>'+
        '<path d="M80 52 L65 58" stroke="#2b2f36" stroke-width="3" stroke-linecap="round"/>'+
        '<circle cx="49" cy="63" r="3.6" fill="#2b2f36"/><circle cx="71" cy="63" r="3.6" fill="#2b2f36"/>'+
        '<path d="M51 81 L69 81" stroke="#2b2f36" stroke-width="3" stroke-linecap="round"/>'+
      '</g>'+
      /* surprised */
      '<g class="pet-face face-surprised">'+
        '<circle cx="48" cy="60" r="6" fill="#2b2f36"/><circle cx="72" cy="60" r="6" fill="#2b2f36"/>'+
        '<circle cx="50" cy="58" r="1.8" fill="#fff"/><circle cx="74" cy="58" r="1.8" fill="#fff"/>'+
        '<ellipse cx="60" cy="83" rx="5" ry="6" fill="#c25066"/>'+
      '</g>'+
      /* fearful */
      '<g class="pet-face face-fearful">'+
        '<circle cx="48" cy="61" r="3.6" fill="#2b2f36"/><circle cx="72" cy="61" r="3.6" fill="#2b2f36"/>'+
        '<path d="M52 83 Q56 80 60 83 Q64 86 68 83" stroke="#2b2f36" stroke-width="2.2" fill="none" stroke-linecap="round"/>'+
        '<path d="M83 50 q3 6 0 9 q-3 -3 0 -9 Z" fill="#7fc8ff"/>'+
      '</g>'+
      /* disgusted */
      '<g class="pet-face face-disgusted">'+
        '<path d="M42 60 Q48 64 54 60" stroke="#2b2f36" stroke-width="3" fill="none" stroke-linecap="round"/>'+
        '<path d="M66 60 Q72 64 78 60" stroke="#2b2f36" stroke-width="3" fill="none" stroke-linecap="round"/>'+
        '<path d="M52 82 Q60 79 68 81" stroke="#2b2f36" stroke-width="2.4" fill="none" stroke-linecap="round"/>'+
      '</g>'+
    '</svg>';

  /* ---------- 构建浮层 DOM ---------- */
  function build(){
    widget = document.createElement("div");
    widget.id = "petWidget";
    widget.hidden = true;
    widget.innerHTML =
      '<div class="pet-header" id="petHeader">'+
        '<span class="pet-title">桌宠伙伴</span>'+
        '<div class="pet-actions">'+
          '<button type="button" class="pet-btn" id="petCamBtn">开启摄像头</button>'+
          '<button type="button" class="pet-btn" id="petCloseBtn" aria-label="收起桌宠">—</button>'+
        '</div>'+
      '</div>'+
      '<div class="pet-stage">'+
        '<div class="pet-avatar" id="petAvatar">'+PET_SVG+'</div>'+
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
  function setMood(m){
    state.mood = m;
    if(el.body) el.body.setAttribute("data-mood", m);
    if(el.moodLabel) el.moodLabel.textContent = "心情：" + (MOOD_TEXT[m] || "平静");
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
