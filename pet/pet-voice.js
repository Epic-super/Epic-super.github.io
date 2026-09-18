/* ===========================================================
   蕾娜语音层 · 自包含，挂到 window.PET_VOICE
   - 默认引擎：浏览器 Web Speech API 中文语音（免费、离线、不耗 API 额度）
   - 可选引擎：StepFun stepaudio TTS（旗舰语音模型）
       需把 pet/pet-voice-config.js 里 useStepFun 置 true 且填好 key；
       若 plan 未开通 TTS，调用会失败 → 自动回退浏览器语音，并锁死不再重试（省额度）
   - 对外：say(text) / toggleMute() / setEnabled(bool) / enabled()
   - 本地无后端、不落盘；key 只存于本地 config，勿提交 git
   =========================================================== */
(function(){
  "use strict";

  var CFG = window.PET_VOICE_CONFIG || {};
  var SF_KEY    = CFG.apiKey || "";
  var SF_BASE   = CFG.baseUrl  || "https://api.stepfun.com/step_plan/v1";
  var SF_MODEL  = CFG.model  || "stepaudio-2.5-tts";
  var SF_VOICE  = CFG.voice  || "elegantgentle-female";
  var SF_FORMAT = CFG.responseFormat || "mp3";
  var USE_STEPFUN = !!(CFG.useStepFun && SF_KEY);

  // 浏览器中文音色偏好（优先好听的女性音）
  var PREFERRED_ZH = [
    "xiaoxiao","xiaoyi","xiaoshuang","yaoyao","xiaozhen","tingting","yating",
    "yunxi","yunyang","huihui","kangkang"
  ];
  var FALLBACK_LANG = "zh-CN";

  var enabled = CFG.enabled !== false;  // 声音总开关，记忆到 localStorage
  var sfBroken = false;                 // StepFun 已确认失败 → 锁死回退，别反复烧额度
  var unlocked = false;                 // 浏览器 autoplay 解锁标记
  var voices = [];
  var sfAudio = null;                   // StepFun 播放用的 <audio>
  var currentUtter = null;              // 正在播的浏览器 utterance

  /* ---------- 本地偏好 ---------- */
  function loadPref(){
    try{ var v = localStorage.getItem("wb_pet_voice"); if(v != null) enabled = v === "1"; }catch(_){}
  }
  function savePref(){ try{ localStorage.setItem("wb_pet_voice", enabled ? "1" : "0"); }catch(_){} }
  loadPref();

  /* ---------- 浏览器语音 ---------- */
  function refreshVoices(){
    if(!window.speechSynthesis) return;
    var v = window.speechSynthesis.getVoices ? window.speechSynthesis.getVoices() : [];
    if(v.length) voices = v;
  }
  // 简单语言检测：出现假名（ひらがな/カタカナ）即判为日语，否则按中文
  function detectLang(text){
    return /[\u3040-\u30ff\u31f0-\u31ff]/.test(text || "") ? "ja" : "zh";
  }
  function pickVoice(lang){
    if(!voices.length) return null;
    lang = lang || "zh";
    // 优先取该语言的音色；本机没装该语言音色时再回退全部
    var pool = voices.filter(function(x){ return new RegExp("^" + lang + "(?:[-_])?").test(x.lang || ""); });
    if(!pool.length) pool = voices;
    if(lang === "zh"){
      for(var i=0;i<PREFERRED_ZH.length;i++){
        var low = PREFERRED_ZH[i];
        for(var j=0;j<pool.length;j++){
          if((pool[j].name||"").toLowerCase().indexOf(low) >= 0) return pool[j];
        }
      }
    }
    return pool[0] || null;
  }

  function speakBrowser(text){
    if(!window.speechSynthesis || !text) return;
    if(!unlocked){ pendingText = text; return; } // 未解锁先攒着，首次交互再播
    if(sfAudio) try{ sfAudio.pause(); sfAudio = null; }catch(_){}
    if(currentUtter){ try{ window.speechSynthesis.cancel(); }catch(_){ currentUtter = null; } }
    refreshVoices(); // 长会话后音色列表可能失效，播前重取，缓解"越聊越机械"
    var lang = detectLang(text);             // 日文不再被中文音色硬念
    var u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "ja" ? "ja-JP" : FALLBACK_LANG;
    var v = pickVoice(lang);
    if(v){ u.voice = v; u.lang = v.lang || u.lang; }
    u.rate = CFG.rate || 1.0;
    u.pitch = CFG.pitch || 1.05;
    currentUtter = u;
    u.onend = u.onerror = function(){ currentUtter = null; flushPending(); };
    window.speechSynthesis.speak(u);
    // Chrome 已知 bug：连续播报后合成会被自动挂起成"卡顿/机械"，播后显式 resume 复位
    try{ window.speechSynthesis.resume(); }catch(_){}
  }

  /* ---------- StepFun 语音（旗舰；plan 未开通则回退） ---------- */
  function speakStepfun(text){
    if(sfBroken) return speakBrowser(text);
    if(!USE_STEPFUN) return speakBrowser(text);
    var body = {
      model: SF_MODEL,
      input: text,
      voice: SF_VOICE,
      response_format: SF_FORMAT
    };
    // 复刻音色按中文底子训练，念日文需显式指定语言，否则会被当中文读出来；
    // 中文（默认）不传，避免改动现有走通的参数。
    if(detectLang(text) === "ja") body.language = "ja";
    fetch(SF_BASE + "/audio/speech", {
      method:"POST",
      headers:{ "Content-Type":"application/json", "Authorization":"Bearer " + SF_KEY },
      body: JSON.stringify(body)
    })
      .then(function(res){
        if(!res.ok) throw new Error("stepfun tts HTTP " + res.status);
        return res.blob();
      })
      .then(function(blob){
        if(!sfAudio) sfAudio = new Audio();
        sfAudio.src = URL.createObjectURL(blob);
        sfAudio.play().catch(function(){ speakBrowser(text); });
      })
      .catch(function(){
        sfBroken = true; // 该 plan 不支独立 TTS → 锁死回退，避免反复请求
        if(window.console) console.warn("[pet-voice] StepFun TTS 不可用，已回退浏览器语音：", (CFG.label||""));
        try{ window.dispatchEvent(new CustomEvent('wb:pet-voice-fallback',{detail:{message:'StepFun TTS 不可用，已回退浏览器语音'}})); }catch(_){}
        speakBrowser(text);
      });
  }

  /* ---------- 队列（气泡连续来时不叠音，只播最新） ---------- */
  var pendingText = "";
  function flushPending(){
    if(!enabled || !pendingText) return;
    var t = pendingText; pendingText = "";
    (USE_STEPFUN ? speakStepfun : speakBrowser)(t);
  }

  function stop(){
    pendingText = "";
    if(window.speechSynthesis) try{ window.speechSynthesis.cancel(); }catch(_){}
    if(sfAudio){ try{ sfAudio.pause(); sfAudio.currentTime = 0; }catch(_){} }
    currentUtter = null;
  }
  function say(text, opts){
    if(!enabled || !text) return;
    opts = opts || {};
    if(opts.noVoice) return; // 纯气泡不发声（陪伴/待命提示），避免反复机械播音
    // 用户聊天是高优先级：立即打断旧的系统提示音，不进入旧队列
    if(opts.priority === "chat") stop();
    if(currentUtter || (sfAudio && !sfAudio.paused)){ pendingText = text; return; }
    (USE_STEPFUN ? speakStepfun : speakBrowser)(text);
  }

  /* ---------- 解锁 autoplay ---------- */
  function tryUnlock(){
    if(unlocked) return;
    unlocked = true;
    if(window.speechSynthesis && currentUtter) try{ window.speechSynthesis.speak(currentUtter); }catch(_){}
    flushPending();
  }
  function bindUnlock(){
    var evs = ["pointerdown","keydown","pointerup"];
    for(var i=0;i<evs.length;i++){
      document.addEventListener(evs[i], tryUnlock, { once:true, passive:true });
    }
  }

  /* ---------- 对外 ---------- */
  function toggleMute(){
    enabled = !enabled;
    if(!enabled){
      if(window.speechSynthesis) try{ window.speechSynthesis.cancel(); }catch(_){}
      if(sfAudio) try{ sfAudio.pause(); }catch(_){}
      pendingText = "";
      currentUtter = null;
    }
    savePref();
    return enabled;
  }
  function setEnabled(b){
    enabled = !!b;
    if(!enabled){
      if(window.speechSynthesis) try{ window.speechSynthesis.cancel(); }catch(_){}
      if(sfAudio) try{ sfAudio.pause(); }catch(_){}
      pendingText = ""; currentUtter = null;
    }
    savePref();
  }

  if(window.speechSynthesis){
    window.speechSynthesis.onvoiceschanged = refreshVoices;
    refreshVoices();
  }
  bindUnlock();

  window.PET_VOICE = {
    say: say,
    toggleMute: toggleMute,
    setEnabled: setEnabled,
    enabled: function(){ return enabled; },
    stop: stop
  };
})();
