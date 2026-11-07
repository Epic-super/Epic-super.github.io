/* =========================================================================
 * lib/bundle.js —— 首屏 lib/*.js 合并产物（自动生成，请勿手改）
 *
 * 生成: node tools/build-lib-bundle.mjs
 * 内容: lib/env-guard.js + lib/store.js + lib/sync.js + lib/idb-backup.js + lib/cloud-sync.js + lib/clock.js + lib/errorlog.js + lib/pwa-register.js
 *
 * 合并理由与实测收益见 tools/build-lib-bundle.mjs 顶部注释。
 * 回滚: 把 index.html 里的 <script src="lib/bundle.js?..."> 换回 8 个独立
 *       <script src="lib/<name>.js?..."> 即可（原文件未删）。
 * ========================================================================= */


/* ===== 来源: lib/env-guard.js ===== */
/* env-guard.js — 本地运行环境自诊断（普通脚本，先于一切模块执行）
 *
 * 背景（2026-09-21 实测复现）：工作台的交互全部来自 src/main.js（type="module"）等 ESM 模块，
 * 它们把 goSection / setView / renderHero / 事件委托 等桥接到 window.*。而浏览器在 file:// 协议下
 * 按同源策略拦下模块脚本（本地文件没有可用的源），于是页面呈现出一种「看着好好的、其实已经死了」的状态：
 *   版本号停在静态默认 v1.0.0 · 倒计时全是 -- · 所有按钮点了没反应 · 新旧页面互跳也都打不开。
 * 本文件是 classic 脚本（file:// 下照常执行），职责就是在缺少 JS 桥接时把问题讲清楚并给出一步到位的出口。
 *
 * 两种情形：
 *   ① file:// 打开 → 直接给出「打开本地工作台」按钮（用户点击即跳 http://localhost:8080，顶层跳转不受 CORS 限制）；
 *   ② http 打开但 6s 后桥接仍未挂载 → 提示界面脚本未启动，引导强制刷新（覆盖缓存/脚本报错等其它成因）。
 *
 * 说明：file:// 页面无法用 fetch / Image / script 探测本地服务是否在跑（实测全部被拦截），
 *      所以这里不做自动跳转，把选择权交给用户；服务没起时按钮会提示改用桌面入口。
 * 1.0.163 新增。
 */
