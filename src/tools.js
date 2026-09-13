// src/tools.js — 工具区渲染集群（从 app-main.js IIFE 迁出，ESM + window 桥接）
// 数据源：主 state.tools（经 window.WBState，函数开头动态取避免旧引用）
// helper 经 window.WBUtil 收口（esc/$/safeUrl）
const U = window.WBUtil || {};
const WBS = window.WBState;

function toolIcon(t){
  var DEF="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23999%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z%22/%3E%3Cpath d=%22M14 2v6h6%22/%3E%3C/svg%3E";
  var ROCKET='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>';
  var CHECK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg>';
  var CHAT='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';
  var CAP='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5"/></svg>';
  var MON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>';
  var GRAD='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M9 12l-2.5 9 5.5-3.2L17.5 21 15 12"/></svg>';
  var TREASURE='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 7l2-3h14l2 3"/><path d="M12 11v4"/></svg>';
  var GAME='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="4"/><path d="M6 12h4M8 10v4"/><circle cx="15" cy="11" r="1" fill="currentColor"/><circle cx="18" cy="13" r="1" fill="currentColor"/></svg>';
  var SHIELD='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>';
  var BOOKMARK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
  var MAIL='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>';
  var CLOUD='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>';
  var SERVER='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="15" rx="2"/><path d="M6 19v2M18 19v2"/><path d="M2 12h20"/></svg>';
  var CODE='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>';
  var HOME='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>';
  var CHART='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M21 7v4h-4"/></svg>';
  var BID='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/></svg>';
  var AUDIT='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="3" width="8" height="4" rx="1"/><path d="M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"/><path d="M9 14l2 2 4-4"/></svg>';
  var n=(t&&t.name)||'';
  if(t&&t.link&&/^https?:/i.test(t.link)){try{var h=new URL(t.link).hostname;
    if(h.indexOf('myunedu')>=0)return GRAD;
    if(/百度网盘|网盘/.test(n))return CLOUD;
    if(/邮箱|邮件/.test(n))return MAIL;
    if(/腾讯云/.test(n)||h.indexOf('cloud.tencent.com')>=0)return CLOUD;
    return '<img class="fav" alt="" loading="lazy" decoding="async" data-host="'+U.esc(h)+'">';
  }catch(e){}}
  if(n.indexOf('自考')>=0)return CAP;
  if(n.indexOf('二级')>=0)return MON;
  if(n.indexOf('藏宝库')>=0)return TREASURE;
  if(n.indexOf('游戏')>=0)return GAME;
  if(n.indexOf('黑客')>=0||n.indexOf('安全')>=0)return SHIELD;
  if(n.indexOf('书签')>=0)return BOOKMARK;
  if(n.indexOf('邮箱')>=0||n.indexOf('邮件')>=0)return MAIL;
  if(n.indexOf('百度网盘')>=0||n.indexOf('网盘')>=0)return CLOUD;
  if(n.indexOf('云盘')>=0)return CLOUD;
  if(n.indexOf('编程')>=0||n.indexOf('语法')>=0||n.indexOf('闯关')>=0)return CODE;
  if(n.indexOf('习惯')>=0||n.indexOf('锻造')>=0)return CHECK;
  if(n.indexOf('生活')>=0||n.indexOf('记账')>=0||n.indexOf('习惯')>=0)return HOME;
  if(n.indexOf('理财')>=0||n.indexOf('资产')>=0||n.indexOf('净值')>=0||n.indexOf('定投')>=0||n.indexOf('金融')>=0)return CHART;
  if(n.indexOf('招标')>=0||n.indexOf('拆解')>=0)return BID;
  if(n.indexOf('审计')>=0||n.indexOf('灯塔')>=0)return AUDIT;
  if(n.indexOf('科研')>=0)return ROCKET;
  if(n.indexOf('对话')>=0||n.indexOf('聊天')>=0)return CHAT;
  return '<img class="fav" alt="" src="'+DEF+'">';}

