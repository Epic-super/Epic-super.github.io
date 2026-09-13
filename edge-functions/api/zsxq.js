// EdgeOne Pages Edge Function — 知识星球代理
// 路由:
//   /api/zsxq?action=groups           返回用户加入的星球列表
//   /api/zsxq?action=topics&group=<id> 返回某星球的话题(默认 scope=digests)
// 鉴权: 前端从 localStorage 读取 zsxq_access_token，通过请求头 x-zsxq-token 传入。
//       服务端将其转为 Authorization 头 + Cookie 转发给 api.zsxq.com。

const ZSXQ_API = 'https://api.zsxq.com/v2';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Cache-Control': 'public, max-age=120',
  };
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=UTF-8', ...corsHeaders() },
  });
}

function zsxqHeaders(token) {
  return {
    Authorization: token,
    Cookie: 'zsxq_access_token=' + token,
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
    Accept: 'application/json, text/plain, */*',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    Origin: 'https://wx.zsxq.com',
    Referer: 'https://wx.zsxq.com/',
    'x-request-id': String(Date.now()) + Math.random().toString(16).slice(2),
  };
}

function parseGroups(data) {
  const groups = (data.groups || []).map((g) => ({
    id: g.group_id,
    name: g.name,
    type: g.type,
    desc: g.description || '',
    unread: (g.lector && g.lector.unread_count) || 0,
  }));
  return { groups };
}

function parseTopics(data) {
  const topics = (data.topics || []).map((t) => {
    const owner = t.owner || {};
    const talk = t.talk || {};
    const images = (talk.images || []).map((i) => i.large || i.original || i.thumbnail || '');
    const files = (talk.files || []).map((f) => ({ name: f.name, url: f.url, size: f.size }));
    return {
      id: t.topic_id,
      type: t.type,
      title: talk.title || '',
      text: (talk.text || '').slice(0, 2000),
      author: owner.name || '',
      createTime: t.create_time || '',
      liked: t.liked_count || 0,
      comments: t.comment_count || 0,
      views: t.view_count || 0,
      images: images.filter(Boolean),
      files: files.filter((f) => f.url),
      url: 'https://wx.zsxq.com/dweb2/index/group/' + t.group_id + '/topic/' + t.topic_id,
    };
  });
  return { topics, count: topics.length };
}

export default async function onRequest(context) {
  const { request } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  const token = request.headers.get('x-zsxq-token') || '';
  if (!token) {
    return json(
      { error: 'missing token', hint: '在「知识星球 · AI星球」页面填入你的 zsxq_access_token 后重试' },
      401
    );
  }

  const url = new URL(request.url);
  const action = (url.searchParams.get('action') || 'groups').toLowerCase();
  const group = url.searchParams.get('group') || '';
  const count = parseInt(url.searchParams.get('count') || '20', 10) || 20;
  const scope = url.searchParams.get('scope') || 'digests';

  let endpoint;
  if (action === 'groups') {
    endpoint = ZSXQ_API + '/groups';
  } else if (action === 'topics') {
    if (!group) return json({ error: 'missing group id' }, 400);
    endpoint = ZSXQ_API + '/groups/' + encodeURIComponent(group) + '/topics?scope=' + scope + '&count=' + count;
  } else {
    return json({ error: 'unknown action (use groups|topics)' }, 400);
  }

  try {
    const resp = await fetch(endpoint, { headers: zsxqHeaders(token), redirect: 'follow' });
    const raw = await resp.text();
    let data;
    try {
      data = JSON.parse(raw);
    } catch (_) {
      return json({ error: 'zsxq returned non-json', status: resp.status, raw: raw.slice(0, 400) }, 502);
    }
    if (data.code !== 0 && data.succeeded !== true) {
      return json({ error: 'zsxq api error', code: data.code, msg: data.msg || data.message }, resp.status || 400);
    }
    const out = action === 'groups' ? parseGroups(data) : parseTopics(data);
    return json({ action, ...out }, 200);
  } catch (e) {
    return json({ error: 'fetch failed', detail: String(e) }, 502);
  }
}
