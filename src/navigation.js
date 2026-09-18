// src/navigation.js — 导航 / 滚动 / 锚点交互（Tab 切换、顶栏沉降、iframe 自适应、内部锚点、双线区滚动高亮）
// 从 app-main.js IIFE 迁出，原生 ESM + window 桥接（与 #15 其他集群同构）。
// 依赖经 window.WBUtil 取得；setView / goSection 经 window 桥接（nav.js，main.js boot 内已挂），
// 事件处理器均为「点击/滚动/hashchange 时才调用」，桥接在 boot 后续完成，调用时必已就绪。
// 本集群无 state 写入，纯 DOM / 滚动交互，时序安全。

const U = window.WBUtil || {};

export function initNavigation(){
  // ---- Tab 切换 ----
  var navMore = U.$("#navMore"), tabbarEl = U.$("#tabbar");
  if(navMore){
    navMore.addEventListener("click", function(e){ e.stopPropagation(); tabbarEl.classList.toggle("expanded"); navMore.setAttribute("aria-expanded", tabbarEl.classList.contains("expanded") ? "true" : "false"); });
  }
  U.$("#tabbar").addEventListener("click", function(e){
    var a = e.target.closest("a[data-view]"); if(!a) return; e.preventDefault();
    var v = a.getAttribute("data-view"); window.setView(v);
    if(a.hasAttribute("data-fold")){ tabbarEl.classList.remove("expanded"); if(navMore) navMore.setAttribute("aria-expanded", "false"); }
  });

  // ---- 顶栏滚动沉降：玻璃投影随滚动渐显（rAF 节流，passive 不阻塞滚动）----
  var topbarEl = U.$(".topbar");
  if(topbarEl){
    var _tbTick = false;
    window.addEventListener("scroll", function(){
      if(_tbTick) return; _tbTick = true;
      requestAnimationFrame(function(){ topbarEl.classList.toggle("scrolled", window.scrollY > 8); _tbTick = false; });
    }, { passive: true });
  }

  // 职业规划平台 + Python 小尝试 + PEKI 看板 iframe 自适应高度（子应用 postMessage 上报）
  window.addEventListener("message", function(e){
    var d = e.data;
    if(d && d.__wbResize && d.id === "careerFrame"){ var f = document.getElementById("careerFrame"); if(f) f.style.height = (d.h + 24) + "px"; }
    if(d && d.__wbResize && d.id === "practiceFrame"){ var pf = document.getElementById("practiceFrame"); if(pf) pf.style.height = (d.h + 24) + "px"; }
    if(d && d.__wbResize && d.id === "pekiFrame"){ var pk = document.getElementById("pekiFrame"); if(pk) pk.style.height = (d.h + 24) + "px"; }
    if(d && d.__wbResize && d.id === "exploreFrame"){ var ex = document.getElementById("exploreFrame"); if(ex) ex.style.height = (d.h + 24) + "px"; }
  });

  // ---- 内部锚点统一处理：避免 display:none 导致原生锚点跑偏 ----
  document.addEventListener("click", function(e){
    var a = e.target.closest('a[href^="#"]'); if(!a) return;
    var href = a.getAttribute('href');
    if(!href || href.length < 2) return;
    // tabbar 的 a 没有 href，不会命中；外部链接不命中
    if(a.closest('#tabbar')) return;
    e.preventDefault();
    window.goSection(href);
  });
  window.addEventListener("hashchange", function(e){ window.goSection(location.hash); });

  // ---- 双线区快速导航滚动高亮（折叠状态逻辑已迁至 src/dual-fold.js）----
  function dualNavActive(){
    var nav = U.$('#dualNav'); if(!nav) return;
    var y = window.scrollY + 90;
    var ids = ['dual-overview', 'dual-zk', 'dual-ky', 'dual-heat', 'dual-info'];
    var cur = 'dual-overview';
    for(var i = 0; i < ids.length; i++){
      var el = document.getElementById(ids[i]); if(!el) continue;
      if(el.offsetTop <= y) cur = ids[i];
    }
    [].forEach.call(nav.querySelectorAll('a'), function(a){
      a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
    });
  }
  var dualNavTick = 0;
  window.addEventListener('scroll', function(){
    if(++dualNavTick % 4 !== 0) return;
    requestAnimationFrame(dualNavActive);
  }, { passive: true });
  dualNavActive();
}
