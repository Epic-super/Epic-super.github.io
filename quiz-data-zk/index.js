/* =========================================================================
 * quiz-data-zk/index.js — 智能化题库 22 科（分片版）
 *
 * 由 quiz-data-zk.js（5.2MB 单文件）拆分而来，目的：**首屏不再整包下发**。
 *   原状：zk-ky.html 直接 <script src="quiz-data-zk.js"> → 5.2MB 同步解析，实测 ~254ms。
 *   现状：本文件只有科目清单（约 2.3 KB），题目按科目按需拉取。
 *
 * 契约保持不变（所以 zk-ky.html 里 20 处 `QUIZ.data[k]` 一行都不用改）：
 *   window.QUIZ_ZK = { subjects, data }
 *   其中 data 是**惰性对象**：读 data[key] 时若该科目尚未加载，返回已缓存的部分，
 *   并触发异步加载；加载完成后通过 wbQuizZkReady(key) 通知。
 *
 * 需要全量的地方（aggStats / aggStatsBySub / weakReport 三个统计函数会
 * Object.keys(QUIZ.data) 全表遍历）走 ensureAll()，一次性补齐全部科目。
 *
 * 分片路径相对本文件：quiz-data-zk/<key>.js
 * ========================================================================= */
(function(){
  'use strict';
  /* 分片基址：从**本脚本自身的 URL** 推导，而不是写死相对文档的路径。
     写死 'quiz-data-zk/' 在「HTML 与 index.js 同源目录引用」时正确，但一旦哪天
     换个目录/换个页面引用（或经 <base> 影响），相对文档的解析就会指错位置 →
     所有分片 404 → 表现为「切到任何科目都没有题目」。
     用 document.currentScript 拿绝对 URL 再取目录，最稳。 */
  var BASE = (function(){
    try{
      var s = document.currentScript;
      if(!s){
        /* 兼容：某些异步场景 currentScript 为 null，退回扫 <script> 里包含本文件的那个 */
        var all = document.getElementsByTagName('script');
        for(var i=all.length-1;i>=0;i--){ if(/quiz-data-zk\/index\.js/.test(all[i].src)){ s=all[i]; break; } }
      }
      if(s && s.src) return s.src.replace(/\?.*$/,'').replace(/index\.js$/,'');
    }catch(e){}
    return 'quiz-data-zk/';    /* 兜底：与旧行为一致 */
  })();
  var VER = '1.0.275';                       /* 版本指纹，随发布 bump */

  window.QUIZ_ZK_DATA = window.QUIZ_ZK_DATA || {};

  var SUBJECTS = [{"key":"ai13011","name":"人工智能与大数据(13011)","group":"自考","exam":"人工智能与大数据(13011)"},{"key":"cpp04737","name":"C++程序设计(04737)","group":"自考","exam":"C++程序设计(04737)"},{"key":"cs02325","name":"计算机系统结构(02325)","group":"自考","exam":"计算机系统结构(02325)"},{"key":"csp13015","name":"计算机系统原理(13015)","group":"自考","exam":"计算机系统原理(13015)"},{"key":"db04735","name":"数据库系统原理(04735)","group":"自考","exam":"数据库系统原理(04735)"},{"key":"dba13170","name":"数据库及其应用(13170)","group":"自考","exam":"数据库及其应用(13170)"},{"key":"disc02324","name":"离散数学(02324)","group":"自考","exam":"离散数学(02324)"},{"key":"ds02331","name":"数据结构(02331)","group":"自考","exam":"数据结构(02331)"},{"key":"ds13181","name":"数据结构(13181)","group":"自考","exam":"数据结构(13181)"},{"key":"dsa13003","name":"数据结构与算法(13003)","group":"自考","exam":"数据结构与算法(13003)"},{"key":"eng00015","name":"英语二(00015)","group":"自考","exam":"英语（二）(00015)"},{"key":"eng13000","name":"英语专升本(13000)","group":"自考","exam":"英语（专升本）(13000)"},{"key":"java13215","name":"Java语言程序设计(13215)","group":"自考","exam":"Java语言程序设计(13215)"},{"key":"math00023","name":"高等数学工本(00023)","group":"自考","exam":"高等数学（工本）(00023)"},{"key":"mh15043","name":"中国近现代史纲要(15043)","group":"自考","exam":"中国近现代史纲要(15043)"},{"key":"mk15044","name":"马克思主义基本原理(15044)","group":"自考","exam":"马克思主义基本原理(15044)"},{"key":"net","name":"计算机网络与信息安全","group":"自考","exam":"计算机网络与信息安全"},{"key":"net04741","name":"计算机网络原理(04741)","group":"自考","exam":"计算机网络原理"},{"key":"os02326","name":"操作系统(02326)","group":"自考","exam":"操作系统(02326)"},{"key":"os13180","name":"操作系统(13180)","group":"自考","exam":"操作系统(13180)"},{"key":"se","name":"软件工程","group":"自考","exam":"软件工程"},{"key":"xi15040","name":"习近平新时代中国特色社会主义思想概论(15040)","group":"自考","exam":"习近平新时代中国特色社会主义思想概论(15040)"}];
  var COUNTS   = {"ai13011":500,"cpp04737":143,"cs02325":300,"csp13015":439,"db04735":295,"dba13170":298,"disc02324":600,"ds02331":339,"ds13181":213,"dsa13003":305,"eng00015":35,"eng13000":63,"java13215":427,"math00023":416,"mh15043":313,"mk15044":1258,"net":414,"net04741":574,"os02326":531,"os13180":514,"se":772,"xi15040":717};

  /* 已加载的科目：key -> true */
  var loaded = {};
  /* 已注入 public data 的科目（幂等标记，防重复 concat 导致题数翻倍） */
  var injected = {};
  /* 在途的加载：key -> promise */
  var pending = {};
  /* 全局就绪回调（ensureAll 用） */
  var allCbs = [];

  function scriptUrl(key){
    return BASE + key + '.js' + (VER ? ('?v=' + VER) : '');
  }

  function loadOne(key){
    if (loaded[key] || !(key in COUNTS)) return Promise.resolve(false);
    if (pending[key]) return pending[key];
    pending[key] = new Promise(function(resolve){
      var s = document.createElement('script');
      s.src = scriptUrl(key);
      s.async = true;
      s.onload = function(){
        loaded[key] = true; delete pending[key];
        var arr = (window.QUIZ_ZK_DATA || {})[key] || [];
        /* 注入到 public data 上，供既有代码直接读 QUIZ.data[key]。
           幂等：若该科目已注入过（重复调用 load），不重复 concat，否则题数翻倍。 */
        if (!injected[key]) {
          injected[key] = true;
          QUIZ_ZK.data[key] = (QUIZ_ZK.data[key] || []).concat(arr);
        }
        if (typeof window.wbQuizZkReady === 'function') window.wbQuizZkReady(key);
        resolve(true);
      };
      s.onerror = function(){
        delete pending[key];
        if (typeof window.wbQuizZkError === 'function') window.wbQuizZkError(key);
        resolve(false);
      };
      document.head.appendChild(s);
    });
    return pending[key];
  }

  /* data：惰性代理 —— 读到未加载科目时先返回空数组并触发生成加载。
     这样既有代码 `(QUIZ.data[k]||[]).forEach(...)` 不会崩，只是首帧为空，
     加载完成后由调用方（或 wbQuizZkReady）重渲染。 */
  var cache = {};
  var data = new Proxy(cache, {
    get: function(t, prop){
      if (typeof prop !== 'string') return t[prop];
      if (!(prop in t) && (prop in COUNTS)){ loadOne(prop); }
      return t[prop];
    },
    has: function(t, prop){ return prop in t; },
    set: function(t, prop, val){ t[prop] = val; return true; },
    ownKeys: function(t){ return Reflect.ownKeys(t); },
    getOwnPropertyDescriptor: function(t, prop){
      var d = Object.getOwnPropertyDescriptor(t, prop);
      if (d) return d;
      /* ⚠️ 实测踩坑：不存在的键必须回 configurable:true + writable:true。
         否则分片加载回来执行 `QUIZ_ZK.data[key] = [...]` 会抛
         "Cannot redefine property"，注入静默失败、题目永远为空。 */
      return { configurable: true, enumerable: true, writable: true, value: undefined };
    }
  });

  var QUIZ_ZK = window.QUIZ_ZK = {
    subjects: SUBJECTS,
    data: data,
    _counts: COUNTS,          /* 各科题数（清单期即可知，统计可先用它显示总量） */
    _loaded: loaded,
    load: loadOne,            /* 主动加载某科 */
    ensure: function(keys){ return Promise.all((keys || []).map(loadOne)); },
    ensureAll: function(){
      /* 统计类功能需要全量：并发补齐所有未加载科目 */
      var keys = Object.keys(COUNTS).filter(function(k){ return !loaded[k]; });
      if (!keys.length) return Promise.resolve(true);
      return Promise.all(keys.map(loadOne));
    },
    ready: function(cb){
      if (typeof cb === 'function'){
        var missing = Object.keys(COUNTS).filter(function(k){ return !loaded[k]; });
        if (!missing.length) { cb(); return; }
        allCbs.push(cb);
        QUIZ_ZK.ensureAll().then(function(){
          allCbs.forEach(function(f){ try{ f(); }catch(e){} });
          allCbs.length = 0;
        });
      }
    }
  };

  /* 预取：按科目分组是「切到某科才加载」，这里预热第一个科目，避免首帧空列表 */
  var first = SUBJECTS.length ? SUBJECTS[0].key : null;
  if (first && document.readyState !== 'loading') loadOne(first);
  else document.addEventListener('DOMContentLoaded', function(){ if (first) loadOne(first); });
})();
