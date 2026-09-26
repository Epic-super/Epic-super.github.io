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
      id:'lena', name:'蕾娜', desc:'PNG / 摄像头 / TTS', icon:'✦', kind:'png',
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
      id:'atri', name:'ATRI', desc:'Live2D / 图片兜底', icon:'◈', kind:'iframe',
      sel:'#atriWidget'
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
    var ch = find(id); if(!ch) return;
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
        ? '<img class="nav-ama-icon" src="' + c.icon + '" alt="">'
        : '<span class="character-card-icon">' + c.icon + '</span>';
      btn.innerHTML = iconHtml + '<span><b>' + c.name + '</b><small>' + c.desc + '</small></span>';
      list.appendChild(btn);
    });
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
