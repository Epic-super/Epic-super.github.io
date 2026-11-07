/* 塔台 Tower · Service Worker (PWA)
 * 策略：
 *  - 安装期预缓存核心壳（首屏 HTML + 关键 CSS/JS + 图标）
 *  - 运行时：同源 GET 走 stale-while-revalidate（快速命中 + 后台更新）
 *  - 静态资源（css/js/img/png/svg 等）走 cache-first
 *  - 导航请求（HTML）走 network-first，失败回退缓存的 index.html（离线可用）
 * 注：GH Pages 静态站，sw.js 挂根域，scope 覆盖全站；所有 URL 用相对定位容错。
 */
// 🔴 版本联动：此值必须随 version.json bump 同步更新（bump 第九处）。
// 缓存名随版本轮换 → activate 时旧缓存全清 → 全站强制新资源。漏改 = 永远吃旧缓存。
const VERSION = 'v1.0.275';
const CORE_CACHE = 'tower-core-' + VERSION;
const RUNTIME_CACHE = 'tower-runtime-' + VERSION;

const CORE_ASSETS = [
  './',
  './index.html',
  './assets/css/main.css',
  './assets/css/views.css',
  './lib/store.js',
  './lib/sync.js',
  './lib/idb-backup.js',
  './lib/clock.js',
  './lib/errorlog.js',
  './manifest.webmanifest',
  './assets/pwa/icon-192.png',
  './assets/pwa/icon-512.png',
];

