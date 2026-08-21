/* lib/idb-backup.js — B1 IndexedDB 双写兜底 + 崩溃恢复
 * 核心数据 localStorage + IndexedDB 双写；写入 debounce 3s 带时间戳快照，保留最近 5 份
 * 启动比对 IDB 最新快照 vs localStorage，更新则提示一键恢复；导出文件名带日期
 */
(function (global) {
  'use strict';
  var DB = 'wb_store_idb', STORE = 'snaps', MAX = 5;
  var idb = null, timer = null, restoring = false;

  function openDB() {
    return new Promise(function (res, rej) {
      if (!global.indexedDB) return rej('no-idb');
      var r = indexedDB.open(DB, 1);
      r.onupgradeneeded = function () { try { r.result.createObjectStore(STORE, { keyPath: 'ts' }); } catch (e) {} };
      r.onsuccess = function () { idb = r.result; res(idb); };
      r.onerror = function () { rej(r.error); };
    });
  }
  function tx(mode) { return idb.transaction(STORE, mode).objectStore(STORE); }
  function put(snap) { return new Promise(function (res, rej) { var t = tx('readwrite'); var r = t.put(snap); r.onsuccess = function () { res(); }; r.onerror = function () { rej(r.error); }; }); }
  function all() {
    return new Promise(function (res, rej) {
      var out = []; var t = tx('readonly'); var c = t.openCursor();
      c.onsuccess = function (e) { var cur = e.target.result; if (cur) { out.push(cur.value); cur.continue(); } else res(out); };
      c.onerror = function () { rej(c.error); };
    });
  }
  function del(ts) { return new Promise(function (res, rej) { var t = tx('readwrite'); var r = t.delete(ts); r.onsuccess = function () { res(); }; r.onerror = function () { rej(r.error); }; }); }

  function snapshot() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      if (!idb || restoring) return;
      var root = global.WBStore ? global.WBStore.raw() : null;
      if (!root) return;
      var snap = { ts: Date.now(), rev: root.rev || 0, data: root.data, legacy: root.legacy };
      put(snap).then(prune).catch(function () {});
    }, 3000);
  }
  function prune() {
    all().then(function (list) {
      list.sort(function (a, b) { return a.ts - b.ts; });
      while (list.length > MAX) { var old = list.shift(); del(old.ts); }
    }).catch(function () {});
  }

  function checkRestore() {
    if (!idb || !global.WBStore) return;
    var local = global.WBStore.raw();
    all().then(function (list) {
      if (!list.length) return;
      list.sort(function (a, b) { return b.ts - a.ts; });
      var newest = list[0];
      if (newest.rev > (local.rev || 0)) {
        if (typeof global.__wbShowRestore === 'function') global.__wbShowRestore(newest);
      }
    }).catch(function () {});
  }
  function restore(snap) {
    if (!global.WBStore || !snap) return false;
    restoring = true;
    var ok = global.WBStore.importAll({ schemaVersion: 1, data: snap.data, legacy: snap.legacy });
    setTimeout(function () { restoring = false; }, 500);
    return ok;
  }
  function exportFile() {
    if (!global.WBStore) return;
    var json = global.WBStore.exportAll();
    var d = new Date(), p = function (n) { return ('0' + n).slice(-2); };
    var name = 'wb_store_backup_' + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '.json';
    try {
      var blob = new Blob([json], { type: 'application/json' });
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    } catch (e) {}
  }

  openDB().then(function () { snapshot(); checkRestore(); }).catch(function () {});

  global.__wbIDB = { snapshot: snapshot, restore: restore, exportFile: exportFile, checkRestore: checkRestore };
})(window);
