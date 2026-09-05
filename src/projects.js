// src/projects.js — 项目区渲染（项目卡 + 系统工具卡：双线作战台 / 计算机二级）
// 从 app-main.js IIFE 迁出，ESM + window 桥接。chip / ring / renderSysCards 仅本集群使用，随模块迁出。
// 数据源：state.projects 与 bridge（跨标签同步的系统进度），均经 window.WBState 动态取
// （二者都可能被引擎重赋值：state 被 importData / resetForm，bridge 被 storage 跨标签同步）。
const U = window.WBUtil || {};
const WBS = window.WBState;

function chip(text, cls){ return '<span class="chip'+(cls?' '+cls:'')+'">'+U.esc(text)+'</span>'; }

function ring(p){
  var raw = parseFloat(p); var pct = isNaN(raw)?0:Math.max(0,Math.min(100,raw));
  return '<svg class="ring" width="56" height="56" viewBox="0 0 36 36">'
    +'<circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--ring-track)" stroke-width="3.2"/>'
    +'<circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--primary)" stroke-width="3.2" stroke-dasharray="'+pct+' 100" stroke-dashoffset="0" transform="rotate(-90 18 18)" stroke-linecap="round"/>'
    +'<text x="18" y="21.5" text-anchor="middle" font-size="9.5" font-weight="700" fill="var(--text)">'+pct+'%</text></svg>';
}
function renderSysCards(){
  var bridge = WBS.bridge;   // 动态取：storage 跨标签同步会重赋 WBState.bridge
  var cards = [];
  var defs = [
    {key:'sjtu', name:'自考·考研 双线作战台', link:'zk-ky.html'},
    {key:'c2', name:'计算机二级 必过工作台', link:'c2.html'}
  ];
  defs.forEach(function(d){
    var b = bridge[d.key];
    if(!b){
      cards.push('<div class="card" style="border-style:dashed"><div class="proj"><div class="ring">'+ring(0)+'</div>'
        +'<div class="info"><div class="pname">'+d.name+'</div>'
        +'<div class="pmetric"><b>尚未连接</b></div>'
        +'<div class="pmeta">打开该系统后进度自动同步到这里 · <a class="chip" href="'+d.link+'" target="_blank" rel="noopener" style="text-decoration:none;color:var(--primary)">打开 ↗</a></div></div></div></div>');
      return;
    }
    var isSjtu = d.key==='sjtu';
    var bProg = (typeof b.progress==='number' && !isNaN(b.progress))? b.progress : 0;
    var bSub = (b.sub && typeof b.sub==='string')? b.sub : '进度同步中';
    var bLink = U.safeUrl((b.link && typeof b.link==='string')? b.link : d.link) || d.link;
    var days = isSjtu
      ? (b.kyDays!==undefined? b.kyDays : (b.zkDays!==undefined? b.zkDays : null))
      : (b.examDays!==undefined? b.examDays : null);
    var daysTxt = (days===null)? '' : (days<0? '已过 '+Math.abs(days)+' 天' : days+' 天');
    var meta = isSjtu ? ('考研倒计时 '+daysTxt) : ('考试倒计时 '+daysTxt);
    cards.push('<div class="card"><div class="proj">'+ring(bProg)
      +'<div class="info"><div class="pname">'+d.name+' '+chip('学习')+'</div>'
      +'<div class="pmetric"><b>'+U.esc(bSub)+'</b></div>'
      +'<div class="pbar"><i style="width:'+bProg+'%"></i></div>'
      +'<div class="pmeta">'+meta+' · <a class="chip" href="'+U.esc(bLink)+'" target="_blank" rel="noopener" style="text-decoration:none;color:var(--primary)">打开系统 ↗</a></div></div>'
      +'<button class="btn sm ghost" onclick="location.href=\''+U.esc(bLink)+'\'">进入</button>'
      +'</div></div>');
  });
  return cards.join('');
}
function renderProjects(){
  var state = WBS.state;
  var box = U.$("#projList");
  var sysHtml = renderSysCards();
  if(!state.projects.length && !sysHtml){ box.innerHTML='<div class="empty">还没有项目，点右上角添加。</div>'; return; }
  box.innerHTML = sysHtml + state.projects.map(function(p){
    var red = /红|支出/.test(p.metric);
    var green = /绿|收入/.test(p.metric);
    var chipHtml = red ? chip('含支出','red') : green ? chip('含收入','green') : '';
    var pl = U.safeUrl(p.link);
    var link = pl ? '<a class="chip" href="'+U.esc(pl)+'" target="_blank" rel="noopener" style="text-decoration:none;color:var(--primary)">打开 ↗</a>' : (p.link?'<span class="chip">链接被安全策略拦截</span>':'');
    var prog = Math.max(0, Math.min(100, Number(p.prog)||0));
    return '<div class="card"><div class="proj">'+ring(prog)
      +'<div class="info"><div class="pname">'+U.esc(p.name)+' '+chipHtml+'</div>'
      +'<div class="pmetric"><b>'+U.esc(p.metric)+'</b></div>'
      +'<div class="pbar"><i style="width:'+prog+'%"></i></div>'
      +'<div class="pmeta">最近更新 '+U.esc(p.update||"—")+' · '+link+'</div></div>'
      +'<button class="btn sm ghost" data-act="delp" data-id="'+p.id+'">删除</button>'
      +'</div></div>';
  }).join("");
}

export function initProjects(){
  window.renderProjects = renderProjects;
}
