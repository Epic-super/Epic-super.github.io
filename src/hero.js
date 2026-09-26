// src/hero.js — 激励英雄区（倒计时 / 关键节点提醒 / 焦点任务 / 打卡连续天数）
// 从 app-main.js IIFE 迁出，原生 ESM + window 桥接（与 #15 其他集群同构）。
// 依赖经 window.WBUtil / window.WBState 取得，无构建依赖、file:// 双击可用。

const U = window.WBUtil || {};
const WBS = window.WBState || {};

// 自考报名窗口（上海市招考热线，每年固定区间；改这里即可）
var ZK_REG_OPEN='2026-09-01', ZK_REG_CLOSE='2026-09-06';
// 计算机二级（上海）考试日（官方考试日，不再依赖 c2.html 的 bridge）
var NCRE_SH_EXAM='2026-09-19';

function ymdHero(d){ d=d||new Date(); var y=d.getFullYear(),m=("0"+(d.getMonth()+1)).slice(-2),da=("0"+d.getDate()).slice(-2); return y+"-"+m+"-"+da; }

// 连续打卡天数（数据源与双线台共用 wb_sjtu_dual_v1.punch，经 WBUtil.getDualPunch 取）
function calcStreak(p){
  var t=ymdHero(new Date(wbNow())), st=0, d2=new Date(wbNow());
  while((p[ymdHero(d2)]||0)>0){ st++; d2.setDate(d2.getDate()-1); }
  return {n:st,today:p[t]>0};
}

function setCd(numId,dateId,days){
  var n=U.$("#"+numId), d=U.$("#"+dateId);
  if(n) n.textContent = (days===undefined||days===null)? "--" : (days<0? "0" : String(days));
  if(d) d.textContent = (days===undefined||days===null)? "打开系统同步" : (days<0? "已结束" : "努力冲刺中");
}

// C3：关键节点临近提醒（倒计时进入阈值天数时横幅 + 可选桌面通知）
function checkReminders(){
  var state = WBS.state;   // 动态取，避 importData / resetForm 重赋值后持有失效旧引用
  var bar=U.$("#reminderBar"); if(!bar) return;
  var msgs=[];
  var ky=U.daysTo(state.set.kyDate), zk=U.daysTo(state.set.zkDate), reg=U.daysTo(ZK_REG_CLOSE);
  if(ky!==null && ky>=0 && ky<=7) msgs.push("考研初试倒计时 "+ky+" 天（"+state.set.kyDate+"）");
  if(zk!==null && zk>=0 && zk<=7) msgs.push("自考考试倒计时 "+zk+" 天（"+state.set.zkDate+"）");
  if(reg!==null && reg>=0 && reg<=7) msgs.push("自考报名窗口剩 "+reg+" 天（截止 "+ZK_REG_CLOSE+"）");
  if(!msgs.length){ bar.style.display="none"; return; }
  bar.style.display="block";
  bar.innerHTML="⏰ 关键节点临近："+msgs.join("；")+
    '<button id="btnNotify" style="margin-left:8px;padding:2px 10px;border:1px solid #a8071a;background:#fff;border-radius:6px;cursor:pointer;">开启桌面提醒</button>';
  var bn=U.$("#btnNotify");
  if(bn) bn.onclick=function(){
    if(!("Notification" in window)){ U.toast("当前浏览器不支持通知"); return; }
    if(Notification.permission==="granted"){ fireReminders(msgs); }
    else Notification.requestPermission().then(function(p){ if(p==="granted") fireReminders(msgs); });
  };
}
function fireReminders(msgs){ msgs.forEach(function(m){ try{ new Notification("塔台 Tower · 关键节点", { body:m }); }catch(e){} }); }

function renderHero(){
  var state = WBS.state, bridge = WBS.bridge;
  var g=U.$("#heroGreet");
  if(g){var h=new Date().getHours(); g.textContent=(h<6?"凌晨好":h<12?"早上好":h<14?"中午好":h<18?"下午好":"晚上好")+"，小待 👋";}
  var b=bridge.sjtu;
  setCd("cdKyNum","cdKyDate", b&&b.kyDays!==undefined?b.kyDays:U.daysTo(state.set.kyDate));
  setCd("cdZkNum","cdZkDate", b&&b.zkDays!==undefined?b.zkDays:U.daysTo(state.set.zkDate));
  checkReminders();
  // 计算机二级（上海）倒计时直接用官方考试日，不再依赖 c2.html 的 bridge
  setCd("cdC2Num","cdC2Date", U.daysTo(NCRE_SH_EXAM));
  var regDays=U.daysTo(ZK_REG_CLOSE);
  setCd("cdRegNum","cdRegDate", regDays);
  var cdRegEl=U.$("#cdReg");
  if(cdRegEl){ cdRegEl.classList.toggle("urgent", regDays!==null && regDays>=0 && regDays<=14); }
  var cdRegDate=U.$("#cdRegDate");
  if(cdRegDate && regDays!==null){
    if(regDays>14) cdRegDate.textContent="开放 "+ZK_REG_OPEN;
    else if(regDays>=0) cdRegDate.textContent="窗口至 "+ZK_REG_CLOSE;
    else cdRegDate.textContent="窗口已关闭";
  }
  var f=U.$("#focusTask"), btn=U.$("#focusBtn");
  /* todayItems 现由 src/today.js initToday() 回写 WBUtil（boot 内早于 initHero 调用）；
     此处加存在性守卫，避免极端时序下未桥接时 TypeError 打断整个 renderHero。 */
  var urgent=(U.todayItems && U.todayItems()[0])||null;
  if(urgent){ f.textContent=urgent.title; btn.style.display=""; btn.setAttribute("data-local","1"); btn.setAttribute("data-id",urgent.id); }
  else {
    var bs=((bridge.sjtu&&bridge.sjtu.todos)||(bridge.c2&&bridge.c2.todos)||[]).slice();
    if(bs.length){ f.textContent=bs[0].text; btn.style.display=""; btn.removeAttribute("data-local"); btn.setAttribute("data-link",(bridge.sjtu&&bridge.sjtu.link)||(bridge.c2&&bridge.c2.link)); }
    else { f.textContent="暂无紧急事项，保持节奏 💪"; btn.style.display="none"; btn.removeAttribute("data-local"); btn.removeAttribute("data-link"); }
  }
  var st=U.$("#streak");
  if(st){
    var s=calcStreak(U.getDualPunch());
    st.textContent = s.n>0 ? ("🔥 连续 "+s.n+" 天") : "🔥 点我打卡";
    st.onclick=function(){ window.location.href='zk-ky.html#p1'; };
  }
}

/* 错误边界：与原 app-main 内 wrap() 同语义，避免旧数据/异常导致首页空白。
 * 原先 wrap() 在 app-main 解析时包裹 renderHero 局部变量；迁出后该局部变量已不存在，
 * 故错误边界随集群内移——window.renderHero 直接暴露带 try/catch 的版本。 */
function renderHeroSafe(){ try{ renderHero(); }catch(e){ console.error('renderHero failed', e); } }

export function initHero(){
  // 挂 window.renderHero 供 app-main renderAll / storage 跨标签同步 / __wbOnRemote / focusBtn 调用
  window.renderHero = renderHeroSafe;
}
