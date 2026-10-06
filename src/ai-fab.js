/* ============================================================
 * src/ai-fab.js — 塔台 AI 悬浮球（主页智能入口）
 * 依赖：零外部依赖（原生 JS），随 index.html 以普通 script 引入。
 * 能力：
 *   1) 悬浮球（可拖拽 / 位置记忆 / Alt+K 唤起 / 双击贴边）
 *   2) 对话：本地意图引擎（离线可用）+ 可选 LLM（OpenAI 兼容协议）
 *   3) 速搜：站内视图 / 子系统 / 站点一键直达
 *   4) 动作：高频页面九宫格
 *   5) 设置：Base URL / API Key / Model，仅存本机 localStorage，绝不上传
 * 主题：全部走站点 CSS 变量，自动适配浅色 / 深色。
 * ============================================================ */
(function () {
  "use strict";
  if (window.__WB_AI_FAB__) return;
  window.__WB_AI_FAB__ = 1;

  var LS = "wb_aifab_";
  function load(k, d) { try { var v = localStorage.getItem(LS + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(LS + k, JSON.stringify(v)); } catch (e) { } }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function $(s) { return document.querySelector(s); }
  function $$(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }

  /* ---------- 版本 / 倒计时辅助 ---------- */
  function appVersion() {
    var m = document.querySelector('meta[name="app-version"]');
    return m ? m.content : "—";
  }
  function daysTo(ds) {
    var a = new Date(), b = new Date(ds + "T00:00:00");
    a.setHours(0, 0, 0, 0);
    return Math.round((b - a) / 86400000);
  }

  /* ---------- 站内索引（速搜 + 动作） ---------- */
  var NAV = [
    { t: "今日作战台", d: "今日待办 / 倒计时 / 快捷卡", v: "#sec-today", k: "today sec-today" },
    { t: "双线作战台 · 自考 × 考研", d: "自考 + 考研双线里程碑", v: "#sec-dual", k: "dual 考研 自考 双线 进度 里程碑" },
    { t: "投稿资讯", d: "考研资讯聚合流", v: "#sec-news", k: "资讯 news 信息流 考研资讯" },
    { t: "我的项目", d: "项目与交付物专区", v: "#sec-projects", k: "项目 project 作品 交付物" },
    { t: "工具与账号", d: "站点工具箱 / 账号入口", v: "#sec-tools", k: "工具 tool 工具箱 账号" },
    { t: "速记板", d: "笔记速记与归档", v: "#sec-notes", k: "笔记 note 归档 速记" },
    { t: "人际 · 恋爱", d: "人际与亲密关系笔记", v: "#sec-renji", k: "人际 renji 恋爱 关系" },
    { t: "职业规划", d: "职业路径与岗位分析", v: "#sec-career", k: "职业 career 规划 岗位" },
    { t: "技术债清算台", d: "六维技术债务跟踪", v: "#sec-techdebt", k: "技术债 debt 清算" },
    { t: "科研专区", d: "课题 / 文献 / 实验流水线", v: "#sec-research", k: "科研 research 课题 文献" },
    { t: "品牌 · AnthroMindLink", d: "品牌视觉规范与资产", v: "#sec-brand", k: "品牌 brand anthromindlink 视觉 logo" },
    { t: "游戏架", d: "本机游戏入口", v: "#sec-games", k: "游戏 game 游戏架 摸鱼" },
    { t: "3D 小世界", d: "Three.js 漫游小世界", v: "#sec-world", k: "world 3d 漫游" },
    { t: "AI 大模型世界", d: "十二家模型星河对比", v: "#sec-aiworld", k: "aiworld 大模型 星河 对比" },
    { t: "学习角 · 如果不用打卡", d: "noclock 模块", v: "#sec-noclock", k: "noclock 打卡 学习角" },
    { t: "子系统", d: "Lab / products 全部子系统", v: "#sec-subs", k: "子系统 lab products 子页面" },
    { t: "独立游戏开发者作品集", d: "独立游戏 Portfolio", v: "#sec-indie-portfolio", k: "独立游戏 indie portfolio 作品集" },
    { t: "SpaceX Starship 3D", d: "星舰 3D 工程学习平台", v: "#sec-starship-3d", k: "starship 星舰 3d spacex" },
    { t: "探索 · AI 视频工作流", d: "AI 视频管线探索", v: "#sec-explore", k: "探索 explore 视频 工作流" },
    { t: "今天吃什么", d: "分类转盘 · 摇一摇", v: "#sec-eat", k: "吃 吃什么 转盘 eat 午饭" },
    { t: "工作台完善度", d: "六维雷达 / 模块完成度 / 版本沿革", v: "#sec-health", k: "完善度 health 雷达 模块 版本" },
    { t: "智能题库", d: "背题 / 练习 / 错题本（独立页）", v: "zk-ky.html", k: "题库 刷题 背题 错题 练习 quiz" },
    { t: "双线作战台", d: "科目进度 / 408 / 倒计时（独立页）", v: "zk-ky.html", k: "考研 kaoyan 作战台 408 科目" },
    { t: "考研情报雷达", d: "院校×专业查询 / 改考名单 / 口碑雷达", v: "lab/products/kaoyan-intel.html", k: "情报 院校 专业 分数线 改考 名额 复试 radar" },
    { t: "分享中心", d: "share-hub 分享与导出", v: "share-hub.html", k: "分享 share hub 导出" },
    { t: "Lab 子系统网关", d: "全部 Lab 子页面索引", v: "lab/index.html", k: "lab 网关 子系统 index" }
  ];
  var ACTIONS = [
    { t: "今日", v: "#sec-today", i: "☀️" },
    { t: "题库", v: "zk-ky.html", i: "📝" },
    { t: "考研", v: "zk-ky.html", i: "🎓" },
    { t: "情报", v: "lab/products/kaoyan-intel.html", i: "🔎" },
    { t: "子系统", v: "#sec-subs", i: "🧩" },
    { t: "分享", v: "share-hub.html", i: "🔗" },
    { t: "吃什么", v: "#sec-eat", i: "🍜" },
    { t: "完善度", v: "#sec-health", i: "📊" },
    { t: "Lab", v: "lab/index.html", i: "🧪" }
  ];

  /* ---------- 本地意图引擎 ---------- */
  function chip(label, v, x) { return { t: label, v: v, x: x ? 1 : 0 }; }
  var INTENTS = [
    {
      re: /^(你好|您好|hi|hello|嗨|哈喽|在吗)/i, fn: function () {
        return {
          html: "在呢 🐾 我是<b>塔台智能体</b>，你的工作台随身助理。<br>我能<a class='q' data-j='#sec-subs'>跳转任意板块</a>、查<a class='q' data-j='lab/products/kaoyan-intel.html'>院校专业情报</a>、打开<a class='q' data-j='zk-ky.html'>题库</a>，也能陪你聊天。<br>在<a class='q' data-j='lab/products/agent.html'>全屏智能体</a>里配好 Key，我还会用工具（查版本/记事/计算）并拥有长期记忆。<br>输入「<b>帮助</b>」看完整能力清单。",
          chips: [chip("看能力清单", "help"), chip("打开今日", "#sec-today")]
        };
      }
    },
    {
      re: /(你是谁|你叫什么|名字|身份|谁造)/, fn: function () {
        return { html: "我是<b>塔台智能体</b>（Tower Agent），跑在你自己的工作台里。默认<b>离线本地模式</b>——所有对话不出浏览器；你可以在设置里填 API 把它接上大模型。" };
      }
    },
    {
      re: /(帮助|能做什么|能力|指令|怎么用|help)/i, fn: function () {
        return {
          html: "<b>我能做这些</b>（点标签直接执行）：<br>" +
            "① <b>站内直达</b>：说「打开题库」「情报雷达」直接跳；<br>" +
            "② <b>速搜</b>：切到「速搜」页，模糊匹配全站板块与子系统；<br>" +
            "③ <b>考研情报</b>：改考名单、院校×专业查询、分数线与名额；<br>" +
            "④ <b>站点信息</b>：版本号、倒计时、模块清单；<br>" +
            "⑤ <b>真·对话</b>：设置里填 API Key 后切换大模型模式。",
          chips: [chip("情报雷达", "lab/products/kaoyan-intel.html"), chip("智能题库", "zk-ky.html"), chip("子系统总入口", "#sec-subs")]
        };
      }
    },
    {
      re: /(版本|更新|版本号|v1|升级|变更)/, fn: function () {
        return {
          html: "当前版本 <b>v" + esc(appVersion()) + "</b>。版本沿革与完整变更记录见「工作台完善度」板块。",
          chips: [chip("查看完善度", "#sec-health")]
        };
      }
    },
    {
      re: /(倒计时|还有多少天|距离考研|初试|考试还有)/, fn: function () {
        var n = daysTo("2026-12-26");
        return {
          html: n > 0 ? "距 2027 考研初试（2026-12-26）还有 <b>" + n + "</b> 天。要不要去<a class='q' data-j='zk-ky.html'>双线作战台</a>看今日任务？" : "初试日期已过或未设置，去<a class='q' data-j='zk-ky.html'>作战台</a>改一下目标日期。",
          chips: [chip("双线作战台", "zk-ky.html"), chip("情报雷达", "lab/products/kaoyan-intel.html")]
        };
      }
    },
    {
      re: /(408|改考|统考|数据结构|计组|操作系统|计算机网络)/, fn: function () {
        return {
          html: "408 相关情报都在<b>考研情报雷达</b>里：「2027 改考 408 版图」列了全部已确认变更点，「院校·专业查询」可以按学校 + 专业查科目、参考线、名额与口碑。",
          chips: [chip("打开情报雷达", "lab/products/kaoyan-intel.html"), chip("刷题去", "zk-ky.html")]
        };
      }
    },
    {
      re: /(分数线|复试线|院线|国家线|录取分数)/, fn: function () {
        return {
          html: "分数线检索请走<b>情报雷达 → 院校·专业查询</b>：选学校和专业即可看到参考复试线、统考名额、复录比口碑。所有数据都带<b>来源 + 可信度分级（L1~L4）</b>。",
          chips: [chip("按专业查分数线", "lab/products/kaoyan-intel.html")]
        };
      }
    },
    {
      re: /(调剂|复试|复录比|压分|捡漏|双非|保护一志愿)/, fn: function () {
        return {
          html: "这块在雷达的「口碑雷达」页：友好信号 / 风险信号 / 避坑清单六条。捡漏向院校在「院校·专业查询」里带 🌱 标记。",
          chips: [chip("看口碑雷达", "lab/products/kaoyan-intel.html")]
        };
      }
    },
    {
      re: /(院校|学校|择校|报名|专业目录|招生简章|名额|推免)/, fn: function () {
        return {
          html: "选校请用雷达的<b>院校·专业查询</b>：学校 + 专业/方向三级联动，能对比科目、参考线、名额与口碑；库里没收录的学校会自动给你官方查询直达链接。",
          chips: [chip("院校×专业查询", "lab/products/kaoyan-intel.html")]
        };
      }
    },
    {
      re: /(题库|刷题|背题|错题|练习|做题|自考真题)/, fn: function () {
        return {
          html: "去<b>智能题库</b>（支持背题 / 练习双模式、仅错题筛选、科目分组、错题计数）。",
          chips: [chip("打开题库", "zk-ky.html")]
        };
      }
    },
    {
      re: /(笔记|记录|归档|知识库)/, fn: function () {
        return { html: "速记板在左侧导航「速记板」，随手记录会自动落在本地；长文建议沉淀到「我的项目」板块，或用「分享中心」导出。", chips: [chip("打开速记板", "#sec-notes")] };
      }
    },
    {
      re: /(吃什么|午饭|晚饭|早餐|点餐|餐厅)/, fn: function () {
        return { html: "摇个转盘吧 🍜 —「今天吃什么」支持分类转盘 + 摇一摇。", chips: [chip("去摇转盘", "#sec-eat")] };
      }
    },
    {
      re: /(游戏|摸鱼|放松|玩一会)/, fn: function () {
        return { html: "游戏库在「游戏」板块，本机游戏入口也在那。", chips: [chip("打开游戏库", "#sec-games")] };
      }
    },
    {
      re: /(设置|配置|api|key|大模型|模型|token)/i, fn: function () {
        return { html: "点右上角齿轮即可配置：Base URL / API Key / Model，全部只存本机浏览器。留空则回到离线本地模式。", chips: [chip("打开设置", "__settings")] };
      }
    },
    {
      re: /(谢谢|感谢|thx|thanks|辛苦)/i, fn: function () { return { html: "随时在 🐾 有事说话。", chips: [] }; }
    }
  ];

  /* 兜底：拿提问当关键词做速搜 */
  function fallback(q) {
    var hits = searchNav(q, 5);
    if (!hits.length) {
      return {
        html: "这条我本地没接上（离线模式词库有限）。可以切到「<b>速搜</b>」页直接找板块，或在⚙️设置里填 API Key 接大模型后重试。",
        chips: [chip("打开设置", "__settings")]
      };
    }
    return {
      html: "没完全听懂，但站内这些可能相关：",
      chips: hits.map(function (h) { return chip(h.t, h.v); })
    };
  }

  function searchNav(q, limit) {
    q = String(q || "").trim().toLowerCase();
    if (!q) return [];
    var out = [];
    NAV.forEach(function (n) {
      var hay = (n.t + " " + n.d + " " + n.k + " " + n.v).toLowerCase();
      var score = hay.indexOf(q) >= 0 ? (n.t.toLowerCase().indexOf(q) >= 0 ? 0 : 1) : -1;
      if (score >= 0) out.push({ t: n.t, v: n.v, s: score });
    });
    // 运行时补充：底栏 Tab 的板块名
    $$("#tabbar a[data-view]").forEach(function (a) {
      var label = (a.textContent || "").trim();
      if (!label) return;
      if (label.toLowerCase().indexOf(q) >= 0 || q.indexOf(label) >= 0) {
        out.push({ t: label + "（底栏）", v: "#" + a.dataset.view, s: 1 });
      }
    });
    out.sort(function (a, b) { return a.s - b.s; });
    return out.slice(0, limit || 12);
  }

  function localAnswer(q) {
    for (var i = 0; i < INTENTS.length; i++) {
      if (INTENTS[i].re.test(q)) return INTENTS[i].fn(q);
    }
    return fallback(q);
  }

  /* ---------- LLM（OpenAI 兼容） ---------- */
  var CFG = load("cfg", { base: "https://api.deepseek.com/chat/completions", key: "", model: "deepseek-chat" });
  function llmOn() { return !!(CFG.key && CFG.model); }
  function callLLM(q, history) {
    if (typeof fetch !== "function") return Promise.reject(new Error("FETCH_NA"));
    var ctrl = (typeof AbortController === "function") ? new AbortController() : null;
    var to = setTimeout(function () { ctrl && ctrl.abort(); }, 30000);
    var bodyObj = {
      model: CFG.model,
      messages: [{ role: "system", content: SYS }].concat(history || []).concat([{ role: "user", content: q }]),
      temperature: 0.6,
      stream: false
    };
    return fetch(CFG.base, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + CFG.key },
      body: JSON.stringify(bodyObj),
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (r) {
      if (!r.ok) return r.text().then(function (t) { throw new Error("HTTP " + r.status + " " + t.slice(0, 120)); });
      return r.json();
    }).then(function (j) {
      var c = j && j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content;
      if (!c) throw new Error("空响应");
      return c;
    }).finally(function () { clearTimeout(to); });
  }

  var SYS = "你是「自考-考研工作台」（塔台 Tower）内置的 AI 助理，主人是一位备考 2027 考研（目标某高校 AI 学院，考 408）兼自考的资深前端工程师，称呼他「小待」。"
    + "回答用中文，简洁直接、结构化、不客套、不给无意义的免责声明。涉及考研择校、分数线、科目等信息时，提醒以目标院校当年官方招生简章与专业目录为准。"
    + "站内可用资源：今日作战台、双线作战台(zk-ky.html)、智能题库(zk-ky.html)、考研情报雷达(lab/products/kaoyan-intel.html，含院校×专业查询/改考名单/口碑雷达)、分享中心(share-hub.html)、子系统总入口(#sec-subs)。";

  /* ---------- 样式 ---------- */
  var CSS = [
    ".wb-fab-w{position:fixed;z-index:9990;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'PingFang SC','Microsoft YaHei',sans-serif}",
    ".wb-fab{width:56px;height:56px;border-radius:50%;border:none;cursor:grab;display:grid;place-items:center;",
    "background:var(--grad,linear-gradient(135deg,#0f9d77,#6d5ef0));color:#fff;font-size:23px;",
    "box-shadow:var(--shadow-2,0 8px 26px rgba(16,24,40,.28)),var(--glow,0 10px 30px -10px rgba(15,157,119,.5));",
    "transition:transform .22s cubic-bezier(.2,.8,.2,1),box-shadow .22s;touch-action:none;",
    "user-select:none;-webkit-user-select:none;-webkit-user-drag:none}",
    /* 拖动球期间全局禁选：否则指针滑过正文会拉出蓝色选区（老毛病的第二道保险） */
    "body.wb-fab-dragging{cursor:grabbing}",
    "body.wb-fab-dragging,body.wb-fab-dragging *{user-select:none!important;-webkit-user-select:none!important}",
    ".wb-fab:hover{transform:scale(1.07)}.wb-fab:active{cursor:grabbing;transform:scale(.96)}",
    ".wb-fab::after{content:'';position:absolute;inset:-6px;border-radius:50%;border:2px solid var(--primary,#0f9d77);opacity:.35;animation:wbPulse 2.4s ease-out infinite}",
    "@keyframes wbPulse{0%{transform:scale(.9);opacity:.45}70%{transform:scale(1.35);opacity:0}100%{opacity:0}}",
    ".wb-fab.warn::after{border-color:var(--amber,#d98a1a)}",
    /* 面板 */
    ".wb-panel{position:absolute;bottom:70px;right:0;width:min(92vw,376px);background:var(--card,#fff);color:var(--text,#1d2723);",
    "border:1px solid var(--border,#e3e8e4);border-radius:18px;box-shadow:var(--shadow-2,0 18px 44px -18px rgba(16,24,40,.45));",
    "display:flex;flex-direction:column;overflow:hidden;max-height:calc(100vh - 96px);transform-origin:bottom right;animation:wbIn .24s cubic-bezier(.2,.8,.2,1)}",
    ".wb-panel.align-left{right:auto;left:0;transform-origin:bottom left}",
    ".wb-panel.down{bottom:auto;top:70px;transform-origin:top right}",
    ".wb-panel.down.align-left{transform-origin:top left}",
    /* 浮层互斥退避：AI 面板展开时，右下角同区域的桌宠 / 角色栏自动变暗让位，
       关闭面板即恢复（transition 常驻，dim 只在 body.wb-fab-open 时生效） */
    '[id$="Widget"],#characterDock{transition:opacity .22s ease,filter .22s ease}',
    'body.wb-fab-open [id$="Widget"]:not([hidden]),body.wb-fab-open #characterDock:not([hidden])' +
      '{animation:none!important;opacity:.13!important;pointer-events:none!important;filter:saturate(.35)!important}',
    "@keyframes wbIn{from{opacity:0;transform:translateY(10px) scale(.96)}to{opacity:1;transform:none}}",
    ".wb-hd{display:flex;align-items:center;gap:8px;padding:11px 13px;border-bottom:1px solid var(--border,#e3e8e4);background:var(--glass,rgba(255,255,255,.7));cursor:grab}",
    ".wb-hd b{font-size:13.5px;flex:none}",
    ".wb-hd button,.wb-hd a{cursor:pointer}",
    ".wb-mode{font-size:10.5px;padding:2px 7px;border-radius:999px;border:1px solid var(--border,#e3e8e4);color:var(--muted,#6b7d76);white-space:nowrap}",
    ".wb-mode.on{color:var(--primary,#0f9d77);border-color:color-mix(in srgb,var(--primary,#0f9d77) 45%,transparent);background:var(--primary-soft,#e6f5ef)}",
    ".wb-hd .sp{margin-left:auto;display:flex;gap:5px}",
    ".wb-ib{width:27px;height:27px;border-radius:8px;border:1px solid var(--border,#e3e8e4);background:var(--input-bg,#fff);color:var(--muted,#6b7d76);cursor:pointer;font-size:13px;display:grid;place-items:center;transition:.15s}",
    ".wb-ib:hover{color:var(--text,#1d2723);border-color:var(--primary,#0f9d77)}",
    ".wb-tabs{display:flex;border-bottom:1px solid var(--border,#e3e8e4)}",
    ".wb-tab{flex:1;background:none;border:none;padding:9px 0;font:600 12.5px inherit;color:var(--muted,#6b7d76);cursor:pointer;border-bottom:2px solid transparent}",
    ".wb-tab.on{color:var(--primary,#0f9d77);border-bottom-color:var(--primary,#0f9d77)}",
    ".wb-body{overflow:auto;max-height:min(56vh,440px);min-height:0;padding:11px 13px}",
    ".wb-body::-webkit-scrollbar{width:6px}.wb-body::-webkit-scrollbar-thumb{background:var(--border,#e3e8e4);border-radius:99px}",
    /* 消息 */
    ".wb-msg{margin-bottom:10px;font-size:13px;line-height:1.72;word-break:break-word}",
    ".wb-msg .av{width:23px;height:23px;border-radius:50%;display:grid;place-items:center;font-size:12px;flex:none;margin-right:7px;background:var(--grad,linear-gradient(135deg,#0f9d77,#6d5ef0));color:#fff}",
    ".wb-msg.me .av{background:var(--primary-soft,#e6f5ef);color:var(--primary,#0f9d77)}",
    ".wb-msg .bd{flex:1;min-width:0}",
    ".wb-msg .bw{display:flex;align-items:flex-start}",
    ".wb-msg.ai .bd{background:var(--note-bg,#f3f7f4);border:1px solid var(--border,#e3e8e4);border-radius:12px 12px 12px 3px;padding:9px 11px}",
    ".wb-msg.me .bw{flex-direction:row-reverse}.wb-msg.me .av{margin:0 0 0 7px}",
    ".wb-msg.me .bd{background:var(--primary-soft,#e6f5ef);border:1px solid color-mix(in srgb,var(--primary,#0f9d77) 25%,transparent);border-radius:12px 12px 3px 12px;padding:8px 11px;text-align:right;display:inline-block;max-width:88%}",
    ".wb-msg.me .bw{justify-content:flex-end}",
    ".wb-msg b{color:var(--text,#1d2723)}",
    ".wb-msg a.q{color:var(--primary,#0f9d77);text-decoration:none;border-bottom:1px dashed currentColor;cursor:pointer}",
    ".wb-chips{display:flex;gap:6px;flex-wrap:wrap;margin-top:7px}",
    ".wb-chip{background:var(--input-bg,#fff);border:1px solid var(--border,#e3e8e4);color:var(--muted,#6b7d76);border-radius:999px;padding:4px 10px;font-size:11.5px;cursor:pointer;transition:.15s}",
    ".wb-chip:hover{color:var(--primary,#0f9d77);border-color:var(--primary,#0f9d77)}",
    ".wb-typing{display:inline-flex;gap:3px;vertical-align:middle}",
    ".wb-typing i{width:5px;height:5px;border-radius:50%;background:var(--muted,#6b7d76);animation:wbDot 1.1s infinite}",
    ".wb-typing i:nth-child(2){animation-delay:.15s}.wb-typing i:nth-child(3){animation-delay:.3s}",
    "@keyframes wbDot{0%,60%,100%{opacity:.25}30%{opacity:1}}",
    /* 输入区 */
    ".wb-ft{display:flex;gap:6px;padding:9px 11px;border-top:1px solid var(--border,#e3e8e4);background:var(--glass,rgba(255,255,255,.6))}",
    ".wb-ft input{flex:1;background:var(--input-bg,#fff);border:1px solid var(--border,#e3e8e4);color:var(--text,#1d2723);border-radius:10px;padding:7px 10px;font:13px inherit;outline:none}",
    ".wb-ft input:focus{border-color:var(--primary,#0f9d77)}",
    ".wb-send{background:var(--grad,linear-gradient(135deg,#0f9d77,#6d5ef0));color:#fff;border:none;border-radius:10px;padding:7px 13px;font:700 12.5px inherit;cursor:pointer}",
    ".wb-send:disabled{opacity:.45;cursor:not-allowed}",
    /* 速搜 */
    ".wb-sbox{margin-bottom:9px}",
    ".wb-sbox input{width:100%;background:var(--input-bg,#fff);border:1px solid var(--border,#e3e8e4);color:var(--text,#1d2723);border-radius:10px;padding:8px 11px;font:13px inherit;outline:none}",
    ".wb-sbox input:focus{border-color:var(--primary,#0f9d77)}",
    ".wb-hit{display:flex;gap:9px;align-items:center;padding:8px 10px;border:1px solid var(--border,#e3e8e4);border-radius:11px;margin-bottom:6px;cursor:pointer;transition:.15s;background:var(--card,#fff)}",
    ".wb-hit:hover{border-color:var(--primary,#0f9d77);background:var(--primary-soft,#e6f5ef)}",
    ".wb-hit .ic{width:26px;height:26px;border-radius:8px;display:grid;place-items:center;background:var(--note-bg,#f3f7f4);flex:none;font-size:13px}",
    ".wb-hit .tt{font-size:12.8px;font-weight:600;color:var(--text,#1d2723)}",
    ".wb-hit .dd{font-size:11px;color:var(--muted,#6b7d76);margin-top:1px}",
    ".wb-hit .go{margin-left:auto;color:var(--muted,#6b7d76);font-size:13px;flex:none}",
    ".wb-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}",
    ".wb-act{background:var(--card,#fff);border:1px solid var(--border,#e3e8e4);border-radius:12px;padding:11px 4px;text-align:center;cursor:pointer;transition:.15s}",
    ".wb-act:hover{border-color:var(--primary,#0f9d77);transform:translateY(-2px)}",
    ".wb-act .i{font-size:18px;display:block}",
    ".wb-act .t{font-size:11.5px;color:var(--muted,#6b7d76);margin-top:3px}",
    ".wb-sec-t{font-size:11px;color:var(--muted,#6b7d76);margin:12px 0 7px;letter-spacing:.4px}",
    /* 设置 */
    ".wb-set{position:absolute;inset:0;background:var(--card,#fff);z-index:5;padding:13px;overflow:auto}",
    ".wb-set label{display:block;font-size:11.5px;color:var(--muted,#6b7d76);margin:9px 0 3px}",
    ".wb-set input{width:100%;background:var(--input-bg,#fff);border:1px solid var(--border,#e3e8e4);color:var(--text,#1d2723);border-radius:9px;padding:7px 10px;font:12.5px inherit;outline:none}",
    ".wb-set input:focus{border-color:var(--primary,#0f9d77)}",
    ".wb-set .row{display:flex;gap:6px;margin-top:12px}",
    ".wb-tip{font-size:11.5px;color:var(--muted,#6b7d76);line-height:1.7;margin-top:10px;background:var(--note-bg,#f3f7f4);border:1px solid var(--border,#e3e8e4);border-radius:10px;padding:9px 11px}",
    ".wb-empty{color:var(--muted,#6b7d76);font-size:12.5px;text-align:center;padding:22px 0}",
    "@media (prefers-reduced-motion:reduce){.wb-panel,.wb-fab,.wb-fab::after{animation:none!important;transition:none!important}}"
  ].join("");

  /* ---------- DOM ---------- */
  function build() {
    var st = document.createElement("style");
    st.id = "wbAifabCss";
    st.textContent = CSS;
    document.head.appendChild(st);

    var wrap = document.createElement("div");
    wrap.className = "wb-fab-w";
    wrap.id = "wbFabWrap";
    wrap.innerHTML =
      '<button class="wb-fab" id="wbFabBtn" title="塔台 AI 助手（Alt+K）" aria-label="塔台 AI 助手">🐾</button>' +
      '<div class="wb-panel" id="wbFabPanel" hidden>' +
      '<div class="wb-hd"><span style="font-size:15px">🐾</span><b>塔台智能体</b>' +
      '<span class="wb-mode" id="wbMode">离线本地</span>' +
      '<span class="sp">' +
      '<button class="wb-ib" id="wbSet" title="设置">⚙️</button>' +
      '<button class="wb-ib" id="wbClr" title="清空对话">🧹</button>' +
      '<button class="wb-ib" id="wbClose" title="收起（Esc）">✕</button>' +
      '</span></div>' +
      '<div class="wb-tabs">' +
      '<button class="wb-tab on" data-t="chat">💬 对话</button>' +
      '<button class="wb-tab" data-t="go">🔍 速搜</button>' +
      '<button class="wb-tab" data-t="act">⚡ 动作</button>' +
      '</div>' +
      '<div class="wb-body" id="wbBody">' +
      '<div id="wbChat"></div>' +
      '<div id="wbGo" hidden>' +
      '<div class="wb-sbox"><input type="text" id="wbSearch" placeholder="搜板块 / 子系统 / 页面…"></div>' +
      '<div id="wbHits"></div></div>' +
      '<div id="wbAct" hidden>' +
      '<div class="wb-sec-t">常用直达</div><div class="wb-grid" id="wbActs"></div>' +
      '<div class="wb-sec-t">快捷键</div>' +
      '<div class="wb-tip" style="margin-top:0">Alt+K 开合悬浮面板 · Esc 收起 · 拖拽球体可换位置（自动记忆）· 双击球体贴到最近一侧边缘。</div>' +
      '</div></div>' +
      '<div class="wb-ft" id="wbFt">' +
      '<input type="text" id="wbInput" placeholder="问点什么…（Enter 发送）" autocomplete="off">' +
      '<button class="wb-send" id="wbSend">发送</button>' +
      '</div>' +
      '<div class="wb-set" id="wbSetPane" hidden>' +
      '<div style="display:flex;align-items:center;gap:8px"><b style="font-size:13px">⚙️ 大模型接入</b>' +
      '<span class="wb-mode ' + (llmOn() ? "on" : "") + '" id="wbSetMode">' + (llmOn() ? "已启用" : "未启用") + '</span>' +
      '<button class="wb-ib" id="wbSetClose" style="margin-left:auto">✕</button></div>' +
      '<label>Base URL（OpenAI 兼容，含 /chat/completions）</label>' +
      '<input type="text" id="cfgBase" placeholder="https://api.deepseek.com/chat/completions">' +
      '<label>API Key（仅存本机 localStorage，绝不上传）</label>' +
      '<input type="password" id="cfgKey" placeholder="sk-...">' +
      '<label>Model</label>' +
      '<input type="text" id="cfgModel" placeholder="deepseek-chat">' +
      '<div class="row"><button class="wb-send" id="cfgSave" style="flex:1">保存</button>' +
      '<button class="wb-chip" id="cfgOff" style="border-radius:10px;padding:7px 12px">清空停用</button></div>' +
      '<div class="wb-tip">留空或点「清空停用」即回到<b>离线本地模式</b>：意图库离线可用，且不产生任何外发请求。<br>' +
      '常见可填项：DeepSeek <code>https://api.deepseek.com/chat/completions</code> · 月之暗面 <code>https://api.moonshot.cn/v1/chat/completions</code> · 通义 / 智谱等 OpenAI 兼容端点。<br>' +
      '⚠️ 写在浏览器本地，谁打开这台电脑的这个站点都能看到 —— 公用设备请勿填。</div>' +
      '</div></div>';
    document.body.appendChild(wrap);

    var btn = $("#wbFabBtn"), panel = $("#wbFabPanel");
    var open = false;

    /* ---- 位置 ----
     * pos 语义（2026-10-02 冲突修复）：x = 元素 right 偏移、y = bottom 偏移（px）。
     * 旧版把「球心坐标」直接套进 right=vw-x，导致默认值把球推出屏幕左缘
     * （实测 x=-16），面板压住子系统网格 —— 本次统一为偏移语义。 */
    var pos = load("pos", null);
    function applyPos() {
      /* 钳制基准（2026-10-04 修复「球卡出界面一半」）：position:fixed 的 right/bottom
         以「不含经典滚动条」的布局视口为基准，而 window.innerWidth/innerHeight 把
         滚动条也算进去（Win Chrome 约 10~17px）。两者不一致时，贴边钳制会准许球
         探出屏幕边缘一截。改用 documentElement.clientWidth/Height 与 fixed 基准对齐。 */
      var vw = document.documentElement.clientWidth || window.innerWidth;
      var vh = document.documentElement.clientHeight || window.innerHeight;
      if (!pos) pos = { x: 22, y: 20 };
      pos.x = Math.max(8, Math.min(vw - 64, pos.x));
      pos.y = Math.max(8, Math.min(vh - 64, pos.y));
      wrap.style.right = Math.round(pos.x) + "px";
      wrap.style.bottom = Math.round(pos.y) + "px";
      wrap.style.left = "auto"; wrap.style.top = "auto";

      var BALL = 56, GAP = 70, PAD = 8;
      /* 垂直方向：按球上方 / 下方实际可用空间选更大的展开方向，并动态限高。
         修复（2026-10-03「切换页面卡出边界」）：旧逻辑固定 max-height:calc(100vh-96)
         且方向阈值写死（pos.y > vh-320）—— 球在屏幕中部时面板向上/向下弹出
         会超过视口被裁掉；换小视口后球的位置与固定阈值不再匹配。 */
      var upH = vh - pos.y - GAP;            /* 面板底在球底上方 GAP 处，向上最多可占 */
      var downH = pos.y + BALL - GAP;        /* 面板顶在球顶下方 GAP 处（top 相对 wrap 顶=球顶），向下最多可占 */
      var goDown = downH > upH;              /* 下方空间更大 → 向下弹 */
      panel.classList.toggle("down", goDown);
      var availH = (goDown ? downH : upH) - PAD;
      panel.style.maxHeight = Math.max(120, Math.min(vh - 96, availH)) + "px";

      /* 水平方向：向左（默认 right:0 从球右缘向左展开）vs 向右（align-left
         left:0 从球左缘向右展开），同样按可用空间选，避免固定阈值在中左区域
         仍向左展开而冲出左边界。 */
      var spaceLeft = vw - pos.x;            /* 向左展开可用宽度 */
      var spaceRight = pos.x + BALL;         /* 向右展开可用宽度 */
      var goAlignLeft = spaceRight > spaceLeft;
      panel.classList.toggle("align-left", goAlignLeft);
      var wantW = Math.min(376, 92 * vw / 100);
      var availW = (goAlignLeft ? spaceRight : spaceLeft) - PAD;
      panel.style.width = Math.max(160, Math.min(wantW, availW)) + "px";
    }

    /* ---- 桌宠碰撞避让（2026-10-06）----
     * 静置时球与桌宠（#amadeusWidget，fixed 右下 bottom:78px 起）本来就没互斥，
     * 拖球落到桌宠身上就会叠住。策略：拖动释放时若两包围盒相交，把球沿垂直方向
     * 吸附到桌宠上缘之上（放不下则贴下缘之下），x 不动；初始加载也跑一次。
     * 面板展开时的「变暗让位」互斥（wb-fab-open）保持不变。 */
    function avoidPet(np) {
      try {
        var BALL = 56;                       /* applyPos 内的 BALL 是局部变量，这里取同值 */
        var pet = document.getElementById("amadeusWidget");
        if (!pet || pet.hidden) return np;
        var cs = window.getComputedStyle ? getComputedStyle(pet) : null;
        if (cs && (cs.display === "none" || cs.visibility === "hidden")) return np;
        var pr = pet.getBoundingClientRect();
        if (pr.width <= 0 || pr.height <= 0) return np;
        var vw2 = document.documentElement.clientWidth || window.innerWidth;
        var vh2 = document.documentElement.clientHeight || window.innerHeight;
        var bx1 = vw2 - np.x - BALL, by1 = vh2 - np.y - BALL, bx2 = vw2 - np.x, by2 = vh2 - np.y;
        if (bx2 <= pr.left || bx1 >= pr.right || by2 <= pr.top || by1 >= pr.bottom) return np;
        var aboveY = vh2 - Math.round(pr.top) + 8;   /* 球底贴桌宠顶上方 8px */
        if (aboveY + BALL <= vh2 - 8) return { x: np.x, y: aboveY };
        var belowY = vh2 - Math.round(pr.bottom) - 8 - BALL; /* 放不下 → 桌宠下方 */
        if (belowY >= 8) return { x: np.x, y: belowY };
      } catch (err) { }
      return np;
    }
    pos = avoidPet(pos);
    applyPos();

    /* ---- 拖拽（2026-10-03 重写）----
     * 三个老毛病一并修掉：
     * ① 老代码 mousedown 没 preventDefault —— 按下球往页面上一拖，浏览器当成
     *    「开始划词」，网页正文被整片刷成蓝底（观感就是在复制内容）；原生 dragstart
     *    还会把按钮里的 🐾 拖成一张半透明幽灵图。现在：pointerdown 掐掉默认行为，
     *    再单独拦 dragstart。
     * ② Y 轴拖反了：pos.y 语义是「距视口底部的偏移」，往上拖应当让 bottom 变大，
     *    旧代码写的 baseY + dy（dy<0 → bottom 变小 → 球反而往下掉），改成 -dy。
     * ③ touchstart 挂的是 passive:true，想 preventDefault 都不让；改用 Pointer Events
     *    统一鼠标 / 触摸 / 触控笔，一套逻辑不双触发，也省得两头维护。 */
    var dragging = false, moved = false, lastDragAt = 0;
    var sx = 0, sy = 0, baseX = 0, baseY = 0, activeId = null;
    var DRAG_THRESHOLD = 5;

    function onDown(e) {
      if (e.button != null && e.button !== 0) return;          /* 只认主键 */
      activeId = e.pointerId;
      dragging = true; moved = false;
      sx = e.clientX; sy = e.clientY;
      baseX = pos.x; baseY = pos.y;
      /* 关键一步：掐掉浏览器默认的「开始划词 / 开始原生拖拽」。
         不拦这两下，拖球就会变成给网页拉选框。preventDefault 不影响 click。 */
      if (e.cancelable) e.preventDefault();
      /* 指针捕获：鼠标划出窗口、或者划过 iframe 都不会丢事件 */
      try { btn.setPointerCapture(e.pointerId); } catch (err) {}
      btn.style.cursor = "grabbing";
      document.body.classList.add("wb-fab-dragging");
    }
    function onMove(e) {
      if (!dragging || (activeId != null && e.pointerId !== activeId)) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (!moved && Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
      moved = true;
      /* x 是 right 偏移：右拖→right 变小；y 是 bottom 偏移：上拖→bottom 变大（-dy） */
      pos = { x: baseX - dx, y: baseY - dy };
      applyPos();
      if (e.cancelable) e.preventDefault();
    }
    function onUp(e) {
      if (!dragging) return;
      if (e && activeId != null && e.pointerId != null && e.pointerId !== activeId) return;
      dragging = false; activeId = null;
      btn.style.cursor = "";
      document.body.classList.remove("wb-fab-dragging");
      try { if (e) btn.releasePointerCapture(e.pointerId); } catch (err) {}
      if (moved) { pos = avoidPet(pos); applyPos(); lastDragAt = Date.now(); save("pos", pos); }
    }
    /* 原生 HTML5 拖拽兜底：就算被别的路径触发也拦下来，别把球拖成图片 / 链接 */
    btn.setAttribute("draggable", "false");
    btn.addEventListener("dragstart", function (e) { e.preventDefault(); return false; });
    btn.addEventListener("pointerdown", onDown);
    btn.addEventListener("pointermove", onMove);
    btn.addEventListener("pointerup", onUp);
    btn.addEventListener("pointercancel", onUp);

    function snapSide() {
      var vw = document.documentElement.clientWidth || window.innerWidth;
      pos = { x: pos.x > vw / 2 ? 8 : vw - 64, y: pos.y };
      applyPos(); save("pos", pos);
    }
    btn.addEventListener("dblclick", snapSide);

    /* ---- 面板拖动（2026-10-06 · 用户需求）----
     * 展开后的面板原来只能固定在球上方，用户要「拖着走」。机制与球同款但分开维护：
     * ① 把手 = 面板头部 .wb-hd；点在头部里的按钮（⚙️🧹✕）上不算拖动，照常点击；
     * ② 首次拖过后面板切「自由定位」：inline fixed + left/top，与球解绑（之后球再移面板不动）；
     * ③ 钳制用 clientWidth/clientHeight（不用 innerWidth，含滚动条会算出界）；
     * ④ 位置存 localStorage（save("panelPos")），刷新后仍在；双击头部重置回跟随球；
     * ⑤ 移动端（max-width:640px 或 coarse 指针）不绑——面板本就近全屏，拖动无意义。 */
    var panelHead = document.querySelector(".wb-panel .wb-hd");
    var isCoarseOrNarrow = function () {
      return (window.matchMedia && (matchMedia("(max-width: 640px)").matches || matchMedia("(pointer: coarse)").matches));
    };
    var PD = { dragging: false, moved: false, sx: 0, sy: 0, baseL: 0, baseT: 0, pid: null };
    var pPos = (typeof load === "function" ? load("panelPos", null) : null);
    function panelDefaultPos() {
      /* 未拖过时的自然位置 = 球容器的 right/bottom 语义（CSS bottom:70px;right:0） */
      var r = btn.getBoundingClientRect();
      return { right: r.right, bottom: window.innerHeight - r.bottom };
    }
    function applyPanelPos() {
      var vw = document.documentElement.clientWidth || window.innerWidth;
      var vh = document.documentElement.clientHeight || window.innerHeight;
      var w = panel.offsetWidth || 376, h = panel.offsetHeight || 480;
      if (pPos) {
        var l = Math.max(8, Math.min(vw - w - 8, pPos.l));
        var t = Math.max(8, Math.min(vh - h - 8, pPos.t));
        panel.style.position = "fixed";
        panel.style.left = l + "px";
        panel.style.top = t + "px";
        panel.style.right = "auto";
        panel.style.bottom = "auto";
      } else {
        panel.style.position = "";
        panel.style.left = "";
        panel.style.top = "";
        panel.style.right = "";
        panel.style.bottom = "";
      }
    }
    function panelOnDown(e) {
      if (!open || isCoarseOrNarrow()) return;
      if (e.target && e.target.closest && e.target.closest("button,a,input,textarea,select")) return; /* 按钮照常点 */
      if (e.button != null && e.button !== 0) return;
      PD.pid = e.pointerId;
      PD.dragging = true; PD.moved = false;
      PD.sx = e.clientX; PD.sy = e.clientY;
      var r = panel.getBoundingClientRect();
      PD.baseL = r.left; PD.baseT = r.top;
      if (e.cancelable) e.preventDefault();
      try { panelHead.setPointerCapture(e.pointerId); } catch (err) {}
      panelHead.style.cursor = "grabbing";
      document.body.classList.add("wb-fab-dragging");
    }
    function panelOnMove(e) {
      if (!PD.dragging || (PD.pid != null && e.pointerId !== PD.pid)) return;
      var dx = e.clientX - PD.sx, dy = e.clientY - PD.sy;
      if (!PD.moved && Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
      PD.moved = true;
      /* 切自由定位：从当前 rect 起算 left/top */
      if (!pPos) { pPos = { l: PD.baseL, t: PD.baseT }; }
      pPos = { l: PD.baseL + dx, t: PD.baseT + dy };
      applyPanelPos();
      if (e.cancelable) e.preventDefault();
    }
    function panelOnUp(e) {
      if (!PD.dragging) return;
      PD.dragging = false; PD.pid = null;
      panelHead.style.cursor = "";
      document.body.classList.remove("wb-fab-dragging");
      try { if (e) panelHead.releasePointerCapture(e.pointerId); } catch (err) {}
      if (PD.moved) save("panelPos", pPos);
    }
    if (panelHead) {
      panelHead.setAttribute("title", "按住拖动可移动面板位置 · 双击重置");
      panelHead.addEventListener("pointerdown", panelOnDown);
      panelHead.addEventListener("pointermove", panelOnMove);
      panelHead.addEventListener("pointerup", panelOnUp);
      panelHead.addEventListener("pointercancel", panelOnUp);
      panelHead.addEventListener("dblclick", function (e) {
        if (e.target && e.target.closest && e.target.closest("button")) return;
        pPos = null; save("panelPos", null); applyPanelPos();
      });
      /* 字体大小/缩放变化后重新钳制，防止记忆的位置在新视口里出界 */
      window.addEventListener("resize", function () { if (pPos) applyPanelPos(); });
      if (pPos) applyPanelPos();
    }

    /* ---- 开合 ----
     * 浮层互斥（2026-10-02 冲突修复）：面板展开时给 body 挂 wb-fab-open，
     * 让右下角同区域的桌宠 / 角色栏 / 摄像头小窗自动退避变暗，
     * 关闭面板即恢复 —— 解决「AI 面板 × 桌宠 × 角色栏」三方叠压。 */
    function toggle(force) {
      open = (force == null) ? !open : !!force;
      panel.hidden = !open;
      document.body.classList.toggle("wb-fab-open", open);
      if (open) {
        if (!$("#wbChat").children.length) greet();
        setTimeout(function () { var t = activeTab === "chat" ? $("#wbInput") : $("#wbSearch"); t && t.focus(); }, 60);
      }
      save("open", open);
    }
    /* 用「刚刚拖过」的时间戳，而不是 moved 布尔：moved 会在上一次拖动后残留 true，
       键盘 Enter / Space 触发 click 时被误判成拖动而吞掉。现在只有真拖动才忽略点击。 */
    btn.addEventListener("click", function () {
      if (Date.now() - lastDragAt < 250) return;
      toggle();
    });
    $("#wbClose").onclick = function () { toggle(false); };
    document.addEventListener("keydown", function (e) {
      if (e.altKey && (e.key === "k" || e.key === "K")) { e.preventDefault(); toggle(); }
      if (e.key === "Escape" && open) toggle(false);
    });

    /* ---- Tab ---- */
    var activeTab = "chat";
    $$(".wb-tab").forEach(function (t) {
      t.onclick = function () {
        activeTab = t.dataset.t;
        $$(".wb-tab").forEach(function (x) { x.classList.remove("on"); });
        t.classList.add("on");
        $("#wbChat").hidden = activeTab !== "chat";
        $("#wbGo").hidden = activeTab !== "go";
        $("#wbAct").hidden = activeTab !== "act";
        $("#wbFt").hidden = activeTab !== "chat";
        if (activeTab === "go") renderHits($("#wbSearch").value);
      };
    });

    /* ---- 设置面板 ---- */
    $("#cfgBase").value = CFG.base || "";
    $("#cfgKey").value = CFG.key || "";
    $("#cfgModel").value = CFG.model || "";
    $("#wbSet").onclick = function () { $("#wbSetPane").hidden = false; };
    $("#wbSetClose").onclick = function () { $("#wbSetPane").hidden = true; };
    $("#cfgSave").onclick = function () {
      CFG = {
        base: ($("#cfgBase").value || "").trim() || "https://api.deepseek.com/chat/completions",
        key: ($("#cfgKey").value || "").trim(),
        model: ($("#cfgModel").value || "").trim() || "deepseek-chat"
      };
      save("cfg", CFG);
      refreshMode();
      $("#wbSetPane").hidden = true;
      push("ai", "已" + (llmOn() ? "启用大模型模式（" + esc(CFG.model) + "）" : "回到离线本地模式") + "。");
    };
    $("#cfgOff").onclick = function () {
      CFG = { base: "https://api.deepseek.com/chat/completions", key: "", model: "deepseek-chat" };
      save("cfg", CFG);
      $("#cfgKey").value = "";
      refreshMode();
      push("ai", "已清空 API 配置，回到离线本地模式。");
    };
    function refreshMode() {
      var m = $("#wbMode"), sm = $("#wbSetMode");
      m.textContent = llmOn() ? ("已接入 " + CFG.model) : "离线本地";
      m.classList.toggle("on", llmOn());
      sm.textContent = llmOn() ? "已启用" : "未启用";
      sm.classList.toggle("on", llmOn());
      btn.classList.toggle("warn", !llmOn());
    }
    refreshMode();

    /* ---- 对话 ---- */
    var HIST = load("hist", []);
    function push(role, html) {
      HIST.push({ r: role, h: html });
      if (HIST.length > 40) HIST.shift();
      save("hist", HIST);
      paint();
    }
    function paint() {
      $("#wbChat").innerHTML = HIST.map(function (m) {
        return '<div class="wb-msg ' + (m.r === "me" ? "me" : "ai") + '"><div class="bw">' +
          '<div class="av">' + (m.r === "me" ? "🙂" : "🐾") + '</div>' +
          '<div class="bd">' + m.h + '</div></div></div>';
      }).join("");
      bindChips();
      var b = $("#wbBody"); b.scrollTop = b.scrollHeight;
    }
    function bindChips() {
      $$("#wbChat .wb-chip, #wbChat a.q").forEach(function (c) {
        c.onclick = function () { jump(c.dataset.j || c.dataset.v); };
      });
    }
    /* 极简 Markdown → HTML（先转义，再放行 粗体/行内码/换行，杜绝注入） */
    function mdLite(s) {
      return esc(s)
        .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
        .replace(/`([^`\n]+)`/g, '<code style="background:var(--note-bg,#f3f7f4);padding:1px 5px;border-radius:5px">$1</code>')
        .replace(/^###\s+(.+)$/gm, "<b>$1</b>")
        .replace(/^#\s+(.+)$/gm, "<b>$1</b>")
        .replace(/^[-*]\s+(.+)$/gm, "• $1")
        .replace(/\n/g, "<br>");
    }
    function say(text, role, chips) {
      var fromObj = !!(text && typeof text === "object");
      var t = fromObj ? text.html : String(text == null ? "" : text);
      var cs = fromObj ? text.chips : chips;
      var h = t.replace(/\n/g, "<br>");
      if (cs && cs.length) {
        h += '<div class="wb-chips">' + chips.map(function (c) {
          return '<button class="wb-chip" data-j="' + esc(c.v) + '">' + esc(c.t) + '</button>';
        }).join("") + '</div>';
      }
      push(role || "ai", h);
      return h;
    }
    function greet() {
      HIST = load("hist", []);
      if (!HIST.length) {
        var v = daysTo("2026-12-26");
        var head = "在呢 🐾 我是<b>塔台智能体</b>，当前 <b>v" + esc(appVersion()) + "</b>。"
          + (v > 0 ? "距初试还有 <b>" + v + "</b> 天。" : "")
          + "<br>底下三个页签：<b>对话</b> / <b>速搜</b>（找板块）/ <b>动作</b>（常用直达）。";
        say(head, "ai", [
          chip("全屏智能体", "lab/products/agent.html"),
          chip("考研情报雷达", "lab/products/kaoyan-intel.html"),
          chip("智能题库", "zk-ky.html"),
          chip("今日作战台", "#sec-today"),
          chip("看我能干嘛", "help")
        ], false);
      } else paint();
    }

    /* ---- 智能体引擎懒加载（2026-10-04 升级：工具+记忆，形态与交互完全保留） ----
       加载成功且已配置 key → send() 走 TOWER_AGENT（function calling + 长期记忆）；
       未配置/加载失败 → 原样回落 llmOn() 的 callLLM，再回落本地规则，三层兜底。 */
    var AGENT_LOADING = null;
    function ensureAgent() {
      if (window.TOWER_AGENT) return Promise.resolve(window.TOWER_AGENT);
      if (AGENT_LOADING) return AGENT_LOADING;
      AGENT_LOADING = new Promise(function (resolve) {
        var root = siteRoot();
        var s1 = document.createElement("script");
        s1.src = root + "amadeus/amadeus-llm.js";
        s1.onload = function () {
          var s2 = document.createElement("script");
          s2.src = root + "amadeus/agent-core.js";
          s2.onload = function () { resolve(window.TOWER_AGENT || null); };
          s2.onerror = function () { resolve(null); };
          document.head.appendChild(s2);
        };
        s1.onerror = function () { resolve(null); };
        document.head.appendChild(s1);
      });
      return AGENT_LOADING;
    }

    var busy = false, LLM_HIST = [];
    function send() {
      var inp = $("#wbInput"), q = (inp.value || "").trim();
      if (!q || busy) return;
      inp.value = "";
      say(esc(q), "me", null);

      if (q === "__settings") { $("#wbSetPane").hidden = false; return; }

      /* 三层兜底：智能体（工具+记忆）→ 裸 LLM → 本地规则。悬浮球形态与交互不变。 */
      ensureAgent().then(function (ag) {
        var useAgent = !!(ag && ag.ready() && ag.llm() && ag.llm().getConfig().hasApiKey);
        var tid = "wb" + Date.now();
        if (useAgent || llmOn()) {
          busy = true;
          $("#wbSend").disabled = true;
          $("#wbChat").insertAdjacentHTML("beforeend",
            '<div class="wb-msg ai" id="' + tid + '"><div class="bw"><div class="av">🐾</div><div class="bd">' +
            '思考中 <span class="wb-typing"><i></i><i></i><i></i></span></div></div></div>');
          var b = $("#wbBody"); b.scrollTop = b.scrollHeight;
        }
        if (useAgent) {
          ag.send(q, { onTool: function (t) {
            var el = document.getElementById(tid);
            if (el) { var bd = el.querySelector(".bd"); if (bd) bd.innerHTML = "🛠 " + esc(t.name) + " <span class='wb-typing'><i></i><i></i><i></i></span>"; }
          } }).then(function (r) {
            var el = document.getElementById(tid);
            if (el) el.remove();
            var extra = (r.toolLog && r.toolLog.length)
              ? '<div style="font-size:11px;opacity:.6;margin-top:6px">🛠 ' + r.toolLog.map(function (t) { return esc(t.name); }).join(" → ") + "</div>" : "";
            say(mdLite(r.reply || "") + extra, "ai", null);
            busy = false; $("#wbSend").disabled = false;
          }).catch(function (e) {
            var el = document.getElementById(tid);
            if (el) el.remove();
            say("智能体引擎出错：" + esc(String(e.message || e).slice(0, 90)) + "<br>先用本地答案：", "ai", null);
            var a = localAnswer(q);
            say(a, "ai", a.chips);
            busy = false; $("#wbSend").disabled = false;
          });
          return;
        }
        if (llmOn()) {
          callLLM(q, LLM_HIST).then(function (ans) {
            var el = document.getElementById(tid);
            if (el) el.remove();
            LLM_HIST.push({ role: "user", content: q }, { role: "assistant", content: ans });
            if (LLM_HIST.length > 12) LLM_HIST = LLM_HIST.slice(-12);
            say(mdLite(ans), "ai", null);
          }).catch(function (e) {
            var el = document.getElementById(tid);
            if (el) el.remove();
            var why = /Failed to fetch|TypeError|NetworkError/.test(String(e.message || e))
              ? "网络不可达或被浏览器策略拦截（跨域 / 代理 / file:// 限制）"
              : esc(String(e.message || e).slice(0, 90));
            say("大模型没接上：" + why + "。<br>先用本地答案：", "ai", null);
            var a = localAnswer(q);
            say(a, "ai", a.chips);
          }).then(function () { busy = false; $("#wbSend").disabled = false; });
          return;
        }

        var ans = localAnswer(q);
        setTimeout(function () { say(ans, "ai", ans.chips); }, 120);
      });
    }
    $("#wbSend").onclick = send;
    $("#wbInput").addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); send(); } });
    $("#wbClr").onclick = function () { HIST = []; LLM_HIST = []; save("hist", HIST); greet(); };

    /* ---- 跳转 ----
     * 站内绝对路径前缀（2026-10-03 修复「本地全量也 404」）：
     *   线上 GitHub Pages 根 = 网站根，站内页在 /zk-ky.html；
     *   本地全量版 serve.py 根 = 工作区目录，主站在 /_master/ 下，
     *   站内页实际是 /_master/zk-ky.html —— 若统一补 '/' 前缀则本地 404。
     *   这里按当前页面路径（是否在 /_master/ 下）动态取站点根。 */
    function siteRoot() {
      var p = location.pathname;
      return (p.indexOf('/_master') === 0) ? '/_master/' : '/';
    }
    function jump(v) {
      if (!v) return;
      if (v === "__settings") { $("#wbSetPane").hidden = false; return; }
      if (v.charAt(0) === "#") {
        if (typeof window.goSection === "function") window.goSection(v);
        else if (typeof window.setView === "function") window.setView(v.slice(1));
        else { location.hash = v; }
        toggle(false);
        return;
      }
      if (/^https?:/i.test(v)) { window.open(v, "_blank", "noopener"); return; }
      /* '#锚点' 兜底：非首页时先回站点根首页再定位（本地/线上都正确） */
      if (v.charAt(0) === '#') {
        var atRoot = /\/(index\.html)?$/.test(location.pathname)
          || /\/_master\/?$/.test(location.pathname);
        location.href = atRoot ? v : siteRoot() + 'index.html' + v;
        return;
      }
      if (v.charAt(0) !== '/') v = siteRoot() + v;
      location.href = v;
    }

    /* ---- 速搜 ---- */
    function renderHits(q) {
      var list = q ? searchNav(q, 20) : NAV.slice(0, 20);
      $("#wbHits").innerHTML = list.length ? list.map(function (n) {
        var meta = NAV.filter(function (x) { return x.t === n.t; })[0];
        return '<div class="wb-hit" data-j="' + esc(n.v) + '"><div class="ic">' + (n.v.charAt(0) === "#" ? "🧭" : "📄") + '</div>' +
          '<div style="min-width:0"><div class="tt">' + esc(n.t) + '</div>' +
          '<div class="dd">' + esc((meta && meta.d) || n.v) + '</div></div>' +
          '<span class="go">→</span></div>';
      }).join("") : '<div class="wb-empty">没找到「' + esc(q) + '」相关的板块</div>';
      $$("#wbHits .wb-hit").forEach(function (h) { h.onclick = function () { jump(h.dataset.j); }; });
    }
    $("#wbSearch").addEventListener("input", function (e) { renderHits(e.target.value); });
    $("#wbSearch").addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var f = $("#wbHits .wb-hit");
        if (f.length) jump(f[0].dataset.j);
      }
    });
    renderHits("");

    /* ---- 动作 ---- */
    $("#wbActs").innerHTML = ACTIONS.map(function (a) {
      return '<div class="wb-act" data-j="' + esc(a.v) + '"><span class="i">' + a.i + '</span><span class="t">' + esc(a.t) + '</span></div>';
    }).join("");
    $$("#wbActs .wb-act").forEach(function (h) { h.onclick = function () { jump(h.dataset.j); }; });

    window.addEventListener("resize", applyPos);

    /* 开合状态记忆：保留 save("open") 以便未来扩展，但**不再自动重开面板**。
       修复（2026-10-03「桌宠被锁」）：旧逻辑会记忆上次 open=true，进站 300ms
       后自动展开面板并挂 body.wb-fab-open → 互斥 CSS 把右下角桌宠/角色栏
       压成 opacity:.13 + pointer-events:none，用户一进站桌宠就是锁死的。
       现在默认收起，需要时按 Alt+K 或点悬浮球手动打开（互斥只在你主动
       使用 AI 面板时生效，关掉面板桌宠立即恢复）。 */
    if (load("open", false)) save("open", false);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