// 静态资源后缀：cache-first 缓存
const STATIC_RE = /\.(css|js|mjs|png|jpg|jpeg|webp|svg|gif|ico|woff2?|ttf|webmanifest)$/i;

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CORE_CACHE).then((c) => c.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

// 页面可触发立即接管（pwa-register 刷新流程用）
self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CORE_CACHE && k !== RUNTIME_CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  // 只处理同源 GET；非 GET（POST 等）一律放行不缓存
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // 跨域（COS/第三方 LLM）不缓存

  // 导航请求：network-first，失败回退离线壳
  // 2026-10-25 修复「经常读取不到版本和页面」：
  //  ① 只有 2xx 才写入运行时缓存（旧逻辑把 404/代理假页也 put 进缓存，毒条目反复出现）；
  //  ② 降级只回「同 URL 缓存」；应用壳（根路径 / index.html）才允许回退 index.html，
  //     其它子页一律不再偷偷替换成 index.html（此前表现为：URL 是 zk-ky.html 内容却是主页 = 串页）；
  //  ③ 无缓存的子页改回「启动中自动重试」页：本地 serve.py 冷启动约需 10~15s，
  //     期间打开的导航会自动每 2.5s 重载，服务就绪后自动进入正常页面，无需手动刷新。
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() =>
        caches.match(req).then((hit) => {
          if (hit) return hit;
          const path = url.pathname;
          const isShell = /\/$/.test(path) || /\/index\.html$/.test(path);
          if (isShell) return caches.match('./index.html');
          return offlineRetryResponse(path);
        })
      )
    );
    return;
  }

  /* 「服务启动中」自动重试页：仅离线降级时生成，不进缓存。
     sessionStorage 计数限制自动重试 15 次（约 40s），超时停在页面给出手动按钮；
     计数在任一正常页面加载成功后由 pwa-register.js 清零。 */
  function offlineRetryResponse(path) {
    const name = decodeURIComponent(path.split('/').pop() || '页面');
    const html = '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">'
      + '<meta name="viewport" content="width=device-width,initial-scale=1">'
      + '<title>塔台 · 服务启动中</title><style>'
      + 'html,body{margin:0;height:100%;background:#0b1520;color:#dffef5;'
      + 'font-family:"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;'
      + 'display:flex;align-items:center;justify-content:center;}'
      + '.box{text-align:center;max-width:420px;padding:32px;}'
      + '.ring{width:44px;height:44px;margin:0 auto 18px;border-radius:50%;'
      + 'border:3px solid rgba(124,240,199,.25);border-top-color:#7cf0c7;'
      + 'animation:spin 1s linear infinite;}'
      + '@keyframes spin{to{transform:rotate(360deg)}}'
      + 'h1{font-size:18px;margin:0 0 10px;font-weight:600;}'
      + 'p{font-size:13px;line-height:1.8;color:#9fc9c9;margin:0 0 20px;}'
      + 'button{background:rgba(124,240,199,.12);border:1px solid rgba(124,240,199,.4);'
      + 'color:#7cf0c7;padding:8px 22px;border-radius:10px;font-size:13px;cursor:pointer;}'
      + '</style></head><body><div class="box"><div class="ring"></div>'
      + '<h1>「' + name.replace(/[<>&"]/g, '') + '」暂时无法打开</h1>'
      + '<p>本地塔台服务正在启动（约需 10~15 秒）<br>或设备刚从休眠唤醒，正在自动重试…</p>'
      + '<button id="rt" style="display:none" onclick="location.reload()">手动重试</button></div>'
      + '<script>'
      + 'var N=0;try{N=parseInt(sessionStorage.getItem("wbSWRetry")||"0",10)||0}catch(e){}'
      + 'N++;try{sessionStorage.setItem("wbSWRetry",String(N))}catch(e){}'
      + 'if(navigator.onLine===false){document.querySelector("p").textContent="当前处于离线状态，请检查网络后再试";document.getElementById("rt").style.display="inline-block";}'
      + 'else if(N<=15){setTimeout(function(){location.reload()},2500);}'
      + 'else{document.getElementById("rt").style.display="inline-block";}'
      + '<\/script></body></html>';
    return new Response(html, {
      status: 503,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' }
    });
  }

  /* version.json：network-first（1.0.275）。此前与普通 JSON 一同走 stale-while-revalidate，
     在线也常命中旧缓存 → 版本徽标/更新提示读到旧版本号。
     现改为：在线必回源（serve.py 已发 no-cache，304 成本极低），仅离线回缓存。 */
  if (url.pathname.endsWith('/version.json')) {
    e.respondWith(
      fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match(req).then((hit) => hit || Response.error()))
    );
    return;
  }

  /* 毒条目检测（1.0.232）：cache-first 命中即信会把 404HTML/代理假页（常见于网络闪断、
     多版本切换窗口）永久锁进缓存，浏览器拿 HTML 当 JS 执行不报错也无副作用，
     页面「半死」且看门狗 env-guard.js 自己也是毒条目时连警告都不弹。
     按 content-type 校验：JS/CSS/HTML 类型不符即视为毒 → 回源网络 + 顺手删缓存毒条目。 */
  function isPoison(res, pathname) {
    var ct = (res && res.headers && res.headers.get('content-type')) || '';
    if (/\.(js|mjs)$/i.test(pathname)) return ct.indexOf('javascript') < 0 && ct.indexOf('ecmascript') < 0;
    if (/\.css$/i.test(pathname)) return ct.indexOf('text/css') < 0;
    if (/\.html?$/i.test(pathname)) return ct.indexOf('text/html') < 0;
    return false;
  }
  function dropPoison(req) {
    try {
      caches.keys().then(function (keys) {
        keys.forEach(function (k) {
          caches.open(k).then(function (c) { c.delete(req); });
        });
      });
    } catch (e) {}
  }

  // 静态资源：cache-first（带毒校验）+ 后台填充运行时缓存
  if (STATIC_RE.test(url.pathname)) {
    e.respondWith(
      caches.match(req).then((hit) => {
        if (hit && !isPoison(hit, url.pathname)) return hit;
        if (hit) dropPoison(req); /* 命中但类型不符：删掉毒条目，回源 */
        return fetch(req).then((res) => {
          if (res.ok && !isPoison(res, url.pathname)) {
            const copy = res.clone();
            caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy));
          }
          return res;
        });
      })
    );
    return;
  }

  // 其他同源 GET（数据 JSON 等）：stale-while-revalidate
  e.respondWith(
    caches.match(req).then((hit) => {
      const network = fetch(req).then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || network;
    })
  );
});
