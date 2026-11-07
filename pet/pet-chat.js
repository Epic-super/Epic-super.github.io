/* ===========================================================
   蕾娜对话层 · 自包含，挂到 window.PET_CHAT
   - 文字对话：发消息 → StepFun 对话模型(step-3.7-flash) 生成回复 → 蕾娜音色语音播报
   - 语音对话：按住/点 🎤 说话 → 麦克风录 PCM → 转 16k WAV → StepFun ASR 转写 → 再进对话
   - 中/日语皆可（对话模型按用户语言回复，TTS 用复刻的蕾娜音色念出）
   - 依赖 pet/pet-voice-config.js 里的 apiKey / baseUrl（与语音层共用）
   =========================================================== */
(function(){
  "use strict";

  var CFG = window.PET_VOICE_CONFIG || {};
  var KEY  = CFG.apiKey || "";
  var BASE = CFG.baseUrl || "https://api.stepfun.com/step_plan/v1";
  var CHAT_MODEL = "step-3.7-flash";      // 旗舰对话模型
  var ASR_MODEL  = "stepaudio-2.5-asr";   // 语音输入模型

  var SYSTEM = "你是《八六战队》(EIGHTY SIX) 中的蕾娜（レーナ / 芙拉提雅·蕾娜·怀特），"+
    "一位年轻、可靠、带点俏皮的女指挥官。你在陪伴用户备考、学习、工作。"+
    "语气温柔坚定，偶尔有点小傲娇。用简短的话回复（3句以内，10-30字左右）。"+
    "用户用什么语言你就用什么语言（中/日语皆可）。适当鼓励，不要长篇大论，不要列清单，除非用户要求。";

  var widget = null, el = {};
  var history = [];
  var rec = { active:false, stream:null, ctx:null, src:null, proc:null, samples:[] };

  function $id(s){ return document.getElementById(s); }

  /* ---------- 请求 ---------- */
  function post(path, body, accept){
    return fetch(BASE + path, {
      method:"POST",
      headers:{ "Content-Type":"application/json", "Authorization":"Bearer " + KEY, "Accept": accept || "application/json" },
      body: JSON.stringify(body)
    }).then(function(res){
      if(!res.ok) return res.text().then(function(t){ throw new Error("HTTP "+res.status+": "+t.slice(0,120)); });
      return res.text();
    });
  }
  function parseTranscript(sse){
    var lines = sse.split("\n");
    for (var i=0;i<lines.length;i++){
      if (lines[i].indexOf("data:")===0){
        try {
          var j = JSON.parse(lines[i].slice(5).trim());
          if (j.type === "transcript.text.done" && j.text) return j.text;
        } catch(_){}
      }
    }
    return "";
  }

  /* ---------- 音频：Float32(单声道) → 16k 16bit WAV ---------- */
  function writeStr(dv, off, s){ for(var i=0;i<s.length;i++) dv.setUint8(off+i, s.charCodeAt(i)); }
  function floatTo16kPcmWav(float32, sampleRate){
    var target = 16000;
    var n = Math.ceil(float32.length * target / sampleRate);
    var buf = new ArrayBuffer(44 + n*2);
    var dv = new DataView(buf);
    writeStr(dv, 0, "RIFF"); dv.setUint32(4, 36+n*2, true); writeStr(dv, 8, "WAVE");
    writeStr(dv, 12, "fmt "); dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 1, true);
    dv.setUint32(24, target, true); dv.setUint32(28, target*2, true); dv.setUint16(32, 2, true); dv.setUint16(34, 16, true);
    writeStr(dv, 36, "data"); dv.setUint32(40, n*2, true);
    var o = 44;
    for (var i=0;i<n;i++,o+=2){
      var sIdx = i * sampleRate / target;
      var i0 = Math.floor(sIdx), i1 = Math.min(i0+1, float32.length-1), frac = sIdx - i0;
      var s = (float32[i0]*(1-frac) + float32[i1]*frac) || 0;
      s = Math.max(-1, Math.min(1, s));
      dv.setInt16(o, s < 0 ? s*0x8000 : s*0x7FFF, true);
    }
    return buf;
  }
  function arrBufToB64(buf){
    var bytes = new Uint8Array(buf), bin = "", CH = 0x8000;
    for (var i=0;i<bytes.length;i+=CH) bin += String.fromCharCode.apply(null, bytes.subarray(i, i+CH));
    return btoa(bin);
  }

  /* ---------- 对话 ---------- */
  function buildReply(pendingEl){
    window.PET_CHAT_BUSY = true;
    var msgs = [{ role:"system", content:SYSTEM }].concat(history.slice(-8));
    post("/chat/completions", { model:CHAT_MODEL, messages:msgs, stream:false })
      .then(function(raw){
        var j = JSON.parse(raw);
        var reply = (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || "嗯，我在听。";
        history.push({ role:"assistant", content:reply });
        if(history.length > 30) history = history.slice(-30);
        setMsgText(pendingEl, reply);
        window.PET_CHAT_BUSY = false;
        if(window.PET_VOICE) window.PET_VOICE.say(reply, {priority:"chat"});
      })
      .catch(function(e){
        window.PET_CHAT_BUSY = false;
        setMsgText(pendingEl, "（连接出错：" + (e.message||e) + "）");
      });
  }
  function sendText(raw){
    var text = (raw||"").trim();
    if(!text) return;
    if(!KEY){ addMsg("bot", "（未配置 StepFun key，先填 pet-voice-config.js 才能对话）"); return; }
    addMsg("user", text);
    history.push({ role:"user", content:text });
    if(history.length > 30) history = history.slice(-30);
    buildReply(addMsg("bot", "…"));
  }

  /* ---------- 麦克风语音输入 ---------- */
  function toggleMic(){
    if(rec.active) stopRec(); else startRec();
  }
  function startRec(){
    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
      addMsg("bot", "（此环境不支持麦克风，需用 localhost 或 https 打开）"); return;
    }
    navigator.mediaDevices.getUserMedia({ audio:true }).then(function(stream){
      rec.stream = stream;
      rec.ctx = new (window.AudioContext || window.webkitAudioContext)();
      rec.src = rec.ctx.createMediaStreamSource(stream);
      rec.proc = rec.ctx.createScriptProcessor(4096, 1, 1);
      rec.samples = [];
      rec.proc.onaudioprocess = function(e){
        var ch = e.inputBuffer.getChannelData(0);
        for(var i=0;i<ch.length;i++) rec.samples.push(ch[i]);
      };
      rec.src.connect(rec.proc); rec.proc.connect(rec.ctx.destination);
      rec.active = true;
      setMicUI(true);
    }).catch(function(){ addMsg("bot", "（麦克风授权失败）"); });
  }
  function stopRec(){
    if(!rec.active) return;
    rec.active = false; setMicUI(false);
    var sr = rec.ctx ? rec.ctx.sampleRate : 16000;
    var samples = rec.samples.slice();
    try{ rec.proc && rec.proc.disconnect(); rec.src && rec.src.disconnect(); }catch(_){}
    try{ rec.stream && rec.stream.getTracks().forEach(function(t){ t.stop(); }); }catch(_){}
    try{ rec.ctx && rec.ctx.close(); }catch(_){}
    rec = { active:false, stream:null, ctx:null, src:null, proc:null, samples:[] };
    if(!samples.length){ addMsg("bot", "（没有录到声音，再说一遍？）"); return; }
    var float32 = new Float32Array(samples.length); float32.set(samples);
    var wav = floatTo16kPcmWav(float32, sr);
    var pending = addMsg("user", "（语音…正在识别）");
    post("/audio/asr/sse", {
      audio:{ data: arrBufToB64(wav), input:{
        transcription:{ model:ASR_MODEL, language:"auto", full_rerun_on_commit:true, enable_itn:true },
        format:{ type:"wav", rate:16000, bits:16, channel:1 } } }
    }, "text/event-stream")
      .then(function(sse){
        var transcript = parseTranscript(sse);
        if(!transcript){ setMsgText(pending, "（没听清，再说一遍？）"); return; }
        setMsgText(pending, "🎤 " + transcript);
        history.push({ role:"user", content: transcript });
        if(history.length > 30) history = history.slice(-30);
        buildReply(addMsg("bot", "…"));
      })
      .catch(function(e){ setMsgText(pending, "（语音识别出错：" + (e.message||e) + "）"); });
  }
  function setMicUI(on){
    if(!el.mic) return;
    el.mic.textContent = on ? "⏹" : "🎤";
    if(on) el.mic.classList.add("on"); else el.mic.classList.remove("on");
  }

  /* ---------- 消息展示 ---------- */
  function addMsg(role, text){
    var d = document.createElement("div");
    d.className = "pet-chat-msg " + role;
    d.textContent = text;
    el.msgs.appendChild(d);
    el.msgs.scrollTop = el.msgs.scrollHeight;
    return d;
  }
  function setMsgText(node, text){ if(node) node.textContent = text; }

  /* ---------- 构建聊天面板 ---------- */
  function build(){
    widget = $id("petWidget");
    if(!widget) return;
    var panel = document.createElement("div");
    panel.className = "pet-chat";
    panel.innerHTML =
      '<div class="pet-chat-msgs" id="petChatMsgs"></div>'+
      '<div class="pet-chat-input">'+
        '<button type="button" class="pet-btn pet-mic" id="petChatMic" aria-label="按住说话">🎤</button>'+
        '<textarea id="petChatText" rows="1" placeholder="发消息，或点🎤说话"></textarea>'+
        '<button type="button" class="pet-btn pet-send" id="petChatSend">发送</button>'+
      '</div>';
    widget.appendChild(panel);
    el.msgs = $id("petChatMsgs");
    el.text = $id("petChatText");
    el.send = $id("petChatSend");
    el.mic  = $id("petChatMic");
    if(!el.msgs || !el.text || !el.send || !el.mic) return;

    el.send.addEventListener("click", function(){ sendText(el.text.value); el.text.value=""; });
    el.mic.addEventListener("click", function(e){ e.stopPropagation(); toggleMic(); });
    el.text.addEventListener("keydown", function(e){
      if(e.key === "Enter" && !e.shiftKey){ e.preventDefault(); sendText(el.text.value); el.text.value=""; }
    });
  }

  function init(){
    build();
  }
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.PET_CHAT = {
    send: sendText,
    build: build
  };
})();