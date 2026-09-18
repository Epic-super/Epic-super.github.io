// EdgeOne Pages Edge Function — 通用网页抓取代理
// 路由: /api/crawl?url=<目标网址>
// 作用: 服务端 fetch 目标页，纯 JS 提取 title/meta/正文摘要，绕过浏览器 CORS。
// 注意: Edge 运行时无 DOMParser/npm，提取逻辑全部用正则实现。

const MAX_TEXT = 2200;

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Cache-Control': 'public, max-age=300',
  };
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=UTF-8', ...corsHeaders() },
  });
}

function decodeEntities(s) {
  if (!s) return '';
  return s
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isPrivateHost(h) {
  h = (h || '').toLowerCase();
  if (h === 'localhost' || h.endsWith('.localhost') || h === '[::1]') return true;
  if (/^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
  if (/^169\.254\./.test(h)) return true;
  if (/^100\.64\./.test(h)) return true;
  if (/^0\.|^[a-z]+$/.test(h) && !h.includes('.')) return false; // 普通域名放行
  return false;
}

function extract(html, baseUrl) {
  const getMeta = (re) => {
    const m = html.match(re);
    return m ? decodeEntities(m[1]) : '';
  };
  let title = getMeta(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!title) title = getMeta(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i);
  let desc = getMeta(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
  if (!desc) desc = getMeta(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i);
  const img = getMeta(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
  const site = getMeta(/<meta[^>]+property=["']og:site_name["'][^>]+content=["']([^"']+)["']/i);

  // 去脚本/样式/注释/head，保留正文结构
  let body = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<head[\s\S]*?<\/head>/gi, ' ');

  // 优先取 <article>/<main> 内段落
  const articleMatch = body.match(/<(article|main)[^>]*>([\s\S]*?)<\/\1>/i);
  const scope = articleMatch ? articleMatch[2] : body;

  const paras = scope.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
  let text = paras
    .map((p) => decodeEntities(p))
    .filter((t) => t && t.length > 12)
    .join('\n');

  if (text.length < 120) {
    // 兜底：直接去标签取文本
    text = decodeEntities(scope).replace(/\n{2,}/g, '\n').trim();
  }
  text = text.slice(0, MAX_TEXT);

  // 相对图片地址补全
  let absImg = img;
  if (img && baseUrl) {
    try { absImg = new URL(img, baseUrl).toString(); } catch (_) {}
  }

  return { title, desc, img: absImg, site, text };
}

async function withCache(key, producer) {
  try {
    const cache = await caches.open('crawl-v1');
    const hit = await cache.match(key);
    if (hit) return hit;
    const res = await producer();
    if (res.status === 200) {
      const cp = res.clone();
      await cache.put(key, cp);
    }
    return res;
  } catch (_) {
    return producer();
  }
}

export default async function onRequest(context) {
  const { request } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  const url = new URL(request.url);
  const target = url.searchParams.get('url');
  if (!target) return json({ error: 'missing url param' }, 400);

  let t;
  try {
    t = new URL(target);
  } catch (_) {
    return json({ error: 'invalid url' }, 400);
  }
  if (t.protocol !== 'http:' && t.protocol !== 'https:') {
    return json({ error: 'only http/https allowed' }, 400);
  }
  if (isPrivateHost(t.hostname)) {
    return json({ error: 'blocked host (private/ip)' }, 403);
  }

  try {
    const resp = await withCache(request.url, () =>
      fetch(t.toString(), {
        redirect: 'follow',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        },
      })
    );

    const ct = resp.headers.get('content-type') || '';
    if (!ct.includes('html') && !ct.includes('text')) {
      return json(
        { url: target, status: resp.status, contentType: ct, ok: resp.ok, note: '非 HTML，未提取正文' },
        200
      );
    }

    const html = await resp.text();
    const data = extract(html, t.toString());
    return json(
      { ...data, url: target, status: resp.status, fetchedAt: Date.now() },
      200
    );
  } catch (e) {
    return json({ error: 'fetch failed', detail: String(e), url: target }, 502);
  }
}
