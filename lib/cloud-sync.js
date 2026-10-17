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
