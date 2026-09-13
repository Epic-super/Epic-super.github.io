// EdgeOne Pages Edge Function — 知识星球内容归档（闭环：定时抓取产物 → Edge KV → 站内浏览）
// 依赖：EdgeOne Pages KV（命名空间在控制台绑定到本项目，运行时变量名 = ZSXQ_ARCHIVE_KV，全局变量访问）
//       环境变量 ARCHIVE_INGEST_KEY（控制台 Pages 环境变量，用于写入鉴权）
//
// 路由:
//   POST /api/zsxq-archive?action=ingest
//        Header: x-archive-key = ARCHIVE_INGEST_KEY（服务端 env 中配置）
//        Body:   { "date": "2026-08-28", "groups": { "<星球名>": [topic...], ... } }
//        → 写入 KV: zarch:idx（索引）/ zarch:<date>:<星球名>（每星球每日话题）
//   GET  /api/zsxq-archive?action=list
//        Header: x-zsxq-token（你的知识星球登录 token，弱鉴权）
//        → 返回归档日期列表（含各日期下星球与条数）
//   GET  /api/zsxq-archive?action=get&date=2026-08-28&group=<星球名>
//        Header: x-zsxq-token
//        → 返回该日该星球话题列表
//
// 说明：归档为付费星球内容，读取需带登录 token（弱鉴权，个人使用足够）；
//       写入仅有服务端密钥者可执行（定时任务/本地脚本）。

const KV_VAR = "ZSXQ_ARCHIVE_KV"; // 控制台绑定 KV 命名空间时使用的变量名

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-archive-key, x-zsxq-token",
    "Cache-Control": "no-store",
  };
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=UTF-8", ...corsHeaders() },
  });
}

function kv() {
  if (typeof ZSXQ_ARCHIVE_KV === "undefined") {
    throw new Error("KV 未绑定：请在 EdgeOne 控制台创建 KV 命名空间并绑定到本项目（变量名 " + KV_VAR + "）");
  }
  return ZSXQ_ARCHIVE_KV;
}

// 标准化单条话题（与 zsxq.js parseTopics 输出形状对齐，前端直接复用渲染）
function normalizeTopic(t) {
  const owner = t.owner || {};
  const talk = t.talk || {};
  const images = (talk.images || []).map((i) => i.large || i.original || i.thumbnail || "").filter(Boolean);
  const files = (talk.files || []).map((f) => ({ name: f.name, url: f.url, size: f.size })).filter((f) => f.url);
  return {
    id: t.topic_id || "",
    type: t.type || "talk",
    title: talk.title || "",
    text: (talk.text || "").slice(0, 3000),
    author: owner.name || "",
    createTime: t.create_time || "",
    liked: t.liked_count || 0,
    comments: t.comment_count || 0,
    views: t.view_count || 0,
    images,
    files,
    url: "https://wx.zsxq.com/dweb2/index/group/" + (t.group_id || "") + "/topic/" + (t.topic_id || ""),
  };
}

function parseIdx(raw) {
  try { return JSON.parse(raw || "[]"); } catch (_) { return []; }
}

export default async function onRequest(context) {
  const { request } = context;
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders() });

  const url = new URL(request.url);
  const action = (url.searchParams.get("action") || "").toLowerCase();

  try {
    if (request.method === "POST" && action === "ingest") {
      const envKey = (context.env && context.env.ARCHIVE_INGEST_KEY) || "";
      if (!envKey || request.headers.get("x-archive-key") !== envKey) {
        return json({ error: "forbidden: bad or missing x-archive-key" }, 401);
      }
      const raw = await request.text();
      let body;
      try { body = JSON.parse(raw); } catch (_) { return json({ error: "bad json" }, 400); }
      const date = String(body.date || "").trim();
      const groups = body.groups || {};
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || typeof groups !== "object" || Array.isArray(groups)) {
        return json({ error: "date(YYYY-MM-DD) 与 groups 对象必填" }, 400);
      }
      const k = kv();
      const names = Object.keys(groups).filter((n) => Array.isArray(groups[n]) && groups[n].length);
      if (!names.length) return json({ ok: true, saved: 0, message: "无可入库话题" });

      for (const name of names) {
        const topics = groups[name].map(normalizeTopic).filter((t) => t.id);
        await k.put("zarch:" + date + ":" + name, JSON.stringify(topics));
      }
      // 更新索引
      const idx = parseIdx(await k.get("zarch:idx"));
      let entry = idx.find((d) => d.date === date);
      if (!entry) { entry = { date, groups: [] }; idx.push(entry); }
      entry.groups = names.map((n) => ({ name: n, count: groups[n].length }));
      idx.sort((a, b) => (a.date < b.date ? 1 : -1));
      await k.put("zarch:idx", JSON.stringify(idx));
      return json({ ok: true, date, saved: names.length, message: "归档成功" }, 200);
    }

    if (request.method === "GET") {
      const token = request.headers.get("x-zsxq-token") || "";
      if (!token) {
        return json({ error: "missing token", hint: "归档内容仅对登录态可见，请带 x-zsxq-token" }, 401);
      }
      const k = kv();
      if (action === "list") {
        const idx = parseIdx(await k.get("zarch:idx"));
        return json({ action: "list", dates: idx }, 200);
      }
      if (action === "get") {
        const date = (url.searchParams.get("date") || "").trim();
        const group = (url.searchParams.get("group") || "").trim();
        if (!date || !group) return json({ error: "date 与 group 必填" }, 400);
        const topics = JSON.parse((await k.get("zarch:" + date + ":" + group)) || "[]");
        return json({ action: "get", date, group, topics, count: topics.length }, 200);
      }
      return json({ error: "unknown action (use ingest|list|get)" }, 400);
    }

    return json({ error: "method not allowed" }, 405);
  } catch (e) {
    return json({ error: "archive failed", detail: String(e) }, 500);
  }
}
