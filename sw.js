/* 塔台 Tower · Service Worker (PWA)
 * 策略：
 *  - 安装期预缓存核心壳（首屏 HTML + 关键 CSS/JS + 图标）
 *  - 运行时：同源 GET 走 stale-while-revalidate（快速命中 + 后台更新）
 *  - 静态资源（css/js/img/png/svg 等）走 cache-first
 *  - 导航请求（HTML）走 network-first，失败回退缓存的 index.html（离线可用）
 * 注：GH Pages 静态站，sw.js 挂根域，scope 覆盖全站；所有 URL 用相对定位容错。
 */
const VERSION = 'v1.0.0';
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
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy));
        return res;
      }).catch(() =>
        caches.match(req).then((hit) =>
          hit || caches.match('./index.html')
        )
      )
    );
    return;
  }

  // 静态资源：cache-first + 后台填充运行时缓存
  if (STATIC_RE.test(url.pathname)) {
    e.respondWith(
      caches.match(req).then((hit) => {
        if (hit) return hit;
        return fetch(req).then((res) => {
          if (res.ok) {
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
