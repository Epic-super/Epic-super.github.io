// src/mobile-interactions.js — A 方向 · 移动优先交互增强
// 原生 ESM + window 桥接（与 #15 集群同构）。零构建、file:// 双击可用。
// 覆盖：① 下拉刷新（touch 手势，触发整页重渲染 + 资讯刷新 + 版本检查）
//       ② 触屏设备双击缩放禁用（防止误触发缩放、提升点按精准度）
//       ③ 视图切换后滚动位置复位（移动端 App 式体验，切 Tab 回到顶部）
// 依赖：window.renderAll（app-main 桥接）、window.initVersionCheck（version-check.js）
//       window.WBUtil.toast（可选，用于反馈）
(function () {
  'use strict';
  var U = window.WBUtil || {};

  // —— 仅触摸设备启用；桌面 (hover:hover) 跳过，避免干扰鼠标滚轮 ——
  function isTouch() {
    return window.matchMedia && window.matchMedia('(hover:none), (pointer:coarse)').matches;
  }

  /* ============ 1. 下拉刷新 ============ */
  // 逻辑：页面已滚到顶部(scrollY<=0)时，下拉超过阈值触发 refresh。
  // 视觉用 #pullHint 顶部浮条（CSS 已定义 .pull-hint）。仅移动端注入。
  var THRESHOLD = 68;         // 触发距离 px
  var pullEl = null;
  var pulling = false, startY = 0, dist = 0, fired = false;

  function initPullRefresh() {
    if (!isTouch()) return;
    if (document.getElementById('pullHint')) return;
    // 注入顶部提示条
    pullEl = document.createElement('div');
    pullEl.className = 'pull-hint';
    pullEl.id = 'pullHint';
    pullEl.innerHTML = '<span class="pull-arrow">↓</span><span class="pull-text">下拉刷新</span>';
    document.body.appendChild(pullEl);

    var main = document.scrollingElement || document.documentElement;
    document.addEventListener('touchstart', function (e) {
      if (main.scrollTop > 0) return;          // 非顶部不启用
      var t = e.touches[0];
      startY = t.clientY; dist = 0; fired = false;
      pulling = true;
    }, { passive: true });

    document.addEventListener('touchmove', function (e) {
      if (!pulling) return;
      var dy = e.touches[0].clientY - startY;
      if (dy <= 0) { dist = 0; hidePull(); return; }
      dist = Math.min(dy * 0.55, 120);         // 阻尼，防过度拉伸
      pullEl.style.opacity = (dist / THRESHOLD).toFixed(2);
      pullEl.style.transform = 'translateY(' + (dist - 100) + 'px)';
      pullEl.classList.add('show');
      pullEl.classList.toggle('ready', dist >= THRESHOLD);
      var txt = pullEl.querySelector('.pull-text');
      if (txt) txt.textContent = dist >= THRESHOLD ? '松开刷新' : '下拉刷新';
    }, { passive: true });

    document.addEventListener('touchend', function () {
      if (!pulling) return;
      pulling = false;
      if (dist >= THRESHOLD && !fired) {
        fired = true;
        doRefresh();
      }
      hidePull();
      dist = 0;
    }, { passive: true });
  }

  function hidePull() {
    if (!pullEl) return;
    pullEl.classList.remove('show', 'ready');
    pullEl.style.transform = '';
    pullEl.style.opacity = '';
  }

  function doRefresh() {
    var text = pullEl && pullEl.querySelector('.pull-text');
    if (text) text.textContent = '刷新中…';
    try {
      // 整页重渲染（状态自 localStorage/IndexedDB 重读）
      if (window.renderAll && typeof window.renderAll === 'function') window.renderAll();
      // 资讯强制刷新（若有）
      if (window.loadNews && typeof window.loadNews === 'function') window.loadNews();
      // 版本云端检查
      if (window.initVersionCheck && typeof window.initVersionCheck === 'function') window.initVersionCheck();
      if (U.toast) U.toast('已刷新');
    } catch (err) {
      if (U.toast) U.toast('刷新失败');
    }
    if (text) setTimeout(function(){ text.textContent = '下拉刷新'; }, 1200);
  }

  /* ============ 2. 双击缩放禁用 ============ */
  // 通过 meta 已部分覆盖（user-scalable=no 不适合可访问性），用 JS 拦截 300ms 双击缩放更温和
  function initNoDoubleTapZoom() {
    var last = 0;
    document.addEventListener('touchend', function (e) {
      var now = Date.now();
      if (now - last < 350) e.preventDefault();  // 双击拦截
      last = now;
    }, { passive: false });
  }

  /* ============ 3. 视图切换回顶部 ============ */
  // Tab 切换时（hash 变化）若目标在顶部区域，回滚到顶，App 式切页
  function initScrollReset() {
    var main = document.scrollingElement || document.documentElement;
    window.addEventListener('hashchange', function () {
      var h = location.hash;
      if (!h || h === '#sec-today') {           // 切到今日/首页回顶
        main.scrollTo({ top: 0, behavior: 'auto' });
      }
    });
  }

  /* —— 入口：DOM 就绪后初始化 —— */
  function init() {
    if (window.__wbMobileInit) return;
    window.__wbMobileInit = true;
    try { initPullRefresh(); } catch (e) { console.error('[wb:mobile] 下拉刷新初始化失败', e); }
    try { initScrollReset(); } catch (e) { /* 非关键 */ }
    if (isTouch()) { try { initNoDoubleTapZoom(); } catch (e) {} }
  }

  // 兼容 main.js boot 的 safeStep 调用
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.initMobileInteractions = init;  // 供 main.js boot 桥接
})();

// ES module 导出：供 main.js 命名导入（与 #15 集群同构）
export function initMobileInteractions() {
  // 模块顶层 IIFE 已自初始化；此导出供 main.js boot() safeStep 调用，
  // 幂等（__wbMobileInit 守卫），重复调用无副作用。
  return window.__wbMobileInit;
}

