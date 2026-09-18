/* src/state.js — #8 共享状态外置（spine）
 * 把 app-main.js IIFE 闭包内的共享可变状态 state/bridge 与其持久化
 * (load/save/normalizeState/loadBridge) 抽到独立 classic 脚本，挂 window.WBState，
 * 供剩余 classic 的 app-main 与未来 ESM 功能模块共用。
 * 约定：state / bridge 是 WBState 的「单一真相源属性」，save()/normalizeState() 一律读写
 *       WBState.state / WBState.bridge；app-main 用别名读取，重赋值点回写 WBState.*。
 * 与 lib/store.js（window.WBStore）同构：classic 脚本挂全局，file:// 双击可用、零构建。
 */
(function (global) {
  'use strict';
  var KEY = "wb_hub_";

  // seed 字面量用到，补进本模块（原在 app-main，外置后必须随 state 一并迁移）
  function ymd(d){ d=d||new Date(); var y=d.getFullYear(),m=("0"+(d.getMonth()+1)).slice(-2),da=("0"+d.getDate()).slice(-2); return y+"-"+m+"-"+da; }
  function shift(days){var d=new Date();d.setDate(d.getDate()+days);return ymd(d);}

  var COURSES = [
    {c:'15040',n:'习近平新时代中国特色社会主义思想概论',cr:3,g:'公共基础',t:'必考',slot:1,ky:'政治'},
    {c:'15043',n:'中国近现代史纲要',cr:2,g:'公共基础',t:'必考',slot:1,ky:'政治'},
    {c:'13000',n:'英语(专升本)',cr:7,g:'公共基础',t:'必考',slot:1,ky:'英语一'},
    {c:'02324',n:'离散数学',cr:4,g:'公共基础',t:'必考',slot:1,ky:''},
    {c:'15044',n:'马克思主义基本原理概论',cr:4,g:'公共基础',t:'必考',slot:2,ky:'政治'},
    {c:'00023',n:'高等数学(工本)',cr:10,g:'公共基础',t:'必考',slot:2,ky:'数学一'},
    {c:'13180',n:'操作系统',cr:4,g:'核心专业',t:'必考',slot:2,ky:'408'},
    {c:'13005',n:'软件工程',cr:3,g:'其他专业',t:'必考',slot:2,ky:''},
    {c:'13215',n:'Java语言程序设计',cr:3,g:'其他专业',t:'必考',slot:3,ky:''},
    {c:'13003',n:'数据结构与算法',cr:4,g:'核心专业',t:'必考',slot:3,ky:'408'},
    {c:'04737',n:'C++程序设计',cr:3,g:'核心专业',t:'必考',slot:3,ky:''},
    {c:'13015',n:'计算机系统原理',cr:4,g:'核心专业',t:'必考',slot:3,ky:'408'},
    {c:'13017',n:'计算机网络与信息安全',cr:6,g:'其他专业',t:'必考',slot:4,ky:'408'},
    {c:'13175',n:'线性代数(工)',cr:3,g:'其他专业',t:'必考',slot:4,ky:'数学一'},
    {c:'13170',n:'数据库及其应用',cr:4,g:'其他专业',t:'必考',slot:4,ky:''},
    {c:'02318',n:'计算机组成原理',cr:4,g:'加考',t:'加考',slot:4,ky:'408'},
    {c:'13011',n:'人工智能与大数据',cr:6,g:'选考',t:'选考',slot:5,ky:'AI方向'},
    {c:'14260',n:'数字电路与逻辑设计',cr:4,g:'选考',t:'选考',slot:5,ky:''},
    {c:'13176',n:'电子技术基础',cr:4,g:'加考',t:'加考',slot:5,ky:''},
    {c:'04738',n:'C++程序设计(实践)',cr:2,g:'核心专业',t:'实践',slot:0,ky:''},
    {c:'13004',n:'数据结构与算法(实践)',cr:2,g:'核心专业',t:'实践',slot:0,ky:''},
    {c:'02327',n:'操作系统(实践)',cr:1,g:'核心专业',t:'实践',slot:0,ky:''},
    {c:'13171',n:'数据库及其应用(实践)',cr:1,g:'其他专业',t:'实践',slot:0,ky:''},
    {c:'13006',n:'软件工程(实践)',cr:2,g:'其他专业',t:'实践',slot:0,ky:''},
    {c:'13216',n:'Java语言程序设计(实践)',cr:1,g:'其他专业',t:'实践',slot:0,ky:''},
    {c:'13177',n:'电子技术基础(实践)',cr:2,g:'加考',t:'实践',slot:0,ky:''},
    {c:'11689',n:'毕业设计',cr:0,g:'毕业',t:'必考',slot:0,ky:''}
  ];

  var KY_DEF = [
    {k:'m1',n:'301 数学一',u:'题',total:1000,done:0,col:'#B01F24',tip:'高数+线代+概率，与自考「高等数学(工本)」「线性代数(工)」重叠'},
    {k:'cs',n:'408 计算机学科专业基础',u:'节',total:120,done:0,col:'#1B3A57',tip:'数据结构45+组成原理45+操作系统35+计算机网络25，与自考4门课重叠'},
    {k:'en',n:'201 英语一',u:'套',total:25,done:0,col:'#137A4B',tip:'真题至少刷 3 遍，作文单独攒模板'},
    {k:'po',n:'101 思想政治理论',u:'题',total:1000,done:0,col:'#B4690E',tip:'9 月后再全力开搞，自考三门政治课打底'}
  ];

  var seed = {
    todos:[
      {id:"t1",title:"记账App：7月账单待对账",source:"自动记账App",type:"财务",due:shift(-2),done:false},
      {id:"t2",title:"追剧大全：真实API联调",source:"追剧大全",type:"开发",due:shift(0),done:false},
      {id:"t3",title:"自由剧场：发布 v1.2 到 Electron",source:"自由剧场",type:"发布",due:shift(1),done:false},
      {id:"t4",title:"回复客户邮件：定制报表需求",source:"邮箱",type:"沟通",due:shift(0),done:false},
      {id:"t5",title:"飞书：周会纪要待整理",source:"飞书",type:"协作",due:shift(2),done:false}
    ],
    projects:[
      {id:"p1",name:"自动记账App",metric:"本月支出 ¥3,280（红）· 收入 ¥12,400（绿）",prog:65,update:shift(-1),link:""},
      {id:"p2",name:"追剧大全",metric:"已接入 12 个片源 · 联调中",prog:80,update:shift(-2),link:""},
      {id:"p3",name:"自由剧场",metric:"影视聚合客户端 · Electron 桌面端 + Web 双端",prog:90,update:shift(-4),link:"https://github.com/Epic-super/free-theater"}
    ],
    tools:[
      {id:"o1",name:"QQ邮箱",link:"https://mail.qq.com",unread:5,note:"3封客户邮件待回"},
      {id:"o2",name:"GitHub",link:"https://github.com",unread:2,note:"2 个 PR 待 review"},
      {id:"o3",name:"飞书",link:"https://www.feishu.cn",unread:3,note:"周会纪要待整理"},
      {id:"o4",name:"百度网盘",link:"https://pan.baidu.com",unread:0,note:"设计稿已同步"},
      {id:"o5",name:"夸克网盘",link:"https://pan.quark.cn",unread:0,note:"学习资料备份"},
      {id:"o6",name:"Google Drive",link:"https://drive.google.com",unread:0,note:"文档协作"}
    ],
    notes:[
      {id:"n1",txt:"下一步把三个项目的数据指标接进统一看板，减少来回切。",ts:Date.now()},
      {id:"n2",txt:"外部工具自动同步需要后端授权，先用手动标记顶着。",ts:Date.now()}
    ],
    _seeded:true
  };

  // 单一真相源容器：state / bridge 为属性，save/normalizeState/loadBridge 统一读写
  var S = {
    KEY: KEY,
    COURSES: COURSES,
    KY_DEF: KY_DEF,
    seed: seed,
    state: null,
    bridge: null,
    _onSave: null,   // app-main 初始化时挂上 renderBackupTip
    _toast: null     // app-main 初始化时挂上 toast
  };

  function load() {
    try {
      var raw = localStorage.getItem(KEY + "data");
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    localStorage.setItem(KEY + "data", JSON.stringify(seed));
    return JSON.parse(JSON.stringify(seed));
  }

  function save() {
    try {
      localStorage.setItem(KEY + "data", JSON.stringify(S.state));
      if (typeof S._onSave === 'function') S._onSave();
    } catch (e) {
      console.error('save failed', e);
      if (typeof S._toast === 'function') S._toast('保存失败：' + e.message);
    }
  }

  function normalizeState() {
    try {
      if (!S.state || typeof S.state !== 'object' || Array.isArray(S.state)) S.state = JSON.parse(JSON.stringify(seed));
      ['todos', 'projects', 'tools', 'notes'].forEach(function (k) { if (!Array.isArray(S.state[k])) S.state[k] = []; });
      if (!S.state.cs || typeof S.state.cs !== 'object' || Array.isArray(S.state.cs)) {
        S.state.cs = {};
        COURSES.forEach(function (x) { S.state.cs[x.c] = { st: '未开始', plan: false, score: '' }; });
      } else {
        COURSES.forEach(function (x) { if (!S.state.cs[x.c]) S.state.cs[x.c] = { st: '未开始', plan: false, score: '' }; });
      }
      if (!S.state.ky || !Array.isArray(S.state.ky) || !S.state.ky.length) S.state.ky = JSON.parse(JSON.stringify(KY_DEF));
      if (!S.state.punch || typeof S.state.punch !== 'object' || Array.isArray(S.state.punch)) S.state.punch = {};
      if (!S.state.set || typeof S.state.set !== 'object' || Array.isArray(S.state.set)) S.state.set = { zkDate: '2026-10-24', kyDate: '2027-12-18', ncreDate: '2026-09-19', hideJ: false, goal: 180 };
      if (!S.state.set.zkDate) S.state.set.zkDate = '2026-10-24';
      if (!S.state.set.kyDate) S.state.set.kyDate = '2027-12-18';
      if (!S.state.set.ncreDate) S.state.set.ncreDate = '2026-09-19';
    } catch (e) { console.error('normalizeState error', e); }
  }

  function loadBridge() {
    try { return (global.store && global.store.getLegacy ? global.store.getLegacy("wb_hub_bridge", {}) : {}) || {}; }
    catch (e) { return {}; }
  }

  // 初始化：载入 + 规范化 + 首存（此时 app-main 尚未执行，_onSave/_toast 为空属正常）
  S.state = load();
  S.bridge = loadBridge();
  normalizeState();
  save();

  S.load = load;
  S.save = save;
  S.normalizeState = normalizeState;
  S.loadBridge = loadBridge;

  global.WBState = S;
})(window);
