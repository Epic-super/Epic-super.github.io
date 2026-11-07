# Code Wiki · 小待统一指挥台仓库

> 最后更新：2026-08-27  
> 适用范围：`（项目根目录）`  
> 说明：本仓库是一个以“纯静态站点 + 本地存储”为核心的个人数字作战台/工作台集合，面向自考、考研、编程学习、游戏中心与个人作品展示。

---

## 1. 项目整体概览

| 维度 | 内容 |
|------|------|
| **项目名称** | 统一指挥台 · 小待（个人数字作战台） |
| **仓库定位** | 私有源仓（含完整历史 + 内部素材）→ 脱敏后公开仓（GitHub Pages） |
| **站点类型** | 纯静态站点，无后端服务，数据存浏览器 localStorage |
| **主要入口** | `index.html`（统一指挥台）、`share-hub.html`（分享集成台） |
| **部署目标** | GitHub Pages（公开仓 `Epic-super.github.io`） |
| **版本管理** | Git + Git LFS（3D 模型、大体积素材） |
| **CI/CD** | GitHub Actions（`publish.yml`：脱敏 → orphan 强推） |

---

## 2. 代码规模与语言构成

### 2.1 统计口径说明
- **统计工具**：自定义 Node.js 脚本 `_scratch/count_loc.mjs`
- **扫描范围**：`（项目根目录）` 全量文件
- **排除目录**：`node_modules`、`.git`、`dist`、`_scratch`、`.edgeone`、`vendor`、`.vite`、`__pycache__`、`.next`、`.cache`、`build`、`out`
- **排除文件**：`*.min.js`、`*.min.css`、`*.map`、`package-lock.json`、`.DS_Store` 等
- **行数计算**：按换行符 `\n` 统计，包含空行

### 2.2 按语言/类型分类统计

| 排名 | 类型 | 文件数 | 代码行数 | 占比 |
|------|------|--------|----------|------|
| 1 | PDF（学习资料） | 42 | 4,022,850 | 88.11% |
| 2 | JavaScript | 59 | 173,485 | 3.80% |
| 3 | 3D Model（.glb） | 3 | 147,660 | 3.23% |
| 4 | Image（png/jpg） | 24 | 84,150 | 1.84% |
| 5 | HTML | 112 | 64,065 | 1.40% |
| 6 | PowerPoint（.pptx） | 9 | 24,373 | 0.53% |
| 7 | CSS | 15 | 15,706 | 0.34% |
| 8 | Font（woff/woff2） | 30 | 8,406 | 0.18% |
| 9 | Markdown | 34 | 6,265 | 0.14% |
| 10 | TypeScript (TSX) | 66 | 5,731 | 0.13% |
| 11 | JSON | 11 | 3,792 | 0.08% |
| 12 | Python | 7 | 784 | 0.02% |
| 13 | TypeScript | 5 | 707 | 0.02% |
| 14 | 其他 | 3 | 5,200 | 0.11% |
| **合计** | **442 文件** | **4,565,553 行** | **100%** |

### 2.3 关键发现
- **PDF 占比极高（88%）**：主要是考研/自考学习资料（408 考研、自考 C++/Python、离散数学等）
- **实际代码以 HTML + JavaScript 为主**：若排除 PDF，JS + HTML + CSS 合计约 26 万行，占代码主体的 78%
- **TypeScript 主要集中于 `spatial-games/brain-development-games`**：React + TSX 项目
- **3D 资源**：`world/models/character.glb` 等 LFS 托管的大体积模型

### 2.4 项目规模分桶（排除 PDF/素材后）

| 项目/目录 | 主要语言 | 规模 |
|-----------|----------|------|
| `index.html` + 根目录页面 | HTML/CSS/JS | ~64K 行（全量 HTML） |
| `games/fps-tactical` | JavaScript + Three.js | ~4K 行 |
| `spatial-games/brain-development-games` | TypeScript/TSX + React | ~6K 行 |
| `spatial-games/mikado` | JavaScript + Three.js | ~1K 行 |
| `spatial-games/cube-01` | HTML/CSS/JS | ~500 行 |
| `lab/products` | HTML/CSS/JS | ~15K 行（约 30+ 个独立页面） |
| `me/` | HTML/CSS/JS | ~8K 行 |
| `edge-functions` | JavaScript (Edge Runtime) | ~200 行 |
| `lib/` | JavaScript | ~1K 行（统一数据层） |
| `scripts/` | JavaScript (Node) | ~200 行（部署脚本） |

