// src/dual-fold.js — 双线区（自考/考研）折叠状态持久化
// 从 app-main.js IIFE 抽出（#8 渐进 ESM 化 step 2）
// 自包含：仅依赖 localStorage 与本文件内 $ 封装，无跨模块状态耦合。
const DUAL_FOLD_KEY = "wb_hub_dual_fold";
const $ = (s, r) => (r || document).querySelector(s);

export function loadDualFold() {
  try { return JSON.parse(localStorage.getItem(DUAL_FOLD_KEY) || '{}'); } catch (e) { return {}; }
}

export function saveDualFold(map) {
  try { localStorage.setItem(DUAL_FOLD_KEY, JSON.stringify(map)); } catch (e) {}
}

// 页面加载时还原折叠态（原 app-main 内为同步 IIFE，现由 main.js boot() 在 DOM 就绪后调用，时机更稳）
export function applyDualFold() {
  const map = loadDualFold();
  [].forEach.call(document.querySelectorAll('.dual .card[data-fold]'), function (card) {
    const key = card.getAttribute('data-fold');
    if (map[key]) card.classList.add('folded');
  });
}

// 供 index.html 内联 onclick 调用（经 window 桥接）
export function dualToggleFold(key) {
  const card = $('.dual .card[data-fold="' + key + '"]'); if (!card) return;
  card.classList.toggle('folded');
  const map = loadDualFold(); map[key] = card.classList.contains('folded'); saveDualFold(map);
}
