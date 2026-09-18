/* ===========================================================
   网页版 Amadeus 桌宠核心逻辑 · 自包含 IIFE，不依赖主 IIFE
   - 受上游 amadeus-pet（rafiqxin/amadeus-pet，MIT）移植/启发的网页同人版
   - 开机：复用上游开机素材（logo39 + Connect/Cancel 按钮图）的 CONNECT 流程
   - 人物：真·Live2D 牧濑红莉栖（models/kurisu，Cubism2），点触反应复用上游反应目录
   - 引擎（live2d.min.js / pixi.min.js / pixi-live2d-display）按需懒加载，不拖慢首屏
   - 兜底：Live2D 引擎缺失/失败时降级内置 SVG 形象陪伴，功能不中断
   - 位置：默认贴在蕾娜(#petWidget)右侧并排折叠，蕾娜被拖走时占右下角
   =========================================================== */
(function(){
  "use strict";

  var WIDGET_RIGHT = 16, WIDGET_BOTTOM = 78, GAP = 14; // 与 pet.css 对齐

  var MOOD_IS_ANGRY = { angry:1, pissed:1, annoyed:1 };
  var MOOD_IS_SAD   = { sad:1, disappointed:1, side:1, worried:1, sided_worried:1 };
  var MOOD_IS_HAPPY = { happy:1, winking:1, pleasant:1, amused:1, sided_pleasant:1 };
  var MOOD_IS_BLUSH = { blush:1, embarrassed:1 };

  // 触摸反应：不重复轮换全部反应目录（沿用上游 touch-reactions.js 的洗牌袋策略）
  var CAT = window.AMADEUS_CATALOG || [];
  var pokeBag = [], lastPoke = '';

  var widget, el = {};
  var state = { open:false, connected:false, busy:false, loading:false, lastUserText:'' };
  var lenaShift = null; // 为给 amadeus 让位而临时挪动的蕾娜位置
  var l2d = null;       // Live2D 渲染控制器

  function $id(s){ return document.getElementById(s); }
  function AMA_BASE(){
    var s = document.currentScript && document.currentScript.tagName === "SCRIPT" ? document.currentScript : null;
    // currentScript 在模块脚本里不可用；退化为从 src 推断 / 默认 amadeus/
    var src = s && s.src ? s.src : (document.querySelector('script[src*="amadeus/amadeus-core.js"]') || {}).src;
    return src ? src.slice(0, src.lastIndexOf("/") + 1) : "amadeus/";
  }
  var BASE = AMA_BASE();

  /* ---------- 反应目录 → Live2D 表情/动作 ---------- */
  function moodVisual(mood){
    if (MOOD_IS_ANGRY[mood])  return { expression:'f03', motion:'shake' };
    if (MOOD_IS_SAD[mood])    return { expression:'f02', motion: (mood==='disappointed' ? 'shake' : null) };
    if (MOOD_IS_HAPPY[mood])  return { expression:'f04', motion:'flick_head' };
    if (MOOD_IS_BLUSH[mood])  return { expression:'f04', motion:'pinch_in' };
    return { expression:'f01', motion:null };
  }
  function motionForArea(area, mood){
    var a = String(area||'body').toLowerCase();
    if (a.includes('head')) return 'flick_head';
    if (a.includes('mouth') || a.includes('face')) return 'pinch_in';
    if (MOOD_IS_ANGRY[mood]) return 'shake';
    return 'tap_body';
  }
  function shuffle(items){
    var out = items.slice();
    for (var i = out.length - 1; i > 0; i--){ var j = Math.floor(Math.random()*(i+1)); var t = out[i]; out[i] = out[j]; out[j] = t; }
    return out;
  }
  function refillBag(){
    pokeBag = shuffle(CAT);
    if (pokeBag.length > 1 && pokeBag[pokeBag.length-1].id === lastPoke){
      var last = pokeBag.pop(); pokeBag.unshift(last);
    }
  }
  function nextReaction(area){
    if (!CAT.length){ return { zh:'…', mood:'normal', expression:'f01', motion:null }; }
    if (!pokeBag.length) refillBag();
    var entry = pokeBag.pop();
    lastPoke = entry.id;
    var vis = moodVisual(entry.mood);
    return { id:entry.id, zh:entry.zh, mood:entry.mood,
             expression:vis.expression,
             motion:(entry.mood==='disappointed' ? 'shake' : motionForArea(area, entry.mood)) };
  }

  /* ---------- 台词 ---------- */
  function pickLine(pool){
    var L = (window.AMADEUS_LINES && window.AMADEUS_LINES[pool]) ||
            (window.AMADEUS_LINES && window.AMADEUS_LINES.neutral) || ["…"];
    return L[Math.floor(Math.random()*L.length)];
  }
  function showBubble(text){
    if(!el.bubble) return;
    el.bubble.textContent = text;
    el.bubble.hidden = false;
    widget.classList.add("speaking");
    clearTimeout(el._speakT);
    el._speakT = setTimeout(function(){ widget.classList.remove("speaking"); }, 1800);
  }
  function say(pool, force){
    var now = Date.now();
    if(!force && now - (state.lastSay||0) < 7000) return;
    state.lastSay = now;
    showBubble(pickLine(pool));
  }

  /* ---------- 点触反应（连接后生效） ---------- */
  function poke(area){
    if(!state.connected || state.busy) return;
    var r = nextReaction(area);
    l2d && l2d.applyReaction(r);
    showBubble(r.zh);
    playReactionVoice(r.id);
  }
  /* 兼容旧版官方红莉栖语音素材（amadeus/voices/<id>.ogg，本地素材，不入库）。
     无该文件时静默回退到气泡台词。 */
  function playReactionVoice(id){
    if(!id || !el.audio) return;
    if(el._reactionPlaying){ try{ el._reactionPlaying.pause(); }catch(_){} }
    var a = el.audio;
    a.src = BASE + "voices/" + id + ".ogg";
    a.onerror = function(){
      if(!el._voiceWarned){el._voiceWarned=true;showBubble('语音素材未安装，当前使用文字气泡');}
    };
    el._reactionPlaying = a;
    a.oncanplay=function(){el._voiceWarned=false;};
    a.play().catch(function(){if(!el._voiceWarned){el._voiceWarned=true;showBubble('浏览器未允许自动播放，请点击角色后重试');}});
  }

  /* ---------- 对话(LLM) 与设置 ---------- */
  function llm(){ return window.AMADEUS_LLM; }
  function setSettingsStatus(msg){ if(el.setStatus) el.setStatus.textContent = msg || ""; }
  function updateCoachUI(){
    var english=llm()&&llm().getConfig().coachMode==='english';
    if(el.chat) el.chat.classList.toggle('english-coach',!!english);
    if(el.chatInput) el.chatInput.placeholder=english?'Speak English with me…':'和红莉栖聊聊…';
    if(el.coachBadge) el.coachBadge.hidden=!english;
    if(el.correctBtn) el.correctBtn.hidden=!english||!state.lastUserText;
  }
  function loadSettingsIntoForm(){
    if(!llm() || !el.setEndpoint) return;
    var c = llm().getConfig();
    el.setProvider.value = c.provider || "";
    el.setCoachMode.value = c.coachMode || "normal";
    el.setEndpoint.value = c.endpoint || "";
    el.setModel.value = c.model || "";
    el.setKey.value = "";
    var tts = c.tts || {};
    el.setTtsOn.checked = !!tts.enabled;
    el.setSpeakJa.checked = !!tts.speakJa;
    updateCoachUI();
  }
  function openSettings(){
    el.settings.hidden = false;
    loadSettingsIntoForm();
    setSettingsStatus("");
  }
  function toggleSettings(){
    var wasHidden = el.settings.hidden;
    el.settings.hidden = !wasHidden;
    if(wasHidden){ loadSettingsIntoForm(); }
    setSettingsStatus("");
  }
  function saveLlm(){
    if(!llm()) return;
    var next = {};
    var ep = el.setEndpoint.value.trim(), md = el.setModel.value.trim(), key = el.setKey.value.trim();
    if(el.setProvider.value) next.provider = el.setProvider.value;
    next.coachMode = el.setCoachMode.value === "english" ? "english" : "normal";
    if(ep) next.endpoint = ep;
    if(md) next.model = md;
    if(key) next.apiKey = key;
    next.tts = { enabled: el.setTtsOn.checked, speakJa: el.setSpeakJa.checked };
    var c = llm().setConfig(next);
    el.setKey.value = "";
    updateCoachUI();
    setSettingsStatus((c.endpoint && c.model) ? "已保存 · " + c.model : "未配置");
  }
  function testLlm(){
    if(!llm()){ setSettingsStatus("LLM 层未加载"); return; }
    setSettingsStatus("测试中…");
    llm().check().then(function(){ setSettingsStatus("连接成功 ✓"); })
      .catch(function(e){ setSettingsStatus("测试失败：" + (e && e.message || e)); });
  }
  function clearLlm(){
    if(!llm()) return;
    llm().clearConfig();
    loadSettingsIntoForm();
    el.setKey.value = "";
    setSettingsStatus("已清空本地配置");
  }
  function correctLast(){
    if(!state.lastUserText||state.chatting)return;
    el.chatInput.value='Please correct my last sentence. Give me a natural version and one short explanation: '+state.lastUserText;
    sendChat();
  }
  function sendChat(){
    if(state.chatting) return;
    var text = el.chatInput.value;
    if(!text || !text.trim()) return;
    if(!llm() || !llm().usingRemote()){
      openSettings();
      setSettingsStatus("请先在 ⚙ 里填 Endpoint / Model / API Key");
      return;
    }
    state.chatting = true;
    state.lastUserText = text.trim();
    el.chatInput.value = "";
    updateCoachUI();
    showBubble("…思考中");
    llm().chat(text)
      .then(function(reply){
        var r = llm().planReaction(reply);
        l2d && l2d.applyReaction({ expression:r.expression, motion:r.motion });
        showBubble(reply);
        if(llm().canSpeak()){
          var tts = llm().getConfig().tts || {};
          var coachEnglish = llm().getConfig().coachMode === 'english';
          var p = tts.speakJa && !coachEnglish
            ? llm().translateToJa(reply).then(function(ja){ return llm().speak(ja); })
            : llm().speak(reply);
          p.then(playAudio).catch(function(){ showBubble('语音合成失败，文字回复仍可用'); });
        }
      })
      .catch(function(e){ showBubble("连接失败：" + (e && e.message || e)); })
      .then(function(){ state.chatting = false; });
  }
  function playAudio(blob){
    if(!el.audio || !blob) return;
    var url = URL.createObjectURL(blob);
    el.audio.onended = function(){ try{ URL.revokeObjectURL(url); }catch(_){} };
    el.audio.src = url;
    el.audio.play().catch(function(){});
  }

  /* ---------- 懒加载 Live2D 引擎 ---------- */
  function loadScript(src){
    return new Promise(function(res, rej){
      var s = document.createElement("script");
      s.src = src; s.async = true;
      s.onload = res; s.onerror = function(){ rej(new Error("脚本加载失败 " + src)); };
      document.head.appendChild(s);
    });
  }
  function ensureEngine(){
    if (window.PIXI && window.PIXI.live2d && window.Live2D) return Promise.resolve(true);
    if (state._eng) return state._eng;
    state._eng = Promise.resolve()
      .then(function(){ return loadScript(BASE + "vendor/live2d.min.js"); })
      .then(function(){ return loadScript(BASE + "vendor/pixi.min.js"); })
      .then(function(){ return loadScript(BASE + "vendor/pixi-live2d-display.cubism2.js"); })
      .then(function(){ return !!(window.PIXI && window.PIXI.live2d && window.Live2D); })
      .then(function(ok){ if(!ok) state._eng = null; return ok; });
    return state._eng;
  }

  /* ---------- Live2D 渲染（移植上游 cubism2app.js，改用 UMD 全局） ---------- */
  function startLive2d(){
    var canvas = $id("amaL2d");
    var app = null, model = null, nextIdleAt = 0;
    var look = { x:0, y:0, tx:0, ty:0 }, captured = false, moved = false, downX=0, downY=0;
    var W = canvas.clientWidth || 264, H = canvas.clientHeight || 320;

    var L2D = window.PIXI.live2d.Live2DModel;
    L2D.registerTicker(window.PIXI.Ticker);

    function setParam(n, v){ try{ model.internalModel.coreModel.setParamFloat(n, v, 1); }catch(_){} }
    function refit(){
      if(!model) return;
      var s = Math.min(W/model.width, H/model.height) * 0.96;
      model.anchor.set(0.5, 0.5); model.scale.set(s);
      model.x = W/2; model.y = H/2;
    }
    function localPoint(e){
      var r = canvas.getBoundingClientRect();
      return { x:(e.clientX-r.left)*(W/Math.max(1,r.width)), y:(e.clientY-r.top)*(H/Math.max(1,r.height)) };
    }
    function fallbackArea(p){ var y=p.y/Math.max(1,H); if(y<0.40) return 'head'; if(y<0.61) return 'mouth'; return 'body'; }
    function onDown(e){ captured=true; moved=false; downX=e.clientX; downY=e.clientY; try{ canvas.setPointerCapture(e.pointerId); }catch(_){} }
    function onMove(e){
      var p = localPoint(e);
      if(captured && Math.abs(e.clientX-downX)+Math.abs(e.clientY-downY) > 10) moved = true;
      look.tx = Math.max(-1, Math.min(1, (p.x/W)*2-1));
      look.ty = Math.max(-1, Math.min(1, -((p.y/H)*2-1)));
    }
    function onUp(e){
      if(captured && !moved && model){
        var p = localPoint(e), area = false;
        try{ area = model.hitTest(p.x, p.y); }catch(_){}
        poke(String(area ? area : fallbackArea(p)).toLowerCase());
      }
      captured = false; try{ canvas.releasePointerCapture(e.pointerId); }catch(_){}
    }
    function onCancel(){ captured=false; moved=false; }
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onCancel);

    app = new window.PIXI.Application({ view:canvas, width:W, height:H, transparent:true, resolution:1, antialias:true, autoStart:true });
    canvas.style.width = "100%"; canvas.style.height = "100%";

    return L2D.from(BASE + "models/kurisu/kurisu.model.json")
      .then(function(m){
        model = m; app.stage.addChild(model);
        setTimeout(refit, 300);

        app.ticker.add(function(){
          if(!model) return;
          look.x += (look.tx-look.x)*0.12; look.y += (look.ty-look.y)*0.12;
          if(!captured){
            setParam("PARAM_ANGLE_X", look.y*30); setParam("PARAM_ANGLE_Y", look.x*30);
            setParam("PARAM_BODY_ANGLE_X", look.x*10); setParam("PARAM_EYE_BALL_X", look.x); setParam("PARAM_EYE_BALL_Y", look.y);
          }
          var mm = model.internalModel.motionManager;
          if(mm && mm.isFinished && mm.isFinished() && Date.now() > nextIdleAt){
            var defs = mm.definitions.idle || [];
            if(defs.length){ model.motion("idle", Math.floor(Math.random()*defs.length)); nextIdleAt = Date.now() + 3000 + Math.random()*4000; }
          }
        });

        return {
          dispose: function(){
            try{ model.destroy(); }catch(_){}
            try{ app.destroy(true); }catch(_){}
            canvas.removeEventListener("pointerdown", onDown);
            canvas.removeEventListener("pointermove", onMove);
            canvas.removeEventListener("pointerup", onUp);
            canvas.removeEventListener("pointercancel", onCancel);
          },
          applyReaction: function(r){
            try{ model.expression(String(r.expression||"f01").toLowerCase()); }catch(_){}
            var g = String(r.motion||"").toLowerCase();
            var mm = model.internalModel.motionManager;
            var defs = mm && g ? (mm.definitions[g] || []) : [];
            if(defs.length){ model.motion(g, Math.floor(Math.random()*defs.length), 3); }
          }
        };
      });
  }

  /* ---------- 开机流程 ---------- */
  function setBootStatus(kind){
    var st = el.bootStatus;
    if(!st) return;
    st.textContent = kind === "connect" ? "Connecting…" : "Connect to Kurisu?";
  }
  function connect(){
    if(state.connected || state.loading) return;
    state.loading = true;
    setBootStatus("connect");
    ensureEngine().then(function(ok){
      if(!ok){ throw new Error("Live2D 引擎不可用"); }
      return startLive2d();
    }).then(function(ctl){
      l2d = ctl;
      state.connected = true;
      widget.classList.add("connected");
      el.boot.hidden = true;
      el.l2dWrap.hidden = false;
      el.chat.hidden = false;
      showBubble("你好，我是网页版 Amadeus，红莉栖的电子分身");
      say("greet", false);
    }).catch(function(err){
      console.warn("[amadeus] Live2D 降级为 SVG 陪伴模式", err);
      el.boot.hidden = true;
      el.avatarWrap.hidden = false;
      widget.classList.add("connected");
      el.chat.hidden = false;
      showBubble("Live2D 引擎不可用，已降级为 SVG 陪伴模式");
    }).then(function(){
      state.loading = false;
    });
  }
  function cancelConnection(){
    if(state.connected) return;
    togglePet();
  }

  /* ---------- 构建浮层 DOM ---------- */
  function build(){
    widget = document.createElement("div");
    widget.id = "amadeusWidget";
    widget.hidden = true;
    widget.innerHTML =
      '<div class="ama-header" id="amaHeader">'+
        '<span class="ama-title"><img class="ama-logo" id="amaLogo" src="" alt="" draggable="false">Amadeus<span class="ama-tsg">EL PSY CONGROO</span></span>'+
        '<div class="ama-actions">'+
          '<button type="button" class="ama-btn" id="amaSettingsBtn" aria-label="设置 LLM">&#9881;</button>'+
          '<button type="button" class="ama-btn" id="amaCloseBtn" aria-label="收起桌宠">—</button>'+
        '</div>'+
      '</div>'+
      '<div class="ama-stage" id="amaStage">'+
        '<div class="ama-boot" id="amaBoot">'+
          '<img class="ama-boot-logo" src="'+BASE+'assets/boot/logo39.png" alt="Amadeus" draggable="false">'+
          '<div class="ama-boot-status" id="amaBootStatus">Connect to Kurisu?</div>'+
          '<div class="ama-boot-btns">'+
            '<button type="button" class="ama-boot-btn" id="amaConnect">'+
              '<img class="n" src="'+BASE+'assets/boot/connect_unselect.png" alt=""><img class="s" src="'+BASE+'assets/boot/connect_select.png" alt="">'+
            '</button>'+
            '<button type="button" class="ama-boot-btn" id="amaCancel">'+
              '<img class="n" src="'+BASE+'assets/boot/cancel_unselect.png" alt=""><img class="s" src="'+BASE+'assets/boot/cancel_select.png" alt="">'+
            '</button>'+
          '</div>'+
        '</div>'+
        '<div class="ama-l2d-wrap" id="amaL2dWrap" hidden>'+
          '<canvas id="amaL2d"></canvas>'+
        '</div>'+
        '<div class="ama-avatar ama-avatar-fallback" id="amaAvatarWrap" hidden>'+ (window.__AMA_SVG || svgFallback()) +'</div>'+
        '<div class="ama-bubble" id="amaBubble" hidden></div>'+
      '</div>'+
      '<div class="ama-settings" id="amaSettings" hidden>'+
        '<div class="ama-set-row"><label>对话模式</label><select id="amaSetCoachMode">'+
          '<option value="normal">红莉栖闲聊</option><option value="english">English Coach</option>'+
        '</select></div>'+
        '<div class="ama-set-hint">English Coach：优先用英语回复，轻量纠错并追问。</div>'+
        '<div class="ama-set-row"><label>Provider</label><select id="amaSetProvider">'+
          '<option value="">— 选择 —</option><option value="stepfun">StepFun(语音)</option><option value="deepseek">DeepSeek</option>'+
        '</select></div>'+
        '<div class="ama-set-row"><label>Endpoint</label><input id="amaSetEndpoint" placeholder="https://api.stepfun.com/v1" spellcheck="false"></div>'+
        '<div class="ama-set-row"><label>Model</label><input id="amaSetModel" placeholder="step-audio-2-mini" spellcheck="false"></div>'+
        '<div class="ama-set-row"><label>API Key</label><input id="amaSetKey" type="password" placeholder="sk-..." autocomplete="off"></div>'+
        '<div class="ama-set-row"><label>语音回复</label><label class="ama-check"><input type="checkbox" id="amaTtsOn"> 合成朗读</label></div>'+
        '<div class="ama-set-row"><label>说日语</label><label class="ama-check"><input type="checkbox" id="amaSpeakJa"> 语音用日语</label></div>'+
        '<div class="ama-set-actions">'+
          '<button type="button" class="ama-btn" id="amaSaveLlm">保存</button>'+
          '<button type="button" class="ama-btn" id="amaTestLlm">测试</button>'+
          '<button type="button" class="ama-btn" id="amaClearLlm">清空</button>'+
        '</div>'+
        '<div class="ama-set-status" id="amaSetStatus"></div>'+
      '</div>'+
      '<div class="ama-chat" id="amaChat" hidden>'+
        '<div class="ama-coach-badge" id="amaCoachBadge" hidden>English Coach</div>'+
        '<div class="ama-chat-row"><input id="amaChatInput" type="text" placeholder="和红莉栖聊聊…" autocomplete="off">'+
        '<button type="button" class="ama-btn" id="amaChatSend">发送</button></div>'+
        '<button type="button" class="ama-correct" id="amaCorrect" hidden>纠正上一句</button>'+
      '</div>'+
      '<audio id="amaAudio"></audio>'+
      '<div class="ama-foot">网页版 · 非官方同人 · 移植自 <b>rafiqxin/amadeus-pet</b></div>';

    el.logo = widget.querySelector("#amaLogo");
    el.logo.onload = function(){ el.logo.style.opacity = 1; };
    el.logo.src = BASE + "assets/amadeus-icon.png";

    el.body = widget.querySelector(".ama-stage");
    el.avatar = widget.querySelector("#amaAvatarWrap .ama-svg-body");
    el.bubble = $id("amaBubble") || widget.querySelector("#amaBubble");
    el.header = widget.querySelector("#amaHeader");
    el.closeBtn = widget.querySelector("#amaCloseBtn");
    el.settingsBtn = widget.querySelector("#amaSettingsBtn");
    el.boot = widget.querySelector("#amaBoot");
    el.bootStatus = widget.querySelector("#amaBootStatus");
    el.connectBtn = widget.querySelector("#amaConnect");
    el.cancelBtn = widget.querySelector("#amaCancel");
    el.l2dWrap = widget.querySelector("#amaL2dWrap");
    el.avatarWrap = widget.querySelector("#amaAvatarWrap");
    el.stage = widget.querySelector("#amaStage");
    el.bubble = widget.querySelector("#amaBubble");
    el.canvas = widget.querySelector("#amaL2d");
    el.settings = widget.querySelector("#amaSettings");
    el.setCoachMode = widget.querySelector("#amaSetCoachMode");
    el.setProvider = widget.querySelector("#amaSetProvider");
    el.setEndpoint = widget.querySelector("#amaSetEndpoint");
    el.setModel = widget.querySelector("#amaSetModel");
    el.setKey = widget.querySelector("#amaSetKey");
    el.setTtsOn = widget.querySelector("#amaTtsOn");
    el.setSpeakJa = widget.querySelector("#amaSpeakJa");
    el.setStatus = widget.querySelector("#amaSetStatus");
    el.saveLlm = widget.querySelector("#amaSaveLlm");
    el.testLlm = widget.querySelector("#amaTestLlm");
    el.clearLlm = widget.querySelector("#amaClearLlm");
    el.chat = widget.querySelector("#amaChat");
    el.coachBadge = widget.querySelector("#amaCoachBadge");
    el.correctBtn = widget.querySelector("#amaCorrect");
    el.chatInput = widget.querySelector("#amaChatInput");
    el.chatSend = widget.querySelector("#amaChatSend");
    el.audio = widget.querySelector("#amaAudio");
    document.body.appendChild(widget);

    el.connectBtn.addEventListener("click", connect);
    el.cancelBtn.addEventListener("click", cancelConnection);
    el.settingsBtn.addEventListener("click", function(){ toggleSettings(); });
    el.setProvider.addEventListener("change", function(){
      var pv = el.setProvider.value;
      if(!pv) return;
      llm().applyPreset(pv);
      loadSettingsIntoForm();
      setSettingsStatus("已切换 " + (pv === "stepfun" ? "StepFun(语音)" : "DeepSeek"));
    });
    el.saveLlm.addEventListener("click", saveLlm);
    el.testLlm.addEventListener("click", function(){ testLlm(); });
    el.clearLlm.addEventListener("click", clearLlm);
    el.chatSend.addEventListener("click", sendChat);
    if(el.correctBtn) el.correctBtn.addEventListener("click", correctLast);
    el.chatInput.addEventListener("keydown", function(e){ if(e.key === "Enter") sendChat(); });
    updateCoachUI();
    el.closeBtn.addEventListener("click", togglePet);
    setupDrag();
  }

  /* ---------- SVG 兜底形象（Live2D 不可用时的陪伴态） ---------- */
  function svgFallback(){
    return '<svg class="ama-svg-body" data-mood="neutral" viewBox="0 0 120 120" width="126" height="126" aria-hidden="true">'+
      '<defs>'+
        '<radialGradient id="amaFbBg" cx="0.5" cy="0.4" r="0.75">'+
          '<stop offset="0" stop-color="#12303a"/><stop offset="1" stop-color="#061017"/>'+
        '</radialGradient>'+
        '<radialGradient id="amaFbGlow" cx="0.5" cy="0.5" r="0.5">'+
          '<stop offset="0" stop-color="rgba(124,240,199,.55)"/><stop offset="1" stop-color="rgba(124,240,199,0)"/>'+
        '</radialGradient>'+
      '</defs>'+
      '<circle cx="60" cy="60" r="58" fill="url(#amaFbBg)"/>'+
      '<circle cx="60" cy="60" r="42" fill="url(#amaFbGlow)"/>'+
      '<path d="M30 118 L30 96 Q30 86 40 84 L80 84 Q90 86 90 96 L90 118 Z" fill="#EEF1F4"/>'+
      '<path d="M32 56 Q28 18 60 14 Q92 18 88 56 Q90 80 78 92 Q74 66 60 64 Q46 66 42 92 Q30 80 32 56 Z" fill="#5f3d22"/>'+
      '<ellipse cx="60" cy="58" rx="24" ry="27" fill="#f6dcc2"/>'+
      '<path d="M34 54 Q32 24 60 20 Q88 24 86 54 Q84 40 76 38 L72 26 L64 36 Q60 33 56 36 L48 26 L44 38 Q36 40 34 54 Z" fill="#6b4428"/>'+
      '<circle cx="49" cy="58" r="3.4" fill="#3a2a20"/><circle cx="71" cy="58" r="3.4" fill="#3a2a20"/>'+
      '<circle cx="50" cy="56.8" r="1.1" fill="#fff"/><circle cx="72" cy="56.8" r="1.1" fill="#fff"/>'+
      '<path d="M52 74 Q60 77 68 74" stroke="#a06048" stroke-width="2" fill="none" stroke-linecap="round"/>'+
      '<ellipse cx="43" cy="66" rx="4" ry="2.4" fill="rgba(255,90,131,.5)"/><ellipse cx="77" cy="66" rx="4" ry="2.4" fill="rgba(255,90,131,.5)"/>'+
    '</svg>';
  }

  /* ---------- 开合 ---------- */
  function togglePet(){
    state.open = !state.open;
    widget.hidden = !state.open;
    if(state.open){
      var tb = $id("tabbar"), nm = $id("navMore");
      if(tb) tb.classList.remove("expanded");
      if(nm) nm.setAttribute("aria-expanded","false");
      arrange();
      // 已连接则说问候；否则停在开机界面
      if(state.connected){ say("greet", true); }
      if(!state.companionTimer){
        state.companionTimer = setInterval(function(){ say("neutral", false); }, 18000);
      }
    } else {
      unarrange();
      if(state.companionTimer){ clearInterval(state.companionTimer); state.companionTimer = null; }
    }
  }

  /* ---------- 位置：贴在蕾娜右侧并排；蕾娜被拖走时自己占右下角 ---------- */
  function arrange(){
    widget.style.right = "auto"; widget.style.left = "auto";
    widget.style.bottom = WIDGET_BOTTOM + "px"; widget.style.top = "auto";
    var lena = $id("petWidget");
    if(lena && !lena.hidden){
      var r = lena.getBoundingClientRect();
      var w = widget.offsetWidth || 264;
      var nearRight = (window.innerWidth - r.right) < 80;
      if(nearRight){
        if(!lenaShift){
          lenaShift = {
            right: lena.style.right || WIDGET_RIGHT + "px",
            left: lena.style.left || "auto",
            bottom: lena.style.bottom || WIDGET_BOTTOM + "px"
          };
        }
        lena.style.right = (WIDGET_RIGHT + w + GAP) + "px";
        lena.style.left = "auto";
        lena.style.bottom = WIDGET_BOTTOM + "px";
        widget.style.right = WIDGET_RIGHT + "px";
      } else {
        widget.style.right = WIDGET_RIGHT + "px";
      }
    } else {
      widget.style.right = WIDGET_RIGHT + "px";
    }
  }
  function unarrange(){
    if(lenaShift){
      var lena = $id("petWidget");
      if(lena){
        lena.style.right = lenaShift.right;
        lena.style.left = lenaShift.left;
        lena.style.bottom = lenaShift.bottom;
      }
      lenaShift = null;
    }
  }
  /* 蕾娜由 pet-core.js 独立控制，用 MutationObserver 跟随其开合/移动 */
  function watchLena(){
    var lena = $id("petWidget");
    if(!lena) return;
    var mo = new MutationObserver(function(){ if(state.open) arrange(); });
    mo.observe(lena, { attributes:true, attributeFilter:["hidden","style"] });
    window.addEventListener("resize", function(){ if(state.open) arrange(); });
  }

  /* ---------- 拖拽 ---------- */
  function setupDrag(){
    var off = {x:0,y:0};
    el.header.addEventListener("pointerdown", function(e){
      if(e.target.closest(".ama-btn")) return;
      widget.classList.add("dragging");
      var r = widget.getBoundingClientRect();
      off.x = e.clientX - r.left; off.y = e.clientY - r.top;
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
      try{ localStorage.setItem("wb_ama_pos", JSON.stringify({left:widget.style.left, top:widget.style.top})); }catch(_){}
    });
  }

  /* ---------- 入口绑定 ---------- */
  function bindNav(){
    var nav = $id("navAmadeus");
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
    watchLena();
  }
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();