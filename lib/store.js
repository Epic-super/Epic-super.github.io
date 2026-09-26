/* lib/store.js — A1 统一数据层 DataStore
 * 普通 <script> 引入，禁用 ES module（file:// 双击可运行）
 * 提供：store.get/set/subscribe + 兼容层 getLegacy/setLegacy + 导入导出
 * 迁移：首次运行把已知老 key 复制进 root.legacy（老 key 保留不删，零丢失）
 */
(function (global) {
  'use strict';
  var NS = 'wb_store';
  var SCHEMA = 1;

  // 已知老 key 清单（首次迁移时复制进 legacy 作影子，老 key 原样保留）
  var LEGACY_KEYS = [
    'wb_hub_data', 'wb_hub_theme', 'wb_hub_bridge', 'wb_hub_verinfo',
    'wb_sjtu_dual_v1', 'wb_sjtu_research_v1', 'wb_sjtu_mon_v1',
    'wb_renji_v1', 'wb_c2office_kp', 'wb_c2office_practice', 'wb_c2office_tasks',
    'wb_c2office_exam', 'wb_c2office_phases', 'wb_c2bank_v1',
    'wb_kaoyan_tasks', 'wb_kaoyan_subjects', 'wb_kaoyan_directions',
    'wb_kaoyan_examDate', 'wb_kaoyan_meta', 'wb_errlog',
    'wb_hub_dual_fold', 'wb_ky_verinfo', 'wb_techsec_open'
  ];

  function readRoot() {
    try {
      var raw = localStorage.getItem(NS);
      if (raw) { var o = JSON.parse(raw); if (o && typeof o === 'object' && !Array.isArray(o)) return o; }
    } catch (e) {}
    return { schemaVersion: SCHEMA, data: {}, legacy: {}, rev: 0, ts: 0 };
  }
  function writeRoot(o) {
    try { localStorage.setItem(NS, JSON.stringify(o)); return true; }
    catch (e) { if (typeof global.toast === 'function') global.toast('保存失败：本地存储可能已满'); return false; }
  }

  var root = readRoot();
  if (typeof root.schemaVersion !== 'number') root.schemaVersion = SCHEMA;
  if (!root.data) root.data = {};
  if (!root.legacy) root.legacy = {};
  if (typeof root.rev !== 'number') root.rev = 0;
  if (typeof root.ts !== 'number') root.ts = 0;

  // 迁移：复制已知老 key 进 legacy（不删老 key，零丢失）
  (function migrate() {
    if (root.migrated) return;
    LEGACY_KEYS.forEach(function (k) {
      try { var v = localStorage.getItem(k); if (v !== null && !(k in root.legacy)) root.legacy[k] = v; } catch (e) {}
    });
    root.migrated = true; writeRoot(root);
  })();

  function parse(v) { try { return JSON.parse(v); } catch (e) { return v; } }
  function get(path, def) {
    if (!path) return root.data;
    var keys = String(path).split('.'), cur = root.data;
    for (var i = 0; i < keys.length; i++) { if (cur == null) return def; cur = cur[keys[i]]; }
    return cur === undefined ? def : cur;
  }
  var subs = [];
  function emit(ev) { for (var i = 0; i < subs.length; i++) { try { subs[i](ev); } catch (e) {} } }
  function set(path, value, opts) {
    opts = opts || {};
    var keys = String(path).split('.');
    if (keys.length === 1) root.data[keys[0]] = value;
    else {
      var cur = root.data;
      for (var i = 0; i < keys.length - 1; i++) { if (typeof cur[keys[i]] !== 'object' || cur[keys[i]] === null) cur[keys[i]] = {}; cur = cur[keys[i]]; }
      cur[keys[keys.length - 1]] = value;
    }
    root.rev = (root.rev || 0) + 1; root.ts = Date.now();
    var ok = writeRoot(root);
    if (ok && !opts.silent) {
      if (global.__wbSync) global.__wbSync.broadcast(root);
      if (global.__wbIDB) global.__wbIDB.snapshot();
    }
    emit({ path: path, value: value, rev: root.rev, ts: root.ts, source: opts.source || 'local' });
    return ok;
  }
  function subscribe(cb) { subs.push(cb); return function () { var i = subs.indexOf(cb); if (i >= 0) subs.splice(i, 1); }; }

  // 兼容层：直接读写老 key（供渐进迁移，不破坏现有页面逻辑）
  function getLegacy(key, def) {
    try { var v = localStorage.getItem(key); if (v === null) return def; var p = parse(v); return p === null ? def : p; } catch (e) { return def; }
  }
  function setLegacy(key, val) {
    try {
      if (val === undefined || val === null) localStorage.removeItem(key);
      else localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val));
      root.legacy[key] = typeof val === 'string' ? val : JSON.stringify(val);
      try { writeRoot(root); } catch (e) {}
      // 跨标签同步（storage 事件降级通道）
      try { localStorage.setItem('__wb_legacy_push', JSON.stringify({ key: key, value: val })); localStorage.removeItem('__wb_legacy_push'); } catch (e) {}
      if (global.__wbIDB) try { global.__wbIDB.snapshot(); } catch (e2) {}
      return true;
    } catch (e) { return false; }
  }
  function applyLegacyRemote(key, val) {
    try { if (val === undefined || val === null) localStorage.removeItem(key); else localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val)); } catch (e) {}
  }

  function exportAll() { return JSON.stringify({ schemaVersion: SCHEMA, data: root.data, legacy: root.legacy, exportedAt: new Date().toISOString() }, null, 2); }
  function importAll(json) {
    try {
      var o = typeof json === 'string' ? JSON.parse(json) : json;
      if (o && o.data) {
        root.data = o.data; root.legacy = o.legacy || {}; root.rev = (root.rev || 0) + 1; root.ts = Date.now();
        writeRoot(root); if (global.__wbIDB) global.__wbIDB.snapshot();
        emit({ path: '*', value: root.data, rev: root.rev, ts: root.ts, source: 'import' });
        return true;
      }
    } catch (e) {}
    return false;
  }

  global.WBStore = {
    get: get, set: set, subscribe: subscribe,
    getLegacy: getLegacy, setLegacy: setLegacy, applyLegacyRemote: applyLegacyRemote,
    exportAll: exportAll, importAll: importAll,
    raw: function () { return root; }, _emit: emit
  };
  global.store = global.WBStore;
})(window);
