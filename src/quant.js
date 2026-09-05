// src/quant.js — 量化 Alpha 研究卡片渲染（#15 step 9）
// 来源：src/app-main.js 内 QUANT/QUANT_ICONS 静态数据 + renderQuant 渲染函数。
// 纯数据 + 渲染，仅被 app-main renderAll 以 window.renderQuant 调用，零数据层写入。
// 桥接：main.js boot() 挂回 window.renderQuant（与 renderProjects/renderTools 等一致）。
// 依赖：U.esc（WBUtil.esc）做 HTML 转义；toggleTech 经 window 全局（quant-fold.js 桥接）供内联 onclick。
const U = window.WBUtil || {};

var QUANT=[
  {key:'wq',icon:'wq',name:'WorldQuant Brain · Alpha 工程',
   mods:['MCP 工具库','因子挖掘','核心算法库','云保活监控','回测结果'],
   desc:'platform_functions.py（157KB）是 WorldQuant Brain 的 MCP 工具库：BrainApiClient + Pydantic 模型 + FastMCP，封装鉴权 / 仿真 / Alpha / 论坛 / 文档全套；digging_* 跑分布式因子挖掘，HFQ111 为核心算法库，monitor.py 用 paramiko 保活云主机挂机。',
   stack:['FastMCP','BrainApiClient','Pydantic','asyncio','paramiko','pandas'],
   points:['platform_functions：authenticate / create_simulation / submit_alpha / get_alpha_pnl / get_user_alphas / get_operators / run_selection 等 30+ 工具','digging_1step/2step：SessionManager 自动重登 + asyncio 多实例并发挖掘','HFQ111/machine_lib：simulate_single / get_datafields / first_order_factory / ts_ops / basic_ops 核心算子','monitor.py：paramiko 保活云主机挂机，异常自动告警','分布式因子挖掘数据集 + 多周期 USA 回测结果（1.5d / 2d / 3h / 45d 等多版）']},
  {key:'wqkit',icon:'kit',name:'WQ Alpha Toolkit · AI Agent 工作流',
   desc:'WQ_alpha_toolkit(1)：以 Agent 编排量化研究，含 agents / skills / tools / scripts 目录 + backtest_fast_v2.py(47KB) 快速回测 + AGENTS.md / project_rules.md / 提示词.txt 规约；WorldQuant/ 下另有 wqb_cli 命令行与 WebDataScope 数据抓取。',
   stack:['AI Agent','backtest_fast_v2','wqb_cli','WebDataScope','AGENTS.md 规约'],
   points:['agents/ + skills/ + tools/ 模块化 Agent 编排','backtest_fast_v2.py：快速回测流水线','project_rules.md + 提示词.txt：研究工程纪律','wqb_cli-master：命令行提交 / 查询','WebDataScope-WorldQuant：数据域抓取']},
  {key:'bt',icon:'bt',name:'Alpha 自动回测系统 · 自相关性与可提交指标',
   mods:['回测窗口矩阵','自相关性检验','可提交指标','pnl 净值序列','运行留档'],
   desc:'本地量化工作目录的 Alpha 自动回测输出体系：多周期 USA 回测（1.5d / 2d / 3h / 45d / last1d / last3d / last7d / 60d 窗口矩阵），pnl_progress*.pkl 净值收益序列（60d 版约 107MB），alpha_results_*_USA.xlsx 指标表（ok 精简 / full 全量 / table.md 交差版三档）。核心产出 = 因子收益序列自相关性检验（有效因子数与衰减判断）+ 可提交指标（IC / 换手 / 自相关 p 值等），tov20 换手约束与 margin 保证金变体回测。',
   stack:['pandas','pnl pkl 序列','xlsx 指标表','自相关检验','tov20 / margin'],
   points:['窗口矩阵：1.5d / 2d / 3h / 45d / last1d / 3d / 7d / 60d 全周期 USA 回测','pnl_progress*.pkl：净值收益序列留档（60d 约 107MB / run / 721 / tov20 多版）','自相关性检验：因子收益序列自相关 → 有效因子数与衰减判断','可提交指标：*_ok_USA.xlsx(精简) / *_full_USA.xlsx(全量) / *_table.md(交差版)','tov20=换手约束 20% 与 margin 保证金变体，约束下指标口径一致','45d_full_run.log：312KB 全量运行日志留档']}
];
var QUANT_ICONS={
  wq:'<path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 5-6"/>',
  kit:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><circle cx="17.5" cy="17.5" r="3.5"/>',
  bt:'<path d="M4 20V10M9.5 20V4M15 20v-8M20.5 20V7"/><path d="M3 20h18"/>'
};
function renderQuant(){
  var box=document.getElementById('quantBox');if(!box)return;
  box.innerHTML=QUANT.map(function(t){
    return '<div class="tcard tc-collapsed" data-k="'+U.esc(t.key)+'">'
      +'<div class="th" onclick="toggleTech(this.parentNode)">'
      +'<div class="tico"><svg viewBox="0 0 24 24" fill="none" stroke="#e86a6e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+(QUANT_ICONS[t.icon]||QUANT_ICONS.wq)+'</svg></div>'
      +'<div class="tname">'+U.esc(t.name)+'</div>'
      +'<div class="tcaret">▾</div></div>'
      +(t.desc?'<div class="tdesc">'+U.esc(t.desc)+'</div>':'')
      +(t.stack&&t.stack.length?'<div class="tstack">'+t.stack.map(function(s){return '<span class="tchip">'+U.esc(s)+'</span>';}).join('')+'</div>':'')
      +(t.mods&&t.mods.length?'<div class="tlabel">工程链路</div><div class="tmods">'+t.mods.map(function(m){return '<span class="tm">'+U.esc(m)+'</span>';}).join('')+'</div>':'')
      +(t.points&&t.points.length?'<ul class="tpts">'+t.points.map(function(p){return '<li>'+U.esc(p)+'</li>';}).join('')+'</ul>':'')
      +'</div>';
  }).join('');
}
export function initQuant(){
  // 桥接回 window，供 app-main renderAll 调用（与 renderProjects/renderTools 等一致）
  window.renderQuant = renderQuant;
}