---

## 3. 项目架构

### 3.1 架构总览

```
┌─────────────────────────────────────────────────────────┐
│                    公开层 (dist/)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │ 统一指挥台   │  │ 分享集成台   │  │ 各产品/游戏页面  │  │
│  │ index.html  │  │share-hub.html│  │ *.html          │  │
│  └──────┬──────┘  └──────┬──────┘  └─────────────────┘  │
│         │                │                              │
│         ▼                ▼                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │              lib/ 共享基础设施层                    │   │
│  │  • store.js（localStorage 统一数据层）              │   │
│  │  • sync.js（多端同步）                             │   │
│  │  • clock.js（时间/倒计时）                         │   │
│  │  • errorlog.js（错误日志）                         │   │
│  │  • idb-backup.js（IndexedDB 备份）                 │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    应用层                                │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │ games/       │  │ spatial-     │  │ lab/          │  │
│  │ fps-tactical │  │ games/       │  │ products/     │  │
│  │ (Three.js)   │  │ brain-dev    │  │ (各种工具页)   │  │
│  └──────────────┘  │ (React+TS)   │  └───────────────┘  │
│                     │ mikado       │                     │
│                     │ cube-01      │                     │
│                     └──────────────┘                     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    服务层                                │
│  • edge-functions/api/crawl.js（EdgeOne 网页抓取代理）   │
│  • edge-functions/api/zsxq.js（知识星球相关）           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    构建/部署层                            │
│  • scripts/sanitize.mjs（脱敏构建）                      │
│  • .github/workflows/publish.yml（CI/CD）               │
└─────────────────────────────────────────────────────────┘
```

### 3.2 核心分层说明

#### 3.2.1 公开层（静态页面）
- **性质**：纯静态 HTML/CSS/JS，无构建步骤即可双击运行
- **数据持久化**：全部通过 `localStorage`，不上传任何服务器
- **多端同步**：通过 `sync.js` + EdgeOne Edge Function 实现跨设备同步

#### 3.2.2 共享基础设施层（`lib/`）
提供通用能力给所有页面使用：
- `store.js`：统一数据层，提供 `get/set/subscribe`，兼容老 key 迁移
- `sync.js`：数据同步通道
- `clock.js`：时间与倒计时工具
- `errorlog.js`：客户端错误日志
- `idb-backup.js`：IndexedDB 备份机制

#### 3.2.3 应用层
各子项目相对独立，可单独运行：

| 子项目 | 路径 | 技术栈 | 说明 |
|--------|------|--------|------|
| 统一指挥台 | 根目录 `*.html` | 原生 HTML/CSS/JS | 主入口，待办/打卡/笔记/游戏中心/导航 |
| 分享集成台 | `share-hub.html` | 原生 HTML/CSS/JS | 微信语料/资源分享聚合 |
| FPS 战术 | `games/fps-tactical/` | Three.js + Vite | 浏览器 FPS 游戏 |
| 脑力训练 | `spatial-games/brain-development-games/` | React 18 + TS + Tailwind + Vite | 20+ 认知训练小游戏 |
| 米卡多 | `spatial-games/mikado/` | Three.js | 3D 空间游戏 |
| 魔方 | `spatial-games/cube-01/` | HTML/CSS/JS | 3D 魔方/空间认知 |
| Lab 产品 | `lab/products/` | 原生 HTML/CSS/JS | 各种工具页面（对比报告、RFQ 分析等） |
| 个人站点 | `me/` | 原生 HTML/CSS/JS | 个人博客/作品/笔记 |

#### 3.2.4 服务层（Edge Functions）
- `edge-functions/api/crawl.js`：通用网页抓取代理，绕过浏览器 CORS
- `edge-functions/api/zsxq.js`：知识星球相关接口

