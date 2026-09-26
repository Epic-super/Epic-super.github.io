// src/hud-rail.js — 左右 HUD 仪表舱数据刷新（未来感科技侧栏，2026-09-22）
// 超宽屏(≥1440px)显示；读真实数据：校准时钟(wbNow)、系统状态(时间同步)、
// 待办/项目/速记计数(WBState.state)、版本号(meta app-version)。
// 与 #15 集群同构：原生 ESM，safeStep 隔离接入 main.js boot；file:// 双击可用。
(function () {
  'use strict';

  function $(id) { return document.getElementById(id); }
  function num(v) { return (typeof v === 'number' && isFinite(v)) ? v : 0; }

  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var WEEK = ['日', '一', '二', '三', '四', '五', '六'];

  function tickClock() {
    var elT = $('hudTime'), elD = $('hudDate');
    if (!elT && !elD) return;
    var t = new Date(window.wbNow ? window.wbNow() : Date.now());
    if (elT) elT.textContent = pad(t.getHours()) + ':' + pad(t.getMinutes()) + ':' + pad(t.getSeconds());
    if (elD) elD.textContent = pad(t.getMonth() + 1) + '.' + pad(t.getDate()) + ' 周' + WEEK[t.getDay()];
  }

  function tickLoad() {
    var elTodo = $('hudTodo'), elProj = $('hudProj'), elNote = $('hudNote'), elBar = $('hudBar');
    if (!elTodo && !elProj && !elNote && !elBar) return;
    var state = (window.WBState && window.WBState.state) || {};
    var todos = Array.isArray(state.todos) ? state.todos : [];
    var projects = Array.isArray(state.projects) ? state.projects : [];
    var notes = Array.isArray(state.notes) ? state.notes : [];
    var done = todos.filter(function (t) { return t && t.done; }).length;
    if (elTodo) elTodo.textContent = todos.length;
    if (elProj) elProj.textContent = projects.length;
    if (elNote) elNote.textContent = notes.length;
    if (elBar) elBar.style.width = (todos.length ? Math.round(done / todos.length * 100) : 0) + '%';
  }

  function tickCore() {
    var elVer = $('hudVer'), elSync = $('hudSync');
    if (elVer) {
      var m = document.querySelector('meta[name="app-version"]');
      elVer.textContent = m ? 'v' + (m.getAttribute('content') || '-') : 'v-';
    }
    if (elSync) {
      elSync.textContent = (window.__wbOffset && Math.abs(window.__wbOffset) < 5000) ? '已同步' : '本地';
    }
  }

  function refresh() { try { tickClock(); } catch (e) {} try { tickLoad(); } catch (e) {} try { tickCore(); } catch (e) {} }

  function init() {
    if (window.__wbHudInit) return;
    window.__wbHudInit = true;
    refresh();
    setInterval(refresh, 1000);          // 时钟每秒；计数/版本低频时由同一 tick 顺带更新（廉价）
    // 数据变更后也刷新（导入/清空等触发 window 级事件时）
    window.addEventListener('wb:ready', refresh);
    window.addEventListener('storage', refresh);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

// ESM 导出：供 main.js boot() safeStep 调用（幂等，__wbHudInit 守卫）
export function initHudRail() { return window.__wbHudInit; }