// src/main.js — 工程化入口（迁移自 index.html 内联脚本，原生 ESM，零构建）
// 零构建：浏览器原生 ESM，无需打包。本地预览用任意静态服务器（如 python -m http.server）。
// 后续模块按相同模式 import 并调用，逐步替代 index.html 内联 IIFE。
import { initHealthRadar } from './health-radar.js';
import { initGamesShelf } from './games-shelf.js';
// #8 渐进抽取：量化折叠功能（从 app-main.js IIFE#4 迁出，ESM + window 桥接）
import { toggleTech, collapseAllQuant, expandAllQuant } from './quant-fold.js';
// #8 step 2：双线区折叠状态（从 app-main.js IIFE 迁出，ESM + window 桥接）
import { dualToggleFold, applyDualFold } from './dual-fold.js';
// #8 step 3：视图错误边界（从 app-main.js 迁出，ESM + window 桥接）
import { viewGuard, viewFallback } from './view-guard.js';
// #8 step 4：视图导航（从 app-main.js 迁出，ESM + window 桥接）
import { setView, goSection } from './nav.js';
// #15 科研专区迁入（从 app-main.js IIFE 迁出，ESM + window 桥接）
import { initResearchHub } from './research-hub.js';
// #15 双线作战台 ZK/KY/热力图迁入（从 app-main.js IIFE 迁出，ESM + window 桥接）
import { initDualZK } from './dual-zkky.js';
// #15 项目区迁入（从 app-main.js IIFE 迁出，ESM + window 桥接）
import { initProjects } from './projects.js';
// #15 工具区迁入（从 app-main.js IIFE 迁出，ESM + window 桥接）
import { initTools } from './tools.js';
// #15 速记（笔记）迁入（从 app-main.js IIFE 迁出，ESM + window 桥接）
import { initNotes } from './notes.js';
// #15 激励英雄区迁入（从 app-main.js IIFE 迁出，ESM + window 桥接）
import { initHero } from './hero.js';
// #15 考研资讯集群迁入（从 app-main.js IIFE 迁出，ESM + window 桥接）
import { initNews } from './news.js';
// #15 首页外链 + AI 工具箱迁入（从 app-main.js IIFE 迁出，ESM + window 桥接）
import { initHomeSites } from './home-sites.js';
// #15 量化 Alpha 研究卡片迁入（从 app-main.js IIFE 迁出，ESM + window 桥接）
import { initQuant } from './quant.js';
// #15 存储配额监控 + 备份提示迁入（从 app-main.js IIFE 迁出，ESM + window 桥接）
import { initStorage } from './storage.js';
// #15 今日要处理迁入（从 app-main.js IIFE 迁出，ESM + window 桥接）
import { initToday } from './today.js';
// #15 顶栏版本号徽标 + 新版本检查迁入（从 app-main.js IIFE 迁出，ESM + window 桥接）
import { initVersionCheck } from './version-check.js';
// #15 数据导出/导入/清空 + 工具链接规范化迁入（从 app-main.js IIFE 迁出，ESM + window 桥接）
import { initDataIO } from './data-io.js';
// #15 弹层 CRUD 绑定迁入（从 app-main.js IIFE 迁出，ESM + window 桥接）
import { initForms } from './forms.js';
// #15 全局事件委托迁入（从 app-main.js IIFE 迁出，ESM + window 桥接）
import { initInteractions } from './interactions.js';
// #15 导航/滚动/锚点迁入（从 app-main.js IIFE 迁出，ESM + window 桥接）
import { initNavigation } from './navigation.js';

// 初始化隔离（P0 结构性隐患修复）：
// 原 boot() 是 20 个 init 串行裸调，**没有任何 try/catch** —— 任一 init 抛错会中断
// 后续全部流程：window.setView / goSection 挂不上、wb:ready 不派发，表现为
// 「全站点击失效 + 首屏空白」，且控制台之外不留痕迹（历史多次踩坑的放大放大器）。
// 改为逐个隔离后：单个模块挂掉只影响它自己，导航桥接与 wb:ready 必定执行，
// 失败清单落在 window.__wbBootErrors，同时经 window.errorlog 上报。
function safeStep(name, fn) {
  try {
    fn();
    return true;
  } catch (e) {
    try {
      if (window.errorlog && window.errorlog.capture) {
        window.errorlog.capture(e, 'boot.' + name);
      }
    } catch (_) { /* 上报通道自身异常绝不能影响启动流程 */ }
    if (typeof console !== 'undefined' && console.error) {
      console.error('[wb:boot] ' + name + ' 初始化失败（已隔离，其余模块不受影响）', e);
    }
    try {
      (window.__wbBootErrors = window.__wbBootErrors || []).push({
        step: name, msg: String((e && e.message) || e)
      });
    } catch (_) {}
    return false;
  }
}