#### 3.2.5 构建/部署层
- `scripts/sanitize.mjs`：脱敏构建，过滤私有文件后输出到 `dist/`
- `.github/workflows/publish.yml`：GitHub Actions 自动部署到公开 Pages 仓

---

## 4. 主要模块职责

### 4.1 统一指挥台（根目录）
**核心页面**：`index.html`、`projects.html`、`study.html`、`health.html`、`career.html`、`c2.html` 等

**主要功能**：
- 待办事项管理（localStorage 持久化）
- 考研/自考学习资料导航
- 游戏中心入口
- 学习网站导航
- 个人藏宝库
- 黑客学习区
- 奶酪书签导航

**关键类/函数**：
- `WBStore`（`lib/store.js`）：统一数据层，提供 `get/set/subscribe`
- `wbSync`（`lib/sync.js`）：多端同步机制
- 页面内联脚本：各页面的业务逻辑（路由、渲染、交互）

### 4.2 游戏中心

#### 4.2.1 FPS 战术（`games/fps-tactical`）
- **入口**：`src/main.js`
- **核心类**：
  - `Game`（`src/core/Game.js`）：主游戏循环，管理场景/相机/渲染器
  - `Player`（`src/entities/Player.js`）：玩家控制
  - `Enemy`（`src/entities/Enemy.js`）：敌人 AI
  - `Weapon`/`Bullet`（`src/weapons/`）：武器系统
  - `MapBuilder`（`src/world/MapBuilder.js`）：关卡构建
  - `PhysicsManager`（`src/core/PhysicsManager.js`）：物理模拟
  - `AudioManager`（`src/core/AudioManager.js`）：音频管理
  - `UIManager`（`src/core/UIManager.js`）：UI 管理
  - `AssetLoader`（`src/core/AssetLoader.js`）：资源加载
  - `BloodEffect`（`src/effects/BloodEffect.js`）：粒子特效
- **依赖**：Three.js 0.160+、Vite 5

#### 4.2.2 脑力训练游戏（`spatial-games/brain-development-games`）
- **入口**：`src/main.tsx` → `src/App.tsx`
- **路由**：React Router v6，20+ 游戏页面
- **核心注册表**：`src/lib/gameRegistry.ts`（`GAME_REGISTRY`）
- **游戏列表**：WaterJugs、TowerOfHanoi、BallSort、N-Back、Stroop、MentalRotation、SchulteTable、Maze、PatternMatrix、QuickMath、WordScramble、SimonSays、CardMatching、ReactionTime、NumberSequence、DualTask、VisualSearch、AnagramSolver、TrailMaking、WorkingMemoryGrid、LogicPuzzles
- **状态管理**：`src/lib/progress.ts`（进度持久化）
- **排行榜**：`src/lib/leaderboard.ts`
- **依赖**：React 18、React Router 6、Tailwind CSS 4、TypeScript 5、Vitest

#### 4.2.3 米卡多（`spatial-games/mikado`）
- 基于 Three.js 的 3D 空间游戏
- 入口：`mikado.js`、`index.html`

#### 4.2.4 魔方（`spatial-games/cube-01`）
- 3D 魔方交互页面
- 入口：`script.js`、`index.html`

### 4.3 Lab 产品（`lab/products/`）
约 30+ 独立 HTML 工具页面，包括：
- 学习工具：math-beauty、spatial-rotation、habit-forge、ncre-exam-plan
- 分析工具：rfq-align-check、rfq-column-compare、rfq-diff-report、factor-dashboard
- 其他：chat.html、project-hub、lighthouse-instance、coding-arena

### 4.4 个人站点（`me/`）
- 个人博客、作品集、笔记、工具集
- 入口：`index.html`、`blog.html`、`projects.html`

### 4.5 Edge Functions（`edge-functions/`）
- **Crawl API**：服务端网页抓取，提取 title/description/正文
- **zsxq API**：知识星球相关接口

### 4.6 共享库（`lib/`）
- `store.js`：localStorage 统一数据层（兼容迁移、事件订阅）
- `sync.js`：跨设备同步
- `clock.js`：时间工具
- `errorlog.js`：错误日志
- `idb-backup.js`：IndexedDB 备份

---

## 5. 依赖关系

### 5.1 前端依赖

