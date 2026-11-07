// #8 渐进抽取 step 4：视图导航（setView / goSection）从 app-main.js 迁出
// 原生 ESM、零数据层耦合（只碰 DOM / location / history / window），自包含 $$ 封装。
// 由 main.js(module, defer) 在 boot() 桥接回 window，兼容 index.html 内联 onclick 与 iframe 子应用。

const $$ = (sel, root = document) => Array.from((root || document).querySelectorAll(sel));

/* ===== P3 视图懒挂载（2026-11-07）=====
 * 背景：首屏 38 个 <section> 里有 2 个体量特别大 —— sec-subs（50 张子系统卡，480 个标签）
 * 与 sec-brand（284 个标签），两者合计占 section 静态标签的 50%。它们一次性解析进 DOM，
 * 但用户不点就永远看不到（.view 默认 display:none）。
 *
 * 做法：把这两个 section 的**子内容**搬到 <template> 里，首次切到该视图时再 inflate。
 * 与原 HTML 完全等价 —— template 内容不会被解析成活动 DOM，只保留一段惰性片段。
 *
 * 为什么不用 content-visibility:auto / loading=lazy：
 *   它们优化的是「渲染」与「资源加载」，而这里的成本在 **DOM 解析 + HTML 体积**，
 *   隐藏 section 本就不参与渲染（.view{display:none}），所以那些手段对它无效。
 *
 * 安全性：
 *   · 幂等：每个视图只 inflate 一次，重复切不重复插入
 *   · 兜底：boot 后立即检查当前 hash；若首次落地就是这几个视图，立刻 inflate
 *   · 失败降级：模板块缺失/解析异常时，什么都不做（页面保持原样，不会白屏）
 *   · 对外接口不变：section 元素本身始终在 DOM 里（保证 getElementById 拿得到），
 *     只有它的**子节点**被延迟填充 —— 所以锚点跳转、setView 的 id 查找都不受影响
 */
const LAZY_TEMPLATE_PREFIX = 'tpl-';

export function inflateView(v) {
  if (!v || typeof v !== 'string') return false;
  var tpl = document.getElementById(LAZY_TEMPLATE_PREFIX + v);
  if (!tpl) return false;                       // 不是懒挂载视图
  var host = document.getElementById(v);
  if (!host) return false;
  if (tpl.getAttribute('data-inflated') === '1') return false;   // 幂等
  try {
    var frag = tpl.content ? tpl.content.cloneNode(true) : null;
    if (!frag) return false;
    host.appendChild(frag);
    tpl.setAttribute('data-inflated', '1');
    // 通知订阅方（如子系统卡的计数/搜索索引需要重新扫描）
    try {
      window.dispatchEvent(new CustomEvent('wb:view-inflated', { detail: { view: v } }));
    } catch (e) { /* 老浏览器无 CustomEvent 构造器 */ }
    return true;
  } catch (e) {
    if (window.errorlog && window.errorlog.capture) window.errorlog.capture(e, 'nav.inflateView:' + v);
    return false;
  }
}

