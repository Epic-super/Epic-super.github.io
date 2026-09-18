// src/today.js — 今日要处理（本地待办 + 双线作战台 bridge 项合并渲染）
// 从 app-main.js IIFE 迁出，原生 ESM + window 桥接（与 #15 其他集群同构）。
// 依赖经 window.WBUtil / window.WBState 取得，无构建依赖、file:// 双击可用。

const U = window.WBUtil || {};
const S = window.WBState;

/* 相对今天的日期偏移（天）→ 'YYYY-MM-DD'。
   ymd 仍被 app-main.js 多处复用，故不重复实现，统一走 WBUtil.ymd。 */
function shift(days){ var d=new Date(); d.setDate(d.getDate()+days); return U.ymd(d); }

/* 今日 + 未来 2 天内到期的未完成待办：逾期优先 → 今天截止 → 其余按日期升序。
   hero.js 经 window.WBUtil.todayItems()[0] 取焦点任务，故必须桥接出去。 */
function todayItems(){
  var state = S.state;          // 动态取：importData/重置会整体重赋 S.state，闭包旧引用会失效
  var t = U.ymd(new Date());
  var soonLimit = shift(2);     // 含未来 2 天内的"快到期"项
  return state.todos.filter(function(x){return !x.done && x.due <= soonLimit;})
    .sort(function(a,b){
      var ra=(a.due<t)?0:(a.due===t?1:2), rb=(b.due<t)?0:(b.due===t?1:2);
      return ra-rb || (a.due<b.due?-1:1);
    });
}

function renderToday(){
  try{
    // 动态取：跨标签 storage 事件 / IndexedDB 恢复会重赋 S.state 与 S.bridge
    var state = S.state, bridge = S.bridge;
    var items = todayItems();
    var bItems = [];
    try{
      if(bridge.sjtu && Array.isArray(bridge.sjtu.todos)) bridge.sjtu.todos.forEach(function(x){bItems.push({text:x.text,date:x.date,over:x.over,sys:'zk',src:x.tag,link:bridge.sjtu.link});});
      if(bridge.c2 && Array.isArray(bridge.c2.todos)) bridge.c2.todos.forEach(function(x){bItems.push({text:x.text,date:x.date,over:x.over,sys:'c2',src:x.tag,link:bridge.c2.link});});
    }catch(e){}
    U.$("#todayCount").textContent = (items.length + bItems.length) + " 项";
    var box = U.$("#todayList");
    if(!items.length && !bItems.length){box.innerHTML='<div class="empty">今天没有待处理项，清爽 🎉</div>';return;}
    box.innerHTML = items.map(function(x){
      var td=U.ymd(new Date());
      var over = x.due < td;
      var isToday = x.due === td;
      var cls = over ? "todo overdue" : "todo";
      var tag = over ? '<span class="tag over">逾期 '+x.due+'</span>'
              : isToday ? '<span class="tag soon">今天截止</span>'
              : '<span class="tag">'+x.due+' 待办</span>';
      return '<div class="'+cls+'" data-id="'+x.id+'">'
        +'<div class="check" data-act="check" data-id="'+x.id+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>'
        +'<div class="body"><div class="title">'+U.esc(x.title)+'</div>'
        +'<div class="meta">'+tag+'<span class="tag">'+U.esc(x.source)+'</span><span>'+U.esc(x.type)+'</span></div></div>'
        +'<div class="actions"><button class="btn sm ghost" data-act="del" data-id="'+x.id+'">删除</button></div>'
        +'</div>';
    }).join("");
    if(bItems.length){
      box.innerHTML += bItems.map(function(x){
        var cls = x.over ? 'todo overdue' : 'todo';
        var bl = U.esc(U.safeUrl(x.link));
        return '<div class="'+cls+'"><div class="check" data-act="jcheck" data-link="'+bl+'" style="background:transparent;border-color:var(--border);cursor:pointer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M7 7l10 10"/></svg></div>'
          +'<div class="body"><div class="title">'+U.esc(x.text)+'</div>'
          +'<div class="meta"><span class="tag '+(x.sys==='zk'?'over':'soon')+'">'+(x.sys==='zk'?'自考·考研':'计算机二级')+'</span><span class="tag">'+U.esc(x.src||'')+'</span><span>'+(x.over?'逾期 ':'')+U.esc(x.date)+'</span></div></div>'
          +'<div class="actions"><button class="btn sm primary" data-act="jump" data-link="'+bl+'">去处理 ↗</button></div></div>';
      }).join('');
    }
  }catch(e){ console.error('renderToday failed', e); }
}

export function initToday(){
  window.renderToday = renderToday;   // app-main renderAll / 各交互调用点 / __wbInitViews viewGuard 包裹
  window.todayItems  = todayItems;    // 对外可用（跨标签同步与调试）
  /* hero.js 经 U.todayItems()[0] 取焦点任务，必须回写 WBUtil：
     本文件已把 todayItems 从 app-main WBUtil 收口中摘除，改由 boot() 桥接时补挂。 */
  if (window.WBUtil) window.WBUtil.todayItems = todayItems;
}
