// ============================================================
// 游戏启动器 · 本机 exe 配置（可配置项）
// ------------------------------------------------------------
// 作用：游戏架的「启动 / 目录」按钮需要本机 exe 绝对路径才能一键拉起。
//       这些路径已抽离到本文件，源码（index.html / games-library.js）
//       不再硬编码本机路径，公网部署即无泄露。
//
// 使用：把「游戏 id → 本机 exe 路径」填进下面的对象即可。
//       留空对象（如下）表示公网部署，按钮自动降级为「未配置启动方式」。
//
// 部署安全：
//   - 本文件提交到仓库时应为空对象（如下），不含任何真实路径；
//   - 真实路径放在同目录的 games-local-config.local.js（已加入 .gitignore，
//     不会进入版本库 / 公网部署），由 index.html 在其后加载并覆盖；
//   - 部署后若 .local 文件不存在，仅控制台一次 404，功能不受影响。
//
// 可配置的 id 清单（与 DEFAULT_GAMES / SCANNED_GAMES 对应）：
//   terra-nil, entropy-centre, steam, epic, uu,
//   ext-pvzhe, ext-miniworld, ext-amongus, ext-catquest3, ext-fevergames
// ============================================================
window.GAMES_LOCAL_EXE = {
  // 示例（占位）。真实路径只写在 games-local-config.local.js（gitignore），勿提交：
  // "游戏id": "&lt;本地游戏启动器绝对路径&gt;"
};
