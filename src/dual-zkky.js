// src/dual-zkky.js — 双线作战台：自考看板(ZK) / 考研进度(KY) / 打卡热力图(Heat)
// 从 app-main.js IIFE 迁出，ESM + window 桥接。SLOTS / curSlot / getCs 为集群私有，随模块走。
// 数据源：主 state（读 state.cs / state.ky / state.set）经 window.WBState；打卡数据经 U.getDualPunch/saveDualPunch。
// 重要：state 可能被引擎重置（importData / resetForm 会重赋 WBState.state），
// 故每个函数开头都动态取最新 WBS.state，并在 normalizeState() 之后重新取值（避免持有失效旧引用）。
const U = window.WBUtil || {};
const WBS = window.WBState;

const SLOTS = {1:'10/24 上午 09:00-11:30',2:'10/24 下午 14:30-17:00',3:'10/25 上午 09:00-11:30',4:'10/25 下午 14:30-17:00',5:'10/31 加场',0:'实践/非统考'};
let curSlot = 'all';

function getCs(c){ var s = WBS.state; return (s.cs && s.cs[c]) || {st:'未开始',plan:false,score:''}; }

function dualRenderZK(){
  var state = WBS.state;
  if(!U.$("#csBox")) return;
  if(!state.cs || typeof state.cs!=='object' || !state.set || typeof state.set!=='object'){ WBS.normalizeState(); state = WBS.state; }
  var list = WBS.COURSES.filter(function(x){ return !(state.set.hideJ && x.t==='加考'); });
  var pass = list.filter(function(x){ return getCs(x.c).st==='已通过'; });
  var got = pass.reduce(function(a,b){ return a+b.cr; },0);
  var pc = Math.min(100, Math.round(got/74*100));
  var C = 2*Math.PI*37;
  var arc = U.$("#ringArc");
  if(arc){ arc.setAttribute("stroke-dasharray", C.toFixed(1)); arc.setAttribute("stroke-dashoffset", (C*(1-pc/100)).toFixed(1)); }
  if(U.$("#ringTxt")) U.$("#ringTxt").textContent = pc+'%';
  if(U.$("#crTxt")) U.$("#crTxt").textContent = '已获 '+got+' / 74 学分（'+pass.length+' 门通过）';
  var left = Math.max(0, 74-got);
  if(U.$("#crSub")) U.$("#crSub").textContent = left ? ('还差 '+left+' 学分，剩 '+list.filter(function(x){return getCs(x.c).st!=='已通过';}).length+' 门未过') : '学分已达标，别忘了毕业设计和学位英语';
  if(U.$("#deadlineTip")) U.$("#deadlineTip").textContent = '关键节点：'+state.set.kyDate.slice(0,4)+' 年 10 月考研报名前最好已取得或明确能取得本科毕业证，否则需按同等学力身份报考。倒推 → 全部科目建议在 '+(parseInt(state.set.kyDate)+1)+' 年上半年前考完并申请毕业。';
  if(U.$("#s1")) U.$("#s1").textContent = pass.length;
  if(U.$("#s2")) U.$("#s2").textContent = list.filter(function(x){return getCs(x.c).st==='复习中';}).length;
  if(U.$("#s3")) U.$("#s3").textContent = list.filter(function(x){return getCs(x.c).plan;}).length;
  if(U.$("#s4")) U.$("#s4").textContent = list.filter(function(x){return getCs(x.c).st==='未开始';}).length;

  var byslot = {}, conf = [];
  list.forEach(function(x){ if(getCs(x.c).plan && x.slot>0){ (byslot[x.slot]=byslot[x.slot]||[]).push(x); } });
  Object.keys(byslot).forEach(function(s){ if(byslot[s].length>1) conf.push({s:s, ls:byslot[s]}); });
  if(U.$("#confBox")) U.$("#confBox").innerHTML = conf.length ? conf.map(function(c){
    return '<div class="warn" style="background:var(--amber-l,#fcf0db);border-color:#F0D9AE;color:#7A4708"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg><span><b>时段冲突：</b>「'+SLOTS[c.s]+'」这一场你勾了 '+c.ls.length+' 门 —— '+c.ls.map(function(x){return x.n;}).join('、')+'。一场只能考一门，去掉多余的。</span></div>';
  }).join('') : '';

  var sb = U.$("#slotBar");
  if(sb && !sb.dataset.init){
    var h = '<button class="sf on" data-s="all" onclick="dualFiltSlot(\'all\')">全部课程</button>';
    h += '<button class="sf" data-s="k8" onclick="dualFiltSlot(\'k8\')">与 408 重叠</button>';
    h += '<button class="sf" data-s="todo" onclick="dualFiltSlot(\'todo\')">未通过</button>';
    [1,2,3,4,5,0].forEach(function(s){ h += '<button class="sf" data-s="'+s+'" onclick="dualFiltSlot(\''+s+'\')">'+SLOTS[s]+'</button>'; });
    sb.innerHTML = h; sb.dataset.init = '1';
  }
  var show = list.slice();
  if(curSlot==='k8') show = show.filter(function(x){return x.ky==='408';});
  else if(curSlot==='todo') show = show.filter(function(x){return getCs(x.c).st!=='已通过';});
  else if(curSlot!=='all') show = show.filter(function(x){return String(x.slot)===curSlot;});

  U.$("#csBox").innerHTML = show.map(function(x){
    var st = getCs(x.c), cf = st.plan && byslot[x.slot] && byslot[x.slot].length>1;
    return '<div class="cs'+(st.st==='已通过'?' pass':'')+(st.plan?' plan':'')+(cf?' conf':'')+'">' +
      '<div class="cn">'+U.esc(x.n)+'</div>' +
      '<div class="cc">'+x.c+' · '+x.cr+' 学分 · '+x.g+'</div>' +
      '<div class="cr">' +
        '<span class="tag '+(x.t==='必考'?'zk':x.t==='选考'?'k8':'el')+'">'+x.t+'</span>' +
        (x.ky?'<span class="tag '+(x.ky==='408'?'k8':'ky')+'">'+(x.ky==='408'?'★ 408 重叠':'↔ '+x.ky)+'</span>':'') +
        (x.slot>0?'<span class="tag el">'+SLOTS[x.slot].split(' ')[0]+' '+(SLOTS[x.slot].split(' ')[1]||'')+'</span>':'') +
        (st.score?'<span class="tag ok">'+U.esc(st.score)+' 分</span>':'') +
      '</div>' +
      '<select onchange="dualSetSt(\''+x.c+'\',this.value)">' +
        ['未开始','复习中','已报考','已通过','未通过'].map(function(o){return '<option'+(st.st===o?' selected':'')+'>'+o+'</option>';}).join('') +
      '</select>' +
      (x.slot>0?'<label class="plink"><input type="checkbox" '+(st.plan?'checked':'')+' onchange="dualSetPlan(\''+x.c+'\',this.checked)">本期报考这门</label>':'') +
      (st.st==='已通过'||st.st==='未通过'?'<div class="plink"><span>成绩</span><input type="number" value="'+U.esc(st.score)+'" placeholder="分数" style="width:74px;border:1px solid var(--border);border-radius:8px;padding:6px 8px;min-height:36px" onchange="dualSetSc(\''+x.c+'\',this.value)"></div>':'') +
    '</div>';
  }).join('') || '<div class="empty">这个筛选下没有课程</div>';
}
function dualFiltSlot(s){
  curSlot = s;
  Array.prototype.forEach.call(U.$$("#slotBar .sf"), function(b){ b.classList.toggle("on", b.getAttribute("data-s")===String(s)); });
  dualRenderZK();
}
function dualSetSt(c,v){ var state = WBS.state; if(!state.cs[c]) state.cs[c]={st:'未开始',plan:false,score:''}; state.cs[c].st=v; if(v==='已通过') state.cs[c].plan=false; WBS.save(); dualRenderZK(); }
function dualSetPlan(c,v){ var state = WBS.state; if(!state.cs[c]) state.cs[c]={st:'未开始',plan:false,score:''}; state.cs[c].plan=v; WBS.save(); dualRenderZK(); }
function dualSetSc(c,v){ var state = WBS.state; if(!state.cs[c]) state.cs[c]={st:'未开始',plan:false,score:''}; state.cs[c].score=v; WBS.save(); dualRenderZK(); }

