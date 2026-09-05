// src/version-check.js — 顶栏版本号徽标（#btnVer）+ 新版本检查
// 从 app-main.js IIFE 迁出，原生 ESM + window 桥接（与 #15 其他集群同构）。
// 依赖经 window.WBUtil 取得，无构建依赖、file:// 双击可用。

const U = window.WBUtil || {};

/* 语义化版本比较（只比前 3 段）：a>b 返回正数，a<b 返回负数，相等 0 */
function compareVer(a,b){
  var x=String(a).split('.').map(Number), y=String(b).split('.').map(Number);
  for(var i=0;i<3;i++){ var d=(x[i]||0)-(y[i]||0); if(d!==0) return d; }
  return 0;
}
/* ISO 时间串 → 'M-D HH:mm'（本地时区）；解析失败原样返回 */
function fmtRel(iso){
  var d=new Date(iso); if(isNaN(d.getTime())) return iso;
  function p(n){return (n<10?'0':'')+n;}
  return (d.getMonth()+1)+'-'+p(d.getDate())+' '+p(d.getHours())+':'+p(d.getMinutes());
}

function initVersion(){
  var meta=document.querySelector('meta[name="app-version"]');
  var ver=meta?meta.getAttribute('content'):'?';
  var relMeta=document.querySelector('meta[name="app-released"]');
  var relStr=relMeta?relMeta.getAttribute('content'):'';
  var btn=U.$("#btnVer"); if(!btn) return;
  btn.textContent='v'+ver;
  btn.onclick=function(){
    if(btn.classList.contains('update')){ location.reload(true); return; }
    var info=null; try{ info=JSON.parse(localStorage.getItem('wb_hub_verinfo')||'null'); }catch(e){}
    var msg='当前版本 v'+ver+(relStr?(' · 发布于 '+fmtRel(relStr)):'')+' · 已是最新';
    if(info&&info.notes&&info.notes.length){ msg+=' ｜ 最新：'+info.notes[0]; }
    U.toast(msg);
  };
  fetch('version.json?_='+Date.now(),{cache:'no-store'})
    .then(function(r){return r.ok?r.json():null;})
    .then(function(d){
      if(!d||!d.version) return;
      try{ localStorage.setItem('wb_hub_verinfo',JSON.stringify(d)); }catch(e){}
      if(compareVer(d.version,ver)>0){
        btn.textContent='v'+d.version;
        btn.classList.add('update');
        btn.title='发现新版本 v'+d.version+'，点击刷新';
        U.toast('🎉 已发布新版本 v'+d.version+(d.releasedAt?('（'+fmtRel(d.releasedAt)+'）'):'')+'，点顶栏版本号刷新查看');
      }
    })
    .catch(function(){ btn.classList.add('offline'); });
}

export function initVersionCheck(){
  window.initVersion = initVersion;   // 供外部手动触发（调试 / 强制刷新检查）
  window.compareVer  = compareVer;
  window.fmtRel      = fmtRel;
  /* 原在 app-main IIFE 末尾同步调用。module/defer 下 DOM 已完整解析，
     #btnVer 必存在（classic 阶段它在 L51 也已存在，行为等价且更稳）。 */
  initVersion();
}
