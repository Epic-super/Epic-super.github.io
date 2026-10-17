// src/exam-news.js — 考公 × 考研资讯（加载 / 渲染 / Tab 切换 / 分类筛选 / 关键词搜索 / 详情展开 / 分页）
// 与 src/news.js 同构：原生 ESM + window.WBUtil，无构建依赖、file:// 双击可用。
// 数据来源：优先 fetch 外部 exam-news.json（更新只改该文件），失败回退 index.html 内联 #exam-feed 兜底。
// 数据结构对齐研途通 GET /api/news 真实响应：{code,msg,data:{<exam>:{total,page,size,pages,categories[],items[]}}}
// item={id,title,category,summary,content,source,publish_date,views,is_top,url} —— 未来接后端只换数据源，不动字段。

const U = window.WBUtil || {};

/* ---- 模块私有状态（不读写主 state） ---- */
var examData = null;          // 完整响应体
var exTab = "gongkao";        // 当前考试类型：gongkao | kaoyan
var exCat = "all";            // 当前分类筛选
var exKw = "";                // 关键词
var exShown = 0;              // 当前已渲染条数（分页游标）
var exOpenId = null;          // 展开详情的条目 id（每次仅展开一条）
var EX_PAGE = 5;              // 每页条数（与「查看更多」步长一致）
var EX_FRESH_DAYS = 7;        // publish_date 距 updatedAt 不超过该天数标「最新」

var EX_TABS = { gongkao: "考公", kaoyan: "考研" };
/* 考研 Tab 页脚引流：研途通完整数据平台（院校库/分数线/报录比需登录） */
var KAOYAN_PORTAL = "http://175.24.191.223/";

/* 分类 → 色调类（c0..c5），按类名哈希稳定取色，新增分类无需改样式 */
function exTone(cat) {
  var s = String(cat || ""), h = 0;
  for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return "ex-c" + (h % 6);
}

function fmtViews(v) {
  v = Number(v) || 0;
  return v >= 10000 ? (v / 10000).toFixed(1).replace(/\.0$/, "") + "万" : String(v);
}

function curSet() {
  return (examData && examData.data && examData.data[exTab]) || null;
}

