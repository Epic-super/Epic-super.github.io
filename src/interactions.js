// src/interactions.js — 全局事件委托（待办勾选/删除 + 项目/笔记删除 + 工具角标提示 + 焦点任务）
// 从 app-main.js IIFE 迁出，原生 ESM + window 桥接（与 #15 其他集群同构）。
// 依赖经 window.WBUtil / window.WBState 取得，无构建依赖、file:// 双击可用。
//
// 注：closeModals 仍留在 app-main（WBUtil 收口项，research-hub / 弹层均依赖）；此处仅经 U.closeModals 调用。
//     state / save 改为函数内动态取 S.state / S.save，避开 importData / resetForm 重赋值后闭包旧引用失效。

const U = window.WBUtil || {};
const S = window.WBState;

export function initInteractions(){
  // 全局点击委托：data-act（jump/jcheck/check/del/delp/deln）、data-close 关闭弹层、#focusBtn 焦点任务
  document.addEventListener("click", function(e){
    var state = S.state;
    var act = e.target.closest("[data-act]");
    if(act){
      var id = act.getAttribute("data-id");
      if(act.getAttribute("data-act") === "jump" || act.getAttribute("data-act") === "jcheck"){
        var l = U.safeUrl(act.getAttribute("data-link"));
        if(l) location.href = l; else U.toast("链接不安全或为空，已阻止跳转");
        return;
      }
      if(act.getAttribute("data-act") === "check"){
        var t = state.todos.find(function(x){ return x.id === id; });
        if(t){ t.done = true; S.save(); if(window.renderToday) window.renderToday(); }
      } else if(act.getAttribute("data-act") === "del"){
        state.todos = state.todos.filter(function(x){ return x.id !== id; });
        S.save(); if(window.renderToday) window.renderToday();
      } else if(act.getAttribute("data-act") === "delp"){
        state.projects = state.projects.filter(function(x){ return x.id !== id; });
        S.save(); if(window.renderProjects) window.renderProjects();
      } else if(act.getAttribute("data-act") === "deln"){
        state.notes = state.notes.filter(function(x){ return x.id !== id; });
        S.save(); if(window.renderNotes) window.renderNotes();
      }
      return;
    }
    if(e.target.closest("[data-close]")){ U.closeModals(); }
    var fb = e.target.closest("#focusBtn");
    if(fb){
      if(fb.getAttribute("data-local")){
        var fid = fb.getAttribute("data-id");
        var tt = state.todos.find(function(x){ return x.id === fid; });
        if(tt){ tt.done = true; S.save(); if(window.renderToday) window.renderToday(); if(window.renderHero) window.renderHero(); }
      } else {
        var fl = U.safeUrl(fb.getAttribute("data-link"));
        if(fl) location.href = fl; else U.toast("链接不安全或为空，已阻止跳转");
      }
      return;
    }
  });

  // 工具角标点击（无链接时提示）
  var tg = U.$("#toolsGrid");
  if(tg) tg.addEventListener("click", function(e){
    var el = e.target.closest(".tool"); if(!el) return;
    if(!el.getAttribute("href")){ U.toast('该工具未设置链接，点右上角「添加」可配置'); }
  });
}
