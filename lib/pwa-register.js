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
      // 更新检测：新 SW 就绪 → 轻提示条 + 自动刷新一次（缓存名随版本轮换后，旧缓存已全清）
      reg.addEventListener('updatefound', function () {
        var sw = reg.installing;
        if (!sw) return;
        sw.addEventListener('statechange', function () {
          if (sw.state === 'installed' && navigator.serviceWorker.controller) {
            try { console.info('[PWA] 新版本已就绪，刷新后生效'); } catch (e) {}
            window.__swWaiting = sw;
            showUpdateToast();
          }
        });
      });
      // 新 SW claim 后（skipWaiting 已在 install 时调用）自动刷新一次；
      // sessionStorage 防循环：一次会话最多因 SW 接管自动刷新一次。
      var RK = 'sw_auto_reloaded';
      var claimed = false;
      navigator.serviceWorker.addEventListener('controllerchange', function () {
        if (!claimed) { claimed = true; return; } // 首次接管不算
        try {
          if (sessionStorage.getItem(RK)) return;
          sessionStorage.setItem(RK, '1');
        } catch (e) { return; }
        location.reload();
      });
    }).catch(function (err) {
      try { console.warn('[PWA] SW 注册失败（可忽略）:', err && err.message); } catch (e) {}
    });
  });

  // —— 更新提示条（点击立即切换到新版本，20s 不点自动消失）——
  function showUpdateToast() {
    if (document.getElementById('swUpdToast')) return;
    var t = document.createElement('div');
    t.id = 'swUpdToast';
    t.setAttribute('role', 'status');
    t.style.cssText = 'position:fixed;right:16px;bottom:96px;z-index:9991;display:flex;align-items:center;gap:10px;'
      + 'padding:10px 14px;border-radius:12px;border:1px solid rgba(124,240,199,.35);background:rgba(5,18,22,.94);'
      + 'color:#dffef5;font:600 12.5px -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;'
      + 'box-shadow:0 12px 32px rgba(0,0,0,.4);cursor:pointer;animation:swUpdIn .3s ease both';
    t.innerHTML = '<span>✨ 塔台已更新到新版本</span><b style="color:#7cf0c7">刷新</b>';
    var st = document.createElement('style');
    st.textContent = '@keyframes swUpdIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}';
    document.head.appendChild(st);
    t.addEventListener('click', function () {
      if (window.__swWaiting) { try { window.__swWaiting.postMessage('SKIP_WAITING'); } catch (e) {} }
      // install 已 skipWaiting，兜底直接刷新（新资源缓存名已轮换，无旧缓存可吃）
      location.reload();
    });
    document.body.appendChild(t);
    setTimeout(function () { if (t.parentNode) t.remove(); }, 20000);
  }
})();
