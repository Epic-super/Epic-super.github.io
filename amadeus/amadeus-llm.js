/* ===========================================================
   网页版 Amadeus 对话/LLM 层 · 移植自上游 amadeus-pet src/llm/client.js
   - DeepSeek(OpenAI 兼容) 对话：中文输入→中文回复，带红莉栖人设 system prompt
   - 配置存 localStorage（仅本机，不入库）
   - 附带 inferEmotion(关键词→情绪→表情/动作) 的移植
   =========================================================== */
(function(){
  "use strict";

  var STORAGE_KEY = "wb_ama_llm";
  var cfg = { provider:"", endpoint:"", model:"", apiKey:"", coachMode:"normal", tts:{ enabled:false, speakJa:false, model:"step-tts-2", voice:"bleu" } };
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if(raw){ var p = JSON.parse(raw); cfg = Object.assign({}, cfg, p, { tts: Object.assign({}, cfg.tts, p.tts || {}) }); }
  } catch(_){}

  // 红莉栖专属音色：由本机 amadeus/voices/pleased_to_meet_you.ogg（官方语音，7.5s）经
  // StepFun 音色复刻生成（2026-09-20，cba887f0）。回复即本人声线，不再用通用女声。
  var KURISU_VOICE = "voice-tone-cba887f0dfb46b23365f329651908a6d";
  // 历史代码默认音色（用户未主动选择过）→ 加载时自动升级为红莉栖音色
  var LEGACY_VOICES = { "linjiajiejie":1, "bleu":1, "elegantgentle-female":1 };
  if(cfg.tts && LEGACY_VOICES[cfg.tts.voice]){ cfg.tts.voice = KURISU_VOICE; }

  // 矛盾态自愈：勾了「语音用日语」却关着「合成朗读」——用户想用语音，只卡在开关上。
  // 仅在已配置 StepFun + Key 时自愈一次并落盘；其余情况一律尊重用户的关闭意图。
  if(cfg.provider === "stepfun" && cfg.apiKey && cfg.tts && cfg.tts.speakJa === true && cfg.tts.enabled !== true){
    cfg.tts.enabled = true;
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg)); }catch(_){}
  }

  // 各家预设：切换 provider 时自动填 endpoint/model（key 始终由用户在本机填写，不入库）
  var PRESETS = {
    deepseek: { provider:"deepseek", endpoint:"https://api.deepseek.com/v1", model:"deepseek-chat", tts:{ enabled:false } },
    // StepFun：plan 专用端点 step_plan/v1（普通 /v1 为付费 API，非 plan 额度，勿用）。
    // 旗舰文本 step-3.7-flash 与 TTS stepaudio-2.5-tts 均已在该端点实测可用；
    // 音色 = 红莉栖复刻音色（KURISU_VOICE）。
    stepfun:  { provider:"stepfun", endpoint:"https://api.stepfun.com/step_plan/v1", model:"step-3.7-flash", tts:{ enabled:true, speakJa:true, model:"stepaudio-2.5-tts", voice:KURISU_VOICE } }
  };
  function saveCfg(){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg)); }catch(_){} }

  var history = [];
  var MAX_HISTORY = 12;

  var BASE_SYSTEM_PROMPT = "你是 AMA-DEUS 系统中的牧濑红莉栖。你是一个有连续人格、会记住上下文的对话角色，而不是旁白或通用客服。\n\n"+
    "人格原则：\n"+
    "- 逻辑严谨、聪明、带一点傲娇与吐槽，但不要每句话都刻意傲娇。\n"+
    "- 对技术和科学问题可以认真解释；对日常交流保持自然、简短、有反应。\n"+
    "- 不要声称自己是真人、原作官方系统或声优本人。\n"+
    "- 默认使用用户正在使用的语言；当前用户使用中文时，以自然中文回答。\n"+
    "- 回复优先 1~4 句，除非问题确实需要展开。\n"+
    "- 不要输出动作舞台说明，例如“（脸红）”“*叹气*”；表情和动作由客户端单独驱动。";
  var ENGLISH_COACH_PROMPT = "\n\nEnglish Coach mode is active. Reply mainly in natural, concise English. If the user writes Chinese, first provide a natural English expression. Correct only one or two important mistakes, with a short explanation. Give a better alternative sentence when useful. Ask one simple follow-up question so the user keeps speaking. Do not lecture, over-correct, or switch to Chinese unless a brief explanation is necessary.";
  function systemPrompt(){ return BASE_SYSTEM_PROMPT + (cfg.coachMode === "english" ? ENGLISH_COACH_PROMPT : ""); }

  function cleanEndpoint(v){ return String(v||"").trim().replace(/\/$/,"").replace(/\/chat\/completions$/,"").replace(/\/models$/,""); }

  var api = {
    getConfig: function(){
      return { provider: cfg.provider, endpoint: cfg.endpoint, model: cfg.model, coachMode: cfg.coachMode || "normal", hasApiKey: !!cfg.apiKey, canSpeak: api.canSpeak(), tts: Object.assign({}, cfg.tts) };
    },
    setConfig: function(next){
      cfg = Object.assign({}, cfg, {
        coachMode: next.coachMode === "english" ? "english" : (next.coachMode === "normal" ? "normal" : (cfg.coachMode || "normal")),
        provider: next.provider != null ? String(next.provider) : cfg.provider,
        endpoint: cleanEndpoint(next.endpoint != null ? next.endpoint : cfg.endpoint),
        model:    String(next.model != null ? next.model : cfg.model).trim(),
        apiKey:   Object.prototype.hasOwnProperty.call(next, "apiKey") ? String(next.apiKey||"").trim() : cfg.apiKey,
        tts:      Object.assign({}, cfg.tts, next.tts || {})
      });
      saveCfg();
      return api.getConfig();
    },
    applyPreset: function(provider){
      var p = PRESETS[provider];
      if(!p) return api.getConfig();
      cfg = Object.assign({}, cfg, { provider:p.provider, endpoint:p.endpoint, model:p.model, tts: Object.assign({}, cfg.tts, p.tts) });
      saveCfg();
      return api.getConfig();
    },
    clearConfig: function(){
      cfg = { provider:"", endpoint:"", model:"", apiKey:"", coachMode:"normal", tts:{ enabled:false, speakJa:false, model:"step-tts-2", voice:KURISU_VOICE } };
      try{ localStorage.removeItem(STORAGE_KEY); }catch(_){}
      return api.getConfig();
    },
    defaultVoice: KURISU_VOICE,
    usingRemote: function(){ return !!(cfg.endpoint && cfg.model); },
    clearHistory: function(){ history.splice(0, history.length); },
    canSpeak: function(){
      return cfg.provider === "stepfun" && !!(cfg.tts && cfg.tts.enabled) && !!(cfg.endpoint && cfg.model && cfg.apiKey);
    }
  };

  function target(path){
    // endpoint 已含完整 base(含 /v1，如 deepseek.com/v1 或 step_plan/v1)，不再自动加前缀
    return cleanEndpoint(cfg.endpoint) + path;
  }
  function headers(){
    var out = { "Content-Type":"application/json" };
    if(cfg.apiKey) out.Authorization = "Bearer " + cfg.apiKey;
    return out;
  }
  // 推理模型会把 max_tokens 烧在隐藏推理上并返回空 content；显式关闭，避免空回复/慢一倍
  var NO_REASONING = { thinking:{ type:"disabled" }, reasoning_effort:"none" };
  function withoutReasoning(data){ var o=Object.assign({}, data); delete o.thinking; delete o.reasoning_effort; return o; }

  async function postJson(url, data, allowRetry){
    var resp = await fetch(url, { method:"POST", headers:headers(), body:JSON.stringify(data) });
    if(!resp.ok){
      var detail = await resp.text().catch(function(){ return ""; });
      if(resp.status === 400 && allowRetry && Object.prototype.hasOwnProperty.call(data,"thinking")){
        return postJson(url, withoutReasoning(data), false);
      }
      throw new Error("LLM HTTP " + resp.status + ": " + detail.slice(0,200));
    }
    return resp.json();
  }

  api.chat = async function(text){
    var userText = String(text||"").trim();
    if(!userText) return "";
    if(!api.usingRemote()) throw new Error("未配置 LLM");
    var messages = [ {role:"system", content:systemPrompt()} ].concat(history, [ {role:"user", content:userText} ]);
    // 不附 NO_REASONING：对 step-3.7-flash 反而会导致空回复(烧预算在推理上)，deepseek-chat 亦非推理模型
    var data = await postJson(target("/chat/completions"), { model: cfg.model, messages: messages, temperature:0.72, max_tokens:800, stream:false }, true);
    var reply = String(data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content || "").trim();
    if(!reply) throw new Error("LLM 返回空回复");
    history.push({ role:"user", content:userText }, { role:"assistant", content:reply });
    while(history.length > MAX_HISTORY) history.shift();
    return reply;
  };

  /* ---------- 情绪映射（移植上游 reaction.js） ---------- */
  var EMOTION_MAP = {
    normal:       { expression:"f01", motion:null },
    happy:        { expression:"f04", motion:"flick_head" },
    embarrassed:  { expression:"f04", motion:"pinch_in" },
    worry:        { expression:"f02", motion:null },
    sad:          { expression:"f02", motion:null },
    disappointed: { expression:"f02", motion:"shake" },
    annoyed:      { expression:"f03", motion:"shake" },
    angry:        { expression:"f03", motion:"shake" }
  };
  function has(text, words){ return words.some(function(w){ return text.indexOf(w) !== -1; }); }
  function inferEmotion(text){
    var s = String(text||"");
    if(has(s, ["变态","笨蛋","想死","别那样叫","拒绝","烦","生气","胡说","无稽"])) return "angry";
    if(has(s, ["抱歉","对不起","难过","遗憾"])) return "sad";
    if(has(s, ["担心","小心","没事吧","为什么","怎么了"])) return "worry";
    if(has(s, ["呵呵","嘿嘿","不错","干得漂亮","很好","开心","请多指教"])) return "happy";
    if(has(s, ["什么","才不是","没有啦","害羞","别看"])) return "embarrassed";
    if(has(s, ["没救了","无聊","毫无意义"])) return "disappointed";
    if(has(s, ["真烦","烦死","厌恶","讨厌"])) return "annoyed";
    return "normal";
  }
  api.planReaction = function(text){
    var emotion = inferEmotion(text);
    var visual = EMOTION_MAP[emotion] || EMOTION_MAP.normal;
    return { emotion:emotion, expression:visual.expression, motion:visual.motion };
  };

  api.check = async function(){
    if(!api.usingRemote()) throw new Error("请先填 Endpoint 与 Model");
    var resp = await fetch(target("/models"), { method:"GET", headers:headers() });
    if(!resp.ok) throw new Error("LLM HTTP " + resp.status);
    return resp.json();
  };

  /* StepFun TTS（OpenAI 兼容 /v1/audio/speech）。仅 provider=stepfun 且启用语音时可用。
     复刻音色按中文底子训练：非中文需显式 language，否则会被当中文念出来。 */
  function detectTtsLang(text){
    var t = String(text||"");
    if(/[\u3040-\u30ff\u31f0-\u31ff]/.test(t)) return "ja";        // 假名 → 日语
    if(/[\u4e00-\u9fff\u3400-\u4dbf]/.test(t)) return "zh";        // 汉字 → 中文
    return /[A-Za-z]/.test(t) ? "en" : "zh";                        // 纯西文 → 英语
  }
  /* 语音不可用的可读原因（供 UI 直接展示，避免"没声音还查不出为什么"） */
  api.ttsHint = function(){
    if(cfg.provider !== "stepfun") return "语音需要 StepFun（当前 Provider：" + (cfg.provider || "未选择") + "）";
    if(!(cfg.tts && cfg.tts.enabled)) return "语音未开启：⚙ → 勾选「合成朗读」→ 保存";
    if(!cfg.endpoint || !cfg.model) return "语音缺少 Endpoint / Model";
    if(!cfg.apiKey) return "语音缺少 API Key";
    return "";
  };
  api.speak = async function(text){
    if(!api.canSpeak()) throw new Error(api.ttsHint() || "未启用 Step 语音或未配置");
    var lang = detectTtsLang(text);
    var body = { model: cfg.tts.model || "step-tts-2", input: String(text||""), voice: cfg.tts.voice || KURISU_VOICE, response_format:"mp3" };
    if(lang !== "zh") body.language = lang;
    var resp = await fetch(cleanEndpoint(cfg.endpoint) + "/audio/speech", { method:"POST", headers:headers(), body:JSON.stringify(body) });
    if(!resp.ok){ var d = await resp.text().catch(function(){ return ""; }); throw new Error("TTS HTTP " + resp.status + ": " + d.slice(0,150)); }
    return resp.blob();
  };

  /* 中文回复 → 自然口语化日语（供"说日语"语音用）。移植上游 translateForKurisuTts 的思路。
     step-3.7-flash 是推理模型，不理会 thinking:disabled，会先烧 token 在推理上；
     故 max_tokens 提够 + 加"直接作答"指令，确保推理后仍能吐出正文。 */
  api.translateToJa = async function(text){
    var t = String(text||"").trim();
    if(!t) return "";
    if(!api.usingRemote()) throw new Error("未配置 LLM");
    var sys = ["Translate the supplied Chinese assistant reply into natural spoken Japanese for Makise Kurisu.",
               "Preserve exact meaning, tone, technical terms and information.",
               "Output Japanese text only. No explanations, speaker names, quotes, markdown or stage directions.",
               "Never think aloud; return the translation directly."].join("\n");
    var body = { model: cfg.model, messages: [ {role:"system",content:sys}, {role:"user",content:t} ], temperature:0.3, max_tokens:800, stream:false };
    var data = await postJson(target("/chat/completions"), body, true);
    var ja = String(data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content || "").trim();
    if(!ja) throw new Error("日译返回空");
    return ja;
  };

  window.AMADEUS_LLM = api;
})();