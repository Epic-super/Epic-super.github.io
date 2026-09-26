# Strix 设备端服务（Docker）

把 [Strix](https://github.com/usestrix/strix) 真实跑在那台有 Docker 的设备上，经 **Tailscale / ZeroTier 等私有 overlay 网络**被个人站的 `hacker/strix-launcher.html` 调用。

> ⚠️ **本服务只在你自己的私有网络可达，绝不暴露公网。** Strix 是真实攻击引擎，公网暴露 = 攻击面 + 出口 IP 声誉 + 合规风险，强烈不建议。

## 架构
```
[ 个人站 launcher ]  --Tailscale(私有)-->  [ 这台 Docker 设备 ]
  生成任务 / 收报告                       docker-compose: strix-api
                                          └─ 在 Docker 沙箱内 exec Strix
```

## 部署步骤（在 Docker 设备上）

### 1. 装 Docker + Tailscale
```bash
# Docker（略，按系统）
# Tailscale
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
# 记下这台机器的 Tailscale 地址，例如 http://100.x.x.x:8787 或自定义域名
```

### 2. 取本目录到设备
```bash
git clone <你的私有仓> && cd workbench/strix-deploy
# 或直接从站点公开页下载 zip
```

### 3. 配置环境变量
```bash
cp .env.example .env
# 编辑 .env：填 STRIX_TOKEN（长随机串）与 ZHIPU_API_KEY
```

### 4. 准备代码仓库（Strix 需读源码）
```bash
mkdir -p repos
git clone <你的被测项目> repos/myapp
# 站点 launcher 的 repo 字段填 /repos/myapp
```

### 5. 启动
```bash
docker compose up -d
# 健康检查
curl http://localhost:8787/api/health
```

## 站点侧对接
打开个人站「工具」→ **Strix 启动器**：
- 设备地址填 `http://<tailscale-ip>:8787`
- 访问令牌填 `.env` 里的 `STRIX_TOKEN`
- 点「保存设备配置」「测试连通」，再填目标/仓库/模型/授权说明 → 「投递任务」

## 合规红线（务必遵守）
- 只测**自己拥有**或已**书面授权**的目标。
- 每次任务强制填写「授权目标说明」，服务端 `scan-log.jsonl` 留档（含时间/IP/目标）。
- 扫描在 Docker 沙箱内执行，不影响宿主机。
- 未授权测试属违法行为。

## API
| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/api/health` | 健康检查 `{ok,ts}` |
| POST | `/api/scan` | Header `Authorization: Bearer <STRIX_TOKEN>`，Body `{target, repo, model, mode, authNote, apiKey?}` |

`mode` 可选 `--diff-only` / `--full-scan`；`authNote` 必填。

## 关闭 / 卸载
```bash
docker compose down
```