function boot() {
  const failed = [];
  const step = function (name, fn) { if (!safeStep(name, fn)) failed.push(name); };

  step('healthRadar', initHealthRadar);
  step('gamesShelf', initGamesShelf);
  step('researchHub', initResearchHub);   // #15 科研专区：加载 RS + 桥接 20 个 window.*（含 renderResearchHub，供 app-main renderAll 调用）
  step('dualZK', initDualZK);             // #15 双线作战台：桥接 11 个 window.*（含 dualRenderZK/KY/Heat，供 app-main renderAll 调用）
  step('projects', initProjects);         // #15 项目区：桥接 window.renderProjects（含 sysCards，供 app-main renderAll 调用）
  step('tools', initTools);               // #15 工具区：桥接 window.renderTools（供 renderAll 调用）
  step('notes', initNotes);               // #15 速记：桥接 window.renderNotes + 绑定 #btnAddNote/#noteInput
  step('today', initToday);               // #15 今日要处理：桥接 window.renderToday + window.todayItems，并回写 WBUtil.todayItems（须早于 initHero，hero 焦点任务依赖）
  step('hero', initHero);                 // #15 激励英雄区：桥接 window.renderHero（内部自带 try/catch 错误边界）
  step('news', initNews);                 // #15 资讯：桥接 window.renderNews / window.loadNews + 绑定 #newsChips 分类筛选与 #newsList 抓取正文
  step('homeSites', initHomeSites);       // #15 首页外链 + AI 工具箱：桥接 window.renderHotSites / window.renderAI（供 app-main renderAll 调用）
  step('quant', initQuant);               // #15 量化 Alpha 研究卡片：桥接 window.renderQuant（供 app-main renderAll 调用）
  step('storage', initStorage);           // #15 存储监控：桥接 window.renderBackupTip + 接管 S._onSave 钩子（供 app-main renderAll / save 回连）
  step('versionCheck', initVersionCheck); // #15 版本检查：桥接 window.initVersion/compareVer/fmtRel，并直接执行顶栏 #btnVer 初始化（原在 app-main IIFE 末尾调用，module/defer 下 DOM 已完整，行为等价）
  step('dataIO', initDataIO);             // #15 数据 IO：桥接 window.exportData/importDataFile/clearSampleData + 首次加载对齐 tools 链接（CANON 规范化，顺带修复原 migrate NFE 名字不可见的导入失败 bug）
  step('forms', initForms);               // #15 弹层 CRUD：绑定待办/项目/工具三表单 + 弹层点击外部关闭（openModal/closeModals 仍留 app-main 作为 WBUtil 项，research-hub 经 U.openModal 调用）
  step('interactions', initInteractions); // #15 全局事件委托：data-act 勾选/删除 + 工具角标提示 + 焦点任务（closeModals 经 U.closeModals 调用，定义仍留 app-main 作为 WBUtil 项）
  step('navigation', initNavigation);     // #15 导航/滚动/锚点：Tab 切换 + 顶栏沉降 + iframe 自适应 + 内部锚点 + 双线区滚动高亮（setView/goSection 经 window 桥接，handle 仅在用户交互时调用故时序安全）
  // 桥接：保持 window 全局，兼容 index.html 内联 onclick 与 iframe 子应用
  // 关键：整段置于所有 init **之后**并自带隔离 —— 即便某个 init 抛错，
  //       导航（setView/goSection）与折叠（dualToggleFold）依然可用，不会整站瘫痪。
  step('bridge', function () {
    window.toggleTech = toggleTech;
    window.collapseAllQuant = collapseAllQuant;
    window.expandAllQuant = expandAllQuant;
    window.dualToggleFold = dualToggleFold;
    // 视图错误边界（step 3）：桥接回 window，兼容 app-main 内联调用与 games 模块
    window.viewGuard = viewGuard;
    window.viewFallback = viewFallback;
    // 视图导航（step 4）：桥接回 window，兼容 index.html 内联 onclick 与锚点/标签栏点击
    window.setView = setView;
    window.goSection = goSection;
  });
  // 还原双线区折叠态（替代原 app-main 内同步 IIFE，DOM 就绪后执行更稳）
  step('applyDualFold', applyDualFold);
  // 其它视图模块（笔记/hero/news 等）在此按需 import 并调用

  // 所有桥接完成 → 通知 app-main 执行「视图包裹 + 首次 renderAll」（避开 classic/module 时序坑）
  window.__wbBootFailed = failed;
  window.__wbReady = true;
  try {
    window.dispatchEvent(new Event('wb:ready'));
  } catch (e) {
    // 派发异常也不回退 __wbReady：桥接已就绪，app-main 可据此正常渲染
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
