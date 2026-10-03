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
      body: '页面的交互脚本（<code>src/main.js</code> 等模块）没有完成挂载。常见原因是浏览器缓存了旧脚本、或某个脚本报错中断。' +
        '先强制刷新一次通常就好。',
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
    mount(bootFailCard(detail));
  }, 6000);
})();
