# 统一指挥台 · 小待（workbench）

面向个人的一体化数字作战台：**自考 / 考研双线备考规划** · **编程语法闯关台** · **学习资料与站点导航** · **3D 小世界与游戏中心** · **求职投递分拣** · **量化因子研究看板** · **书签藏宝库**。

它解决的问题：把备考规划、题库练习、资料检索、求职记录、日常待办与娱乐入口集中到**一个零后端、零依赖、数据完全本地**的纯前端站点——克隆下来用浏览器直接打开 `index.html` 就能运行，不需要 `npm install`、不需要打包器、不需要后端，业务数据也**从不上传任何服务器**。Node.js 只在两件事上用到：提交前的本地校验（`tools/verify.mjs`）和脱敏发布构建（`scripts/sanitize.mjs`）。

| 维度 | 说明 |
| --- | --- |
| 运行形态 | 纯静态站点，`file://` 直开或任意静态服务器均可 |
| 前端技术 | 原生 HTML / CSS / ES Module，无框架运行时；3D 部分用 Three.js r160 |
| 数据存储 | 业务数据全部落在浏览器 `localStorage`，由 `lib/idb-backup.js` 双写 IndexedDB 兜底，**不上传任何服务器** |
| 跨标签一致性 | `lib/sync.js` 基于 `storage` 事件做多标签页状态同步 |
| 工具链 | Node.js ≥ 20，零第三方依赖（校验脚本只用 Node 内置模块） |
| 发布 | 私有源仓 → `scripts/sanitize.mjs` 脱敏 → orphan 强推公开 GitHub Pages 仓 |

## 目录结构 / Project layout

```
workbench/
├── index.html              总指挥台首页（工作台 / 站点导航 / 游戏架 / 量化折叠区）
├── zk-ky.html              自考 · 考研双线备考作战台（进度环 / 打卡 / 真题）
├── practice.html           编程语法闯关台
├── study.html              课程资料库（408 / 自考 / 考研，支持云端直链）
├── share-hub.html          分享集成台（资讯抓取 / 知识星球归档）
├── career.html             求职投递分拣（多平台表头预设导入）
├── projects.html           作品集与项目档案
├── gallery.html            图片画廊
├── src/                    25 个原生 ESM 业务模块
├── lib/                    基础设施层：store / sync / idb-backup / clock / errorlog
│   ├── three/              Three.js r160 运行时
│   └── utils/              安全函数（safeUrl / safeImg / attrSafe）
├── tools/                  本地校验与单测脚本（verify.mjs / audit-secrets.mjs 等）
├── scripts/                sanitize.mjs 脱敏发布构建、audit-cloud-sync.mjs 审计
├── edge-functions/api/     EdgeOne Functions 边缘代理（资讯抓取 / 知识星球）
├── world/                  Three.js 3D 小世界
├── games/  spatial-games/  游戏中心与空间训练场
├── bookmarks/              书签藏宝库（数据驱动）
├── materials/  docs/       资料与文档
├── version.json            全站版本号单一事实来源
└── .github/workflows/      verify.yml（CI 硬校验）· publish.yml（脱敏发布）
```

`src/` 下的 ESM 模块按职责切分，互相之间只通过 `src/state.js` 暴露的共享状态通信：`state.js`（共享状态 spine）、`storage.js` / `data-io.js`（读写与导入导出）、`nav.js` / `navigation.js` / `view-guard.js`（导航与视图守卫）、`dual-zkky.js`（双线备考进度计算）、`quant.js` / `quant-fold.js`（量化看板）、`games-shelf.js`（游戏架分类启动）、`today.js` / `notes.js`（每日待办与笔记）、`version-check.js`（版本比对更新提示）等。

## 安装 / Installation

### 环境要求

| 用途 | 要求 |
| --- | --- |
| 仅浏览使用站点 | 任意现代浏览器（Chrome / Edge / Firefox 最新版），支持 ES Module 与 `localStorage` |
| 运行本地校验、脱敏发布 | Node.js ≥ 20（CI 固定 Node 20），无需任何第三方包 |
| 拉取大文件资源 | Git（部分 3D 模型与 PDF 曾走 Git LFS，如需完整资源请先 `git lfs install`） |

### 安装步骤

```bash
git clone <this-repo-url> workbench
cd workbench
```

到这里就装完了。`package.json` 里既没有 `dependencies` 也没有 `scripts`：

