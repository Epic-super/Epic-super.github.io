// src/data-io.js — 数据导出 / 导入 / 清空 + 工具链接规范化迁移
// 从 app-main.js IIFE 迁出，原生 ESM + window 桥接（与 #15 其他集群同构）。
// 依赖经 window.WBUtil / window.WBState 取得，无构建依赖、file:// 双击可用。
//
// ⚠️ 修复：原 app-main 的 migrate 是命名函数表达式 (function migrate(){…})()，其名字仅在 NFE 体内可见；
//    导入流程里的 migrate() 调用在 IIFE 体内、NFE 体外 → ReferenceError，被导入 try/catch 吞掉，
//    用户永远看到「文件格式不正确，导入失败」。此处改为纯函数 migrateTools(state)，彻底修复。

const U = window.WBUtil || {};
const S = window.WBState;

// 已知工具的规范链接（兼容旧 localStorage 中手动录入的网盘 / 邮箱等）
var CANON = {
  "QQ邮箱": "https://mail.qq.com",
  "GitHub": "https://github.com",
  "飞书": "https://www.feishu.cn",
  "百度网盘": "https://pan.baidu.com",
  "夸克网盘": "https://pan.quark.cn",
  "Google Drive": "https://drive.google.com"
};

/* 首次加载 + 每次导入后：把 tools 链接对齐到规范表。
   纯函数（接收 state，不依赖闭包），避开原 NFE 名字不可见的坑。 */
function migrateTools(state){
  try{
    if(!Array.isArray(state.tools)) state.tools = [];
    var changed = false;
    state.tools.forEach(function(t){
      if(CANON.hasOwnProperty(t.name) && t.link !== CANON[t.name]){ t.link = CANON[t.name]; changed = true; }
    });
    Object.keys(CANON).forEach(function(nm){
      if(!state.tools.some(function(t){ return t.name === nm; })){
        state.tools.push({ id: "o_" + nm, name: nm, link: CANON[nm], unread: 0, note: "" });
        changed = true;
      }
    });
    if(changed) S.save();
  }catch(e){ console.error('migrateTools error', e); }
}

function exportData(){
  var state = S.state;
  var blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  var a = document.createElement("a"); a.href = URL.createObjectURL(blob);
  a.download = "塔台Tower备份_" + U.ymd(new Date()) + ".json"; a.click(); URL.revokeObjectURL(a.href);
}

function importFile(e){
  var f = e.target.files[0]; if(!f) return;
  var r = new FileReader();
  r.onload = function(){
    try{
      var data = JSON.parse(r.result);
      if(!confirm("导入将覆盖当前所有数据，确定继续？")) return;
      if(!data.todos) data.todos = [];
      if(!data.projects) data.projects = [];
      if(!data.tools) data.tools = [];
      if(!data.notes) data.notes = [];
      S.state = data;
      S.normalizeState();
      migrateTools(S.state);          // 修复：原 migrate() 是 NFE 名字不可见 → ReferenceError
      S.save();
      if(window.renderAll) window.renderAll();
      alert("导入成功，共 " + (S.state.todos.length + S.state.projects.length + S.state.tools.length + S.state.notes.length) + " 条数据。");
    }catch(err){ alert("文件格式不正确，导入失败。"); }
  };
  r.readAsText(f); e.target.value = "";
}

function clearSample(){
  if(!confirm("清空所有示例与录入数据？此操作不可恢复，建议先导出备份。")) return;
  try { localStorage.removeItem(S.KEY + "data"); } catch(e){}
  S.state = JSON.parse(JSON.stringify(S.seed));
  S.normalizeState();
  S.save();
  if(window.renderAll) window.renderAll();
}

export function initDataIO(){
  window.exportData = exportData;
  window.importDataFile = importFile;
  window.clearSampleData = clearSample;
  // 首次加载即对齐 tools 链接（原 app-main 在 classic 阶段立即执行 migrate()；
  // module/defer 下 DOM 已完整解析，#btnExport 等必存在，行为等价且更稳）
  migrateTools(S.state);
  // 绑定控件（U.$ 若取不到对应元素则跳过，避免 file:// 下缺节点报错）
  var be = U.$("#btnExport"); if(be) be.onclick = exportData;
  var bi = U.$("#btnImport"); if(bi) bi.onclick = function(){ var fi = U.$("#fileInput"); if(fi) fi.click(); };
  var fi = U.$("#fileInput"); if(fi) fi.addEventListener("change", importFile);
  var bc = U.$("#btnClearSample"); if(bc) bc.onclick = clearSample;
}