function dualRenderKY(){
  var state = WBS.state;
  if(!U.$("#kyBox")) return;
  if(!Array.isArray(state.ky)){ WBS.normalizeState(); state = WBS.state; }
  U.$("#kyBox").innerHTML = state.ky.map(function(k,i){
    var pc = k.total>0 ? Math.min(100, Math.round(k.done/k.total*100)) : 0;
    var R = 22, C = 2*Math.PI*R;
    var offset = C*(1-pc/100);
    /* col 来自用户输入且落进 style/stroke 属性，先过属性安全过滤，再兜底合法色值（P0-2） */
    var col = U.attrSafe(k.col); if(!/^(#[0-9a-fA-F]{3,8}|[a-zA-Z]+|rgb\(\s*[\d,\s]+\)|var\(--[\w-]+\))$/.test(col)) col='var(--primary)';
    return '<div class="ks">' +
      '<div class="ring-wrap"><svg viewBox="0 0 56 56">' +
        '<circle cx="28" cy="28" r="'+R+'" fill="none" stroke="var(--ring-track)" stroke-width="6"/>' +
        '<circle cx="28" cy="28" r="'+R+'" fill="none" stroke="'+col+'" stroke-width="6" stroke-linecap="round" stroke-dasharray="'+C.toFixed(1)+'" stroke-dashoffset="'+offset.toFixed(1)+'"/>' +
      '</svg><div class="rv">'+pc+'%</div></div>' +
      '<div class="body">' +
        '<div class="kh"><b>'+U.esc(k.n)+'</b><span>'+pc+'%</span></div>' +
        '<div class="bar"><i style="width:'+pc+'%;background:'+col+'"></i></div>' +
        '<div class="kctl">' +
          '<button class="btn primary sm" onclick="dualKyAdd('+i+',-5)">-5</button>' +
          '<input type="number" value="'+k.done+'" min="0" onchange="dualKySet('+i+',\'done\',this.value)">' +
          '<span class="u">/</span>' +
          '<input type="number" value="'+k.total+'" min="1" onchange="dualKySet('+i+',\'total\',this.value)">' +
          '<span class="u">'+U.esc(k.u)+'</span>' +
          '<button class="btn sm" style="background:'+col+';color:#fff" onclick="dualKyAdd('+i+',5)">+5</button>' +
        '</div>' +
        '<div class="note" style="margin-top:8px;font-size:12.5px;color:var(--muted);line-height:1.6">'+U.esc(k.tip)+'</div>' +
      '</div>' +
    '</div>';
  }).join('');
}
function dualKySet(i,f,v){ var state = WBS.state; var n = parseInt(v)||0; state.ky[i][f] = Math.max(f==='total'?1:0, n); WBS.save(); dualRenderKY(); }
function dualKyAdd(i,d){ var state = WBS.state; state.ky[i].done = Math.max(0, Math.min(state.ky[i].total, state.ky[i].done+d)); WBS.save(); dualRenderKY(); }

function dualPunch(){
  var el = U.$("#hMin"); if(!el) return;
  var m = parseInt(el.value);
  if(!m || m<0){ U.toast('填个分钟数'); return; }
  var p = U.getDualPunch();
  p[U.today()] = (p[U.today()]||0)+m;
  U.saveDualPunch(p); dualRenderHeat(); U.toast('打卡 +'+m+' 分钟');
  el.value = '';
}
function dualRenderHeat(){
  if(!U.$("#heatBox")) return;
  var p = U.getDualPunch();
  var cell = 15, gap = 3, cols = 8;
  var end = new Date(U.today()+'T00:00:00');
  var dow = end.getDay(); var back = (cols-1)*7+dow;
  var start = new Date(end); start.setDate(start.getDate()-back);
  var w = cols*(cell+gap)+26, h = 7*(cell+gap)+18;
  var svg = '<svg width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'">';
  ['一','三','五'].forEach(function(t,i){ svg += '<text x="0" y="'+(18+[1,3,5][i]*(cell+gap)+11)+'" font-size="9" fill="#8B94A3">'+t+'</text>'; });
  var mx = 0; Object.keys(p).forEach(function(k){ if(p[k]>mx) mx=p[k]; });
  if(mx<60) mx = 60;
  for(var c=0;c<cols;c++){
    for(var r=0;r<7;r++){
      var d = new Date(start); d.setDate(d.getDate()+c*7+r);
      var ds = U.fmt(d); if(d>end) continue;
      var v = p[ds]||0, lv = v===0?0:v<mx*.25?1:v<mx*.5?2:v<mx*.8?3:4;
      var col = ['#EDEFF2','#CBE5D8','#8ECBAB','#3F9E70','#137A4B'][lv];
      var isToday = ds===U.today();
      svg += '<rect class="heat-cell'+(isToday?' today':'')+'" data-ds="'+ds+'" data-v="'+v+'" x="'+(20+c*(cell+gap))+'" y="'+(18+r*(cell+gap))+'" width="'+cell+'" height="'+cell+'" rx="3.5" fill="'+col+'" stroke="'+(isToday?'#B01F24':'none')+'" stroke-width="1.6"/>';
    }
  }
  svg += '</svg>';
  U.$("#heatBox").innerHTML = svg;
  var tip = U.$("#heatTip");
  if(tip && U.$("#heatBox")){
    U.$("#heatBox").addEventListener('mousemove', function(e){
      var t = e.target;
      if(t && t.classList.contains('heat-cell')){
        var ds = t.getAttribute('data-ds')||'';
        var v = t.getAttribute('data-v')||'0';
        tip.textContent = ds+' 学习 '+v+' 分钟';
        tip.style.left = (e.clientX+12)+'px';
        tip.style.top = (e.clientY-32)+'px';
        tip.classList.add('show');
      }else{
        tip.classList.remove('show');
      }
    });
    U.$("#heatBox").addEventListener('mouseleave', function(){
      tip.classList.remove('show');
    });
  }
  var st = 0, d2 = new Date(end);
  while((p[U.fmt(d2)]||0)>0){ st++; d2.setDate(d2.getDate()-1); }
  var tot = Object.keys(p).reduce(function(a,k){ return a+p[k]; },0);
  if(U.$("#streakTxt")) U.$("#streakTxt").textContent = '连续 '+st+' 天 · 累计 '+Math.round(tot/60*10)/10+' 小时';
}
function dualPickDay(ds){
  var p = U.getDualPunch();
  var cur = p[ds]||0;
  var v = window.prompt(ds+' 已记录 '+cur+' 分钟，输入要设置的分钟数（0 清除）：', cur);
  if(v===null) return;
  var n = parseInt(v)||0; if(n<=0) delete p[ds]; else p[ds]=n;
  U.saveDualPunch(p); dualRenderHeat();
}

export function initDualZK(){
  // 桥接 window：renderAll 需要三个渲染函数，其余兼容 index.html 内联 onclick
  window.dualRenderZK = dualRenderZK;
  window.dualRenderKY = dualRenderKY;
  window.dualRenderHeat = dualRenderHeat;
  window.dualFiltSlot = dualFiltSlot;
  window.dualSetSt = dualSetSt;
  window.dualSetPlan = dualSetPlan;
  window.dualSetSc = dualSetSc;
  window.dualKySet = dualKySet;
  window.dualKyAdd = dualKyAdd;
  window.dualPunch = dualPunch;
  window.dualPickDay = dualPickDay;
}
