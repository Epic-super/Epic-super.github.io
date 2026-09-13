// EdgeOne Pages Edge Function — 阶跃 StepFun 代理
// 路由: /api/stepfun  (POST)
// 鉴权: 前端从 localStorage 读取 stepfun_key，通过请求头 x-stepfun-key 传入。
//       服务端将其作为 Bearer token 转发给 api.stepfun.com，不存储密钥。
// 说明: 仅做转发；仅允许访问 StepFun 官方域名(SSRF 防护)；模型白名单防越权。

const STEPFUN_API = 'https://api.stepfun.com/step_plan/v1/chat/completions';

// 允许调用的模型（与开放平台/Step Plan 对齐）
const ALLOWED_MODELS = [
  'step-3.7-flash',       // 旗舰多模态推理，原生图文/视频理解
  'step-3.5-flash-2603',  // 高频 Agent 优化
  'step-3.5-flash',       // 稀疏 MoE，高速推理
  'step-router-v1',       // 智能路由(deepseek-v4-pro / step-3.5-flash)
];

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': '*',
  };
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=UTF-8', ...corsHeaders() },
  });
}

export default async function onRequest(context) {
  const { request } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }
  if (request.method !== 'POST') {
    return json({ error: 'method not allowed, use POST' }, 405);
  }

  const key = request.headers.get('x-stepfun-key') || '';
  if (!key) {
    return json(
      { error: 'missing key', hint: '在「阶跃 StepFun」聊天页填入你的 StepFun API Key 后重试' },
      401
    );
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: 'invalid json body' }, 400);
  }

  if (!body.model || !ALLOWED_MODELS.includes(body.model)) {
    return json({ error: 'unsupported or missing model', allowed: ALLOWED_MODELS }, 400);
  }

  const stream = body.stream === true;

  try {
    const upstream = await fetch(STEPFUN_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + key,
        Accept: stream ? 'text/event-stream' : 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (stream) {
      // 透传 SSE 流（保持 text/event-stream）
      const headers = {
        'Content-Type': upstream.headers.get('Content-Type') || 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        ...corsHeaders(),
      };
      return new Response(upstream.body, { status: upstream.status, headers });
    }

    const raw = await upstream.text();
    let data;
    try {
      data = JSON.parse(raw);
    } catch (_) {
      return json({ error: 'stepfun returned non-json', status: upstream.status, raw: raw.slice(0, 500) }, 502);
    }
    if (data.error) {
      return json({ error: 'stepfun api error', detail: data.error }, upstream.status || 400);
    }
    return new Response(raw, {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json; charset=UTF-8', ...corsHeaders() },
    });
  } catch (e) {
    return json({ error: 'fetch failed', detail: String(e) }, 502);
  }
}