```json
{
  "name": "workbench",
  "private": true,
  "type": "module",
  "description": "统一指挥台 · 小待 — 原生 ESM 模块化（零构建）"
}
```

**不要执行 `npm install`**——项目没有任何 npm 依赖，`type: "module"` 只是为了让 `tools/` 与 `scripts/` 下的 `.mjs` 校验脚本以 ESM 方式被 Node 解析。

### 启动方式

方式一，直接双击打开（最省事）：

```bash
# Windows
start index.html
# macOS
open index.html
```

`file://` 协议下全站可用，仅有两处降级：3D 场景的部分纹理与 `games-local-config.local.js` 若缺失会在控制台留下一次 404，不影响功能（`src/hero.js` 中的 `renderHeroFallback` 专门处理了 `file://` 下的首屏兜底）。

方式二，起一个静态服务器（推荐，避免任何跨域限制）：

```bash
python -m http.server 8080
# 或
npx --yes serve .
```

然后访问 `http://localhost:8080/index.html`。

## 使用 / Usage

### 页面入口一览

打开 `index.html` 后顶栏可以直达全部子系统，也可以直接打开对应文件：

| 入口 | 做什么 | 数据落在哪 |
| --- | --- | --- |
| `index.html` | 总指挥台：今日待办、站点导航、游戏架、量化折叠区、资讯流 | `localStorage` 键 `wb.*` |
| `zk-ky.html` | 自考 / 考研双线：进度环、每日打卡、连续天数、真题练习 | `localStorage` 键 `zkky.*` |
| `practice.html` | 编程语法闯关台：分关卡语法题 | `localStorage` |
| `study.html` | 课程资料库：408 / 自考 / 考研课程资料，支持本地目录与云端直链两种模式 | 只读，配置见下方「配置指引」 |
| `share-hub.html` | 分享集成台：抓取资讯、归档知识星球内容 | 走 `edge-functions/api` 代理 |
| `career.html` | 求职投递分拣：多平台导出表格按预设表头导入合并 | `localStorage` |
| `projects.html` / `gallery.html` | 作品集档案与图片画廊 | 静态 |
| `world/index.html` | Three.js 3D 小世界：角色控制、NPC 对话与跟随 | 静态 |
| `games/index.html` · `spatial-games/` | 游戏中心与空间训练场 | 启动路径见 Configuration |
| `bookmarks/` | 书签藏宝库（`bookmarks/bookmarks.js` 数据驱动，前端渲染「复制」按钮） | 静态 |

日常使用不需要任何命令行操作：所有业务数据写入浏览器 `localStorage`，由 `lib/idb-backup.js` 同步双写一份到 IndexedDB 作为兜底，`lib/sync.js` 监听 `storage` 事件让多个标签页保持一致。想迁移数据用页面内的导入 / 导出（`src/data-io.js`）即可，导出的是单个 JSON 文件。

**运行产物**：本站没有构建产物——`dist/` 目录只在执行脱敏发布构建后出现，是「应公开文件」的复制快照；日常使用与开发都在仓库根目录进行，浏览器就是运行时。

## 配置指引 / Configuration

按需完成以下可选配置，站点才能解锁对应能力；全部配置都有「不配置也能跑」的兜底行为。

| 配置项 | 位置 | 说明 |
| --- | --- | --- |
| 游戏启动器 exe 映射 | `games-local-config.js` → 复制为 `games-local-config.local.js` 后填写 | 空模板随仓库提交；`.local.js` 已被 `.gitignore` 排除，真实路径只留在本机 |
| 课程资料目录 | `study.html` 顶部 `BASE_DIR` | 指向本地资料目录，或切换「云端直链」模式直接配置 URL |
| 资讯抓取 / 知识星球代理 | `edge-functions/api/`（`crawl.js` / `zsxq.js` / `zsxq-archive.js`） | 部署到 EdgeOne Pages Functions 后，把前端 `API_BASE` 指向函数地址；归档写入需要控制台绑定 KV 命名空间并设置 `ARCHIVE_INGEST_KEY` 环境变量 |
| 知识星球凭证 | `zsxq.html` / `share-hub.html` 页内设置卡片 | token 与 `API_BASE` 仅存浏览器 `localStorage`，经请求头转发给边缘代理，不落仓库与服务端 |
| Strix 沙箱设备 | `strix-deploy/`（`docker-compose.yml` + `api/server.js`） | 复制 `.env.example` 为 `.env` 填写鉴权 token，`docker compose up -d` 启动；详见该目录 `README.md` |
| 版本号 | `version.json` | 全站版本号单一事实来源；顶栏徽标会检测更新提示 |

