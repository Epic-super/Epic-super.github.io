// src/home-sites.js — 首页外链 + AI 工具箱（热门网站直达 / 对话·编程智能体卡片）
// 从 app-main.js IIFE 迁出，原生 ESM + window 桥接（与 #15 其他集群同构）。
// 依赖经 window.WBUtil 取得；不读写主 state；无构建依赖、file:// 双击可用。

const U = window.WBUtil || {};

// ---- AI 工具箱（对话 / 编程智能体，点开即跳转）----
const AI_TOOLS=[
  {g:'chat',n:'DeepSeek',t:'DS',c:'#4D6BFE',d:'国产推理模型，写码与科研一把好手',u:'https://chat.deepseek.com/'},
  {g:'chat',n:'智谱 AI（GLM）',t:'Z',c:'#5A6CF0',d:'国产大模型，长文本与智能体强',u:'https://chat.z.ai/'},
  {g:'chat',n:'阶跃 StepFun',t:'SF',c:'#2D7FF9',d:'国产多模态大模型 · 站内直连对话(API)',u:'stepfun.html'},
  {g:'chat',n:'Kimi',t:'K',c:'#3A6DF0',d:'超长上下文，读论文与长文档利器',u:'https://kimi.moonshot.cn/'},
  {g:'chat',n:'ChatGPT',t:'G',c:'#10A37F',d:'通用标杆，多模态全能',u:'https://chatgpt.com/'},
  {g:'chat',n:'Claude',t:'C',c:'#D97757',d:'长文与代码质量高，Artifacts 好用',u:'https://claude.ai/'},
  {g:'chat',n:'Gemini',t:'Ge',c:'#4285F4',d:'Google 多模态模型，长上下文与推理强',u:'https://gemini.google.com/'},
  {g:'chat',n:'Grok',t:'Gk',c:'#111827',d:'xAI 模型，实时联网、个性鲜明',u:'https://grok.com/'},
  {g:'chat',n:'Perplexity',t:'Pp',c:'#20808D',d:'对话式 AI 搜索，答案带引用溯源',u:'https://www.perplexity.ai/'},
  {g:'dev',n:'Coze 扣子',t:'Co',c:'#4E5BFF',d:'零代码搭 AI 智能体 / 工作流',u:'https://www.coze.cn/'},
  {g:'dev',n:'Codex',t:'X',c:'#1A1A1A',d:'OpenAI 云端编程智能体，跑仓库级任务',u:'https://chatgpt.com/codex'},
  {g:'dev',n:'Trae',t:'T',c:'#3D7EFF',d:'AI 原生 IDE，对话式写代码',u:'https://www.trae.ai/'},
  {g:'dev',n:'DeepSeek Harness',t:'DSH',c:'#4D6BFE',d:'开源 Agent 框架，一切皆插件，对标 Claude Code',u:'https://github.com/deepseek-ai/deepseek-harness'},
  {g:'dev',n:'WorkBuddy',t:'W',c:'#0f9d77',d:'当前这个工作台，你的 Agent 搭子',u:'https://www.workbuddy.cn/'}
];
// ---- 热门网站（首页全量直达；单一事实源见 sites.js 的 SITES_DB）----
// sites.js 为 classic 脚本，在 main.js(module/defer) 之前执行，故此处可取 SITES_DB
var HOT_SITES=window.SITES_DB||[];
function hsHost(u){ try{ return new URL(u).hostname; }catch(e){ return ''; } }
// 先显示文字徽标，再异步加载真实 favicon；加载成功则替换，失败仍保留文字，永无裂图
function upgradeFavicon(span, host, t){
  var done=false;
  function finish(img){
    if(done) return; done=true;
    if(img && img.naturalWidth>0 && span.parentNode){
      img.className='hsfav'; img.alt=''; img.loading='lazy'; img.decoding='async';
      span.parentNode.replaceChild(img,span);
    }
  }
  function trySrc(src){
    var img=new Image();
    img.onload=function(){ finish(img); };
    img.onerror=function(){};
    img.src=src;
  }
  setTimeout(function(){ if(!done) trySrc('https://api.iowen.cn/favicon/'+host+'.png'); }, 1200);
  trySrc('https://'+host+'/favicon.ico');
}
function renderHotSites(){
  var box=U.$("#hotSitesBox"); if(!box)return;
  var html='<div class="hotsites">';
  HOT_SITES.forEach(function(x){
    var host=hsHost(x.u);
    var ava='<span class="hsava"'+ (host?' data-host="'+U.esc(host)+'"':'') +'>'+U.esc(x.t)+'</span>';
    html+='<a class="hsite" href="'+U.esc(x.u)+'" target="_blank" rel="noopener noreferrer" style="--ac:'+x.c+'" title="'+U.esc(x.d||x.n)+'">'
      +ava
      +'<span class="hsn">'+U.esc(x.n)+'</span>'
      +'</a>';
  });
  html+='</div>';
  box.innerHTML=html;
  box.querySelectorAll('.hsava[data-host]').forEach(function(span){
    upgradeFavicon(span, span.getAttribute('data-host'), span.textContent);
  });
  var cnt=U.$("#hsCount"); if(cnt) cnt.textContent=HOT_SITES.length+' 个站点 · 点开即用';
}
function renderAI(){
  var box=U.$("#aiBox"); if(!box)return;
  var groups=[{k:'chat',t:'对话与研究'},{k:'dev',t:'编程与智能体'}];
  var html='';
  groups.forEach(function(gp){
    var items=AI_TOOLS.filter(function(x){return x.g===gp.k;});
    html+='<div class="aigroup"><div class="aigh">'+gp.t+'</div><div class="aigrid">';
    items.forEach(function(x){
      var host=hsHost(x.u);
      html+='<a class="aitool" href="'+U.esc(x.u)+'" target="_blank" rel="noopener noreferrer" style="--ac:'+x.c+'">'
        +'<span class="ailogo"'+(host?' data-host="'+U.esc(host)+'"':'')+'>'+x.t+'</span>'
        +'<span class="ainfo"><span class="ain">'+U.esc(x.n)+'</span><span class="aid">'+U.esc(x.d)+'</span></span>'
        +'<svg class="aig" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H9M17 7v8"/></svg>'
        +'</a>';
    });
    html+='</div></div>';
  });
  box.innerHTML=html;
  // AI 工具箱也用真实 favicon（加载成功替换文字徽标，失败保留文字）
  box.querySelectorAll('.ailogo[data-host]').forEach(function(span){
    var host=span.getAttribute('data-host'); var done=false;
    function ok(img){ if(done)return; done=true; if(img.naturalWidth>0){ img.className='ailogo fav'; span.parentNode.replaceChild(img,span);} }
    var i1=new Image(); i1.onload=function(){ok(i1);}; i1.onerror=function(){}; i1.src='https://'+host+'/favicon.ico';
    setTimeout(function(){ if(!done){ var i2=new Image(); i2.onload=function(){ok(i2);}; i2.onerror=function(){}; i2.src='https://api.iowen.cn/favicon/'+host+'.png'; } },1000);
  });
}

export function initHomeSites(){
  // 挂 window，供 app-main renderAll（['hotsites',window.renderHotSites] / ['ai',window.renderAI]）调用
  window.renderHotSites = renderHotSites;
  window.renderAI = renderAI;
}
