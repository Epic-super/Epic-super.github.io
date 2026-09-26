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

/* ============ 同步状态提示（2026-09-15，方案C·混合） ============
   背景：多设备各自编辑 + 不及时同步会导致 _master 与云端分叉。
   纯前端读不到 git 状态，故用「云端公开站版本号」作代理信号：
   - 云端公开站 version.json（跨域可 fetch，CORS 放行）≈ 云端 workbench 最新版本
   - 本地 meta app-version ≈ 本地当前版本
   判断逻辑：比较两者，出现版本分歧（落后/领先）才提示，引导运行 check_sync.bat
   做 git 级真确认；版本一致则不打扰。节流避免每次刷新都弹。 */

/* 云端公开站 version.json（脱敏产物，版本号与 workbench main 对齐） */
function cloudVerUrl(){ return 'https://epic-super.github.io/version.json?_='+Date.now(); }

function initSyncHint(){
  /* 公开站自身不做同步提示（它即云端，fetch 自己必然相等，无意义） */
  if (window.__WB_PUBLIC__ === true) return;

  var btn = U.$('#btnVer'); if (!btn) return;
  var meta = document.querySelector('meta[name="app-version"]');
  var localVer = meta ? meta.getAttribute('content') : '?';

  fetch(cloudVerUrl(), {cache:'no-store'})
    .then(function(r){ return r.ok ? r.json() : null; })
    .then(function(d){
      if (!d || !d.version) return;
      var cloudVer = d.version;
      var diff = compareVer(cloudVer, localVer);
      if (diff === 0) return;                 // 版本一致 → 不打扰（视为可能已同步）

      /* 分歧存在：标记徽标，按方向给提示文案 */
      var behind = diff > 0;                  // 云端版本更高 → 本地落后
      btn.classList.add(behind ? 'sync-behind' : 'sync-ahead');
      btn.title = behind
        ? ('云端已到 v'+cloudVer+'（本地 v'+localVer+'）。本地可能落后，建议运行 _master\\check_sync.bat 确认同步')
        : ('本地 v'+localVer+' 领先云端 v'+cloudVer+'。记得推送同步（git push origin main）');

      /* 节流：同一「方向+云端版本」组合 24h 内只 toast 一次，避免每次刷新重复弹 */
      var KEY='wb_sync_hint';
      var last=null; try{ last=JSON.parse(localStorage.getItem(KEY)||'null'); }catch(e){}
      var now=Date.now();
      if (last && last.behind===behind && last.cloudVer===cloudVer && (now-last.ts)<24*3600*1000) return;

      try{ localStorage.setItem(KEY, JSON.stringify({behind:behind, cloudVer:cloudVer, ts:now})); }catch(e){}
      var msg = behind
        ? ('⚠ 云端已是 v'+cloudVer+'，本地仍 v'+localVer+'——可能落后未同步。建议运行 check_sync.bat 拉取对齐')
        : ('本地 v'+localVer+' 领先云端 v'+cloudVer+'——有未推送改动。建议运行 check_sync.bat 确认并推送');
      U.toast(msg);
    })
    .catch(function(){ /* 网络/跨域失败静默：不强打扰 */ });
}

export function initVersionCheck(){
  window.initVersion = initVersion;   // 供外部手动触发（调试 / 强制刷新检查）
  window.compareVer  = compareVer;
  window.fmtRel      = fmtRel;
  /* 原在 app-main IIFE 末尾同步调用。module/defer 下 DOM 已完整解析，
     #btnVer 必存在（classic 阶段它在 L51 也已存在，行为等价且更稳）。 */
  initVersion();
  /* 同步状态提示在版本初始化后异步执行（不阻塞首屏） */
  initSyncHint();
}
