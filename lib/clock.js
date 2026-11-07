/* lib/clock.js — 服务器时间校准（B3，优化报告 B 类）
 * 所有倒计时/打卡/日期计算统一走 window.wbNow()，避免本地时钟漂移导致错乱。
 * 启动 fetch 当前页响应头 Date 算 offset，每小时重校准；file:// 或离线时 offset 保持 0（退回本地时间）。
 * 普通 <script> 引入，file:// 双击可运行，无需构建。
 */
(function () {
  window.__wbOffset = 0;
  window.wbNow = function () { return Date.now() + (window.__wbOffset || 0); };
  function parseHttpDate(ds) { if (!ds) return NaN; return Date.parse(ds); }
  function fallback() {
    if (typeof fetch !== 'function') return;
    /* 性能优化（2026-10-02）：此处只需要响应头里的 Date 做时间校准，
       原先却用 GET 把 130KB 的 version.json 整个下载下来（含 167 条变更记录）。
       改 HEAD：只取响应头，0 字节 body。HEAD 不被支持时静默保持 offset=0。 */
    fetch('version.json', { method: 'HEAD', cache: 'no-store' }).then(function (r) {
      var server = parseHttpDate(r.headers.get('Date'));
      if (!isNaN(server)) window.__wbOffset = server - Date.now();
    }).catch(function () {});
  }
  function calibrate() {
    if (typeof fetch !== 'function') return;
    fetch(location.pathname || '/', { method: 'HEAD', cache: 'no-store' }).then(function (r) {
      var server = parseHttpDate(r.headers.get('Date'));
      if (!isNaN(server)) {
        window.__wbOffset = server - Date.now();
        setTimeout(calibrate, 60 * 60 * 1000);
      } else { fallback(); }
    }).catch(function () { fallback(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', calibrate);
  else calibrate();

  /* ============================================================
   * window.wbVersion() — 版本信息共享单例（2026-10-02 性能优化）
   * ------------------------------------------------------------
   * 背景：version.json 含全量变更记录，体积已到 130KB。此前首屏有
   * 三处各自全量拉取（本文件的时间校准 fallback、src/version-check.js
   * 的版本检查与云端同步提示、src/health-radar.js 的完善度计数），
   * 实测一次首屏因此多下载约 390KB（占首屏传输量一半）。
   * 现在统一入口：内存单例 + sessionStorage 5 分钟缓存，
   * 全站一轮首屏最多一次真实下载（其余走缓存/条件请求 304）。
   * 放在 clock.js 是因为它是最早加载的脚本（head 同步引入）。
   * ============================================================ */
  var VER_KEY = 'wb_version_cache', VER_TTL = 5 * 60 * 1000;
  window.wbVersion = function (opts) {
    opts = opts || {};
    if (window.__wbVerPromise && !opts.force) return window.__wbVerPromise;
    if (typeof fetch !== 'function') return Promise.resolve(null);
    if (!opts.force) {
      try {
        var c = JSON.parse(sessionStorage.getItem(VER_KEY) || 'null');
        if (c && c.ts && (Date.now() - c.ts) < (opts.ttl || VER_TTL)) {
          return (window.__wbVerPromise = Promise.resolve(c.d));
        }
      } catch (e) { /* 隐私模式等：忽略缓存，正常走网络 */ }
    }
    /* cache:'no-cache' = 每次都向服务器校验，命中则 304（0 字节 body），
       比 'no-store' 的无条件全量下载省得多 */
    var p = fetch('version.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (d && d.version) {
          try { sessionStorage.setItem(VER_KEY, JSON.stringify({ ts: Date.now(), d: d })); } catch (e) { }
        }
        return d;
      })
      .catch(function () { window.__wbVerPromise = null; return null; });
    window.__wbVerPromise = p;
    return p;
  };
})();
