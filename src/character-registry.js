/* ===========================================================
   角色注册表 + 桌宠定制面板 · 数据驱动的角色管理
   —— 「可随意定制桌宠」的底座：加角色 = 加一条配置，不改引擎代码。

   设计原则：
   1. 只做「注册 + 参数 + 面板」，不接管各角色自己的引擎
      （蕾娜 pet-core.js / Amadeus amadeus-core.js / ATRI atri-host.js 均不动）；
   2. 参数一律作用于角色「根容器」的 CSS（transform / opacity），
      不侵入引擎内部，任何角色引擎升级都不会被本文件拖累；
   3. 新增角色三步：
        ① 放好资源（图片 / Live2D 模型 / 或纯 HTML 子页）
        ② 在下方 CHARS 里追加一条（至少 id/name/desc/icon/sel）
        ③ 若角色有自己的引擎脚本，在 index.html 里照常引入
      本文件会自动渲染卡片、接管参数、写入定制面板。
   =========================================================== */
(function(){
  'use strict';

  var STORE_KEY = 'wb_chars_prefs';
  var POS_KEYS  = { lena:'wb_pet_pos', amadeus:'wb_amadeus_pos', atri:'wb_atri_pos' };

  /* ---------- 角色清单（唯一的「真相源」） ----------
     sel   : 角色根容器选择器（必须有，参数作用于它）
     kind  : png / live2d / iframe / custom（仅作展示与筛选，不影响逻辑）
     voice : 可选，{get,set} 供面板显示与切换该角色语音开关          */
  var CHARS = [
    {
      id:'lena', name:'蕾娜', desc:'PNG / 摄像头 / TTS', icon:'pet/assets/lena-neutral.png?v=2', kind:'png',
      sel:'#petWidget',
      voice:{
        get:function(){ return !!(window.PET_VOICE && window.PET_VOICE.enabled()); },
        set:function(v){ if(window.PET_VOICE && window.PET_VOICE.setEnabled) window.PET_VOICE.setEnabled(!!v); }
      }
    },
    {
      id:'amadeus', name:'Amadeus', desc:'Live2D / 反应语音 / 对话', icon:'amadeus/assets/amadeus-icon.png',
      kind:'live2d', sel:'#amadeusWidget'
    },
    {
      id:'atri', name:'ATRI', desc:'Live2D / 图片兜底', icon:'assets/pet-atri.png?v=2', kind:'iframe',
      sel:'#atriWidget'
    },
    {
      /* external 角色：不是页内桌宠，点击弹外部项目安装指南（无 sel，不参与参数/定位）。
         2026-10-27 接入：Open-LLM-VTuber —— star 最多、原生支持 DeepSeek 的开源 AI 桌宠
         （Live2D + 语音 + 桌面透明窗，Win/macOS/Linux/Android，DeepSeek 走 OpenAI 兼容接口）。 */
      id:'dspt', name:'DeepSeek 桌宠', desc:'外部应用 · Open-LLM-VTuber', icon:'assets/pet-ds.png?v=2', kind:'external', sel:null
    }
    /* 示例：新增角色（把 □□ 换成实际内容后取消注释即可）
    ,{
      id:'nao', name:'友利奈绪', desc:'Live2D / 电波少女', icon:'nao/assets/nao-icon.png',
      kind:'live2d', sel:'#naoWidget'
    }
    */
  ];

  /* ---------- 参数存取 ---------- */
  function loadPrefs(){
    try{ return JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {}; }catch(_){ return {}; }
  }
  function savePrefs(p){
    try{ localStorage.setItem(STORE_KEY, JSON.stringify(p)); }catch(_){}
  }
  var prefs = loadPrefs();

  function getPref(id){
    var d = { scale:1, opacity:1 };
    var p = prefs[id] || {};
    return { scale: p.scale == null ? d.scale : p.scale,
             opacity: p.opacity == null ? d.opacity : p.opacity };
  }
  function setPref(id, key, val){
    prefs[id] = prefs[id] || {};
    prefs[id][key] = val;
    savePrefs(prefs);
    apply(id);
  }

  /* ---------- 参数应用（唯一副作用点） ---------- */
  function apply(id){
    var ch = find(id); if(!ch || !ch.sel) return;   // external 角色无容器（sel:null）→ 静默跳过
    var el = document.querySelector(ch.sel);
    if(!el) return;                       // 角色未创建（引擎懒加载）→ 静默跳过
    var p = getPref(id);
    el.style.transformOrigin = 'bottom right';
    el.style.transform = (p.scale !== 1) ? 'scale(' + p.scale + ')' : '';
    el.style.opacity = (p.opacity !== 1) ? String(p.opacity) : '';
  }
  function applyAll(){ CHARS.forEach(function(c){ apply(c.id); }); }

  function find(id){
    for(var i=0;i<CHARS.length;i++){ if(CHARS[i].id === id) return CHARS[i]; }
    return null;
  }
  function resetPos(id){
    var k = POS_KEYS[id];
    try{ if(k) localStorage.removeItem(k); }catch(_){}
  }

  /* ---------- 卡片渲染（接管 #characterDockList） ---------- */
  function renderCards(){
    var list = document.querySelector('#characterDock .character-dock-list');
    if(!list) return;
    // 保留原有三个按钮的 id（navPet / navAmadeus / navAtri），其它引擎按 id 绑定
    var IDMAP = { lena:'navPet', amadeus:'navAmadeus', atri:'navAtri' };
    list.innerHTML = '';
    CHARS.forEach(function(c){
      var btn = document.createElement('button');
      btn.id = IDMAP[c.id] || ('navChar_' + c.id);
      btn.className = 'character-card';
      btn.type = 'button';
      btn.title = c.name + ' · ' + c.desc;
      var iconHtml = (/[\/.]/.test(c.icon))
        // 显式尺寸 + 异步解码：避免角色卡图片加载时的布局跳动（CLS）
        ? '<img class="nav-ama-icon" src="' + c.icon + '" alt="" width="32" height="32" decoding="async">'
        : '<span class="character-card-icon">' + c.icon + '</span>';
      btn.innerHTML = iconHtml + '<span><b>' + c.name + '</b><small>' + c.desc + '</small></span>';
      if (c.kind === 'external') {
        // 外部角色：优先直连本机服务，未运行才弹指南（2026-10-30 修「点开是 GitHub 跳转」）
        btn.addEventListener('click', function(){ openDeepSeekPet(); });
        // ⚙ Key 配置入口（2026-10-30 新需求：界面填写自定义 Key，免改 conf.yaml）
        var wrap=document.createElement('div');
        wrap.style.cssText='position:relative';
        btn.style.width='100%';
        var gear=document.createElement('button');
        gear.type='button';
        gear.id='navChar_dspt_cfg';
        gear.textContent='⚙';
        gear.title='配置 DeepSeek API Key';
        gear.style.cssText='position:absolute;right:6px;top:6px;width:24px;height:24px;border-radius:7px;border:1px solid rgba(167,231,231,.4);background:rgba(8,28,45,.6);color:#a7e7e7;font-size:12px;cursor:pointer;z-index:2';
        gear.addEventListener('click',function(e){ e.stopPropagation(); openDeepSeekConfig(); });
        list.appendChild(wrap); wrap.appendChild(btn); wrap.appendChild(gear);
        return;
      }
      list.appendChild(btn);
    });
  }

  /* ---------- DeepSeek Key 配置弹层（2026-10-30）：复制 Key + 下载静态补丁 ---------- */
  var PET_KEY_STORAGE='wb_pet_key_v1';
  function petKeyGet(){ try{ return JSON.parse(localStorage.getItem(PET_KEY_STORAGE)||'null'); }catch(e){ return null; } }
  function petKeySet(k){ try{ localStorage.setItem(PET_KEY_STORAGE, JSON.stringify({ key:k, at:new Date().toISOString() })); }catch(e){} }
  function openDeepSeekConfig(){
    var ov=document.getElementById('wbPetKeyMask');
    if(ov){ ov.hidden=false; return; }
    var saved=petKeyGet();
    ov=document.createElement('div');
    ov.id='wbPetKeyMask';
    ov.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(10,12,20,.55);display:flex;align-items:center;justify-content:center;padding:18px';
    ov.innerHTML=
      '<div role="dialog" aria-label="DeepSeek Key 配置" style="background:var(--card,#fff);color:var(--text,#1d2723);border-radius:16px;max-width:520px;width:100%;max-height:86vh;overflow:auto;padding:18px 20px;box-shadow:0 24px 60px rgba(0,0,0,.4)">'+
        '<div style="display:flex;align-items:center;gap:9px"><span style="font-size:20px">🔑</span>'+
        '<b style="font-size:15px;flex:1">DeepSeek 桌宠 · Key 配置</b>'+
        '<button type="button" id="wbPetKeyClose" style="border:1px solid var(--border,#e3e8e4);background:none;color:inherit;border-radius:8px;width:28px;height:28px;cursor:pointer;font-size:14px">✕</button></div>'+
        '<label style="display:block;font-size:12px;color:var(--muted,#6b7d76);margin:12px 0 5px">DeepSeek API Key（sk-...，仅存本机浏览器，绝不上传）</label>'+
        '<input type="password" id="wbPetKeyValue" placeholder="sk-..." style="width:100%;box-sizing:border-box;border:1px solid var(--border,#e3e8e4);border-radius:10px;padding:9px 11px;font-family:Consolas,monospace;font-size:13px;background:var(--input-bg,#fff);color:var(--text,#1d2723)">'+
        '<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">'+
          '<button type="button" id="wbPetKeyCopy" style="border:1px solid var(--border,#e3e8e4);background:var(--panel2,#f3f7f4);color:var(--text,#1d2723);border-radius:10px;padding:9px 15px;font-weight:700;cursor:pointer">📋 复制 Key 到剪贴板</button>'+
          '<button type="button" id="wbPetKeyGen" style="border:none;background:var(--primary,#0f9d77);color:#fff;border-radius:10px;padding:9px 15px;font-weight:700;cursor:pointer">⬇ 下载配置补丁脚本</button>'+
        '</div>'+
        '<div style="font-size:12px;color:var(--muted,#6b7d76);line-height:1.7;margin-top:12px">'+
          '<b>用法</b>：①粘贴 Key → 点「复制 Key 到剪贴板」→ ②点「下载配置补丁脚本」→ ③<b>双击运行</b>下载的 <b>deepseek-key-patch.ps1</b>（自动从剪贴板取 Key 改写 conf.yaml 并重启桌宠）→ ④回到桌宠对话页即可对话。<br>'+
          '<b>备选</b>：桌宠网页左上角 ⚙ 设置里也有 Key 输入（即时生效；写入 conf.yaml 用补丁脚本）。<br>'+
          '⚠️ 补丁脚本从本机剪贴板读 Key，不联网上传；跑完可删除。'+
        '</div>'+
      '</div>';
    document.body.appendChild(ov);
    if(saved&&saved.key) ov.querySelector('#wbPetKeyValue').value=saved.key;
    ov.addEventListener('click',function(e){ if(e.target===ov) ov.hidden=true; });
    ov.querySelector('#wbPetKeyClose').addEventListener('click',function(){ ov.hidden=true; });
    ov.querySelector('#wbPetKeyValue').addEventListener('change',function(){ petKeySet(ov.querySelector('#wbPetKeyValue').value.trim()); });
    ov.querySelector('#wbPetKeyCopy').addEventListener('click',function(){
      var k=ov.querySelector('#wbPetKeyValue').value.trim();
      if(!k){ toastPet('先粘贴 Key'); return; }
      petKeySet(k);
      function ok(){ toastPet('已复制到剪贴板 ✓'); }
      function fb(){
        var ta=document.createElement('textarea');ta.value=k;document.body.appendChild(ta);ta.select();
        try{ document.execCommand('copy'); ok(); }catch(e){ toastPet('复制失败，请手动复制'); }
        ta.remove();
      }
      if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(k).then(ok,fb); else fb();
    });
    ov.querySelector('#wbPetKeyGen').addEventListener('click',function(){
      var k=ov.querySelector('#wbPetKeyValue').value.trim();
      if(k) petKeySet(k);
      fetch('deepseek-key-patch.ps1',{cache:'no-store'})
        .then(function(r){ if(!r.ok) throw 0; return r.text(); })
        .then(function(txt){
          var blob=new Blob([txt],{type:'text/plain'});
          var a=document.createElement('a');
          a.href=URL.createObjectURL(blob);
          a.download='deepseek-key-patch.ps1';
          document.body.appendChild(a); a.click(); a.remove();
          setTimeout(function(){ URL.revokeObjectURL(a.href); },1500);
          toastPet('补丁已下载——按弹层里的 ①②③ 走');
        })
        .catch(function(){ toastPet('补丁下载失败，请刷新重试'); });
    });
  }
  function toastPet(m){ if(window.WBUtil&&window.WBUtil.toast) window.WBUtil.toast(m); else console.log('[pet]',m); }

  /* ---------- DeepSeek 桌宠直连：探测 12393 → 开桌宠 UI；未运行 → 指南 ---------- */
  function openDeepSeekPet(){
    function toastMsg(m){ if(window.WBUtil&&window.WBUtil.toast) window.WBUtil.toast(m); else console.log('[pet]',m); }
    /* 两级策略（2026-10-30）：
       ① 手势内直接 window.open 桌宠 UI —— 服务运行中（常态）100% 直接打开；
       ② open 被拦/返回 null（IAB 等托管容器）→ fetch 探测，运行中也尝试导航，
          彻底失败才回退启动指引。fetch 探测会被工作台 SW 拦截跨源请求，故不作为主路径。 */
    var url='http://127.0.0.1:12393/';
    var win=null;
    try{ win=window.open(url,'_blank'); }catch(e){}
    if(win){ toastMsg('已连接 DeepSeek 桌宠（新标签页）'); return; }
    fetch(url,{mode:'no-cors',cache:'no-store',signal:(typeof AbortSignal!=='undefined'&&AbortSignal.timeout)?AbortSignal.timeout(2500):undefined})
      .then(function(){ toastMsg('桌宠服务在线——请在浏览器地址栏打开 '+url+'（当前容器拦截了新标签页）'); })
      .catch(function(){ openExternalCard({name:'DeepSeek 桌宠',desc:'外部应用 · Open-LLM-VTuber'}); toastMsg('桌宠服务未运行——双击桌面「DeepSeek桌宠」启动'); });
  }
  /* ---------- external 角色弹层（自包含，不依赖 modalDyn） ---------- */
  function openExternalCard(c){
    var ov = document.getElementById('wbExtCharMask');
    if (ov) { ov.hidden = false; return; }
    ov = document.createElement('div');
    ov.id = 'wbExtCharMask';
    ov.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(10,12,20,.55);display:flex;align-items:center;justify-content:center;padding:18px';
    ov.innerHTML =
      '<div role="dialog" aria-label="' + c.name + '" style="background:var(--card,#fff);color:var(--text,#1d2723);border-radius:16px;max-width:520px;width:100%;max-height:86vh;overflow:auto;padding:18px 20px;box-shadow:0 24px 60px rgba(0,0,0,.4)">' +
        '<div style="display:flex;align-items:center;gap:9px"><span style="font-size:24px">🤖</span>' +
        '<b style="font-size:16px;flex:1">DeepSeek 桌宠 · Open-LLM-VTuber</b>' +
        '<button type="button" id="wbExtCharClose" style="border:1px solid var(--border,#e3e8e4);background:none;color:inherit;border-radius:8px;width:28px;height:28px;cursor:pointer;font-size:14px">✕</button></div>' +
        '<p style="font-size:12.5px;color:var(--muted,#6b7d76);margin:8px 0 0">✅ <b>已安装到本机 <本地路径></b>（Open-LLM-VTuber，14439★；Live2D + 语音可打断 + 桌面透明窗，本地运行）。</p>' +
        '<div style="font-size:13px;line-height:1.8;margin-top:10px">' +
          '<b>激活三步</b>：①环境依赖已由 uv 自动装配（首次启动如再补依赖会自动进行）→ ②用记事本打开 <code><本地路径></code>，把 deepseek_llm 段的 llm_api_key 改成你的 DeepSeek Key → ' +
          '③改 <code>conf.yaml</code> 填 DeepSeek Key（api_base <code>https://api.deepseek.com/v1</code>，model <code>deepseek-chat</code>）→ ③双击桌面「DeepSeek桌宠」快捷方式（或 <本地路径>，浏览器打开 http://127.0.0.1:12393 即对话，客户端可切桌宠透明窗模式。' +
        '</div>' +
        '<p style="font-size:12.5px;color:var(--muted,#6b7d76);margin:10px 0 0">与蕾娜 / Amadeus / ATRI 并存不冲突：它独立成窗，不占用塔台的角色引擎；想收起就点它的托盘图标。</p>' +
        '<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">' +
          '<a href="https://github.com/Open-LLM-VTuber/Open-LLM-VTuber" target="_blank" rel="noopener" style="background:var(--primary,#0f9d77);color:#fff;text-decoration:none;border-radius:10px;padding:9px 15px;font-size:13px;font-weight:700">GitHub 仓库 ↗</a>' +
          '<a href="https://open-llm-vtuber.github.io/docs/quickstart" target="_blank" rel="noopener" style="border:1px solid var(--border,#e3e8e4);color:inherit;text-decoration:none;border-radius:10px;padding:9px 15px;font-size:13px;font-weight:700">官方文档 ↗</a>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ov);
    ov.addEventListener('click', function(e){ if (e.target === ov) ov.hidden = true; });
    ov.querySelector('#wbExtCharClose').addEventListener('click', function(){ ov.hidden = true; });
  }

  /* ---------- 定制面板 ---------- */
  function buildPanel(){
    var dock = document.getElementById('characterDock');
    if(!dock || document.getElementById('charPrefs')) return;
    var box = document.createElement('div');
    box.id = 'charPrefs';
    box.className = 'char-prefs';
    box.hidden = true;

    var rows = CHARS.map(function(c){
      if (c.kind === 'external') return '';   // 外部角色无页内容器，不参与大小/透明度定制
      var p = getPref(c.id);
      var voiceRow = c.voice
        ? '<label class="char-pref-inline"><input type="checkbox" data-act="voice" data-id="' + c.id + '"' +
          (c.voice.get() ? ' checked' : '') + '> 语音</label>'
        : '';
      return '<div class="char-pref-card" data-id="' + c.id + '">' +
        '<div class="char-pref-head"><b>' + c.name + '</b><span>' + c.desc + '</span></div>' +
        '<label class="char-pref-row"><span>大小</span>' +
          '<input type="range" min="60" max="160" step="5" value="' + Math.round(p.scale * 100) + '" data-act="scale" data-id="' + c.id + '">' +
          '<em data-val="scale-' + c.id + '">' + Math.round(p.scale * 100) + '%</em></label>' +
        '<label class="char-pref-row"><span>透明</span>' +
          '<input type="range" min="30" max="100" step="5" value="' + Math.round(p.opacity * 100) + '" data-act="opacity" data-id="' + c.id + '">' +
          '<em data-val="opacity-' + c.id + '">' + Math.round(p.opacity * 100) + '%</em></label>' +
        '<div class="char-pref-actions">' + voiceRow +
          '<button type="button" class="char-pref-btn" data-act="resetpos" data-id="' + c.id + '">复位位置</button>' +
          '<button type="button" class="char-pref-btn" data-act="reset" data-id="' + c.id + '">恢复默认</button>' +
        '</div></div>';
    }).join('');

    box.innerHTML =
      '<div class="char-prefs-head"><b>桌宠定制</b>' +
      '<button type="button" class="char-prefs-close" id="charPrefsClose" aria-label="关闭">×</button></div>' +
      '<p class="char-prefs-hint">调大小 / 透明度即时生效，自动记忆；拖动角色本体可改位置，位置不对就点「复位位置」。</p>' +
      rows +
      '<p class="char-prefs-foot">新增角色：在 src/character-registry.js 的 CHARS 里加一条（id / 名称 / 图标 / 容器选择器）即可。</p>';

    dock.appendChild(box);

    // 打开按钮：附在角色栏底部
    var openBtn = document.createElement('button');
    openBtn.type = 'button';
    openBtn.id = 'charPrefsOpen';
    openBtn.className = 'char-prefs-open';
    openBtn.textContent = '⚙ 定制桌宠';
    dock.appendChild(openBtn);
    openBtn.addEventListener('click', function(){ box.hidden = !box.hidden; });
    box.querySelector('#charPrefsClose').addEventListener('click', function(){ box.hidden = true; });

    // 面板内交互（事件委托）
    box.addEventListener('input', function(e){
      var t = e.target, act = t.getAttribute('data-act'), id = t.getAttribute('data-id');
      if(!act || !id) return;
      var v = Number(t.value);
      if(act === 'scale'){
        setPref(id, 'scale', v / 100);
        var em = box.querySelector('[data-val="scale-' + id + '"]'); if(em) em.textContent = v + '%';
      } else if(act === 'opacity'){
        setPref(id, 'opacity', v / 100);
        var em2 = box.querySelector('[data-val="opacity-' + id + '"]'); if(em2) em2.textContent = v + '%';
      }
    });
    box.addEventListener('change', function(e){
      var t = e.target;
      if(t.getAttribute('data-act') === 'voice'){
        var id = t.getAttribute('data-id'), ch = find(id);
        if(ch && ch.voice && ch.voice.set) ch.voice.set(t.checked);
      }
    });
    box.addEventListener('click', function(e){
      var t = e.target;
      var act = t.getAttribute && t.getAttribute('data-act');
      if(!act) return;
      var id = t.getAttribute('data-id');
      if(act === 'resetpos'){
        resetPos(id);
        if(window.WBUtil && window.WBUtil.toast) window.WBUtil.toast('位置已复位，刷新或重开该角色生效');
      } else if(act === 'reset'){
        prefs[id] = { scale:1, opacity:1 };
        savePrefs(prefs);
        apply(id);
        // 面板控件回弹到默认
        var card = box.querySelector('.char-pref-card[data-id="' + id + '"]');
        if(card){
          var sc = card.querySelector('[data-act="scale"]'), op = card.querySelector('[data-act="opacity"]');
          if(sc){ sc.value = 100; } if(op){ op.value = 100; }
          var s1 = box.querySelector('[data-val="scale-' + id + '"]'); if(s1) s1.textContent = '100%';
          var s2 = box.querySelector('[data-val="opacity-' + id + '"]'); if(s2) s2.textContent = '100%';
        }
      }
    });
  }

  /* ---------- 初始化 ----------
     角色容器是懒创建的（引擎脚本运行后才出现），故参数在
     wb:ready 与角色首次显示后各应用一次，并挂轻量轮询兜底。 */
  function init(){
    renderCards();
    buildPanel();
    applyAll();
    // 轻量兜底：容器出现后补应用（最多 20 次 × 1s，之后交回事件驱动）
    var tries = 0;
    var timer = setInterval(function(){
      applyAll();
      if(++tries >= 20) clearInterval(timer);
    }, 1000);
    document.addEventListener('visibilitychange', function(){
      if(!document.hidden) applyAll();
    });
  }

  /* 立即执行（不延迟到 DOMContentLoaded）——关键时序约束：
     本文件在 index.html 里紧跟角色栏 HTML、且先于三个角色引擎加载。
     必须在这里同步渲染完卡片，pet-core / amadeus-core / atri-host 随后
     才能绑定到「最终」元素上。若延迟到 DOMContentLoaded，引擎会先绑旧元素、
     本文件再整体替换 innerHTML → 三个角色点击全部失效（已踩过此坑）。 */
  init();
  if(window.addEventListener) window.addEventListener('wb:ready', applyAll);

  window.WB_CHARACTERS = {
    list: CHARS,
    prefs: loadPrefs,
    apply: apply,
    applyAll: applyAll,
    add: function(cfg){           // 运行时注册新角色（供扩展/调试）
      if(!cfg || !cfg.id || !cfg.sel) return null;
      CHARS.push(cfg); renderCards(); return cfg;
    }
  };
})();
