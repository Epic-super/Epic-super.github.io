// src/games-shelf.js — 游戏架模块（迁移自 index.html 内联 IIFE，原生 ESM，零构建）
// 机械搬运生成（_scratch/gen_games_shelf.py），逻辑零改动。
// 对外仍挂 window.gToast / openGameModal / saveGame / deleteGame / importScannedGames；
// 依赖全局：store(lib/store.js)、SCANNED_GAMES(games-library.js)、window.viewGuard(主脚本块导出)。
// 注意：module 为 defer 执行，晚于全部同步脚本，故上述全局只会更晚、必然可用。
export function initGamesShelf() {
  "use strict";
  function $(s,r){return (r||document).querySelector(s);}
  function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));}
  function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
  var GKEY="games";
  var STATUS={ playing:{label:"在玩",cls:"playing"}, pause:{label:"暂停",cls:"pause"}, backlog:{label:"待回归",cls:"backlog"}, abandoned:{label:"弃坑",cls:"abandoned"} };
  var editingId=null;

  // ===== 游戏时长统计（数据来自 _private/gametime/tracker.py 守护，serve.py 路由 /api/gametime/*） =====
  var __gtGames=[];
  var GT_API="/api/gametime/games";
  function gtPlayFmt(ms){var s=Math.max(0,Math.round(ms||0))/1000;
    if(s>=3600) return (s/3600).toFixed(1)+"小时";
    if(s>=60) return Math.round(s/60)+"分";
    return Math.round(s)+"秒";}
  function gtGameRoot(exe){ // 与 sync_targets.game_root 同语义：定位游戏根目录
    var s=String(exe||"").replace(/\//g,"\\");
    var p1=s.lastIndexOf("\\"); if(p1<0) return s;
    var d=s.substring(0,p1);
    var p2=d.lastIndexOf("\\"); var parent=p2>0?d.substring(0,p2):d;
    if(!parent||parent.length<=3) return d;
    var base=parent.substring(parent.lastIndexOf("\\")+1).toLowerCase();
    if(base==="common"||base==="steamapps"||base==="games"||base==="program files"||base==="program files (x86)") return d;
    return parent;}
  function lookupGt(g, list){if(!list||!list.length) return null;
    // 1) Steam: appid → steam:<appid>
    if(g.appid){var k="steam:"+g.appid;
      for(var i=0;i<list.length;i++) if(list[i].key===k) return list[i];}
    // 2) exe basename 精确匹配；3) 根目录小写与 dir: 前缀匹配
    if(g.exe){var base=g.exe.split(/[\\/]/).pop().toLowerCase();
      for(var i=0;i<list.length;i++) if(list[i].exe_name&&list[i].exe_name.toLowerCase()===base) return list[i];
      var root=gtGameRoot(g.exe).toLowerCase();
      for(var i=0;i<list.length;i++){var k=list[i].key;
        if(k&&k.indexOf("dir:")===0&&k.slice(4)===root) return list[i];}}
    return null;}
  function loadGtGames(){try{return fetch(GT_API,{cache:"no-store"}).then(function(r){return r&&r.ok?r.json():null;}).then(function(d){__gtGames=(d&&d.games)?d.games:[];});}
    catch(e){return Promise.resolve();}}

  function gToast(m){var t=$("#toast"); if(!t)return; t.textContent=m; t.classList.add("on"); clearTimeout(t._t); t._t=setTimeout(function(){t.classList.remove("on");},2000);}
  window.gToast=gToast;

  // 默认游戏（非 Steam）。exe 一律留空：真实路径只存本机 games-local-config.local.js /
  // 用户 localStorage，绝不硬编码进源码（公网部署零泄露）。merge 只补缺失项，不覆盖用户已改数据。
  var DEFAULT_GAMES=[
    {
      id:"terra-nil", name:"Terra Nil",
      exe:"",
      cover:"https://cdn.cloudflare.steamstatic.com/steam/apps/1593030/library_600x900.jpg",
      emoji:"🌍", status:"pause",
      note:"生态修复城市建造，短期不碰，留给上岸后慢慢玩。",
      planBack:"考研上岸后，一口气通关 + 翻数字艺术设定集",
      addedAt:Date.now()
    },
    {
      id:"entropy-centre", name:"The Entropy Centre",
      exe:"",
      cover:"https://cdn.cloudflare.steamstatic.com/steam/apps/1730590/library_600x900.jpg",
      emoji:"🧊", status:"pause",
      note:"解谜，靠 exe 直接启动，不走 Steam。",
      planBack:"",
      addedAt:Date.now()
    },
    // 平台 / 启动器 / 加速器（非游戏，status 统一 playing 表示常用）
    {
      id:"steam", name:"Steam",
      exe:"",
      cover:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MiIgaGVpZ2h0PSI4OCIgdmlld0JveD0iMCAwIDYyIDg4Ij48cmVjdCB3aWR0aD0iNjIiIGhlaWdodD0iODgiIHJ4PSIxMCIgZmlsbD0iIzFiMjgzOCIvPjx0ZXh0IHg9IjMxIiB5PSI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1mYW1pbHk9InN5c3RlbS11aSwtYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCwnU2Vnb2UgVUknLHNhbnMtc2VyaWYiPlN0ZWFtPC90ZXh0Pjwvc3ZnPg==", emoji:"🎮", status:"playing",
      note:"Valve 游戏平台 / 启动器（本体，非游戏）",
      planBack:"", addedAt:Date.now()
    },
    {
      id:"epic", name:"Epic Games",
      exe:"",
      cover:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MiIgaGVpZ2h0PSI4OCIgdmlld0JveD0iMCAwIDYyIDg4Ij48cmVjdCB3aWR0aD0iNjIiIGhlaWdodD0iODgiIHJ4PSIxMCIgZmlsbD0iIzEwMTAxMCIvPjx0ZXh0IHg9IjMxIiB5PSI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1mYW1pbHk9InN5c3RlbS11aSwtYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCwnU2Vnb2UgVUknLHNhbnMtc2VyaWYiPkVwaWM8L3RleHQ+PC9zdmc+", emoji:"🕹️", status:"playing",
      note:"Epic 游戏平台 / 启动器（含每周免费游戏）",
      planBack:"", addedAt:Date.now()
    },
    {
      id:"uu", name:"网易 UU 加速器",
      exe:"",
      cover:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MiIgaGVpZ2h0PSI4OCIgdmlld0JveD0iMCAwIDYyIDg4Ij48cmVjdCB3aWR0aD0iNjIiIGhlaWdodD0iODgiIHJ4PSIxMCIgZmlsbD0iI2IwMWYyNCIvPjx0ZXh0IHg9IjMxIiB5PSI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1mYW1pbHk9InN5c3RlbS11aSwtYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCwnU2Vnb2UgVUknLHNhbnMtc2VyaWYiPlVVPC90ZXh0Pjwvc3ZnPg==", emoji:"⚡", status:"playing",
      note:"游戏加速器 / 启动器",
      planBack:"", addedAt:Date.now()
    }
  ];

  function mergeDefaults(){
    var games=store.get(GKEY,[])||[];
    var idx={}; games.forEach(function(g,i){ idx[g.id]=i; });
    var changed=false;
    DEFAULT_GAMES.forEach(function(d){
      if(idx[d.id]===undefined){ games.push(d); changed=true; }
      else{
        var g=games[idx[d.id]];
        for(var k in d){ if(!g[k] && d[k]){ g[k]=d[k]; changed=true; } }
      }
    });
    if(changed) store.set(GKEY,games);
  }

  // 本地 exe 走自定义协议 wbexec:// 一键启动（需在 Windows 注册一次处理器，见 &lt;本机 wbexec 注册表项&gt;）
  /* 启动链接统一走「属性安全」处理：先洗掉会逃逸 HTML 属性的字符，再拼协议（P0-2） */
  function attrSafe(s){ return String(s==null?'':s).replace(/["'<>&\\]/g,''); }
  function launchUrl(exe){ return 'wbexec://' + attrSafe(exe).replace(/ /g,'%20'); }
  // 启动链接：优先 appid（Steam 游戏走 steam://rungameid），否则 exe（走 wbexec:// 协议）
  function launchHref(g){
    if(g.appid){ var id=String(g.appid).replace(/[^0-9]/g,''); return id? 'steam://rungameid/'+id : ''; }
    if(g.exe) return launchUrl(g.exe);
    return '';
  }
  function launchTitle(g){ if(g.appid) return '通过 Steam 启动（需 Steam 客户端运行）'; if(g.exe) return '通过 wbexec 协议一键启动（需本机已注册处理器）'; return ''; }

  // 按最后启动时间自动分类：≤7天在玩 / 8-30天待回归 / 31-90天暂停 / >90天弃坑；无记录退回手动 status
  function autoStatus(g){
    if(!g||!g.lastLaunch) return null;
    var d=(Date.now()-g.lastLaunch)/86400000;
    if(d<=7) return 'playing';
    if(d<=30) return 'backlog';
    if(d<=90) return 'pause';
    return 'abandoned';
  }
  function statusOf(g){ return autoStatus(g)||(g&&g.status)||'pause'; }
  function launchText(g){
    if(!g||!g.lastLaunch) return '未记录启动时间';
    var d=Math.max(0,Math.floor((Date.now()-g.lastLaunch)/86400000));
    var ago=d===0?'今天':d===1?'昨天':(d+' 天前');
    return g.lastLaunchSrc==='exe-mtime' ? ('exe 更新于 '+ago) : ('最后启动 '+ago);
  }

  function renderGames(){
    var list=$("#gameList"); if(!list) return;
    var games=store.get(GKEY,[])||[];
    var filter=(window.__gameFilter||"all");
    var items=games.filter(function(g){return filter==="all"||statusOf(g)===filter;});
    if(!items.length){
      list.innerHTML='<div class="games-empty">'+(games.length?'该状态下暂无游戏 🎮':'游戏架还是空的，点右上角「添加游戏」把暂时不玩的游戏收进来吧 🎮')+'</div>';
      return;
    }
    list.innerHTML=items.map(function(g){
      var st=STATUS[statusOf(g)]||STATUS.pause;
      var _gcInit=(((g.name||"游戏").trim().charAt(0)||"游").toUpperCase()).replace(/[^0-9A-Z\u4e00-\u9fa5]/g,"")||"游";
      var _gcHash=0; for(var _gi=0;_gi<(g.name||"").length;_gi++) _gcHash=(_gcHash*31+(g.name||"").charCodeAt(_gi))>>>0;
      var _gcGrads=[["#FF6B6B","#4ECDC4"],["#A78BFA","#60A5FA"],["#F59E0B","#EF4444"],["#10B981","#3B82F6"],["#EC4899","#8B5CF6"],["#06B6D4","#84CC16"]];
      var _gcG=_gcGrads[_gcHash%_gcGrads.length];
      var _gcStyle='background:linear-gradient(135deg,'+_gcG[0]+' 0%, '+_gcG[1]+' 100%);';
      var coverHtml = g.cover
        ? '<div class="gcover" style="'+_gcStyle+'"><img src="'+esc(g.cover)+'" alt="" loading="lazy" decoding="async" onerror="this.parentNode.textContent=\''+_gcInit+'\'"></div>'
        : '<div class="gcover" style="'+_gcStyle+'">'+_gcInit+'</div>';
      var lh=launchHref(g);
      var launch = lh
        ? '<a class="btn primary sm" href="'+lh+'" title="'+launchTitle(g)+'">启动</a>'
        : '<button class="btn primary sm" onclick="gToast(\'未配置启动方式（需填 exe 或 appid）\')">启动</button>';
      var dir = g.exe
        ? '<a class="btn sm" href="file:///'+esc(g.exe).replace(/\\/g,"/").replace(/ /g,"%20")+'" title="在资源管理器打开游戏目录">目录</a>'
        : '';
      var note = g.note ? '<div class="gnote">'+esc(g.note)+'</div>' : '';
      var plan = g.planBack ? '<div class="gplan">↩ '+esc(g.planBack)+'</div>' : '';
      var time = '<div class="gtime">🕒 '+launchText(g)+(g.lastLaunchSrc==='steam'?'（Steam 记录）':(g.lastLaunchSrc==='exe-mtime'?'（文件时间）':''))+'</div>';
      var gt=lookupGt(g, __gtGames);
      var play='';
      if(gt){
        var pp=[];
        if(gt.totalMs>0) pp.push('累计 <b>'+gtPlayFmt(gt.totalMs)+'</b>');
        if(gt.active) pp.push('<span class="live">本次 '+gtPlayFmt(Date.now()-(gt.activeStartMs||Date.now()))+'</span>');
        if(pp.length) play='<div class="gt-play">🎮 '+pp.join(' · ')+'</div>';
      }
      return '<div class="gcard">'+coverHtml
        + '<div class="ginfo">'
          + '<div class="gname">'+esc(g.name)+' <span class="gstat '+st.cls+'">'+st.label+'</span></div>'
          + time + play + note + plan
          + '<div class="gactions">'+launch+dir
            + '<button class="btn sm" onclick="openGameModal(\''+g.id+'\')">编辑</button>'
            + '<button class="btn sm" onclick="deleteGame(\''+g.id+'\')">删除</button>'
          + '</div>'
        + '</div></div>';
    }).join("");
  }

  function openGameModal(id){
    editingId=id||null;
    var g = id ? (store.get(GKEY,[])||[]).filter(function(x){return x.id===id;})[0] : null;
    g = g || {name:"",exe:"",cover:"",emoji:"🎮",status:"pause",note:"",planBack:""};
    var body=$("#modalDynBody"); if(!body) return;
    body.innerHTML='<h3>'+(id?"编辑游戏":"添加游戏")+'</h3>'
      + '<div class="field"><label>名称</label><input id="gName" placeholder="例如：Terra Nil" value="'+esc(g.name)+'"></div>'
      + '<div class="field"><label>本地 exe 路径（必填，用于「启动」一键拉起）</label><input id="gExe" placeholder="本地游戏 exe 绝对路径" value="'+esc(g.exe)+'"></div>'
      + '<div class="field"><label>封面图 URL（可选）</label><input id="gCover" placeholder="https://..." value="'+esc(g.cover)+'"></div>'
      + '<div class="field"><label>状态</label><select id="gStatus">'
        + Object.keys(STATUS).map(function(k){return '<option value="'+k+'"'+(g.status===k?" selected":"")+'>'+STATUS[k].label+'</option>';}).join("")
        + '</select><div style="font-size:11px;color:#94a3b8;margin-top:4px">已记录 lastLaunch 的游戏由启动时间自动分类（≤7天在玩 / 8-30天待回归 / 31-90天暂停 / >90天弃坑），此手动状态仅作无记录时的兜底</div></div>'
      + '<div class="field"><label>搁置备注</label><input id="gNote" placeholder="为什么短期不玩？" value="'+esc(g.note)+'"></div>'
      + '<div class="field"><label>回坑计划</label><input id="gPlan" placeholder="什么时候回来玩？" value="'+esc(g.planBack)+'"></div>'
      + '<div class="modal-actions"><button class="btn ghost" data-close>取消</button><button class="btn primary" onclick="saveGame()">保存</button></div>';
    var mask=$("#modalDyn"); mask.classList.add("show");
    setTimeout(function(){var n=$("#gName"); if(n) n.focus();},30);
  }

  window.openGameModal=openGameModal;
  window.saveGame=function(){
    var name=$("#gName").value.trim();
    if(!name){ gToast("请填写游戏名称"); return; }
    var exe=$("#gExe").value.trim();
    if(!exe){ gToast("请填写 exe 路径，否则无法一键启动"); return; }
    var games=store.get(GKEY,[])||[];
    var data={ name:name, exe:exe, cover:$("#gCover").value.trim(), status:$("#gStatus").value,
      note:$("#gNote").value.trim(), planBack:$("#gPlan").value.trim(), emoji:"🎮" };
    if(editingId){ var _o=(store.get(GKEY,[])||[]).filter(function(x){return x.id===editingId;})[0]; if(_o && _o.appid) data.appid=_o.appid; }
    if(editingId){
      games=games.map(function(x){ if(x.id===editingId){ for(var k in data) x[k]=data[k]; } return x; });
    } else {
      data.id="g-"+Date.now(); data.addedAt=Date.now(); games.push(data);
    }
    store.set(GKEY,games);
    var m=$("#modalDyn"); if(m) m.classList.remove("show");
    renderGames(); gToast(editingId?"已更新":"已添加");
  };
  window.deleteGame=function(id){
    if(!confirm("确定从游戏架移除该游戏？")) return;
    var games=(store.get(GKEY,[])||[]).filter(function(x){return x.id!==id;});
    store.set(GKEY,games); renderGames(); gToast("已删除");
  };

  // 导入本机游戏库（games-library.js 的 SCANNED_GAMES），按 id 去重，不覆盖已有、删了不回灌；
  // 对已存在条目做字段级补齐（lastLaunch/lastLaunchSrc/status 兜底），使旧数据也能获得启动时间自动分类
  window.importScannedGames=function(){
    if(typeof SCANNED_GAMES==="undefined" || !SCANNED_GAMES.length){ gToast("未找到本机游戏库数据"); return; }
    var games=store.get(GKEY,[])||[];
    var idx={}; games.forEach(function(g,i){ idx[g.id]=i; });
    var added=0, patched=0;
    SCANNED_GAMES.forEach(function(d){
      if(idx[d.id]===undefined){ games.push(d); added++; }
      else{
        var g=games[idx[d.id]];
        var changed=false;
        if(!g.lastLaunch && d.lastLaunch){ g.lastLaunch=d.lastLaunch; g.lastLaunchSrc=d.lastLaunchSrc||null; changed=true; }
        if(!g.status && d.status){ g.status=d.status; changed=true; }
        if(changed) patched++;
      }
    });
    if(added||patched){ store.set(GKEY,games); renderGames(); }
    gToast(added? ("已导入 "+added+" 个本机游戏"+(patched?("，同步启动时间 "+patched+" 个"):"")) : (patched?("已同步 "+patched+" 个游戏的启动时间"):"本机游戏库已全部在架"));
  };

  function wireFilters(){
    var box=$("#gameFilters"); if(!box) return;
    box.addEventListener("click",function(e){
      var c=e.target.closest(".chip"); if(!c) return;
      $$("#gameFilters .chip").forEach(function(x){x.classList.remove("active");});
      c.classList.add("active");
      window.__gameFilter=c.getAttribute("data-f");
      renderGames();
    });
  }

  // 在 renderGames 实际定义后再套上错误边界（viewGuard 由主脚本块导出到 window，
  // 本 IIFE 是独立作用域，直接裸引用会 ReferenceError 中断整块初始化）
  if(window.viewGuard) renderGames = window.viewGuard('games', renderGames, '#gameList');

  function init(){
    mergeDefaults();
    wireFilters();
    var add=$("#btnAddGame"); if(add) add.onclick=function(){ openGameModal(); };
    var imp=$("#btnImportLib"); if(imp) imp.onclick=importScannedGames;
    renderGames();
    // 拉取游戏时长数据（首次即拉，失败静默回退到无时长渲染）
    loadGtGames().then(renderGames);
    setInterval(function(){ loadGtGames().then(renderGames); }, 60000);  // 进行中接近实时
    if(store.subscribe) store.subscribe(function(ev){ if(ev && ev.path==="games") renderGames(); });
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init); else init();
}
