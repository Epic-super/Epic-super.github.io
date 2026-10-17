// src/news.js — 考研资讯集群（加载 / 渲染 / 分类筛选 / 「真爬取」正文预览）
// 从 app-main.js IIFE 迁出，原生 ESM + window 桥接（与 #15 其他集群同构）。
// 依赖经 window.WBUtil 取得；不读写主 state（newsData / newsFilter 为本模块私有状态），
// 因此无需动态取 WBState。无构建依赖、file:// 双击可用。

const U = window.WBUtil || {};

var newsData = null, newsFilter = "ky";

function newsGroup(cat){
  if(!cat) return "other";
  if(/研招|考研/.test(cat)) return "ky";
  if(/自考/.test(cat)) return "zk";
  if(/AI|ai/i.test(cat)) return "ai";
  return "other";
}
var NEWS_ORDER={ky:0,zk:1,ai:2,other:3};

/* 图片地址白名单：额外允许 data:image/，其余交 safeUrl。
 * 随本集群迁出——原先定义在 app-main，但全站仅资讯爬取正文（crawlNews）一处使用。 */
function safeImg(u){
  var s=String(u==null?"":u).trim();
  if(/^data:image\/(png|jpe?g|gif|webp|svg\+xml|avif);/i.test(s)) return s;
  return U.safeUrl(s);
}

function loadNews(){
  var box=U.$("#newsList"); if(!box) return;
  // C2：优先 fetch 外部化的 news.json（更新资讯只改该文件，不动主文件）；失败回退内联兜底（file:///离线可用）
  if(typeof fetch==="function"){
    fetch("news.json?_="+Date.now(),{cache:"no-store"}).then(function(r){ if(!r.ok) throw 0; return r.json(); }).then(function(j){
      newsData=j; renderNews(); markNewsStale(j&&j.updatedAt);
    }).catch(function(){ loadNewsLocal(); });
  } else { loadNewsLocal(); }
}
function loadNewsLocal(){
  var local=U.$("#news-feed");
  if(local){ try{ newsData=JSON.parse(local.textContent); renderNews(); markNewsStale(newsData&&newsData.updatedAt); return; }catch(e){} }
  if(typeof fetch!=="function"){ var b=U.$("#newsList"); if(b) b.innerHTML='<div class="empty">当前环境不支持自动加载，请用线上版或打开 zk-ky.html 查看资讯</div>'; return; }
  fetch("zk-ky.html",{cache:"no-store"}).then(function(r){ if(!r.ok) throw new Error("http"); return r.text(); }).then(function(html){
    try{
      var doc=new DOMParser().parseFromString(html,"text/html");
      var el=doc.getElementById("news-feed");
      if(!el) throw new Error("no feed");
      newsData=JSON.parse(el.textContent);
      renderNews(); markNewsStale(newsData&&newsData.updatedAt);
    }catch(e){ var b=U.$("#newsList"); if(b) b.innerHTML='<div class="empty">解析资讯失败，稍后重试</div>'; }
  }).catch(function(){ var b=U.$("#newsList"); if(b) b.innerHTML='<div class="empty">无法加载资讯（需在线上版或同源打开；本地 file:// 模式不支持 fetch）</div>'; });
}
function markNewsStale(ua){
  var el=U.$("#newsStale"); if(!el) return;
  if(!ua){ el.style.display="none"; return; }
  var days=Math.floor((wbNow()-Date.parse(ua))/86400000);
  if(days>7){ el.style.display="block"; el.textContent="资讯更新于 "+ua+"，已 "+days+" 天未刷新，可能已过期，请以官方为准。"; }
  else { el.style.display="none"; }
}
/* 错误边界：资讯渲染失败时降级占位，不拖垮整页（P2-10） */
function renderNews(){
  try{ __renderNews(); }
  catch(e){
    if(window.errorlog&&window.errorlog.capture) window.errorlog.capture(e,'news.renderNews');
    var nb=U.$("#newsList");
    if(nb) nb.innerHTML='<div class="empty">⚠️ 资讯渲染异常，已降级显示。请刷新重试或切换分类。</div>';
  }
}
function __renderNews(){
  var box=U.$("#newsList"); if(!box) return;
  var data=newsData;
  var items=data&&data.items?data.items:[];
  var d=U.$("#newsDate"); if(d) d.textContent=data&&data.updatedAt?("更新于 "+data.updatedAt):"";
  if(!items.length){ box.innerHTML='<div class="empty">暂无资讯</div>'; return; }
  if(newsFilter!=="all") items=items.filter(function(it){return newsGroup(it.cat)===newsFilter;});
  items=items.slice().sort(function(a,b){return NEWS_ORDER[newsGroup(a.cat)]-NEWS_ORDER[newsGroup(b.cat)];});
  if(!items.length){ box.innerHTML='<div class="empty">该分类暂无资讯</div>'; return; }
  box.innerHTML=items.map(function(it){
    var g=newsGroup(it.cat), url=U.safeUrl(it.url||"");
    var head='<span class="ncat '+g+'">'+U.esc(it.cat)+'</span><div class="ntitle">'+U.esc(it.title)+'</div>';
    var desc=it.desc?'<div class="ndesc">'+U.esc(it.desc)+'</div>':'';
    var foot='<div class="nfoot">'+(it.date?'<span>'+U.esc(it.date)+'</span>':'<span></span>')+(url?'<span class="go">查看来源 ↗</span>':'')+'</div>';
    var body = url
      ? '<a class="news-item '+g+'" href="'+U.esc(url)+'" target="_blank" rel="noopener">'+head+desc+foot+'</a>'
      : '<div class="news-item '+g+'">'+head+desc+foot+'</div>';
    if(url) body += '<div class="ncrawl" data-for="'+U.esc(url)+'"><button class="news-crawl" data-url="'+U.esc(url)+'">抓取正文</button></div>';
    return body;
  }).join("");
}