#### 统一指挥台（根目录页面）
- **无外部依赖**：纯原生 HTML/CSS/JS
- **本地库**：`lib/three/`（Three.js 本地副本，用于 cangqiong.html 等）
- **Vendor 库**：`vendor/katex/`（数学公式渲染）、`vendor/face-api/`（人脸识别）

#### games/fps-tactical
```json
{
  "dependencies": {
    "three": "^0.160.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

#### spatial-games/brain-development-games
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.17.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.1.2",
    "typescript": "^5.4.2",
    "vite": "^5.2.2",
    "vitest": "^1.0.0",
    "tailwindcss": "^4.1.8",
    "@tailwindcss/postcss": "^4.1.18",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.28"
  }
}
```

### 5.2 构建工具链
- **Vite**：用于 `games/fps-tactical` 和 `spatial-games/brain-development-games`
- **Node.js 20**：GitHub Actions 运行环境
- **Git LFS**：管理 3D 模型等大文件

### 5.3 部署依赖
- **GitHub Actions**：自动化 CI/CD
- **EdgeOne**：Edge Functions + Pages 托管（公开站）

---

## 6. 关键类与函数速查

### 6.1 lib/store.js（统一数据层）
| 函数/属性 | 说明 |
|-----------|------|
| `WBStore.get(path, def)` | 按路径读取数据 |
| `WBStore.set(path, value, opts)` | 按路径写入数据 |
| `WBStore.subscribe(cb)` | 订阅数据变更 |
| `WBStore.getLegacy(key, def)` | 兼容层：读取老 key |
| `WBStore.setLegacy(key, val)` | 兼容层：写入老 key |
| `WBStore.exportAll()` | 导出全部数据 |
| `WBStore.importAll(json)` | 导入全部数据 |

### 6.2 games/fps-tactical 核心类
| 类 | 文件 | 职责 |
|----|------|------|
| `Game` | `src/core/Game.js` | 主游戏循环、场景初始化 |
| `Player` | `src/entities/Player.js` | 玩家控制与相机 |
| `Enemy` | `src/entities/Enemy.js` | 敌人 AI |
| `Weapon` | `src/weapons/Weapon.js` | 武器逻辑 |
| `Bullet` | `src/weapons/Bullet.js` | 子弹逻辑 |
| `MapBuilder` | `src/world/MapBuilder.js` | 地图构建 |
| `PhysicsManager` | `src/core/PhysicsManager.js` | 物理模拟 |
| `AudioManager` | `src/core/AudioManager.js` | 音频管理 |
| `UIManager` | `src/core/UIManager.js` | UI 管理 |
| `AssetLoader` | `src/core/AssetLoader.js` | 资源加载 |
| `BloodEffect` | `src/effects/BloodEffect.js` | 血液粒子特效 |

### 6.3 spatial-games/brain-development-games 核心
| 模块 | 文件 | 职责 |
|------|------|------|
| `App` | `src/App.tsx` | 路由配置与布局 |
| `GAME_REGISTRY` | `src/lib/gameRegistry.ts` | 游戏元数据注册表 |
| `progress` | `src/lib/progress.ts` | 用户进度持久化 |
| `leaderboard` | `src/lib/leaderboard.ts` | 排行榜 |
| 各游戏页面 | `src/pages/games/*.tsx` | 20+ 独立游戏组件 |

---

## 7. 项目运行方式

### 7.1 统一指挥台（根目录页面）
**无需构建，直接运行：**
```bash
# 方式1：直接双击 index.html
# 方式2：本地服务器（可选）
python -m http.server 8080
# 或
npx serve .
```
**访问**：`http://localhost:8080`

### 7.2 FPS 战术游戏
```bash
cd games/fps-tactical
npm install
npm run dev      # 开发服务器（端口 5173）
npm run build    # 构建到 dist/
npm run preview  # 预览构建产物
```

### 7.3 脑力训练游戏
```bash
cd spatial-games/brain-development-games
npm install
npm run dev      # 开发服务器
npm run build    # 构建到 docs/
npm run test     # 运行 Vitest 测试
npm run preview  # 预览构建产物
```