function renderTools(){
  var state = WBS.state;
  var box=U.$("#toolsGrid");
  // 公开站判定：tools/ 等在 sanitize DENY 清单，公开站没有这些文件；标 local:true 的条目在云端直接不渲染，避免死链
  // 2026-08-31：优先读构建期注入的 window.__WB_PUBLIC__（sanitize.mjs 注入，域名无关）。
  // 保留 hostname 兜底仅用于尚未重新部署的旧公开站快照，新部署后实际由 __WB_PUBLIC__ 决定。
  var IS_CLOUD = window.__WB_PUBLIC__===true
    || location.hostname.indexOf('github.io')>=0
    || location.hostname.indexOf('netlify')>=0;
  var sysTools = [
      {name:'知识星球', link:'https://www.zsxq.com/', note:'付费社群 / 知识付费社区 · 常用', self:false},
      {name:'自考·考研', link:'zk-ky.html', note:'双线作战台 · 进度自动同步'},
      {name:'408/自考 课程资料库', link:'study.html', note:'学习区 · 王道 PDF 在线 + 课件本地索引', self:true},
      {name:'编程语法闯关台', link:'lab/products/coding-arena.html', note:'C++/Java 语法闯关 · 多关卡进度与实战', self:true},
      {name:'个人生活工作台', link:'lab/products/life-hub.html', note:'记账·习惯·减脂·日程·待买·收藏 一站式', self:true},
      {name:'科研智能体', link:'lab/products/research-agent.html', note:'研究流水线 · Semantic Scholar 文献实时检索 · AI 提示词工作台 · 写作助手', self:true},
      {name:'习惯锻造台', link:'lab/products/habit-forge.html', note:'早起·整洁·学习习惯养成 · 全年热力图 · XP 等级成就激励 · 含睡眠管理', self:true},
      {name:'对话 · 聊天', link:'lab/products/chat.html', note:'微信风 1:1 聊天 · 复用原对话数据 · 文字/表情/图片/文件/语音 · 可选 WS 真实连接', self:true},
      {name:'思考，快与慢 · 读书笔记', link:'lab/products/thinking-fast-and-slow.html', note:'卡尼曼认知偏误精读 · 系统1/2、决策行动清单', self:true},
      {name:'招标文档拆解', link:'lab/products/bid-parser.html', note:'粘贴招标文本自动提取时间/保证金/资质/评分/废标等关键条款，双文档比对', self:true},
      {name:'研招风·文章转换器', link:'tools/article-converter.html', note:'Markdown/Word 富文本 → 交大研招网风格文章页 · 公文排版 · 导出 HTML', self:true, local:true},
      {name:'FoloToy NFC 试验台', link:'lab/products/folotoy-nfc-passport.html', note:'NFC 打卡+Token 兑换 · 后端/固件/设备端 · Web 直连 API 实测', self:true},
      {name:'路口理财工作台', link:'lab/products/lukou-finance.html', note:'资产净值/配置环形图/定投复利/理财目标/风险测评', self:true},
      {name:'灯塔审计', link:'lab/products/lighthouse-instance.html', note:'Lighthouse 五维审计录入/趋势/告警/优化建议', self:true},
      {name:'计算机二级', link:'c2.html', note:'MS Office 必过工作台 · 进度自动同步'},
      {name:'计算机二级题库', link:'c2-bank.html', note:'40 道操作题真题 · 在线练习', self:true},
      {name:'个人藏宝库', link:'me/index.html', note:'小待的个人空间 · 关于/笔记/博客/工具', self:true},
      {name:'游戏中心', link:'games/index.html', note:'4 款自研小游戏 · 摸鱼补给站', self:true},
      {name:'电商价格追踪', link:'tools/ecommerce-price-tracker.html', note:'京东/淘宝/拼多多 · 采集/清洗/对比/可视化', self:true},
      {name:'文件占用解除器', link:'tools/file-unlocker.html', note:'Windows 文件占用检测与解锁 · CLI+GUI · 需管理员', self:true},
      {name:'考研作战台', link:'kaoyan.html', note:'考研独立作战台 · 倒计时/进度/资料', self:true},
      {name:'黑客红客学习区', link:'hacker/index.html', note:'白帽安全 · 理论+实践双轨', self:true},
      {name:'Strix+GLM 实战指南', link:'hacker/strix-glm-guide.html', note:'AI 渗透测试 · Strix 接智谱 GLM-5.3-Flash 配置/折扣/成本全攻略（站内）', self:true},
      {name:'Strix 启动器', link:'hacker/strix-launcher.html', note:'GLM-5.3-Flash 命令/配置生成 · 跨设备(Docker)任务投递 · 扫描历史（站内）', self:true},
      {name:'Strix 官方仓库', link:'https://github.com/usestrix/strix', note:'开源 AI 渗透测试工具 · 58.7k stars', self:false},
      {name:'Strix 文档', link:'https://docs.usestrix.com', note:'使用文档 · 配置 / CI 集成', self:false},
      {name:'智谱开放平台', link:'https://open.bigmodel.cn', note:'GLM-5.3-Flash API · 限时 5 折至 9.9', self:false},
      {name:'GLM-5.3-Flash 定价', link:'https://open.bigmodel.cn/pricing', note:'输入 $0.075 / 输出 $0.25 每百万 tokens', self:false},
      {name:'GLM Coding Plan', link:'https://bigmodel.cn/glm-coding', note:'订阅套餐 · 非高峰 5 折 · 每日体验卡', self:false},
      {name:'GLM-5.3-Flash (HF)', link:'https://huggingface.co/zai-org/GLM-5.3-Flash', note:'HuggingFace 模型页 · MIT 开源', self:false},
      {name:'奶酪书签', link:'bookmarks/index.html', note:'5000+ 实用网站 · 可搜索分类', self:true},
      {name:'高翻·PEKI 沉淀库', link:'peki.html', note:'复盘/热词搜索(3546条)/真题/每日知识 + 题库/写作台/流水线', self:true, local:true},
      {name:'高翻学习平台', link:'https://www.peki365.com/?redirect=%252Fstudy%252FWk4F', note:'外部学习平台 · 点击进入'},
      {name:'VIP自考平台', link:'https://study.myunedu.com/studyPC/#/phoneLogin/index', note:'外部学习平台 · 点击进入'},
      {name:'小黑课堂·我的课程', link:'https://www.xiaoheiketang.com/personal/myCourse', note:'自考网课 · 我的课程', self:false},
      {name:'腾讯云', link:'https://console.cloud.tencent.com/', note:'云主机控制台 · 量化挂机监控'},
      {name:'WorldQuant Brain', link:'https://platform.worldquantbrain.com/', note:'量化 Alpha 开发 · 仿真 / 提交平台'}
    ].filter(function(t){ return !(t.local && IS_CLOUD); }).map(function(t){
      var sl=U.safeUrl(t.link);
      return '<a class="tool"'+(sl?' href="'+U.esc(sl)+'"':'')+' target="'+(t.self?'_self':'_blank')+'" rel="'+(t.self?'':'noopener')+'"><div class="tname">'+toolIcon(t)+U.esc(t.name)+'</div><div class="tnote">'+U.esc(t.note)+'</div><div class="open">'+(sl?'打开 ↗':'链接无效')+'</div></a>';
    }).join('');
    if(!state.tools.length && !sysTools){box.innerHTML='<div class="empty" style="grid-column:1/-1">还没有工具入口，点右上角添加。</div>';return;}
    box.innerHTML = sysTools + state.tools.map(function(t){
      var badge = (Number(t.unread)>0) ? '<span class="badge show">'+Number(t.unread)+'</span>' : '';
      var tl = U.safeUrl(t.link);
      var href = tl ? 'href="'+U.esc(tl)+'" target="_blank" rel="noopener"' : 'style="cursor:default"';
      return '<a class="tool" '+href+' data-id="'+t.id+'">'+badge
        +'<div class="tname">'+toolIcon(t)+U.esc(t.name)+'</div>'
        +'<div class="tnote">'+U.esc(t.note||"")+'</div>'
        +'<div class="open">'+(tl?'打开 ↗':(t.link?'链接被安全策略拦截':'未设置链接'))+'</div>'
        +'</a>';
    }).join("");
    // 外链图标：先占位，异步加载站点 favicon；非图片(200 但非图)或失败→回退默认图标（避免裂图）
    var FDEF="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23999%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z%22/%3E%3Cpath d=%22M14 2v6h6%22/%3E%3C/svg%3E";
    box.querySelectorAll('.fav[data-host]').forEach(function(img){
      var host=img.getAttribute('data-host')||'';
      function fb(){ img.src=FDEF; }
      img.addEventListener('error',fb);
      img.addEventListener('load',function(){ if(img.naturalWidth===0) fb(); });
      if(host) img.src='https://'+host+'/favicon.ico';
    });
  }

export function initTools(){ window.renderTools = renderTools; }
