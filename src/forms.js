// src/forms.js — 弹层 CRUD 绑定（待办 / 项目 / 工具）+ 弹层点击外部关闭
// 从 app-main.js IIFE 迁出，原生 ESM + window 桥接（与 #15 其他集群同构）。
// 依赖经 window.WBUtil / window.WBState 取得，无构建依赖、file:// 双击可用。
//
// 注：openModal / closeModals 仍留在 app-main（它们是 WBUtil 收口项，research-hub 经 U.openModal 调用），
//     此处只迁出「点击外部关闭 + 三个新增表单的绑定逻辑 + resetForm 辅助」。

const U = window.WBUtil || {};
const S = window.WBState;

function resetForm(){
  for(var i=0;i<arguments.length;i++){ var el=U.$("#"+arguments[i]); if(el) el.value=""; }
}

export function initForms(){
  // 弹层点击遮罩关闭
  U.$$(".modal-mask").forEach(function(m){
    m.addEventListener("click", function(e){ if(e.target===m) U.closeModals(); });
  });

  // 待办
  var bt = U.$("#btnAddTodo");
  if(bt) bt.onclick = function(){ U.$("#tDue").value = U.ymd(new Date()); U.openModal("modalTodo"); U.$("#tTitle").focus(); };
  var ts = U.$("#tSave");
  if(ts) ts.onclick = function(){
    var title = U.$("#tTitle").value.trim(); if(!title){ U.$("#tTitle").focus(); return; }
    var state = S.state;
    state.todos.push({ id: S.uid(), title: title, source: U.$("#tSource").value.trim()||"未分类",
      type: U.$("#tType").value, due: U.$("#tDue").value || U.ymd(new Date()), done: false });
    S.save(); if(window.renderToday) window.renderToday(); U.closeModals(); resetForm("tTitle","tSource");
  };

  // 项目
  var bp = U.$("#btnAddProj");
  if(bp) bp.onclick = function(){ U.openModal("modalProj"); U.$("#pName").focus(); };
  var ps = U.$("#pSave");
  if(ps) ps.onclick = function(){
    var name = U.$("#pName").value.trim(); if(!name){ U.$("#pName").focus(); return; }
    var prog = parseInt(U.$("#pProg").value, 10); if(isNaN(prog)) prog = 0;
    var state = S.state;
    state.projects.push({ id: S.uid(), name: name, metric: U.$("#pMetric").value.trim()||"—",
      prog: Math.max(0, Math.min(100, prog)), update: U.$("#pUpdate").value || U.ymd(new Date()), link: U.$("#pLink").value.trim() });
    S.save(); if(window.renderProjects) window.renderProjects(); U.closeModals(); resetForm("pName","pMetric","pProg","pUpdate","pLink");
  };

  // 工具
  var bo = U.$("#btnAddTool");
  if(bo) bo.onclick = function(){ U.openModal("modalTool"); U.$("#oName").focus(); };
  var os = U.$("#oSave");
  if(os) os.onclick = function(){
    var name = U.$("#oName").value.trim(); if(!name){ U.$("#oName").focus(); return; }
    var u = parseInt(U.$("#oUnread").value, 10); if(isNaN(u)) u = 0;
    var state = S.state;
    state.tools.push({ id: S.uid(), name: name, link: U.$("#oLink").value.trim(), unread: u, note: U.$("#oNote").value.trim() });
    S.save(); if(window.renderTools) window.renderTools(); U.closeModals(); resetForm("oName","oLink","oUnread","oNote");
  };
}
