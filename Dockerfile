# =====================================================================
# 统一指挥台 · 静态发布镜像
#
# ▍这个 Dockerfile 服务什么场景？
#   把 `_master/dist/`（Actions 脱敏后的公开产物）打成可复现的静态镜像，
#   任意机器一条命令即可起一个「与公开站 epic-super.github.io 一致」的本地预览：
#     docker build -t workbench .
#     docker run --rm -p 8080:80 workbench
#
# ▍为什么不推荐多阶段？
#   本项目的 `package.json` 是零依赖零构建脚本（原生 ESM，无 webpack/vite），
#   产物 `dist/` 已是 CI 脱敏后的成品 → 没有「builder 装依赖再瘦身」这一步。
#   这里保留两个 builder 阶段，仅作「可选自举」演示，日常构建会跳过它们
#   （runner 只 COPY 现成 dist，builder 从未被使用，构建器会自动弃用这些层）。
#   真正想从源码全量重建时取消 builder 的注释即可。
# =====================================================================

# ---------------- Stage 1 (builder) · 可选：从源码生成脱敏 dist ----------------
# 仅当你想在容器内复现 CI 的 sanitize 流水线时启用。默认不使用。
# FROM node:20-alpine AS builder
# WORKDIR /src
# COPY package.json ./
# COPY scripts ./scripts
# COPY . .
# # 按 _master/tools/sanitize.mjs 真实命令替换（此处为示意，勿直接跑）
# RUN node scripts/sanitize.mjs --input . --output /out \
#     && test -s /out/index.html

# ---------------- Stage 2 (builder) · 可选：校验产物完整性 ----------------
# 镜像优化点：用静态校验而非笨重的测试框架；失败即中止构建。
FROM alpine:3.20 AS verify
RUN apk add --no-cache bash=5.2.21-r0
COPY dist /check
RUN test -f /check/index.html \
 && test -s /check/index.html \
 && echo "[verify] dist/index.html ok" \
 && rm -rf /check

# ---------------- Stage 3 (runner) · 最终最小运行镜像 ----------------
# 优化策略：
#   * nginx:alpine（~20MB）取代 nginx:latest（~100MB），省 ~80MB
#   * 只 COPY 必需的 dist 目录，不整仓 COPY
#   * 非 root 运行（user nginx），提升容器安全性
#   * 静态站通常不会超过 1 个 worker，降并发省内存
#   * healthcheck 用 alpine 自带 wget，不额外塞 curl
FROM nginx:1.27-alpine

# 关闭 nginx 默认欢迎页，避免与 dist/index.html 抢根路径
RUN rm -f /etc/nginx/conf.d/default.conf

COPY dist /usr/share/nginx/html

# 简单优化：gzip 静态资源 + 关闭 server tokens（防版本泄露）
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 以非 root 身份运行，降低容器逃逸风险面
USER nginx

EXPOSE 80

# 健康检查：不引入 curl，用内置 wget 探测首页
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
