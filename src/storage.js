// src/storage.js — 存储配额监控 + 备份提示渲染（#15 step 10）
// 来源：src/app-main.js 内 LS_WARN/LS_DANGER/lsFmt/lsUsage/__wbStorage/renderBackupTip。
// 仅被 app-main renderAll 以 window.renderBackupTip 调用；并接管 save 钩子 S._onSave
// （原 app-main IIFE 顶部直挂 renderBackupTip，但该函数在 module 后才桥接，故改由 initStorage 在 boot 后挂，避开 classic/module defer 时序坑）。
// 依赖：state 经 window.WBState 动态取（避 importData/resetForm 重赋值后旧引用失效）；
//       $/esc 经 window.WBUtil 收口；localStorage 为浏览器全局。
const U = window.WBUtil || {};
var S = window.WBState;
var $ = U.$;

var LS_WARN   = 4    * 1024 * 1024;  // 80%  预警
var LS_DANGER = 4.75 * 1024 * 1024;  // 95%  危险
function lsFmt(b){ return b>=1048576 ? (b/1048576).toFixed(2)+" MB" : (b/1024).toFixed(1)+" KB"; }
function lsUsage(){
  var bytes=0, top=[];
  try{
    for(var i=0;i<localStorage.length;i++){
      var k=localStorage.key(i), v=localStorage.getItem(k);
      var b=(k.length+(v?v.length:0))*2; // UTF-16 双字节
      bytes+=b; top.push({key:k, size:lsFmt(b), bytes:b});
    }
  }catch(e){}
  top.sort(function(a,b){return b.bytes-a.bytes;});
  return { bytes:bytes, mb:+(bytes/1048576).toFixed(2), text:lsFmt(bytes),
           pct:+(bytes/(5*1024*1024)*100).toFixed(1), top:top.slice(0,6) };
}
window.__wbStorage=function(){
  var u=lsUsage();
  if(window.console&&console.table) console.table(u.top);
  return u;
};
function renderBackupTip(){
  var state = S.state;
  var n = state.todos.length+state.projects.length+state.tools.length+state.notes.length;
  var tip=$("#backupTip"); if(!tip) return;
  var u=lsUsage();
  if(u.bytes>=LS_DANGER){
    tip.style.display="block";
    tip.textContent="⚠️ 本地存储已用 "+u.text+"（"+u.pct+"%，逼近 5MB 上限，继续写入会静默丢失）。请立即「导出备份」并清理旧数据。";
  } else if(u.bytes>=LS_WARN){
    tip.style.display="block";
    tip.textContent="本地存储已用 "+u.text+" / 5MB（"+u.pct+"%），建议导出备份；控制台 __wbStorage() 可看占用明细。";
  } else if(n>=30){
    tip.style.display="block";
    tip.textContent="数据已积累 "+n+" 条，建议点「导出备份」存一份 JSON，防止误清。";
  } else tip.style.display="none";
}
export function initStorage(){
  // 桥接回 window，供 app-main renderAll 调用（与 renderProjects/renderTools 等一致）
  window.renderBackupTip = renderBackupTip;
  // 接管 save 钩子（原 app-main IIFE 顶部直挂，现 boot 后桥接就绪再挂，避开 defer 时序坑）
  S._onSave = renderBackupTip;
}
