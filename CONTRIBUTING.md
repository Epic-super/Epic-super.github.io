# workbench 贡献指南（CONTRIBUTING.md）

> workbench 是个人站「统一指挥台」的**私有源码仓库**（Epic-super）。push 到 `main` 会自动触发脱敏部署，生成公开站 `Epic-super.github.io`。
> 本文件是**开发与协作铁律**，任何会话、任何设备改代码前先读一遍。

## 一、铁律（违反会出事）

1. **绝不 force-push、绝不改历史**。远端 `main` 是唯一真源，所有提交都是干净快进。
2. **`materials/`（408 付费考研 PDF + 自考课件）仅留私有仓，绝不进公开站**——已列入 `scripts/sanitize.mjs` 的 DENY 清单，不要把它移出。
3. **核心文件同一时刻只允许一个会话/设备改**：`index.html`、`study.html`、`me/courses-408-zikao.json`（manifest）、`.gitattributes`。改完推送并广播 commit sha 后再换下一个。
4. **改前先同步、推前以实时远端 main 为 base**：任何提交必须叠在最新远端之上（后写覆盖先写 = 数据丢失，已发生两次）。
5. **沙箱通道限制**：沙箱（WorkBuddy 环境）只能推 <4MB 文件 + LFS 指针；**大文件（>4MB：408 大 PDF、自考 Python PDF、`world/models/character.glb` 等 LFS 实体）必须由用户设备用 git 协议推送**。
6. **沙箱合并只用 `FETCH_HEAD`**：沙箱写不进 `.git/refs/remotes/`，`origin/main` 缓存 ref 陈旧，`git status` 的 ahead/behind 是**假象**——判断分叉以 `git fetch` 后的 `FETCH_HEAD` 或 REST API 实时查证为准。

## 二、多设备同步工作流

用户平时两台设备迭代，版本一致性是硬约束：

| 场景 | 操作 |
|---|---|
| 云端领先 / 本地落后 | `git pull`（平凡快进） |
| 本地领先 / 云端落后 | 直接 `git push`；工作树 dirty 先 `git add -A && commit` |
| 云、本地各有对方没有的提交（分叉） | `git pull --rebase` 再 `git push` |
| 沙箱代拉 | 走 `workbench-git-sync` skill：token 注入 → fetch → `git merge --ff-only FETCH_HEAD` → 恢复 URL |

## 三、推送规范

- **设备侧**：`git add` → `git commit` → `git push`，保持干净快进。
- **沙箱侧**：走 GitHub Git Data API，`base_tree = 实时远端 main` 叠加，**绝不整文件覆盖**；大文件标 `local` 不推，由设备补齐。
- **LFS**：`.gitattributes` 仅两行（`materials/408/**/*.pdf`、`materials/自考/Python课程讲义/**/*.pdf`，均 `filter=lfs`），不要扩宽到 `materials/**`。
- **并发识别信号**：merge 秒回 `Already up to date` 但 HEAD 未变、或 `origin/main` 与 `FETCH_HEAD` 不一致 → 先查 `git reflog -10 --date=iso` 与 `tasklist | grep git.exe`，确认无并发写者再动手。

## 四、部署与公开范围

- `.github/workflows/publish.yml`：push `main` 时 `node scripts/sanitize.mjs` 脱敏 → orphan 强推到公开站 `Epic-super.github.io`。
- 学习区 `study.html` 的「在线打开」只在本机/私有环境可用，公开站上链接是断的（预期行为）。
- 部署 failure 多为 `PAGES_PAT` 过期/权限，重新生成即可。

## 五、环境要点（本机实测）

- 用户终端是 **cmd.exe**：给用户的命令一律**裸命令、不带 `#` 注释**（`#` 会被当作 ref/仓库名报错）。
- 设备 `git pull` 卡住 = 多为 GCM 凭据弹窗被挡：看任务栏 Git Credential Manager 窗口，或一次性 `git pull https://ghp_token@github.com/Epic-super/workbench.git`（token 用完不留在配置里）。
- 沙箱清理产物用 `mv` 到 `_scratch/` 子目录（`rm` 走回收站且本环境回收站不可用）。

## 六、相关资源

- 同步操作手册（飞书）：《沙箱代拉 workbench：GitHub 私有仓同步操作手册》
- 本地 skill：`workbench-git-sync`
- 记忆：工作区 `Data structure/.workbuddy/memory/MEMORY.md`「多会话并发纪律」