(function () {
  if (window.__wbEnvGuard) return;
  window.__wbEnvGuard = true;

  /* 资源加载失败捕获（1.0.232）：script/link 的 error 只在 capture 阶段收到。
     把失败 URL 记进 __wbBootErrors —— 有了它，看门狗弹卡时能带真相，
     不再出现「界面脚本没启动但诊断信息什么都没有」的盲猜局面。 */
  window.addEventListener('error', function (e) {
    try {
      var t = e && e.target;
      if (t && t !== window && (t.tagName === 'SCRIPT' || t.tagName === 'LINK' || t.tagName === 'IMG')) {
        window.__wbBootErrors = window.__wbBootErrors || [];
        var u = t.src || t.href || '(inline)';
        if (window.__wbBootErrors.indexOf(u) < 0) window.__wbBootErrors.push(u);
      }
    } catch (e2) {}
  }, true);

  var PORT = 8080;

  function entryUrl() {
    /* file:///<本地路径> → http://localhost:8080/_master/index.html
     * 运行端 _private 同理映射到 /_private/，保留原有锚点。 */
    var p = String(location.pathname || '').replace(/\\/g, '/');
    var m = p.match(/\/(_master|_private)\//);
    var prefix = m ? m[1] : '_master';
    var file = (p.split('/').pop() || 'index.html').split('?')[0] || 'index.html';
    return 'http://localhost:' + PORT + '/' + prefix + '/' + file + (location.hash || '');
  }

  function buildCard(opts) {
    var wrap = document.createElement('div');
    wrap.setAttribute('data-wb-env-guard', '1');
    wrap.style.cssText = [
      'position:fixed', 'left:50%', 'bottom:18px', 'transform:translateX(-50%)',
      'z-index:2147483000', 'max-width:760px', 'width:calc(100% - 32px)',
      'box-sizing:border-box', 'padding:16px 18px', 'border-radius:16px',
      'background:#1b2130', 'color:#eef2f8', 'border:1px solid #3d4761',
      'box-shadow:0 18px 50px -12px rgba(0,0,0,.55)',
      'font:14px/1.65 -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif'
    ].join(';');

    var title = document.createElement('div');
    title.style.cssText = 'font-weight:700;font-size:15px;margin-bottom:6px;color:#ffd479';
    title.textContent = opts.title;

    var body = document.createElement('div');
    body.style.cssText = 'color:#c9d3e3;margin-bottom:12px';
    body.innerHTML = opts.body;

    wrap.appendChild(title);
    wrap.appendChild(body);

    var bar = document.createElement('div');
    bar.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;align-items:center';
    (opts.actions || []).forEach(function (a) {
      var el = document.createElement(a.href ? 'a' : 'button');
      el.textContent = a.label;
      el.style.cssText = [
        'display:inline-block', 'padding:9px 16px', 'border-radius:10px', 'border:0',
        'font:600 13.5px/1 inherit', 'cursor:pointer', 'text-decoration:none', 'font-family:inherit'
      ].join(';') + (a.primary
        ? ';background:#34d399;color:#06281c'
        : ';background:rgba(255,255,255,.10);color:#eef2f8');
      if (a.href) { el.href = a.href; el.target = a.target || '_self'; }
      if (a.onClick) el.addEventListener('click', a.onClick);
      bar.appendChild(el);
    });
    wrap.appendChild(bar);

    var hint = document.createElement('div');
    hint.style.cssText = 'margin-top:10px;font-size:12.5px;color:#8b9bb4';
    hint.innerHTML = opts.hint || '';
    wrap.appendChild(hint);

    return wrap;
  }

  function mount(card) {
    var go = function () {
      if (!document.body) return setTimeout(go, 30);
      document.body.appendChild(card);
    };
    go();
  }

  function fileModeCard() {
    var target = entryUrl();
    return buildCard({
      title: '⚠️ 这个页面是用「本地文件」方式打开的，功能不可用',
      body: '工作台依赖模块脚本运行，浏览器在 <code>file://</code> 下会拦截它们 —— 所以版本号停在 v1.0.0、倒计时是 <code>--</code>、按钮点了没反应。' +
        '请改用本地服务地址打开（数据仍然只存在这台设备上）。',
      actions: [
        { label: '打开本地工作台', href: target, primary: true },
        { label: '复制正确地址', onClick: function () { try { navigator.clipboard.writeText(target); this.textContent = '已复制 ✓'; } catch (e) { this.textContent = target; } } }
      ],
      hint: '打不开说明本地服务没在跑：双击桌面的「本地全量工作台」即可（它会自动起服务并打开浏览器）。正确地址：<code>' + target + '</code>'
    });
  }

  function bootFailCard(detail) {
    return buildCard({
      title: '⚠️ 界面脚本没有正常启动，按钮可能没反应',
      body: '页面的交互脚本（<code>src/main.js</code> 等模块）没有完成挂载。已自动尝试修复（清理缓存）但未成功。' +
        '常见原因是浏览器缓存了旧脚本、或某个脚本报错中断。先强制刷新一次通常就好；' +
        '两个按钮都无效时，按 <code>F12</code> → 应用/存储 → <code>Clear site data</code>，或用无痕窗口打开本页。',
      actions: [
        { label: '强制刷新', primary: true, onClick: function () { location.reload(); } },
        { label: '去掉缓存重载', onClick: function () { location.href = location.origin + location.pathname + '?t=' + Date.now() + (location.hash || ''); } }
      ],
      hint: '诊断信息：<code>' + detail + '</code>'
    });
  }

  if (location.protocol === 'file:') {
    mount(fileModeCard());
    return;
  }

  /* 非 file://：启动看门狗 —— 桥接在 boot() 完成后才挂上，给足 6s 再判定 */
  setTimeout(function () {
    if (typeof window.goSection === 'function') return;
    var errs = window.__wbBootErrors;
    var detail = 'protocol=' + location.protocol + ' ready=' + document.readyState;
    if (errs && errs.length) {
      detail += ' bootErrors=' + (typeof errs === 'string' ? errs : JSON.stringify(errs)).slice(0, 300);
    }
    /* SW/缓存过渡态自愈（1.0.229）：连发多版本时浏览器 SW 换班+缓存竞态会让页面吃旧脚本，
       表现为 HTML 是新的但 main.js 模块图加载失败（ESM 失败不进 __wbBootErrors）。
       先自动「注销 SW + 清空 Cache Storage + 重载」一次（本会话仅一次，防循环），
       重载后纯网络拉取必然拿到最新；自愈后仍失败才弹卡交人工。 */
    selfHeal().then(function (healed) {
      if (healed) return;
      mount(bootFailCard(detail));
    });
  }, 6000);

  /* 清 SW + 全部站点缓存后重载；返回 Promise<boolean>（true=已触发自愈重载）。
     计数制（localStorage 跨 reload 存活）：10 分钟窗口最多 3 次，防无限循环；
     每次自愈同时解放 pwa-register 的 sw_auto_reloaded 标记（它会让 controllerchange 不再自动刷新）。 */
  function selfHeal() {
    try {
      var rec = JSON.parse(localStorage.getItem('wb_selfheal') || 'null');
      var nowTs = Date.now();
      if (rec && (nowTs - rec.ts) < 600000 && rec.n >= 3) return Promise.resolve(false);
      if (!rec || (nowTs - rec.ts) >= 600000) rec = { n: 0, ts: nowTs };
      rec.n++;
      localStorage.setItem('wb_selfheal', JSON.stringify(rec));
    } catch (e) { return Promise.resolve(false); }
    try { sessionStorage.removeItem('sw_auto_reloaded'); } catch (e) {}
    var p = Promise.resolve();
    try {
      if ('serviceWorker' in navigator) {
        p = p.then(function () { return navigator.serviceWorker.getRegistration(); })
          .then(function (reg) { if (reg && reg.unregister) return reg.unregister(); });
      }
      if (window.caches && caches.keys) {
        p = p.then(function () { return caches.keys(); })
          .then(function (keys) { return Promise.all(keys.map(function (k) { return caches.delete(k); })); });
      }
    } catch (e) {}
    return p.then(function () { location.reload(); return true; })
      .catch(function () { location.reload(); return true; });
  }
})();


/* ===== 来源: lib/store.js ===== */
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
    'wb_example_dual_v1', 'wb_example_research_v1', 'wb_example_mon_v1',
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


/* ===== 来源: lib/sync.js ===== */
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


/* ===== 来源: lib/idb-backup.js ===== */
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


/* ===== 来源: lib/cloud-sync.js ===== */
/* lib/cloud-sync.js — A4 云端同步层（local-first，GitHub 私仓信使）
 * 数据流：WBStore 整库快照 → gzip 压缩 → AES-GCM 端到端加密 → GitHub Contents API 私仓单文件
 * （gzip 对冲 Contents API 单文件 1MB 限制；>900KB 明确报错不硬撞；读取端 >1MB 走 Git Blob API 兜底）
 * 安全模型：
 *   - passphrase 只存本地 localStorage，云端只见密文（salt/iv/ct）
 *   - fine-grained PAT 只存本地 localStorage，不进公开源码（建议只授权 wb-cloud 一个仓库的 Contents RW）
 *   - 泄漏面：token 泄漏最多导致密文被覆盖（本地明文 + idb 快照仍在），读不到任何数据
 * 冲突规则：rev/ts 新者胜（与 lib/sync.js 跨标签同步同规则）
 * 仅 http(s) 生效；file:// 自动跳过（本地双击运行不受影响）
 */
(function (global) {
  'use strict';
  var LS_PP = 'wb_cloud_pp';     // passphrase
  var LS_TK = 'wb_cloud_token'; // PAT
  var LS_RP = 'wb_cloud_repo';  // 如 "Epic-super/wb-cloud"
  var FILE = 'snapshot.json';
  var GH = 'https://api.github.com';
  var PUSH_DEBOUNCE = 2500;   // 写后防抖
  var PUSH_MIN_GAP = 8000;     // 两次推送最小间隔
  var PULL_INTERVAL = 60000;   // 兜底轮询（同时也是防漏推检查）

  var st = { status: 'noconf', rev: null, lastPush: 0, lastPushedRev: -1, err: '' };
  var pushTimer = null, pullTimer = null, keyCache = null, keyCacheSalt = '';

  function ls(k, v) {
    try {
      if (v === undefined) return localStorage.getItem(k);
      if (v === null) { localStorage.removeItem(k); return; }
      localStorage.setItem(k, v);
    } catch (e) { return null; }
  }
  function cfg() {
    return { pp: ls(LS_PP) || '', tk: ls(LS_TK) || '', repo: ls(LS_RP) || '' };
  }
  function ready() {
    var c = cfg();
    return c.pp && c.tk && c.repo;
  }

  // ---------- base64 helpers（UTF-8 安全） ----------
  function b2s(u8) { var s = ''; for (var i = 0; i < u8.length; i += 8192) s += String.fromCharCode.apply(null, u8.subarray(i, i + 8192)); return s; }
  function b64(u8) { return btoa(b2s(u8)); }
  function ub64(s) {
    s = s.replace(/\s+/g, '');
    var bin = atob(s), u8 = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    return u8;
  }
  function te(s) { return new TextEncoder().encode(s); }
  function td(u8) { return new TextDecoder().decode(u8); }

  // ---------- 加密 ----------
  function deriveKey(pp, saltU8) {
    return crypto.subtle.importKey('raw', te(pp), 'PBKDF2', false, ['deriveKey'])
      .then(function (km) {
        return crypto.subtle.deriveKey(
          { name: 'PBKDF2', salt: saltU8, iterations: 210000, hash: 'SHA-256' },
          km, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
      });
  }
  function getKey(pp, saltU8) {
    var sk = b64(saltU8);
    if (keyCache && keyCacheSalt === sk) return Promise.resolve(keyCache);
    return deriveKey(pp, saltU8).then(function (k) { keyCache = k; keyCacheSalt = sk; return k; });
  }
  // ---------- gzip 压缩（对冲 Contents API 单文件 1MB 限制） ----------
  function hasCS() { return typeof global.CompressionStream === 'function' && typeof global.DecompressionStream === 'function'; }
  function gzipBytes(u8) {
    var cs = new global.CompressionStream('gzip');
    var w = cs.writable.getWriter(); w.write(u8); w.close();
    return new global.Response(cs.readable).arrayBuffer().then(function (b) { return new Uint8Array(b); });
  }
  function gunzipBytes(u8) {
    var ds = new global.DecompressionStream('gzip');
    var w = ds.writable.getWriter(); w.write(u8); w.close();
    return new global.Response(ds.readable).arrayBuffer().then(function (b) { return new Uint8Array(b); });
  }
  function encrypt(pp, obj) {
    var salt = crypto.getRandomValues(new Uint8Array(16));
    var iv = crypto.getRandomValues(new Uint8Array(12));
    var plain = te(JSON.stringify(obj));
    var pipe = hasCS() ? gzipBytes(plain) : Promise.resolve(plain);
    return pipe.then(function (bytes) {
      var gz = bytes !== plain ? 1 : 0;
      return getKey(pp, salt).then(function (key) {
        return crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, bytes);
      }).then(function (ct) {
        return { salt: b64(salt), iv: b64(iv), ct: b64(new Uint8Array(ct)), gz: gz };
      });
    });
  }
  function decrypt(pp, env) {
    return getKey(pp, ub64(env.salt)).then(function (key) {
      return crypto.subtle.decrypt({ name: 'AES-GCM', iv: ub64(env.iv) }, key, ub64(env.ct));
    }).then(function (pt) {
      var u8 = new Uint8Array(pt);
      if (!env.gz) return JSON.parse(td(u8));
      return gunzipBytes(u8).then(function (raw) { return JSON.parse(td(raw)); });
    });
  }

  // ---------- GitHub Contents API ----------
  function ghHeaders(c) {
    return {
      'Authorization': 'Bearer ' + c.tk,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    };
  }
  function ghGet(c) {
    return fetch(GH + '/repos/' + c.repo + '/contents/' + FILE, { headers: ghHeaders(c) })
      .then(function (r) {
        if (r.status === 404) return { none: true };
        if (r.status === 401 || r.status === 403) throw new Error('TOKEN 无效或无权限（' + r.status + '）');
        if (!r.ok) throw new Error('GitHub ' + r.status);
        return r.json();
      })
      .then(function (j) {
        if (j.none) return j;
        // >1MB 文件：json 媒体类型 content 为空、encoding=none → 走 Git Blob API 取内容
        if ((!j.content || j.encoding === 'none') && j.sha) {
          return fetch(GH + '/repos/' + c.repo + '/git/blobs/' + j.sha, { headers: ghHeaders(c) })
            .then(function (r2) {
              if (!r2.ok) throw new Error('blob ' + r2.status);
              return r2.json();
            })
            .then(function (b2) {
              try {
                return { envelope: JSON.parse(td(ub64(b2.content))), sha: j.sha };
              } catch (e) { throw new Error('远端快照损坏'); }
            });
        }
        try {
          var env = JSON.parse(td(ub64(j.content)));
          return { envelope: env, sha: j.sha };
        } catch (e) { throw new Error('远端快照损坏'); }
      });
  }
  function ghPut(c, env, sha) {
    var body = {
      message: 'sync: rev ' + env.rev + ' @ ' + new Date(env.ts).toISOString(),
      content: b64(te(JSON.stringify(env)))
    };
    if (sha) body.sha = sha;
    return fetch(GH + '/repos/' + c.repo + '/contents/' + FILE, {
      method: 'PUT', headers: ghHeaders(c), body: JSON.stringify(body)
    }).then(function (r) {
      if (r.status === 409 || r.status === 422) throw { conflict: true };
      if (r.status === 401 || r.status === 403) throw new Error('TOKEN 无效或无权限（' + r.status + '）');
      if (!r.ok) throw new Error('GitHub ' + r.status);
      return r.json();
    });
  }

  // ---------- 同步逻辑 ----------
  function snapshotRoot() {
    var r = global.WBStore.raw();
    return { schemaVersion: r.schemaVersion, data: r.data, legacy: r.legacy, rev: r.rev || 0, ts: r.ts || 0 };
  }
  function applyRemoteSnapshot(snap) {
    var local = global.WBStore.raw();
    // 逐字段替换（保留 live 引用语义，与 sync.js applyRemote 同构）
    local.data = snap.data; local.legacy = snap.legacy || {};
    local.schemaVersion = snap.schemaVersion || 1;
    local.rev = snap.rev; local.ts = snap.ts;
    try { localStorage.setItem('wb_store', JSON.stringify(local)); } catch (e) {}
    global.WBStore._emit({ path: '*', value: local.data, rev: snap.rev, ts: snap.ts, source: 'cloud' });
    if (global.__wbSync) { try { global.__wbSync.broadcast(JSON.parse(JSON.stringify(local))); } catch (e) {} }
    if (typeof global.toast === 'function') { try { global.toast('☁ 已从云端拉取新数据（rev ' + snap.rev + '）'); } catch (e) {} }
  }
  function pull(force) {
    if (!ready()) return Promise.resolve();
    var c = cfg();
    setStatus('syncing');
    return ghGet(c).then(function (r) {
      if (r.none) { // 云端为空：本地有数据则推上去
        if (global.WBStore.raw().rev > 0) return doPush(c);
        setStatus('ok'); return;
      }
      var env = r.envelope;
      var local = global.WBStore.raw();
      var lr = local.rev || 0, lt = local.ts || 0, rr = env.rev || 0, rt = env.ts || 0;
      if (rr > lr || (rr === lr && rt > lt)) {
        return decrypt(c.pp, env).then(function (snap) {
          applyRemoteSnapshot(snap);
          setStatus('ok', rr);
        }).catch(function () {
          setStatus('err', null, '密码不匹配（云端快照解密失败，本地未动）');
        });
      }
      if (rr < lr) return doPush(c); // 本地更新 → 推
      setStatus('ok', lr);
    }).catch(function (e) {
      if (e && e.conflict) return doPush(c); // 推送冲突重入
      setStatus('err', null, e && e.message || '拉取失败');
    });
  }
  function doPush(c) {
    var now = Date.now();
    if (now - st.lastPush < PUSH_MIN_GAP) { schedulePush(); return Promise.resolve(); }
    st.lastPush = now;
    setStatus('syncing');
    var root = snapshotRoot();
    return encrypt(c.pp, root).then(function (seal) {
      var env = { v: 1, rev: root.rev, ts: root.ts, salt: seal.salt, iv: seal.iv, ct: seal.ct, gz: seal.gz };
      var envJson = JSON.stringify(env);
      // Contents API 单文件 1MB 硬顶：留 100KB 安全边界，超了明确报错而不是撞 422
      if (envJson.length > 900000) {
        setStatus('err', null, '快照过大（' + Math.round(envJson.length / 1024) + 'KB > 900KB 单文件上限），请清理历史数据后重试');
        return Promise.resolve();
      }
      return ghGet(c).then(function (r) {
        return ghPut(c, env, r.sha).then(function () {
          st.lastPushedRev = root.rev;
          setStatus('ok', root.rev);
        });
      });
    }).catch(function (e) {
      if (e && e.conflict) { // 别的设备刚写过：重新裁决再推
        return pull().then(function () { if (st.status === 'err') return; schedulePush(1500); });
      }
      setStatus('err', null, e && e.message || '推送失败');
    });
  }
  function schedulePush(delay) {
    if (!ready()) return;
    if (pushTimer) clearTimeout(pushTimer);
    pushTimer = setTimeout(function () {
      pushTimer = null;
      var r = global.WBStore.raw();
      if ((r.rev || 0) <= st.lastPushedRev) return;
      pull().then(function () { if (st.status === 'err') return; if ((global.WBStore.raw().rev || 0) > st.lastPushedRev) doPush(cfg()); });
    }, delay || PUSH_DEBOUNCE);
  }

  // ---------- 状态 UI ----------
  function setStatus(s, rev, err) {
    st.status = s; if (rev !== undefined && rev !== null) st.rev = rev; st.err = err || '';
    renderPill();
  }
  var pill = null;
  function renderPill() {
    if (!pill) return;
    var map = {
      init: ['☁', '#8b93a7', '未配置'],
      noconf: ['☁', '#8b93a7', '未配置'],
      syncing: ['☁', '#f0ad4e', '同步中…'],
      ok: ['☁', '#4ECDC4', st.rev != null ? '已同步 r' + st.rev : '已同步'],
      err: ['⚠', '#FF6B6B', '同步异常']
    };
    var m = map[st.status] || map.init;
    pill.textContent = m[0] + ' ' + m[2];
    pill.style.color = m[1];
    pill.title = st.err || ('云端同步 · ' + (st.status === 'ok' ? 'rev ' + st.rev : st.status));
  }
  function buildModal() {
    var ov = document.createElement('div');
    ov.id = 'wbCloudModal';
    ov.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;font-family:system-ui,"PingFang SC",sans-serif';
    var c = cfg();
    ov.innerHTML =
      '<div style="background:#262933;border:1px solid #33374a;border-radius:14px;padding:24px;width:min(420px,92vw);color:#E8EAF0;box-shadow:0 12px 40px rgba(0,0,0,.5)">' +
      '<div style="font-size:16px;font-weight:600;margin-bottom:4px;color:#4ECDC4">☁ 云端同步设置</div>' +
      '<div style="font-size:12px;color:#8b93a7;margin-bottom:14px;line-height:1.6">数据以 AES-GCM 密文存入你的 GitHub 私仓，云端零明文。密码只存本机，忘了密码云端数据将无法解密（本地明文不受影响）。</div>' +
      '<label style="display:block;font-size:12px;color:#aab0c0;margin:10px 0 4px">仓库全名（私有）</label>' +
      '<input id="wbCloudRepo" placeholder="Epic-super/wb-cloud" value="' + (c.repo || '').replace(/"/g, '&quot;') + '" style="width:100%;box-sizing:border-box;background:#1D1F27;border:1px solid #33374a;border-radius:8px;padding:8px 10px;color:#E8EAF0;font-size:13px;outline:none">' +
      '<label style="display:block;font-size:12px;color:#aab0c0;margin:10px 0 4px">Fine-grained PAT（仅 Contents 读写，只授权该仓库）</label>' +
      '<input id="wbCloudToken" type="password" placeholder="github_pat_…" style="width:100%;box-sizing:border-box;background:#1D1F27;border:1px solid #33374a;border-radius:8px;padding:8px 10px;color:#E8EAF0;font-size:13px;outline:none">' +
      '<label style="display:block;font-size:12px;color:#aab0c0;margin:10px 0 4px">加密密码（多设备保持一致）</label>' +
      '<input id="wbCloudPP" type="password" placeholder="用于派生 AES 密钥" style="width:100%;box-sizing:border-box;background:#1D1F27;border:1px solid #33374a;border-radius:8px;padding:8px 10px;color:#E8EAF0;font-size:13px;outline:none">' +
      '<div style="display:flex;gap:10px;margin-top:18px;justify-content:flex-end">' +
      '<button data-a="off" style="background:none;border:none;color:#8b93a7;font-size:13px;cursor:pointer;padding:6px 8px">停用</button>' +
      '<button data-a="test" style="background:none;border:1px solid #33374a;color:#aab0c0;font-size:13px;cursor:pointer;padding:6px 14px;border-radius:8px">测试连接</button>' +
      '<button data-a="save" style="background:#0f9d77;border:none;color:#fff;font-size:13px;cursor:pointer;padding:6px 16px;border-radius:8px">保存并同步</button>' +
      '</div><div id="wbCloudMsg" style="font-size:12px;margin-top:10px;min-height:16px;color:#f0ad4e"></div></div>';
    ov.addEventListener('click', function (e) {
      if (e.target === ov) ov.remove();
      var a = e.target.getAttribute && e.target.getAttribute('data-a');
      if (!a) return;
      var msg = ov.querySelector('#wbCloudMsg');
      var repo = (ov.querySelector('#wbCloudRepo').value || '').trim();
      var tk = (ov.querySelector('#wbCloudToken').value || '').trim();
      var pp = (ov.querySelector('#wbCloudPP').value || '').trim();
      if (a === 'off') {
        ls(LS_PP, null); ls(LS_TK, null); ls(LS_RP, null);
        keyCache = null; keyCacheSalt = '';
        setStatus('noconf'); ov.remove(); return;
      }
      if (a === 'test' || a === 'save') {
        if (!repo || !tk) { msg.textContent = '仓库与 PAT 必填'; return; }
        msg.textContent = '测试中…'; msg.style.color = '#f0ad4e';
        ghGet({ tk: tk, repo: repo }).then(function (r) {
          msg.style.color = '#4ECDC4';
          msg.textContent = r.none ? '连接成功：云端快照为空（首次同步会上传）' : '连接成功：云端 rev ' + (r.envelope.rev || '?') + (pp ? '' : '（未填密码，仅测试了连接）');
          if (a === 'save') {
            if (!pp) { msg.style.color = '#f0ad4e'; msg.textContent = '请填写加密密码'; return; }
            ls(LS_RP, repo); ls(LS_TK, tk); ls(LS_PP, pp);
            keyCache = null; keyCacheSalt = '';
            ov.remove();
            if (global.toast) global.toast('☁ 云同步已启用');
            pull(true);
          }
        }).catch(function (err) {
          msg.style.color = '#FF6B6B';
          msg.textContent = '失败：' + (err && err.message || '网络错误');
        });
      }
    });
    document.body.appendChild(ov);
  }

  // ---------- 启动 ----------
  function boot() {
    if (location.protocol === 'file:' || !global.WBStore || !global.crypto || !global.crypto.subtle) return;
    // 状态胶囊
    pill = document.createElement('div');
    pill.id = 'wbCloudPill';
    pill.style.cssText = 'position:fixed;top:72px;right:14px;z-index:99998;background:rgba(29,31,39,.92);border:1px solid #33374a;border-radius:999px;padding:5px 12px;font-size:12px;cursor:pointer;user-select:none;backdrop-filter:blur(4px);font-family:system-ui,"PingFang SC",sans-serif';
    pill.addEventListener('click', buildModal);
    document.body.appendChild(pill);
    // 2026-11-05 修复（1.0.257）：胶囊是 fixed 浮层，窄屏会压住底下的东西 —— 顶栏按钮换行后
    // 变高（≤700px 实测 184px），写死 top:72px 正好落在按钮行上（实测压住主题切换按钮）；
    // 改贴顶栏下方又会压住「项目」视图首行的「新增项目」按钮（390 实测 16 采样点被吃 12 点）。
    // 故窄屏直接「进流」：插进顶栏按钮行末尾（状态芯片与版本徽章同排，归位到不遮挡任何内容的位置）；
    // 桌面保持原固定定位。父级容器找不到时退回原行为，不会更糟。
    function placePill() {
      var narrow = (global.innerWidth || document.documentElement.clientWidth) <= 700;
      var row = document.querySelector('.topbar .backup-row');
      if (narrow && row) {
        if (pill.parentElement !== row) row.appendChild(pill);
        pill.style.position = 'static';
        pill.style.top = '';
        pill.style.right = '';
        pill.style.marginLeft = 'auto';
      } else {
        if (pill.parentElement !== document.body) document.body.appendChild(pill);
        pill.style.position = 'fixed';
        pill.style.top = '72px';
        pill.style.right = '14px';
        pill.style.marginLeft = '';
      }
    }
    placePill();
    global.addEventListener('resize', placePill);
    setStatus(ready() ? 'init' : 'noconf');
    if (ready()) { pull(true); pullTimer = setInterval(function () { pull(); }, PULL_INTERVAL); }
    // 订阅本地写入（跳过云端应用与远端标签来源）
    global.WBStore.subscribe(function (ev) {
      if (ev && (ev.source === 'cloud' || ev.source === 'remote')) return;
      if (ready()) schedulePush();
    });
    // setLegacy 直写老 key：不发 emit 也不涨 rev —— 包一层补推，杜绝静默不同步
    var origLegacy = global.WBStore.setLegacy;
    if (origLegacy) {
      global.WBStore.setLegacy = function (k, v) {
        var r = origLegacy.apply(this, arguments);
        if (r && ready()) schedulePush();
        return r;
      };
    }
    // 关标签 / 切后台：补推挂起的防抖（尽力而为，页面可能先于请求完成销毁）
    function flushPush() {
      if (!ready() || !pushTimer) return;
      clearTimeout(pushTimer); pushTimer = null;
      pull().then(function () {
        if (st.status !== 'err' && (global.WBStore.raw().rev || 0) > st.lastPushedRev) doPush(cfg());
      });
    }
    global.addEventListener('pagehide', flushPush);
    document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') flushPush(); });
    // 首次访问轻提示一次（http 且未配置时）
    if (!ready()) {
      try {
        if (!ls('wb_cloud_hint')) {
          ls('wb_cloud_hint', '1');
          setTimeout(function () { if (typeof global.toast === 'function') global.toast('☁ 点右上角胶囊可开启云端同步'); }, 2500);
        }
      } catch (e) {}
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  global.__wbCloud = {
    status: function () { return { status: st.status, rev: st.rev, err: st.err, configured: ready() }; },
    pull: function () { return pull(true); },
    push: function () { return ready() ? doPush(cfg()) : Promise.reject(new Error('未配置')); },
    openSettings: buildModal
  };
})(window);


/* ===== 来源: lib/clock.js ===== */
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


/* ===== 来源: lib/errorlog.js ===== */
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


/* ===== 来源: lib/pwa-register.js ===== */
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
    // updateViaCache:'none'：浏览器检查 sw.js 更新时绕过 HTTP 缓存。
    // GitHub Pages 静态资源 max-age=600，无此参数时新 sw.js 可能最长 10 分钟不生效，
    // 造成「bump 了版本但客户端一直吃旧缓存名」的窗口。
    navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then(function (reg) {
      // 导航成功到达正常页面：清掉 SW 离线降级页的自动重试计数（sw.js offlineRetryResponse）
      try { sessionStorage.removeItem('wbSWRetry'); } catch (e) {}
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

