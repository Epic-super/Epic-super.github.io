// #8 渐进抽取 step 4：视图导航（setView / goSection）从 app-main.js 迁出
// 原生 ESM、零数据层耦合（只碰 DOM / location / history / window），自包含 $$ 封装。
// 由 main.js(module, defer) 在 boot() 桥接回 window，兼容 index.html 内联 onclick 与 iframe 子应用。

const $$ = (sel, root = document) => Array.from((root || document).querySelectorAll(sel));

export function setView(v, noScroll) {
  if (!v || typeof v !== 'string') return;
  var target = document.getElementById(v);
  if (!target) return;
  // 已是当前视图且 hash 一致：避免重复点击导致视觉跳回顶部
  if (target.classList.contains('active') && location.hash === '#' + v) return;
  $$('.view').forEach(function (s) { s.classList.remove('active'); });
  target.classList.add('active');
  $$('#tabbar a').forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-view') === v); });
  if (location.hash !== '#' + v) { try { history.replaceState(null, '', '#' + v); } catch (e) {} }
  if (!noScroll) { window.scrollTo(0, 0); }
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
  // PEKI 作业看板：首次切到才加载子应用（本地私有数据页）
  if (v === 'sec-peki') {
    var pkf = document.getElementById('pekiFrame');
    if (pkf && !pkf.getAttribute('data-loaded')) {
      pkf.src = pkf.getAttribute('data-src');
      pkf.setAttribute('data-loaded', '1');
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
