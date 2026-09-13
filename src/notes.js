// src/notes.js — 速记（Sticky Notes）渲染与新增（从 app-main.js IIFE 迁出，原生 ESM + window 桥接）
// 仅抽「渲染 + 新增」；删除逻辑因嵌在全局 click 委托 data-act="deln" 分支，留在 app-main（改 window.renderNotes() 前缀）。
// 依赖经 window.WBUtil / window.WBState 取得（与 #15 其他集群同构），无构建依赖、file:// 双击可用。

const U = window.WBUtil || {};
const WBS = window.WBState || {};

function renderNotes(){
  // 动态取 state，避 importData / resetForm 重赋值后持有失效旧引用
  var state = WBS.state;
  var box = U.$("#noteList");
  if(!box) return;
  if(!state.notes.length){ box.innerHTML='<div class="empty">还没有速记。</div>'; return; }
  box.innerHTML = state.notes.slice().reverse().map(function(n){
    return '<div class="note"><div class="txt">'+U.esc(n.txt)+'</div>'
      +'<button class="del" data-act="deln" data-id="'+n.id+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/></svg></button></div>';
  }).join("");
}

function addNote(){
  var state = WBS.state;
  var v = U.$("#noteInput").value.trim(); if(!v) return;
  state.notes.push({ id: U.uid(), txt: v, ts: Date.now() });
  WBS.save();
  renderNotes();
  U.$("#noteInput").value = "";
}

export function initNotes(){
  // 挂 window.renderNotes 供 app-main renderAll / __wbOnRemote / viewGuard 包裹调用
  window.renderNotes = renderNotes;
  var btn = U.$("#btnAddNote"); if(btn) btn.onclick = addNote;
  var ni = U.$("#noteInput");
  if(ni) ni.addEventListener("keydown", function(e){ if(e.key==="Enter") addNote(); });
}
