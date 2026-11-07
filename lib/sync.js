/* lib/sync.js — A2 跨标签同步层
 * BroadcastChannel('wb_sync') 主通道 + storage 事件降级
 * 整库快照传输，rev 新者胜（同 rev 比 ts），杜绝多标签静默覆盖
 */
(function (global) {
  'use strict';
  var CH = 'wb_sync';
  var bc = null;
  try { if (global.BroadcastChannel) bc = new BroadcastChannel(CH); } catch (e) { bc = null; }

  function broadcast(root) {
    if (!global.WBStore || !root) return;
    var payload = {
      _sync: true,
      root: { schemaVersion: root.schemaVersion, data: root.data, legacy: root.legacy, rev: root.rev, ts: root.ts }
    };
    if (bc) { try { bc.postMessage(payload); } catch (e) {} }
    // storage 事件降级：写临时 key 触发其他标签
    try { localStorage.setItem('__wb_sync_ping', String(Date.now())); localStorage.removeItem('__wb_sync_ping'); } catch (e) {}
  }

  function applyRemote(payload) {
    if (!global.WBStore || !payload || !payload.root) return;
    var R = payload.root, local = global.WBStore.raw();
    var lr = local.rev || 0, lt = local.ts || 0, rr = R.rev || 0, rt = R.ts || 0;
    if (rr < lr) return;                       // 更旧丢弃
    if (rr === lr && rt <= lt) return;         // 同 rev 取更新者
    local.data = R.data;
    local.legacy = R.legacy || local.legacy;
    local.rev = rr; local.ts = rt;
    try { localStorage.setItem('wb_store', JSON.stringify(local)); } catch (e) {}
    global.WBStore._emit({ path: '*', value: local.data, rev: rr, ts: rt, source: 'remote' });
    if (typeof global.__wbOnRemote === 'function') global.__wbOnRemote();
  }

  if (bc) bc.onmessage = function (e) { var d = e.data; if (d && d._sync) applyRemote(d); };

  global.addEventListener('storage', function (e) {
    if (!e) return;
    if (e.key === '__wb_legacy_push' && e.newValue) {
      try { var p = JSON.parse(e.newValue); if (p && p.key) global.WBStore.applyLegacyRemote(p.key, p.value); } catch (err) {}
      if (typeof global.__wbOnRemote === 'function') global.__wbOnRemote();
      return;
    }
    if (e.key === 'wb_store' && e.newValue) {
      try { applyRemote({ _sync: true, root: JSON.parse(e.newValue) }); } catch (err) {}
      return;
    }
  });

  global.__wbSync = { broadcast: broadcast, channel: bc };
})(window);