### 7.4 部署流程
```bash
# 1. 本地修改完成后，推送到 main 分支
git push origin main

# 2. GitHub Actions 自动触发：
#    - 检出私有源仓
#    - 运行 node scripts/sanitize.mjs 生成 dist/
#    - Orphan 强推 dist/ 到公开仓 Epic-super.github.io
```

### 7.5 本地脱敏构建（预览公开站效果）
```bash
node scripts/sanitize.mjs
# 输出目录：dist/
```

---

## 8. 目录结构说明

| 路径 | 说明 |
|------|------|
| `/` | 统一指挥台主页面及各类工具页面 |
| `games/` | 游戏相关（fps-tactical 独立项目） |
| `spatial-games/` | 空间认知类游戏（brain-dev、mikado、cube-01） |
| `lab/` | 实验室产品/工具页面 |
| `lab/content/` | 内部笔记（AeroCAD/TRAE/高博航空，不公开） |
| `lab/products/` | 公开产品页面 |
| `me/` | 个人站点（博客、作品、笔记） |
| `edge-functions/` | EdgeOne Edge Functions |
| `lib/` | 共享 JS 库 |
| `vendor/` | 第三方库本地副本（Three.js、KaTeX、face-api） |
| `materials/` | 学习资料（PDF 等，不公开） |
| `scripts/` | 构建/部署脚本 |
| `docs/` | 项目文档 |
| `project-docs/` | 项目回顾文档 |
| `.workbuddy/` | 工作记忆/上下文 |
| `_scratch/` | 临时/实验性代码 |
| `.edgeone/` | EdgeOne 配置与部署副本 |
| `dist/` | 脱敏构建输出（Git 跟踪，但 CI 会重置） |

---

## 9. 技术栈总结

| 层级 | 技术 |
|------|------|
| **前端框架** | 原生 HTML/JS（主站）、React 18（脑力训练） |
| **语言** | JavaScript、TypeScript、HTML、CSS |
| **3D 引擎** | Three.js（FPS、mikado、cangqiong） |
| **样式** | 原生 CSS、Tailwind CSS 4 |
| **构建工具** | Vite 5 |
| **测试** | Vitest + Testing Library |
| **路由** | React Router 6（React 项目） |
| **数据存储** | localStorage、IndexedDB |
| **部署** | GitHub Pages + GitHub Actions |
| **边缘计算** | EdgeOne Edge Functions |
| **大文件管理** | Git LFS |

---

## 10. 注意事项与红线

1. **脱敏规则**：`scripts/sanitize.mjs` 中的 `DENY` 数组严格控制不公开内容
2. **Git LFS**：3D 模型（.glb）必须通过 LFS 管理，否则无法部署
3. **隐私安全**：所有用户数据存 localStorage，不上传服务器
4. **密钥管理**：GitHub Actions 使用 `PAGES_PAT` secret，需定期轮换
5. **三端一致性**：新增页面需验证 PC/移动/平板响应式正常
6. **离线可用**：`lib/three/` 已本地化，cangqiong.html 可离线运行

---

## 11. 快速命令参考

```bash
# 统计代码行数
node _scratch/count_loc.mjs

# 统一指挥台本地预览
python -m http.server 8080

# FPS 游戏开发
cd games/fps-tactical && npm run dev

# 脑力训练游戏开发
cd spatial-games/brain-development-games && npm run dev

# 运行测试
cd spatial-games/brain-development-games && npm run test

# 脱敏构建
node scripts/sanitize.mjs

# Git 操作
git add .
git commit -m "chore: update"
git push origin main
```

---

## 12. 附录：关键文件索引

| 文件 | 说明 |
|------|------|
| `README.md` | 项目总览 |
| `index.html` | 统一指挥台主入口 |
| `share-hub.html` | 分享集成台 |
| `lib/store.js` | 统一数据层 |
| `lib/sync.js` | 数据同步 |
| `scripts/sanitize.mjs` | 脱敏构建脚本 |
| `.github/workflows/publish.yml` | CI/CD 配置 |
| `games/fps-tactical/package.json` | FPS 游戏配置 |
| `spatial-games/brain-development-games/package.json` | 脑力训练配置 |
| `注意事项.md` | 部署注意事项 |
| `CONTRIBUTING.md` | 贡献指南 |
