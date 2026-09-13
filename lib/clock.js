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
    fetch('version.json?_=' + Date.now(), { cache: 'no-store' }).then(function (r) {
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
})();
