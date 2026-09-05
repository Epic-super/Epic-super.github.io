// src/quant-fold.js — 量化 Alpha 研究区：卡片折叠功能（#8 渐进抽取首模块）
// 来源：src/app-main.js IIFE#4（行 659-661），逻辑零改动，原生 ESM、零构建。
// 仅依赖 DOM（#quantBox、.tcard），零数据层 / 跨模块依赖，是最独立的叶子功能。
// 桥接：main.js 在 boot() 把本模块导出挂回 window，兼容 index.html 内联 onclick
//       （collapseAllQuant()/expandAllQuant()/toggleTech()）与 iframe 子应用。
export function toggleTech(card) {
  if (card && card.classList) card.classList.toggle('tc-collapsed');
}
export function collapseAllQuant() {
  var b = document.getElementById('quantBox');
  if (!b) return;
  var c = b.querySelectorAll('.tcard');
  for (var i = 0; i < c.length; i++) c[i].classList.add('tc-collapsed');
}
export function expandAllQuant() {
  var b = document.getElementById('quantBox');
  if (!b) return;
  var c = b.querySelectorAll('.tcard');
  for (var i = 0; i < c.length; i++) c[i].classList.remove('tc-collapsed');
}
