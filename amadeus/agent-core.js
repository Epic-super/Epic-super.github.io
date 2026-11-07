/* ===========================================================
   塔台智能体 · Agent Core（悬浮球 与 独立页 共用引擎）
   - 依赖 window.AMADEUS_LLM（amadeus/amadeus-llm.js 的 chatWithTools）
   - 工具集：站内导航 / 工作台信息 / 长期记忆 / 计算 / 时间
   - 长期记忆：localStorage 持久化（本地与公开站 origin 隔离，天然"数据只在本机"）
   - BYOK：API Key 一律存访客本机 localStorage，不入库不上传
   =========================================================== */
(function () {
  "use strict";

  var MEM_KEY = "wb_agent_memory";
  var MEM_MAX = 50;

  /* ---------- 长期记忆 ---------- */
  function memLoad() {
    try { var raw = localStorage.getItem(MEM_KEY); var arr = JSON.parse(raw); return Array.isArray(arr) ? arr : []; } catch (_) { return []; }
  }
  function memSave(arr) { try { localStorage.setItem(MEM_KEY, JSON.stringify(arr)); } catch (_) {} }
  var memory = {
    list: function () { return memLoad(); },
    add: function (text) {
      var t = String(text || "").trim();
      if (!t) return { ok: false, error: "empty" };
      var arr = memLoad();
      // 去重：同文本追加视为刷新时间
      for (var i = 0; i < arr.length; i++) { if (arr[i].text === t) { arr[i].ts = Date.now(); memSave(arr); return { ok: true, id: arr[i].id, dedup: true }; } }
      var item = { id: "m" + Date.now().toString(36) + Math.floor(Math.random() * 1e3).toString(36), text: t, ts: Date.now() };
      arr.unshift(item);
      while (arr.length > MEM_MAX) arr.pop();
      memSave(arr);
      return { ok: true, id: item.id };
    },
    remove: function (id) {
      var arr = memLoad(), out = arr.filter(function (m) { return m.id !== id; });
      memSave(out);
      return { ok: out.length !== arr.length, count: out.length };
    },
    clear: function () { memSave([]); return { ok: true }; }
  };

  /* ---------- 工具实现 ---------- */
  function calcSafe(expr) {
    var s = String(expr || "");
    if (!/^[0-9+\-*/().,%\s]+$/.test(s)) throw new Error("表达式含不允许的字符");
    if (s.length > 200) throw new Error("表达式过长");
    var v = Function('"use strict";return (' + s.replace(/,/g, "") + ')')();
    if (typeof v !== "number" || !isFinite(v)) throw new Error("结果不是有限数");
    return v;
  }

  var SITE_PAGES = [
    { path: "index.html", name: "指挥台主页" },
    { path: "zk-ky.html", name: "自考考研双线台" },
    { path: "share-hub.html", name: "分享台" },
    { path: "lab/index.html", name: "实验室索引" },
    { path: "unique-world.html", name: "独一无二的世界" },
    { path: "study.html", name: "学习" },
    { path: "career.html", name: "职业" },
    { path: "health.html", name: "健康" },
    { path: "gallery.html", name: "画廊" },
    { path: "explore.html", name: "探索" },
    { path: "lab/products/agent.html", name: "塔台智能体全屏页" }
  ];

  function baseUrl() {
    // 与 ai-fab 的 siteRoot 同规则：本地 8080 在 /_master/ 下，公开站根 = /
    var p = location.pathname;
    return (p.indexOf("/_master") === 0) ? "/_master/" : "/";
  }

  var TOOLS_IMPL = {
    navigate_page: function (args) {
      var path = String(args.path || "").replace(/^\//, "");
      var hit = SITE_PAGES.filter(function (p) { return p.path === path || p.name === args.name; })[0];
      if (!hit && !/^[a-z0-9_\-./]+\.html$/i.test(path)) return { ok: false, error: "unknown path", pages: SITE_PAGES.map(function (p) { return p.path; }) };
      var target = baseUrl() + (hit ? hit.path : path);
      setTimeout(function () { location.href = target; }, 60);
      return { ok: true, navigating_to: target, page: hit ? hit.name : path };
    },
    workbench_info: function (args) {
      var topic = String(args.topic || "version");
      if (topic === "version") {
        return fetch(baseUrl() + "version.json?t=" + Date.now()).then(function (r) { return r.json(); }).then(function (v) {
          return { version: v.version, releasedAt: v.releasedAt, notes_total: (v.notes || []).length, recent_notes: (v.notes || []).slice(0, 5) };
        });
      }
      if (topic === "pages") return Promise.resolve({ pages: SITE_PAGES });
      return Promise.resolve({ help: "topic 可选：version（版本与最近变更）/ pages（站内页面清单）" });
    },
    remember: function (args) { return Promise.resolve(memory.add(args.text)); },
    recall: function (args) {
      var kw = String(args.keyword || "").trim();
      var arr = memory.list();
      if (kw) arr = arr.filter(function (m) { return m.text.indexOf(kw) !== -1; });
      return Promise.resolve({ memories: arr.slice(0, 20) });
    },
    forget: function (args) {
      if (args.all) return Promise.resolve(memory.clear());
      return Promise.resolve(memory.remove(String(args.id || "")));
    },
    calc: function (args) {
      try { return Promise.resolve({ expression: args.expression, value: calcSafe(args.expression) }); }
      catch (e) { return Promise.resolve({ error: String(e.message || e) }); }
    },
    now: function () { var d = new Date(); return Promise.resolve({ datetime: d.toLocaleString("zh-CN"), weekday: ["日", "一", "二", "三", "四", "五", "六"][d.getDay()] }); }
  };

  /* ---------- OpenAI tools schema ---------- */
  function fn(name, desc, props, required) {
    return { type: "function", function: { name: name, description: desc, parameters: { type: "object", properties: props || {}, required: required || [] } } };
  }
  var TOOLS_SCHEMA = [
    fn("navigate_page", "跳转到工作台站内页面。用户说「打开某某」「带我去某某」时用。", { path: { type: "string", description: "站内相对路径，如 index.html、zk-ky.html、lab/index.html" } }, ["path"]),
    fn("workbench_info", "查询工作台信息：当前版本、最近变更记录、站内页面清单。", { topic: { type: "string", enum: ["version", "pages"] } }, ["topic"]),
    fn("remember", "把一条重要信息写入长期记忆（跨会话保留在本机）。用户说「记住…」时用。", { text: { type: "string", description: "要记住的一句话" } }, ["text"]),
    fn("recall", "按关键词检索长期记忆；不传关键词返回全部。", { keyword: { type: "string" } }),
    fn("forget", "删除长期记忆：按 id 删一条，或 all 清空。", { id: { type: "string" }, all: { type: "boolean" } }),
    fn("calc", "四则运算计算器。", { expression: { type: "string", description: "如 (12+8)*3/2" } }, ["expression"]),
    fn("now", "获取当前日期时间与星期。", {})
  ];

  /* ---------- system prompt 扩展：记忆 + 环境 ---------- */
  function systemExtra() {
    var lines = [];
    lines.push("你是嵌入在「塔台」工作台里的智能体，除了聊天还可以调用工具帮助用户。");
    lines.push("调用工具后用一句话自然说明你做了什么；不要虚构工具结果。");
    var mem = memory.list().slice(0, 20);
    if (mem.length) lines.push("已知的长期记忆（本机存储）：\n" + mem.map(function (m) { return "- " + m.text; }).join("\n"));
    try { lines.push("当前页面：" + location.href.split("#")[0]); } catch (_) {}
    return lines.join("\n");
  }

  /* ---------- 对外 API ---------- */
  var api = {
    tools: TOOLS_SCHEMA,
    memory: memory,
    ready: function () { return !!(window.AMADEUS_LLM && window.AMADEUS_LLM.usingRemote()); },
    /* send(text, {onTool}) → {reply, toolLog}；onTool({name,args,result}) 供 UI 实时展示 */
    send: async function (text, opts) {
      if (!window.AMADEUS_LLM) throw new Error("AMADEUS_LLM 未加载");
      return window.AMADEUS_LLM.chatWithTools(text, TOOLS_SCHEMA, function (name, argsRaw) {
        var impl = TOOLS_IMPL[name];
        var args = {};
        try { args = JSON.parse(argsRaw || "{}"); } catch (_) {}
        if (!impl) return Promise.resolve({ error: "未知工具 " + name });
        return Promise.resolve(impl(args)).then(function (r) {
          if (opts && opts.onTool) { try { opts.onTool({ name: name, args: args, result: r }); } catch (_) {} }
          return r;
        });
      }, { systemExtra: systemExtra(), maxRounds: 4 });
    },
    /* 直接访问底层（情绪映射/TTS 等仍走 AMADEUS_LLM） */
    llm: function () { return window.AMADEUS_LLM || null; }
  };

  window.TOWER_AGENT = api;
})();
