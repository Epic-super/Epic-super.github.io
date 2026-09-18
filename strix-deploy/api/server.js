#!/usr/bin/env node
/**
 * Strix 设备端服务（零依赖，仅用 Node 内置模块）
 * 部署在那台有 Docker 的设备上，经 Tailscale 等私有 overlay 网络被站点 launcher 调用。
 * 站点只发任务 + 收报告，本服务负责在 Docker 沙箱内真实执行 Strix。
 *
 * 启动：node server.js   （建议用 docker-compose 起，见 ../docker-compose.yml）
 */
const http = require("http");
const crypto = require("crypto");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const PORT = parseInt(process.env.PORT || "8787", 10);
const STRIX_TOKEN = process.env.STRIX_TOKEN || "";
const ZHIPU_API_KEY = process.env.ZHIPU_API_KEY || "";
const STRIX_IMAGE = process.env.STRIX_IMAGE || "usestrix/strix:latest";
const USE_DOCKER = (process.env.USE_DOCKER || "true").toLowerCase() !== "false";
const BASE_URL = process.env.ANTHROPIC_BASE_URL || "https://open.bigmodel.cn/api/paas/v4";
const LOG_FILE = path.join(__dirname, "..", "scan-log.jsonl");
const RUN_TIMEOUT = parseInt(process.env.RUN_TIMEOUT || "1800", 10) * 1000; // 默认 30 分钟

if (!STRIX_TOKEN) {
  console.error("[FATAL] 必须设置环境变量 STRIX_TOKEN");
  process.exit(1);
}

function audit(entry) {
  try {
    fs.appendFileSync(LOG_FILE, JSON.stringify(Object.assign({ ts: new Date().toISOString() }, entry)) + "\n");
  } catch (e) { console.error("audit log fail:", e.message); }
}

function send(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
  res.end(body);
}

function authOk(req) {
  const auth = req.headers["authorization"] || "";
  const m = auth.match(/^Bearer\s+(.+)$/i);
  const token = m ? m[1] : (req.headers["x-strix-token"] || "");
  return token && token === STRIX_TOKEN;
}

function buildCmd(body) {
  const target = (body.target || "").trim();
  const repo = (body.repo || "").trim();
  const model = (body.model || "glm-5.3-flash").trim();
  const mode = (body.mode || "").trim(); // --diff-only / --full-scan / ""
  const apiKey = (body.apiKey || ZHIPU_API_KEY || "").trim();
  if (!target) throw new Error("target 必填");
  if (!apiKey) throw new Error("缺少 API Key（请求未带 apiKey 且服务端未设 ZHIPU_API_KEY）");

  const env = [
    `ANTHROPIC_API_KEY=${apiKey}`,
    `ANTHROPIC_BASE_URL=${BASE_URL}`,
    `ANTHROPIC_MODEL=${model}`,
  ];

  if (USE_DOCKER) {
    const args = ["run", "-i", "--rm"];
    env.forEach((e) => args.push("-e", e));
    let repoArg = repo || ".";
    if (repo && fs.existsSync(repo)) {
      args.push("-v", `${path.resolve(repo)}:/repo:ro`);
      repoArg = "/repo";
    }
    args.push(STRIX_IMAGE, "start", "-u", target, "-r", repoArg, "-m", model);
    if (mode) args.push(mode);
    return { bin: "docker", args, cmdStr: "docker " + args.map((a) => (a.includes(" ") ? `"${a}"` : a)).join(" ") };
  } else {
    const args = ["@usestrix/strix", "start", "-u", target, "-r", repo || ".", "-m", model];
    if (mode) args.push(mode);
    return { bin: "npx", args, cmdStr: env.join(" ") + " npx " + args.join(" ") };
  }
}

const server = http.createServer((req, res) => {
  // CORS（仅你自己的 overlay 网络，按需收紧）
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-strix-token");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") return send(res, 204, {});

  const ip = req.socket.remoteAddress;

  if (req.method === "GET" && req.url === "/api/health") {
    return send(res, 200, { ok: true, ts: Date.now(), image: STRIX_IMAGE, docker: USE_DOCKER });
  }

  if (req.method === "POST" && req.url === "/api/scan") {
    if (!authOk(req)) { audit({ ip, action: "scan", denied: true }); return send(res, 401, { error: "unauthorized" }); }
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      let body;
      try { body = JSON.parse(raw || "{}"); } catch (e) { return send(res, 400, { error: "bad json" }); }
      // 合规红线：必须带授权说明
      if (!body.authNote || !body.authNote.trim()) {
        return send(res, 400, { error: "authNote required（必须说明目标已授权）" });
      }
      let spec;
      try { spec = buildCmd(body); }
      catch (e) { return send(res, 400, { error: e.message }); }

      const jobId = crypto.randomUUID();
      audit({ ip, action: "scan", jobId, target: body.target, repo: body.repo, model: body.model, mode: body.mode, authNote: body.authNote });

      console.log(`[scan] ${jobId} start: ${spec.cmdStr}`);
      const child = exec(`${spec.bin} ${spec.args.map((a) => JSON.stringify(a)).join(" ")}`,
        { timeout: RUN_TIMEOUT, maxBuffer: 32 * 1024 * 1024, env: Object.assign({}, process.env, {
          ANTHROPIC_API_KEY: body.apiKey || ZHIPU_API_KEY,
          ANTHROPIC_BASE_URL: BASE_URL,
          ANTHROPIC_MODEL: body.model || "glm-5.3-flash",
        }) },
        (err, stdout, stderr) => {
          const out = (stdout || "").slice(-20000) + (stderr ? "\n--- stderr ---\n" + stderr.slice(-5000) : "");
          if (err) {
            audit({ jobId, failed: true, code: err.code, killed: err.killed });
            console.error(`[scan] ${jobId} error:`, err.message);
            return send(res, 200, { jobId, status: "error", error: err.message, output: out });
          }
          audit({ jobId, done: true, outLen: out.length });
          console.log(`[scan] ${jobId} done, ${out.length} bytes`);
          send(res, 200, { jobId, status: "done", output: out });
        });
      // 防止超长任务挂死：记录 PID（可选 kill 接口可扩展）
      child.on("spawn", () => audit({ jobId, pid: child.pid }));
    });
    return;
  }

  send(res, 404, { error: "not found" });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Strix device API on :${PORT} (docker=${USE_DOCKER}, image=${STRIX_IMAGE})`);
});
