// src/view-guard.js — 视图错误边界（从 src/app-main.js 迁出，原生 ESM + window 桥接）
// 自包含：仅依赖 window.errorlog（lib/errorlog.js 已加载），缺失时降级为仅 console.error。
// 脱敏构建会把本文件纳入 dist；app-main 经 main.js 桥接的 window.viewGuard / window.viewFallback 调用。

const VIEW_FALLBACK_HTML =
  '<div class="empty">⚠️ 该模块渲染异常，已降级显示，其余功能不受影响。可在「设置 → 导出诊断包」查看错误。</div>';

export function viewFallback(name, e, sel) {
  if (window.errorlog && window.errorlog.capture) window.errorlog.capture(e, 'view.' + name);
  console.error('render ' + name + ' failed:', e);
  if (!sel) return;
  try {
    var box = document.querySelector(sel);
    if (box) box.innerHTML = VIEW_FALLBACK_HTML;
  } catch (_) {}
}

export function viewGuard(name, fn, sel) {
  return function () {
    try { return fn.apply(this, arguments); }
    catch (e) { viewFallback(name, e, sel); }
  };
}