function loadExamNews() {
  var box = U.$("#exList"); if (!box) return;
  box.innerHTML = '<div class="empty">资讯加载中…</div>';
  if (typeof fetch === "function") {
    fetch("exam-news.json?_=" + Date.now(), { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (j) { examData = j; renderExamNews(); })
      .catch(function () { loadExamNewsLocal(); });
  } else { loadExamNewsLocal(); }
}

function loadExamNewsLocal() {
  var local = U.$("#exam-feed"), box = U.$("#exList");
  if (local) {
    try { examData = JSON.parse(local.textContent); renderExamNews(); return; } catch (e) { /* 落到下方错误态 */ }
  }
  if (box) box.innerHTML = '<div class="empty">无法加载资讯（本地 file:// 模式不支持 fetch，且内联数据缺失）</div>';
}

/* 错误边界：渲染失败时降级占位，不拖垮整页（与 news.js 的 P2-10 同款） */
function renderExamNews() {
  try { __renderExamNews(); }
  catch (e) {
    if (window.errorlog && window.errorlog.capture) window.errorlog.capture(e, "examNews.render");
    var nb = U.$("#exList");
    if (nb) nb.innerHTML = '<div class="empty">⚠️ 资讯渲染异常，已降级显示。请刷新重试或切换分类。</div>';
  }
}

function __renderExamNews() {
  var box = U.$("#exList"); if (!box) return;
  var set = curSet();
  var upd = U.$("#exUpdated");
  if (upd) upd.textContent = (examData && examData.updatedAt) ? ("更新于 " + examData.updatedAt) : "";

  renderExChips(set);

  var items = (set && set.items) ? set.items.slice() : [];
  if (!items.length) { box.innerHTML = '<div class="empty">暂无资讯</div>'; renderExFoot(0, 0); return; }

  // 排序：置顶优先，其后按发布日期倒序（与研途通列表序一致）
  items.sort(function (a, b) {
    var t = (b.is_top ? 1 : 0) - (a.is_top ? 1 : 0);
    if (t) return t;
    return String(b.publish_date || "").localeCompare(String(a.publish_date || ""));
  });

  // 分类筛选
  if (exCat !== "all") items = items.filter(function (it) { return it.category === exCat; });
  // 关键词搜索：标题 / 摘要 / 来源
  if (exKw) {
    var kw = exKw.toLowerCase();
    items = items.filter(function (it) {
      return (String(it.title || "") + " " + String(it.summary || "") + " " + String(it.source || "")).toLowerCase().indexOf(kw) >= 0;
    });
  }
  if (!items.length) { box.innerHTML = '<div class="empty">没有匹配的资讯，换个关键词或分类试试</div>'; renderExFoot(0, 0); return; }

  // 分页：翻Tab/筛选/搜索时游标归零（在各事件处理器里做），此处钳制
  if (exShown <= 0) exShown = EX_PAGE;
  var shown = Math.min(exShown, items.length);
  var freshBefore = "";
  if (examData && examData.updatedAt) {
    var t0 = Date.parse(examData.updatedAt);
    if (isFinite(t0)) freshBefore = t0; // 距 updatedAt ≤ EX_FRESH_DAYS 天标「最新」
  }

  box.innerHTML = items.slice(0, shown).map(function (it) {
    return exCardHtml(it, freshBefore);
  }).join("");
  renderExFoot(shown, items.length);
}

function exCardHtml(it, freshBefore) {
  var id = U.attrSafe ? U.attrSafe(String(it.id)) : String(it.id);
  var tone = exTone(it.category);
  var badges = "";
  if (it.is_top) badges += '<span class="ex-badge top">置顶</span>';
  if (freshBefore && Date.parse(it.publish_date || "") >= freshBefore - EX_FRESH_DAYS * 86400000) {
    badges += '<span class="ex-badge new">最新</span>';
  }
  var url = U.safeUrl(it.url || "");
  var meta = '<div class="ex-meta">'
    + '<span>' + U.esc(it.source || "未知来源") + '</span>'
    + '<span>' + U.esc(it.publish_date || "") + '</span>'
    + '<span>' + fmtViews(it.views) + ' 阅读</span>'
    + '<span class="ex-toggle">' + (exOpenId === it.id ? "收起 ↑" : "详情 ↓") + '</span>'
    + '</div>';
  var detail = "";
  if (exOpenId === it.id) {
    var paras = String(it.content || "").split(/\n{2,}/).filter(function (p) { return p.trim(); });
    detail = '<div class="ex-detail">'
      + (paras.length
        ? paras.map(function (p) { return "<p>" + U.esc(p.trim()) + "</p>"; }).join("")
        : '<p class="ex-detail-none">该条目暂无正文，摘要即全部内容。</p>')
      + (url ? '<div class="ex-src"><a href="' + U.esc(url) + '" target="_blank" rel="noopener">前往来源：' + U.esc(it.source || url) + " ↗</a></div>" : "")
      + "</div>";
  }
  return '<div class="news-item ex-item ' + tone + (exOpenId === it.id ? " open" : "") + '" data-id="' + id + '" role="button" tabindex="0" aria-expanded="' + (exOpenId === it.id ? "true" : "false") + '">'
    + '<div class="ex-head"><span class="ncat ' + tone + '">' + U.esc(it.category || "未分类") + "</span>" + badges + "</div>"
    + '<div class="ntitle">' + U.esc(it.title || "") + "</div>"
    + (it.summary ? '<div class="ndesc">' + U.esc(it.summary) + "</div>" : "")
    + meta + detail
    + "</div>";
}

function renderExChips(set) {
  var box = U.$("#exChips"); if (!box) return;
  var cats = (set && set.categories) ? set.categories : [];
  var html = '<button class="news-chip' + (exCat === "all" ? " active" : "") + '" data-c="all">全部</button>'
    + cats.map(function (c) {
      return '<button class="news-chip' + (exCat === c.category ? " active" : "") + '" data-c="' + U.esc(c.category) + '">' + U.esc(c.category) + " " + (c.c || 0) + "</button>";
    }).join("");
  box.innerHTML = html;
}

function renderExFoot(shown, total) {
  var foot = U.$("#exFoot"); if (!foot) return;
  var html = "";
  if (total > 0) {
    html += '<div class="ex-count">已显示 ' + shown + " / 共 " + total + " 条</div>";
    if (shown < total) {
      html += '<button class="btn sm ghost ex-more" id="exMore">查看更多（还有 ' + (total - shown) + " 条）↓</button>";
    }
  }
  if (exTab === "kaoyan") {
    html += '<div class="ex-portal">数据示例引自研途通平台 · <a href="' + KAOYAN_PORTAL + '" target="_blank" rel="noopener">研途通 · 考研择校择专业数据平台 ↗</a>（院校库 / 分数线 / 报录比需登录查看）</div>';
  }
  foot.innerHTML = html;
}

export function initExamNews() {
  // Tab 切换：考公 / 考研
  var tabs = U.$("#exTabs");
  if (tabs) tabs.addEventListener("click", function (e) {
    var b = e.target.closest(".ex-tab"); if (!b) return;
    var t = b.getAttribute("data-ex");
    if (!EX_TABS[t] || t === exTab) return;
    exTab = t; exCat = "all"; exShown = 0; exOpenId = null;
    Array.prototype.forEach.call(tabs.querySelectorAll(".ex-tab"), function (x) { x.classList.toggle("active", x === b); });
    renderExamNews();
  });
  // 分类筛选（复用 news-chip 样式，事件委托）
  var chips = U.$("#exChips");
  if (chips) chips.addEventListener("click", function (e) {
    var c = e.target.closest(".news-chip"); if (!c) return;
    exCat = c.getAttribute("data-c") || "all"; exShown = 0; exOpenId = null;
    renderExamNews();
  });
  // 关键词搜索
  var search = U.$("#exSearch");
  if (search) search.addEventListener("input", function () {
    exKw = search.value.trim(); exShown = 0; exOpenId = null;
    renderExamNews();
  });
  // 卡片点击展开 / 收起详情（键盘 Enter/Space 同效）；「查看更多」事件委托
  var list = U.$("#exList");
  if (list) {
    list.addEventListener("click", function (e) {
      if (e.target.closest("a")) return; // 详情里的来源链接放行
      var card = e.target.closest(".ex-item"); if (!card) return;
      var id = card.getAttribute("data-id");
      exOpenId = (exOpenId !== null && String(exOpenId) === id) ? null : (isNaN(+id) ? id : +id);
      renderExamNews();
    });
    list.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var card = e.target.closest(".ex-item"); if (!card) return;
      e.preventDefault();
      var id = card.getAttribute("data-id");
      exOpenId = (exOpenId !== null && String(exOpenId) === id) ? null : (isNaN(+id) ? id : +id);
      renderExamNews();
    });
  }
  var foot = U.$("#exFoot");
  if (foot) foot.addEventListener("click", function (e) {
    if (!e.target.closest("#exMore")) return;
    exShown += EX_PAGE;
    renderExamNews();
  });
  loadExamNews();
}
