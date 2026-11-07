/* lib/errorlog.js — 全局错误监控（B2，优化报告 B 类）
 * 捕获 window.onerror + unhandledrejection，最近 50 条环形缓冲存 localStorage（key: wb_errlog）。
 * 提供 window.__exportDiag() 下载诊断包 JSON（含版本/UA/时间/错误栈）。
 * 纯增量，不影响原有任何逻辑；普通 <script> 引入，file:// 可运行。
 */
(function () {
  var KEY = 'wb_errlog', MAX = 50;
  function ver() { var m = document.querySelector('meta[name="app-version"]'); return m ? m.getAttribute('content') : ''; }
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } }
  function push(ev) {
    var a = load();
    a.push({ t: new Date().toISOString(), msg: ev.msg || '', src: ev.src || '', line: ev.line || 0, col: ev.col || 0, ver: ver() });
    if (a.length > MAX) a = a.slice(-MAX);
    try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {}
  }
  window.addEventListener('error', function (e) {
    push({ msg: (e && e.message) || String((e && e.error) || 'error'), src: (e && e.filename) || '', line: (e && e.lineno) || 0, col: (e && e.colno) || 0 });
  });
  window.addEventListener('unhandledrejection', function (e) {
    var r = e && e.reason;
    push({ msg: 'UnhandledRejection: ' + (r && r.message ? r.message : (r ? String(r) : 'unknown')) });
  });
  window.__exportDiag = function () {
    var blob = new Blob([JSON.stringify({ ver: ver(), ua: navigator.userAgent, at: new Date().toISOString(), errs: load() }, null, 2)], { type: 'application/json' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = '诊断包_' + new Date().toISOString().slice(0, 10) + '.json'; a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  };
  /* 错误边界配套：业务代码 catch 后主动上报（tag 形如 'quiz.renderQuizQ'）。
   * 与 window.onerror 共用同一环形缓冲，不重复注册监听器。file:// 可用。 */
  window.errorlog = {
    capture: function (e, tag) {
      try {
        var msg = (e && e.message) ? e.message : String(e);
        push({ msg: (tag ? '[' + tag + '] ' : '') + msg, src: (e && e.fileName) || '', line: (e && e.lineNumber) || 0, col: (e && e.columnNumber) || 0 });
      } catch (_) {}
      if (typeof console !== 'undefined' && console.error) console.error('[errorlog' + (tag ? ':' + tag : '') + ']', e);
      return e;
    },
    list: load,
    clear: function () { try { localStorage.removeItem(KEY); } catch (e) {} }
  };
})();