export function setView(v, noScroll) {
  if (!v || typeof v !== 'string') return;
  var target = document.getElementById(v);
  if (!target) return;
  // P3：切到该视图前先补齐被延迟的内容（必须在 doSwap 之前，
  // 否则 View Transition 会拍到「空 section」这一帧，出现闪烁）。
  inflateView(v);
  // 已是当前视图且 hash 一致：避免重复点击导致视觉跳回顶部
  if (target.classList.contains('active') && location.hash === '#' + v) return;
  var doSwap = function () {
    $$('.view').forEach(function (s) { s.classList.remove('active'); });
    target.classList.add('active');
    $$('#tabbar a').forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-view') === v); });
    if (location.hash !== '#' + v) { try { history.replaceState(null, '', '#' + v); } catch (e) {} }
    if (!noScroll) { window.scrollTo(0, 0); }
  };
  // 现代视图切换：支持 View Transitions 且系统未减弱动效时启用，否则保持原样即时切换
  var vmReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typeof document.startViewTransition === 'function' && !vmReduce) {
    document.startViewTransition(doSwap);
  } else {
    doSwap();
  }
  // 人际·恋爱台：首次切到才加载子应用，避免首屏预载隐藏 iframe；同时监听加载失败
  if (v === 'sec-renji') {
    var rf = document.getElementById('renjiFrame');
    if (rf && !rf.getAttribute('data-loaded')) {
      rf.onerror = function () {
        var el = document.getElementById('sec-renji');
        if (el) el.insertAdjacentHTML('beforeend', '<div class="empty" style="margin-top:12px">人际·恋爱台加载失败，请刷新重试</div>');
      };
      rf.src = rf.getAttribute('data-src');
      rf.setAttribute('data-loaded', '1');
    }
  }
  // 职业规划平台：首次切到才加载子应用，复用懒加载模式
  if (v === 'sec-career') {
    var cf = document.getElementById('careerFrame');
    if (cf && !cf.getAttribute('data-loaded')) {
      cf.onerror = function () {
        var el = document.getElementById('sec-career');
        if (el) el.insertAdjacentHTML('beforeend', '<div class="empty" style="margin-top:12px">职业规划平台加载失败，请刷新重试</div>');
      };
      cf.src = cf.getAttribute('data-src');
      cf.setAttribute('data-loaded', '1');
    }
  }
  // 今天吃什么：首次切到才加载子应用，复用懒加载模式
  if (v === 'sec-eat') {
    var ef = document.getElementById('eatFrame');
    if (ef && !ef.getAttribute('data-loaded')) {
      ef.onerror = function () {
        var el = document.getElementById('sec-eat');
        if (el) el.insertAdjacentHTML('beforeend', '<div class="empty" style="margin-top:12px">今天吃什么加载失败，请刷新重试</div>');
      };
      ef.src = ef.getAttribute('data-src');
      ef.setAttribute('data-loaded', '1');
    }
  }
  // Python 小尝试：首次切到才加载子应用，复用懒加载模式
  if (v === 'sec-practice') {
    var pf = document.getElementById('practiceFrame');
    if (pf && !pf.getAttribute('data-loaded')) {
      pf.onerror = function () {
        var el = document.getElementById('sec-practice');
        if (el) el.insertAdjacentHTML('beforeend', '<div class="empty" style="margin-top:12px">Python 小尝试加载失败，请刷新重试</div>');
      };
      pf.src = pf.getAttribute('data-src');
      pf.setAttribute('data-loaded', '1');
    }
  }
  // PEKI 作业看板：本地私有数据页，公开站不部署 peki.html。
  // 上锁策略：file:// 本地直接加载；http(s) 先 HEAD 探测，200 才挂 iframe，
  // 404/缺失则隐藏 iframe 并渲染锁定面板（fetch 异常时保守放行，交由 onerror 兜底）。
  if (v === 'sec-peki') {
    var pkf = document.getElementById('pekiFrame');
    if (pkf && !pkf.getAttribute('data-loaded')) {
      pkf.setAttribute('data-loaded', '1');
      var pkSrc = pkf.getAttribute('data-src');
      var pkLock = function () {
        pkf.style.display = 'none';
        var tip = document.createElement('div');
        tip.className = 'empty peki-lock';
        tip.style.cssText = 'min-height:160px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;text-align:center;margin-top:8px';
        tip.innerHTML = '<div style="font-size:30px" aria-hidden="true">🔒</div>'
          + '<div><b>PEKI 作业看板 · 本地私有数据</b></div>'
          + '<div style="color:var(--muted)">该看板仅存在于本地版本，未部署到公开站。数据只存本地浏览器。</div>';
        pkf.parentNode.insertBefore(tip, pkf);
      };
      if (location.protocol === 'file:') {
        pkf.src = pkSrc;
      } else {
        fetch(pkSrc, { method: 'HEAD' }).then(function (r) {
          if (r.ok) pkf.src = pkSrc; else pkLock();
        }).catch(function () { pkf.src = pkSrc; });
      }
    }
  }
  // 寻找天赋（突触地图）：首次切到才加载子应用，复用懒加载模式
  if (v === 'sec-talent') {
    var tf = document.getElementById('talentFrame');
    if (tf && !tf.getAttribute('data-loaded')) {
      tf.onerror = function () {
        var el = document.getElementById('sec-talent');
        if (el) el.insertAdjacentHTML('beforeend', '<div class="empty" style="margin-top:12px">寻找天赋加载失败，请刷新重试</div>');
      };
      tf.src = tf.getAttribute('data-src');
      tf.setAttribute('data-loaded', '1');
    }
  }
  // 打气站：首次切到才加载子应用，复用懒加载模式
  if (v === 'sec-cheer') {
    var chf = document.getElementById('cheerFrame');
    if (chf && !chf.getAttribute('data-loaded')) {
      chf.onerror = function () {
        var el = document.getElementById('sec-cheer');
        if (el) el.insertAdjacentHTML('beforeend', '<div class="empty" style="margin-top:12px">打气站加载失败，请刷新重试</div>');
      };
      chf.src = chf.getAttribute('data-src');
      chf.setAttribute('data-loaded', '1');
    }
  }
  // 风景实况地图集：首次切到才加载子应用
  if (v === 'sec-worldviews') {
    var wvf = document.getElementById('worldFrame');
    if (wvf && !wvf.getAttribute('data-loaded')) {
      wvf.src = wvf.getAttribute('data-src');
      wvf.setAttribute('data-loaded', '1');
    }
  }
  // 苏州自考信息站：首次切到才加载子应用
  if (v === 'sec-zksz') {
    var zsf = document.getElementById('zkSzFrame');
    if (zsf && !zsf.getAttribute('data-loaded')) {
      zsf.onerror = function () {
        var el = document.getElementById('sec-zksz');
        if (el) el.insertAdjacentHTML('beforeend', '<div class="empty" style="margin-top:12px">苏州自考信息站加载失败，请刷新重试</div>');
      };
      zsf.src = zsf.getAttribute('data-src');
      zsf.setAttribute('data-loaded', '1');
    }
  }
  // 永恒层：首次切到才加载子应用，复用懒加载模式
  if (v === 'sec-durable') {
    var dlf = document.getElementById('durableFrame');
    if (dlf && !dlf.getAttribute('data-loaded')) {
      dlf.onerror = function () {
        var el = document.getElementById('sec-durable');
        if (el) el.insertAdjacentHTML('beforeend', '<div class="empty" style="margin-top:12px">永恒层加载失败，请刷新重试</div>');
      };
      dlf.src = dlf.getAttribute('data-src');
      dlf.setAttribute('data-loaded', '1');
    }
  }
  // 网安擂台：首次切到才加载子应用，复用懒加载模式
  if (v === 'sec-cyber') {
    var cbf = document.getElementById('cyberFrame');
    if (cbf && !cbf.getAttribute('data-loaded')) {
      cbf.onerror = function () {
        var el = document.getElementById('sec-cyber');
        if (el) el.insertAdjacentHTML('beforeend', '<div class="empty" style="margin-top:12px">网安擂台加载失败，请刷新重试</div>');
      };
      cbf.src = cbf.getAttribute('data-src');
      cbf.setAttribute('data-loaded', '1');
    }
  }
  // 硬件工坊：首次切到才加载子应用
  if (v === 'sec-hwlab') {
    var hwf = document.getElementById('hwFrame');
    if (hwf && !hwf.getAttribute('data-loaded')) {
      hwf.onerror = function () {
        var el = document.getElementById('sec-hwlab');
        if (el) el.insertAdjacentHTML('beforeend', '<div class="empty" style="margin-top:12px">硬件工坊加载失败，请刷新重试</div>');
      };
      hwf.src = hwf.getAttribute('data-src');
      hwf.setAttribute('data-loaded', '1');
    }
  }
  // Vibe Coding 工作台：首次切到才加载子应用
  if (v === 'sec-vibe') {
    var vbf = document.getElementById('vibeFrame');
    if (vbf && !vbf.getAttribute('data-loaded')) {
      vbf.src = vbf.getAttribute('data-src');
      vbf.setAttribute('data-loaded', '1');
    }
  }
  // 旅游日记：首次切到才加载子应用
  if (v === 'sec-travel') {
    var tvf = document.getElementById('travelFrame');
    if (tvf && !tvf.getAttribute('data-loaded')) {
      tvf.src = tvf.getAttribute('data-src');
      tvf.setAttribute('data-loaded', '1');
    }
  }
  // 课程对标实验室：首次切到才加载子应用
  if (v === 'sec-clab') {
    var clf = document.getElementById('clabFrame');
    if (clf && !clf.getAttribute('data-loaded')) {
      clf.src = clf.getAttribute('data-src');
      clf.setAttribute('data-loaded', '1');
    }
  }
  // 月读空间：首次切到才加载子应用
  if (v === 'sec-tsukuyomi') {
    var tkf = document.getElementById('tsukuyomiFrame');
    if (tkf && !tkf.getAttribute('data-loaded')) {
      tkf.src = tkf.getAttribute('data-src');
      tkf.setAttribute('data-loaded', '1');
    }
  }
  // 开发消耗看板：首次切到才加载子应用
  if (v === 'sec-ledger') {
    var lgf = document.getElementById('ledgerFrame');
    if (lgf && !lgf.getAttribute('data-loaded')) {
      lgf.src = lgf.getAttribute('data-src');
      lgf.setAttribute('data-loaded', '1');
    }
  }
  // 考研方向罗盘：首次切到才加载子应用
  if (v === 'sec-compass') {
    var cpf = document.getElementById('compassFrame');
    if (cpf && !cpf.getAttribute('data-loaded')) {
      cpf.src = cpf.getAttribute('data-src');
      cpf.setAttribute('data-loaded', '1');
    }
  }
  // 独立游戏开发者作品集：首次切到才加载子应用
  if (v === 'sec-indie-portfolio') {
    var ipf = document.getElementById('indiePortfolioFrame');
    if (ipf && !ipf.getAttribute('data-loaded')) {
      ipf.src = ipf.getAttribute('data-src');
      ipf.setAttribute('data-loaded', '1');
    }
  }
  // SpaceX Starship 3D 工程学习平台：首次切到才加载子应用
  if (v === 'sec-starship-3d') {
    var sf = document.getElementById('starship3dFrame');
    if (sf && !sf.getAttribute('data-loaded')) {
      sf.src = sf.getAttribute('data-src');
      sf.setAttribute('data-loaded', '1');
    }
  }
  // 探索 · AI 视频工作流：首次切到才加载子应用（MoneyPrinterTurbo 本地服务探测 + 开源方案入口）
  if (v === 'sec-explore') {
    var exf = document.getElementById('exploreFrame');
    if (exf && !exf.getAttribute('data-loaded')) {
      exf.src = exf.getAttribute('data-src');
      exf.setAttribute('data-loaded', '1');
    }
  }
  // 技术债清算台：首次切到才加载子应用
  if (v === 'sec-techdebt') {
    var tdf = document.getElementById('techdebtFrame');
    if (tdf && !tdf.getAttribute('data-loaded')) {
      tdf.onerror = function () {
        var el = document.getElementById('sec-techdebt');
        if (el) el.insertAdjacentHTML('beforeend', '<div class="empty" style="margin-top:12px">技术债清算台加载失败，请刷新重试</div>');
      };
      tdf.src = tdf.getAttribute('data-src');
      tdf.setAttribute('data-loaded', '1');
    }
  }
}

// ---- 内部锚点统一处理：避免 display:none 导致原生锚点跑偏 ----
export function goSection(hash) {
  if (!hash || hash.charAt(0) !== '#') return;
  var id = hash.slice(1), el = document.getElementById(id);
  if (!el) return;
  // 先切到所属视图
  var view = el.closest('.view');
  if (view && view.id) setView(view.id, true);
  // 若目标是 sec-xxx 本身，滚动置顶已由 setView 处理（noScroll=true 不处理，这里自己滚）
  if (id.indexOf('sec-') === 0) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  // 子模块平滑滚动，预留 topbar 空间
  var topPad = 16;
  try {
    var rect = el.getBoundingClientRect();
    var top = window.scrollY + rect.top - topPad;
    window.scrollTo({ top: top, behavior: 'smooth' });
  } catch (e) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
}
