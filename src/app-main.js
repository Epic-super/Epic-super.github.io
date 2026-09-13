(function(){
  "use strict";
  // #8 共享状态外置（spine）：state/bridge 与 load/save/normalizeState/loadBridge 已迁 src/state.js（window.WBState）
  var S = window.WBState;
  var state = S.state, bridge = S.bridge;
  var KEY = S.KEY, seed = S.seed, COURSES = S.COURSES, KY_DEF = S.KY_DEF;
  var save = S.save, normalizeState = S.normalizeState, loadBridge = S.loadBridge;
  // S._onSave 钩子现由 src/storage.js initStorage() 在 main.js boot() 桥接后挂上（renderBackupTip 已迁出，避开 classic/module defer 时序坑）
  S._toast = toast;
  var $ = function(s,r){return (r||document).querySelector(s);};
  var $$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};

  // ===== 双线作战台基础数据（自考课库 / 考研四科 / 考场时段）=====
  // SLOTS（考场时段）已迁 src/dual-zkky.js（随 ZK/KY 集群走）
  // COURSES / KY_DEF 已迁 src/state.js（经 WBState.COURSES / WBState.KY_DEF 别名引用）


  // ---- 默认示例数据（含 1 条逾期）----
  function ymd(d){ d=d||new Date(); var y=d.getFullYear(),m=("0"+(d.getMonth()+1)).slice(-2),da=("0"+d.getDate()).slice(-2); return y+"-"+m+"-"+da; }

  // seed 已迁 src/state.js（经 WBState.seed 别名引用）

  // load/save/state/normalizeState 已迁 src/state.js（经 WBState 别名引用；save 经 S._onSave/_toast 钩子回连 renderBackupTip/toast）



  // loadBridge/bridge 已迁 src/state.js（经 WBState.loadBridge / WBState.bridge 别名引用）
  function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6);}

  function esc(s){return String(s||"").replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
  /* 属性上下文消毒：剥离引号/尖括号/反斜杠（dualRenderKY 的颜色值白名单前置步骤）。
   * 模块化拆分时该函数曾被留在 games-shelf.js 内部致 dualKY 渲染降级（2026-08-30 控制台实录），此处补回。 */
  function attrSafe(s){ return String(s==null?"":s).replace(/["'<>&\\]/g,""); }
  /* URL 协议白名单：仅放行 http(s)、协议相对、站内相对路径；挡 javascript:/data:text 等（P0-2） */
  function safeUrl(u){
    var s=String(u==null?"":u).trim();
    if(!s) return "";
    if(/^(https?:)?\/\//i.test(s)) return s;
    if(/^\.{0,2}\//.test(s)||/^[A-Za-z0-9_\-\/\.\?&#=%]+$/.test(s)) return s;
    return "";
  }
  // safeImg 已随 news 集群迁至 src/news.js（全站仅资讯爬取正文使用，转调 U.safeUrl）



  // 激励英雄区已迁 src/hero.js（ESM，由 main.js boot() 桥接 window.renderHero）
  // 注：daysTo 为共享 helper（挂 WBUtil.daysTo），仍保留在此
  function daysTo(dateStr){
    if(!dateStr) return null;
    var t=new Date(wbNow()); t.setHours(0,0,0,0);
    var d=new Date(dateStr+"T00:00:00");
    if(isNaN(d)) return null;
    return Math.round((d - t)/86400000);
  }
  // setCd / checkReminders / fireReminders 已随 hero 集群迁至 src/hero.js
  // ---- file:// 双击兜底：ESM 桥接失败时仍渲染核心 hero 区（倒计时/问候/打卡）
  function renderHeroFallback(){
    try{
      var state = (window.WBState && window.WBState.state) || {};
      var g=document.getElementById('heroGreet');
      if(g){ var h=new Date().getHours(); g.textContent=(h<6?"凌晨好":h<12?"早上好":h<14?"中午好":h<18?"下午好":"晚上好")+"，小待 👋"; }
      function setCd(numId,dateId,days){
        var n=document.getElementById(numId), d=document.getElementById(dateId);
        if(n) n.textContent = (days===undefined||days===null)? "--" : (days<0? "0" : String(days));
        if(d) d.textContent = (days===undefined||days===null)? "打开系统同步" : (days<0? "已结束" : "努力冲刺中");
      }
      var set = (state && state.set) || {};
      setCd('cdKyNum','cdKyDate', daysTo(set.kyDate));
      setCd('cdZkNum','cdZkDate', daysTo(set.zkDate));
      setCd('cdC2Num','cdC2Date', daysTo('2026-09-19'));
      var regDays=daysTo('2026-09-06');
      setCd('cdRegNum','cdRegDate', regDays);
      var cdRegDate=document.getElementById('cdRegDate');
      if(cdRegDate && regDays!==null){
        if(regDays>14) cdRegDate.textContent="开放 2026-09-01";
        else if(regDays>=0) cdRegDate.textContent="窗口至 2026-09-06";
        else cdRegDate.textContent="窗口已关闭";
      }
      var f=document.getElementById('focusTask'), btn=document.getElementById('focusBtn');
      if(f){ f.textContent="暂无紧急事项，保持节奏 💪"; if(btn) btn.style.display='none'; }
      var st=document.getElementById('streak');
      if(st){
        var punch=getDualPunch() || {};
        var t=ymd(new Date(wbNow())), n=0, d2=new Date(wbNow());
        while((punch[ymd(d2)]||0)>0){ n++; d2.setDate(d2.getDate()-1); }
        st.textContent = n>0 ? ("🔥 连续 "+n+" 天") : "🔥 点我打卡";
        st.onclick=function(){ window.location.href='zk-ky.html#p1'; };
      }
    }catch(e){ console.error('renderHeroFallback failed', e); }
  }
  // ---- 连续打卡（与双线台 zk-ky.html 共用 wb_sjtu_dual_v1.punch，避免版本更新后数据不同步）----
  var DUAL_KEY='wb_sjtu_dual_v1';
  function yYesterday(){ var d=new Date(wbNow()); d.setDate(d.getDate()-1); return ymd(d); }
  function loadDual(){ try{ var r=store.getLegacy(DUAL_KEY, null); if(r&&typeof r==='object'&&!Array.isArray(r)) return r; }catch(e){} return null; }
  function getDualPunch(){
    var d=loadDual();
    if(d&&d.punch&&typeof d.punch==='object'&&!Array.isArray(d.punch)) return d.punch;
    // dual 不存在时回退到旧 hub state.punch，避免破坏 zk-ky.html 的首次 seed
    return (state.punch&&typeof state.punch==='object'&&!Array.isArray(state.punch))?state.punch:{};
  }
  function saveDualPunch(p){
    var d=loadDual();
    if(!d){
      // dual 数据还不存在：不要创建半成品，先写回 hub state.punch，等用户打开 zk-ky.html 后自然统一
      state.punch=p; save(); return;
    }
    d.punch=p;
    try{ store.setLegacy(DUAL_KEY, d); }catch(e){}
  }
  // calcStreak 已迁 src/hero.js（仅 renderHero 使用，随集群走）
  // 一次性迁移：如果用户已用过 zk-ky.html（dual 存在），把旧 hub state.punch 合并到 dual punch
  (function migratePunch(){
    try{
      var d=loadDual();
      if(d && state.punch && typeof state.punch==='object' && !Array.isArray(state.punch) && Object.keys(state.punch).length){
        var p=(d.punch&&typeof d.punch==='object'&&!Array.isArray(d.punch))?d.punch:{};
        var changed=false;
        Object.keys(state.punch).forEach(function(k){ if((state.punch[k]||0)>(p[k]||0)){ p[k]=state.punch[k]; changed=true; } });
        if(changed){ d.punch=p; store.setLegacy(DUAL_KEY, d); state.punch={}; save(); }
      }
    }catch(e){}
  })();
  // 激励英雄区渲染已迁 src/hero.js（ESM，由 main.js boot() 桥接 window.renderHero，内部自带 try/catch 错误边界）
  // 首页外链 + AI 工具箱已迁 src/home-sites.js（ESM，由 main.js boot() 桥接 window.renderHotSites / window.renderAI）

  /* 视图错误边界（viewGuard/viewFallback）已迁至 src/view-guard.js（ESM，由 main.js 桥接 window）。
     renderAll 内部改用 window.viewFallback（defer 后由 main.js boot 桥接就绪；未就绪时静默跳过兜底）。 */
  function renderAll(){
    [
      ['today',window.renderToday,'#todayList'],['projects',window.renderProjects,'#projList'],['tools',window.renderTools,'#toolsGrid'],
      ['notes',window.renderNotes,'#noteList'],['hotsites',window.renderHotSites,'#hotSites'],
      ['backupTip',window.renderBackupTip,''],['hero',window.renderHero || renderHeroFallback,''],['ai',window.renderAI,''],
      ['dualZK',window.dualRenderZK,'#csBox'],['dualKY',window.dualRenderKY,'#kyBox'],['dualHeat',window.dualRenderHeat,'#heatBox'],
      ['quant',window.renderQuant,''],['research',window.renderResearchHub,'#rsStatHub']
    ].forEach(function(pair){
      try{ pair[1](); }catch(e){ if(window.viewFallback) window.viewFallback(pair[0], e, pair[2]); }
    });
  }

  /* ===== 双线作战台：自考看板 / 考研进度 / 打卡热力图（移植自双线平台）===== */
  function today(){ return ymd(); }
  function fmt(d){ return ymd(d); }
  function toast(m){ var t=$("#toast"); if(!t) return; t.textContent=m; t.classList.add("on"); clearTimeout(t._t); t._t=setTimeout(function(){ t.classList.remove("on"); },2000); }
  // 考研资讯集群已迁 src/news.js（ESM，由 main.js boot() 桥接 window.renderNews / window.loadNews）
  // 含 newsData/newsFilter 私有状态、newsGroup/NEWS_ORDER、loadNews/loadNewsLocal/markNewsStale、
  // renderNews/__renderNews/crawlNews，以及 #newsChips 分类筛选与 #newsList「抓取正文」两个事件委托。

  // ---- 弹层 ----
  function openModal(id){$("#"+id).classList.add("show");}
  function closeModals(){$$(".modal-mask").forEach(function(m){m.classList.remove("show");});}




  // ---- 深色 / 浅色主题 ----
  var THEME_KEY=KEY+"theme";
  function applyTheme(t){document.documentElement.setAttribute("data-theme",t);updateThemeIcon(t);
    var nf=document.getElementById('noclockFrame');
    if(nf && nf.contentWindow){ try{ nf.contentWindow.postMessage({type:'noclock-theme',theme:t},'*'); }catch(e){} }
  }
  function updateThemeIcon(t){
    var sun='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    var moon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>';
    var el=$("#btnTheme"); if(el) el.innerHTML=(t==="dark")?sun:moon;
  }
  // 子模块（noclock.html）集成：高度自适应 + 初始主题同步
  (function(){
    var nf=document.getElementById('noclockFrame');
    if(!nf) return;
    window.addEventListener('message',function(e){
      if(e.data && e.data.type==='noclock-resize'){ nf.style.height=(e.data.height||900)+'px'; }
    });
    nf.addEventListener('load',function(){
      var t=document.documentElement.getAttribute('data-theme');
      try{ nf.contentWindow.postMessage({type:'noclock-theme',theme:t},'*'); }catch(e){}
    });
  })();
  function validTheme(t){ return t==="dark"?"dark":"light"; }
  applyTheme(validTheme(store.get('theme') || store.getLegacy('wb_hub_theme')));
  $("#btnTheme").onclick=function(){
    var next=(document.documentElement.getAttribute("data-theme")==="dark")?"light":"dark";
    applyTheme(next); store.set('theme',next);
  };

  window.addEventListener('storage',function(e){
    if(e.key==='wb_hub_bridge'){ S.bridge = loadBridge(); bridge = S.bridge; window.renderToday(); window.renderProjects(); window.renderTools(); window.renderHero(); }
  });
  /* #8 渐进抽取：viewGuard/viewFallback 已迁 src/view-guard.js，由 main.js(module,defer) 在 boot() 桥接 window。
     本函数延迟到 main.js 派发的 wb:ready 之后执行，确保桥接已就绪（避开 classic 解析时同步裸调 / module 后才桥接的时序坑）。 */
  function __wbInitViews(){
    var init = location.hash.replace('#','');
    if(init && /^[a-zA-Z0-9_-]+$/.test(init) && document.getElementById(init)) window.setView(init, true); else window.setView('sec-today', true);
    /* 单独调用路径的错误边界（P2-10 扩面）：包裹后所有调用点自动生效，不改任何调用点 */
    if(window.viewGuard){
      window.renderToday  = window.viewGuard('today',     window.renderToday,   '#todayList');
      if(window.viewGuard && window.renderProjects) window.renderProjects = window.viewGuard('projects', window.renderProjects, '#projList');
      window.renderTools = window.viewGuard('tools', window.renderTools, '#toolsGrid');
      window.renderNotes = window.viewGuard('notes', window.renderNotes,   '#noteList');
      // renderGames 定义在下方 games 模块（下一个 script 块），避免此处提前读取触发 ReferenceError；真正包裹在该模块内完成
      if(typeof renderGames==='function') renderGames = window.viewGuard('games', renderGames, '#gameList');
    }
    renderAll();
  }
  if(window.__wbReady) __wbInitViews();
  else {
    window.addEventListener('wb:ready', __wbInitViews, { once:true });
    // 兜底：若模块极端情况下未就绪，DOMContentLoaded 后仍强制渲染，保证页面可用（无错误边界但可显示）
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', function(){ if(!window.__wbReady) __wbInitViews(); }, { once:true });
    else if(!window.__wbReady) __wbInitViews();
  }
  // 若 URL 携带子模块锚点（如 #dual-zk），在渲染完成后再滚动定位
  if(location.hash) setTimeout(function(){ window.goSection(location.hash); }, 80);
  // ⚠️ 时序红线：loadNews 已迁 src/news.js，要等 module/defer 的 main.js boot() 才桥接到 window。
  // 本文件是 classic 脚本（HTML 解析中同步执行，早于任何 module），此处裸调 window.loadNews() 必抛
  // TypeError 并中断整个 IIFE —— 文件末尾的 window.WBUtil 赋值随之不执行，8 个 #15 模块全部拿到
  // 空的 U 而渲染失败（1.0.139 / 1.0.140 的线上故障即由此而来）。故守卫 + wb:ready 补调。
  if(window.loadNews) window.loadNews();
  else window.addEventListener('wb:ready', function(){ window.loadNews(); }, { once:true });
  setInterval(function(){ if(window.loadNews) window.loadNews(); }, 5*60*1000);

  // ===== P0 钩子：跨标签同步重渲染 + IndexedDB 崩溃恢复提示 =====
  window.__wbOnRemote = function(){
    try { if (typeof window.renderToday==='function'){ window.renderToday(); window.renderProjects(); window.renderTools(); window.renderHero(); } } catch(e){}
    if (window.renderResearchHub) window.renderResearchHub();
  };
  window.__wbShowRestore = function(snap){
    if (document.getElementById('idbRestore')) return;
    var bar=document.createElement('div'); bar.id='idbRestore';
    bar.style.cssText='position:fixed;top:0;left:0;right:0;z-index:9999;background:#d98a1a;color:#fff;font-size:13px;padding:10px 14px;display:flex;align-items:center;gap:12px;box-shadow:0 2px 8px rgba(0,0,0,.2)';
    var label=document.createElement('span'); label.textContent='💾 检测到更新的本地备份，是否恢复？';
    var btn=document.createElement('button'); btn.textContent='一键恢复'; btn.style.cssText='background:#fff;color:#d98a1a;border:0;border-radius:8px;padding:6px 12px;font-size:13px;cursor:pointer;font-weight:600';
    btn.onclick=function(){ if(window.__wbIDB) window.__wbIDB.restore(snap); bar.remove(); if(window.__wbOnRemote) window.__wbOnRemote(); };
    var close=document.createElement('button'); close.textContent='×'; close.style.cssText='margin-left:auto;background:transparent;border:0;color:#fff;font-size:20px;cursor:pointer;line-height:1';
    close.onclick=function(){ bar.remove(); };
    bar.appendChild(label); bar.appendChild(btn); bar.appendChild(close); document.body.appendChild(bar);
  };
  // 云端「量化 Alpha 研究」永久锁定（只显示标题，不提供展开入口）；本地保持正常展开
  (function(){
    var isCloud=location.hostname.indexOf('github.io')>=0||location.hostname.indexOf('netlify')>=0;
    if(!isCloud)return;
    var c=document.getElementById('quantContent');
    var badge=document.getElementById('quantLockBadge');
    var cb=document.getElementById('quantCollapseBtn');
    var eb=document.getElementById('quantExpandBtn');
    if(c)c.style.display='none';
    if(badge)badge.style.display='inline';
    if(cb)cb.style.display='none';
    if(eb)eb.style.display='none';
  })();
  /* 视图错误边界 viewGuard/viewFallback 已迁 src/view-guard.js，由 main.js boot() 桥接 window
     （见上 __wbInitViews 延迟逻辑：监听 main.js 派发的 wb:ready 事件后才执行视图包裹）。 */
  // #15 共享 helper 收口：供 ESM 模块（research-hub 等）复用，避免每个模块各带一份 $/esc/...
  // 这些 helper 仍在 app-main 闭包内定义，此处统一挂出供 boot 后的模块取用。
  // renderAll 是公开的全量重渲染入口；data-io 集群（导入/清空）需跨闭包调用，故在此桥接 window。
  window.renderAll = renderAll;
  window.WBUtil = {
    esc: esc, toast: toast, $: $, openModal: openModal, closeModals: closeModals,
    uid: uid, today: today, daysTo: daysTo, ymd: ymd,
    // todayItems 已随 renderToday 集群迁至 src/today.js，由 initToday() 回写本对象（hero.js 经 U.todayItems()[0] 取焦点任务）
    $$: $$, fmt: fmt, attrSafe: attrSafe, getDualPunch: getDualPunch, saveDualPunch: saveDualPunch, safeUrl: safeUrl
  };
})();
