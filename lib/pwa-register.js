// lib/pwa-register.js — 注册 Service Worker + 触底"添加到主屏幕"提示
// 仅在 https/localhost 生效（PWA 要求安全上下文），file:// 直接跳过，不影响本地双击使用。
(function () {
  if (!('serviceWorker' in navigator)) return;
  // 非安全上下文（file:// 或纯 http 公网）跳过，避免无谓报错
  if (!window.isSecureContext) return;
  if (window.__WB_PUBLIC__ !== true) {
    // 本地 file:// 下不会注入 __WB_PUBLIC__，但 git 起服务 / localhost 开发时仍想可用：
    // 用 secureContext + 非 file 协议判定。isSecureContext 已排除 file://，故直接注册。
  }

  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').then(function (reg) {
      // 提示可安装（仅桌面 Chrome/Edge 触发 beforeinstallprompt）
      window.__a2hsPrompt = null;
      window.addEventListener('beforeinstallprompt', function (e) {
        e.preventDefault();
        window.__a2hsPrompt = e;
      });
      // 更新检测：有新版本自动通知
      reg.addEventListener('updatefound', function () {
        var sw = reg.installing;
        if (!sw) return;
        sw.addEventListener('statechange', function () {
          if (sw.state === 'installed' && navigator.serviceWorker.controller) {
            try { console.info('[PWA] 新版本已就绪，刷新后生效'); } catch (e) {}
          }
        });
      });
    }).catch(function (err) {
      try { console.warn('[PWA] SW 注册失败（可忽略）:', err && err.message); } catch (e) {}
    });
  });
})();