## 本地校验 / Verify（提交前必跑）

改完代码后跑校验脚本，这是本仓库唯一的「测试命令」：

```bash
node tools/verify.mjs                              # 跑全部检查
node tools/verify.mjs --only=syntax,safefn         # 只跑指定的几项
```

`--only=` 接受下表任意项的逗号分隔组合：

| 检查项 | 校验内容 |
| --- | --- |
| `syntax` | 内联脚本语法（`index` / `zk-ky` / `share-hub` / `zsxq` / `stepfun` / `world`） |
| `inlinesyn` | 全站 HTML 内联脚本语法（2026-08-30 扩面覆盖所有页面） |
| `safefn` | 安全函数单测：`safeUrl` / `safeImg` / `attrSafe` 的白名单行为 |
| `errorbound` | 错误边界冒烟：`renderNews` / `renderQuizQ` / `renderMath` 的降级、上报与连跳保护 |
| `sanitize` | `scripts/sanitize.mjs` 完整性红线 + DENY 匹配行为（防止合并破坏导致公开站停更） |
| `store` | `lib/store.js` 统一数据层单测：嵌套路径、订阅、迁移、导入导出 |
| `deadlink` | 公开站死链：公开页面不得链接到被 DENY 排除的文件（标了 `data-private` 的可豁免） |
| `version` | 版本号三处一致性：`version.json` 与 `index` / `zk-ky` / `share-hub` 的 `app-version` meta |
| `secrets` | 敏感特征扫描（`tools/audit-secrets.mjs`）：内网 IP、本机绝对路径、密钥的卡口 |
| `selfcheck` | 校验脚本自身健康度：`tools/*.mjs` 不得硬编码本地绝对路径（防 CI 假绿灯复发） |
| `xss` | XSS 渲染点审计，输出可疑清单供人工判定，**不计入失败** |

单独校验外链脚本的语法（CI 里也会跑同一套）：

```bash
for f in lib/*.js sites.js games-library.js soul.js; do node --check "$f"; done
```

## 持续集成 / CI

`.github/workflows/verify.yml` 在 push / PR 到 `main` 以及手动触发时运行，Node 20：

1. `node tools/verify.mjs --only=syntax,safefn,errorbound,deadlink,version,secrets,selfcheck` —— **失败即阻断**
2. 逐个 `node --check` 校验外链脚本
3. `node tools/verify.mjs --only=xss` —— `continue-on-error: true`，仅报告

第 3 步之外没有任何 `continue-on-error`。这是刻意的：早期 job 级 `continue-on-error` 曾长期掩盖 `test-safefn.mjs` 硬编码本地绝对路径造成的持续失败，形成「假绿灯」，因此新增了 `selfcheck` 检查项并收紧了 CI 配置。

## 发布 / Deploy

`.github/workflows/publish.yml` 在 push 到 `main` 时自动执行脱敏发布：

```bash
node scripts/sanitize.mjs      # 把「应公开」文件按 DENY 黑名单排除后复制到 dist/
```

随后在 `dist/` 里 `git init` 并以 orphan 分支 `--force` 推到公开 GitHub Pages 仓库。这样公开仓的历史永远只有 1 个「脱敏快照」提交，私有源仓的完整开发历史不会外泄。本地也可以只跑 `node scripts/sanitize.mjs` 检查产物内容，不会触及远端。

## 安全与隐私 / Security & Privacy

- 业务数据（待办 / 打卡 / 笔记 / 求职记录等）只存在于你自己的浏览器，不上传任何服务器；清空站点数据前可先用 `src/data-io.js` 导出 JSON 备份。
- 密钥与隐私类文件（`.env`、`games-local-config.local.js`、`_private/` 等）不入库或已被 `.gitignore` 排除；`tools/audit-secrets.mjs` 会在校验与 CI 中扫描内网 IP、本机绝对路径与密钥特征。
- 对外发布一律经过 `scripts/sanitize.mjs` 的 DENY 黑名单复制流程，私有 / 内部目录不会进入公开站。
- 更多架构与模块说明见 [CODE-WIKI.md](CODE-WIKI.md)，参与贡献请先读 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 许可证 / License

本项目基于 [MIT License](LICENSE) 开源。仓库内的第三方数据与资源（题库、书签来源、品牌与商标等）版权归各自作者所有，仅作个人学习研究用途，随本仓库分发不代表重新授权。