// 资讯「真爬取」：点「抓取正文」经 EdgeOne 函数内联预览
function crawlNews(url, holder, btn){
  if(btn){ btn.disabled=true; btn.textContent="抓取中…"; }
  var ep=(localStorage.getItem("wb_api_base")||"").replace(/\/$/,"");
  fetch(ep+"/api/crawl?url="+encodeURIComponent(url),{cache:"no-store"}).then(function(r){
    return r.json().then(function(j){return {ok:r.ok,j:j};});
  }).then(function(res){
    var j=res.j;
    if(!res.ok||j.error){
      holder.innerHTML='<div class="ncrawl-err">抓取失败：'+U.esc(j.error||res.status)+'（若经 GitHub Pages 访问，请在「知识星球·AI星球」页把 API_BASE 设为 EdgeOne 域名）</div>';
      return;
    }
    var h="", srcUrl=U.safeUrl(j.url||url);
    if(j.desc) h+='<div class="ncrawl-desc">'+U.esc(j.desc)+'</div>';
    if(j.text) h+='<div class="ncrawl-text">'+U.esc(j.text)+'</div>';
    if(j.img){ var iu=safeImg(j.img); h+= iu? '<img class="ncrawl-img" src="'+U.esc(iu)+'" alt="" loading="lazy">' : '<div class="ncrawl-desc">（图片地址被安全策略拦截）</div>'; }
    h+='<div class="ncrawl-src">来源：'+(srcUrl?'<a href="'+U.esc(srcUrl)+'" target="_blank" rel="noopener">'+U.esc(srcUrl)+'</a>':U.esc(j.url||url))+' · <a href="#" class="ncrawl-retry">重抓</a></div>';
    holder.innerHTML=h;
    var rt=holder.querySelector(".ncrawl-retry");
    if(rt) rt.onclick=function(e){e.preventDefault(); holder.innerHTML='<button class="news-crawl" data-url="'+U.esc(url)+'">抓取正文</button>'; crawlNews(url,holder,holder.querySelector(".news-crawl"));};
  }).catch(function(err){
    holder.innerHTML='<div class="ncrawl-err">抓取异常：'+U.esc(String(err))+'</div>';
  });
}

export function initNews(){
  // 资讯分类筛选（原在 app-main 解析时绑定，改由 boot() 在 DOM 就绪后绑定，时机更稳）
  var nc=U.$("#newsChips");
  if(nc) nc.addEventListener("click",function(e){
    var c=e.target.closest(".news-chip"); if(!c) return;
    newsFilter=c.getAttribute("data-f")||"all";
    Array.prototype.forEach.call(nc.querySelectorAll(".news-chip"),function(x){x.classList.toggle("active",x===c);});
    renderNews();
  });
  // 资讯「真爬取」按钮（事件委托到 #newsList）
  var nl=U.$("#newsList");
  if(nl) nl.addEventListener("click",function(e){
    var b=e.target.closest(".news-crawl"); if(!b) return;
    e.preventDefault(); e.stopPropagation();
    crawlNews(b.getAttribute("data-url"), b.parentElement, b);
  });
  // 挂 window，供 app-main 定时刷新（loadNews）与潜在外部调用（renderNews）
  window.renderNews = renderNews;
  window.loadNews = loadNews;
}
