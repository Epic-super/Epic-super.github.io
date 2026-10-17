// src/pet-lazy.js — 桌宠脚本按需懒加载（性能优化 2026-09-22）
// 背景：pet-core(578行) + amadeus-core(646行) + pet-voice/chat + amadeus-llm/catalog + atri-host
//       原为 index.html 的 <script defer> 全量首屏加载 → 即使桌宠从未打开也下载+解析+执行，
//       拖慢首屏就绪与主线程，打开桌宠时更卡。
// 本模块：把桌宠脚本从「首屏全加载」改为「用户首次打开角色栏/对应桌宠时才动态注入」。
//        首屏零桌宠 JS；仅首次打开有短暂加载，换来平时流畅。
// 兼容：各 core 脚本自带 `readyState==='loading'?addEventListener:init()` 兜底，
//      动态加载（DOMContentLoaded 已过）时会走 else init()，故时序安全。
//      依赖顺序保证：voice→core→chat；catalog/llm→core。
(function () {
  'use strict';

  // 各角色依赖的脚本清单（按加载顺序）。相对 index.html 根。
  // [path, 依赖它必须在前置已加载的 key]
  var PET_SCRIPTS = [
    // pet-voice-config.js 为本地语音配置（用户自建文件），仓库/公开站均不携带
    // （被 .gitignore 排除），在本地/公开站缺失属「正常态」→ 标记 optional，
    // 缺失不得阻断后续脚本加载（否则 voice/core/chat 全部连坐失效）。
    { key: 'pet-voice', src: 'pet/pet-voice-config.js', optional: true },
    { key: 'pet-voice', src: 'pet/pet-voice.js' },
    { key: 'pet-core', src: 'pet/pet-lines.js', after: ['pet-voice'] },
    { key: 'pet-core', src: 'pet/pet-core.js', after: ['pet-voice'] },
    { key: 'pet-chat', src: 'pet/pet-chat.js', after: ['pet-core'] }
  ];
  var AMADEUS_SCRIPTS = [
    { key: 'amadeus', src: 'amadeus/amadeus-lines.js' },
    { key: 'amadeus', src: 'amadeus/amadeus-catalog.js' },
    { key: 'amadeus', src: 'amadeus/amadeus-llm.js' },
    { key: 'amadeus', src: 'amadeus/amadeus-core.js', after: ['amadeus'] }
  ];
  var ATRI_SCRIPTS = [
    { key: 'atri', src: 'atri/atri-host.js' }
  ];

  var loaded = {};   // src -> true，防重复

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      if (loaded[src]) return resolve();
      var s = document.createElement('script');
      s.src = src;
      s.defer = true;   // 与原生 defer 语义一致
      s.onload = function () { loaded[src] = true; resolve(); };
      s.onerror = function () { reject(new Error('脚本加载失败: ' + src)); };
      document.body.appendChild(s);
    });
  }

  // 顺序加载一组脚本；跳过已加载的。逐项容错：任何单项失败都不中断后续链，
  // optional 项（如本地语音配置）缺失属正常态，仅 info 记录，不 reject 整组。
  function loadGroup(group) {
    return group.reduce(function (chain, item) {
      return chain.then(function () {
        return loadScript(item.src).catch(function (err) {
          if (item.optional) console.info('[pet-lazy] 可选脚本未提供（本地未配置语音 key 属正常）:', item.src);
          else console.warn('[pet-lazy]', err && err.message);
        });
      });
    }, Promise.resolve());
  }

  // 打开角色组。首次点击时 core 尚未加载，原始 click 不会触发 core 的 toggle，
  // 故脚本加载完成后「补派」一次真实 click 让 core 把角色打开；此后 core 已接管
  // 点击，用 _ready 短路，避免每次点击都多补派一次造成「打开即关闭 / 关不掉」的双触发反相。
  function openGroup(group, cardSel) {
    if (group._ready) return;                        // 已就绪：交给 core 原生 toggle，补派 0 次
    if (group._loading) { group._pending = cardSel || group._pending; return; } // 加载途中点击：记住待打开卡片，不丢
    group._loading = true;
    loadGroup(group)
      .then(function () {
        group._ready = true;                         // 先置位就绪，此后再点必短路
        // 优先调用引擎暴露的 open 钩子，避免依赖补派 click 冒泡到角色栏（与 dock 收起竞态）
        var api = group === AMADEUS_SCRIPTS ? window.Amadeus
                : group === ATRI_SCRIPTS ? window.ATRI
                : group === PET_SCRIPTS ? window.Pet : null;
        if (api && typeof api.open === 'function') { api.open(); return; }
        // 兜底：未暴露钩子的引擎仍走补派 click
        var sel = group._pending || cardSel;         // 兜住加载途中点的具体角色
        var card = sel ? document.getElementById(sel) : null;
        if (card) {
          try { card.dispatchEvent(new MouseEvent('click', { bubbles: true })); } catch (e) { try { card.click(); } catch (_2) {} }
        }
      })
      .catch(function (err) { console.warn('[pet-lazy]', err && err.message); })
      .finally(function () { group._loading = false; group._pending = null; });
  }

  function bind(sel, group, cardSel) {
    var el = document.getElementById(sel);
    if (!el) return;
    el.addEventListener('click', function () { openGroup(group, cardSel); }, { once: false });
  }

  // 打开角色栏时预热蕾娜（最常见），点具体角色再加载该角色
  var navChars = document.getElementById('navCharacters');

  bind('navPet', PET_SCRIPTS, 'navPet');
  bind('navAmadeus', AMADEUS_SCRIPTS, 'navAmadeus');
  bind('navAtri', ATRI_SCRIPTS, 'navAtri');

  // 角色栏展开即预热全部角色引擎（仅加载脚本，不自动打开），
  // 消除首次点击具体角色时的懒加载延迟；打开仍由懒加载完成后触发。
  if (navChars) {
    navChars.addEventListener('click', function () {
      loadGroup(PET_SCRIPTS);
      loadGroup(AMADEUS_SCRIPTS);
      loadGroup(ATRI_SCRIPTS);
    });
  }
})();
