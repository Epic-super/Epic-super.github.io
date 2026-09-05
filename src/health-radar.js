// src/health-radar.js — 工作台完善度六维雷达 / 模块榜 / 里程碑
// 机械提取生成（_scratch/rebuild_verify.py），逻辑零改动；来源提交 ccf34d7a。
// 仅依赖 DOM（#whOverall/#whRadar/#whDims/#whModules/#whSubs/#whMiles/#sec-health），零数据层依赖。
export function initHealthRadar() {
      var RADAR=[{n:'功能完整度',v:92},{n:'内容充实度',v:96},{n:'数据闭环',v:90},{n:'稳定健壮',v:88},{n:'体验视觉',v:91},{n:'工程隐私',v:93}];
      var MODULES=[{n:'今日总览',v:95},{n:'项目导航',v:90},{n:'工具箱',v:96},{n:'速记',v:80},{n:'资讯',v:85},{n:'双线作战台',v:96},{n:'人际复盘',v:82},{n:'科研专区',v:90},{n:'游戏架',v:92},{n:'3D 世界',v:88}];
      var SUBS=[{n:'个人项目页 projects.html',s:'已上线',c:'#1a9e5c',v:95},{n:'双线/题库 zk-ky.html',s:'已上线',c:'#1a9e5c',v:96},{n:'个人站 me/',s:'已上线',c:'#1a9e5c',v:90},{n:'健康 health.html',s:'已上线',c:'#1a9e5c',v:85},{n:'考研 kaoyan.html',s:'已上线',c:'#1a9e5c',v:80},{n:'学习 study.html',s:'已上线',c:'#1a9e5c',v:82},{n:'人际 renji.html',s:'已上线',c:'#1a9e5c',v:82},{n:'PEKI 沉淀库(私有)',s:'本地',c:'#0f9d77',v:95},{n:'编程闯关 lab/',s:'已上线',c:'#1a9e5c',v:85},{n:'数模论文库 research/',s:'已上线',c:'#1a9e5c',v:88},{n:'3D 漫游 world/',s:'已上线',c:'#1a9e5c',v:88},{n:'分享集成台 share-hub.html',s:'已上线',c:'#1a9e5c',v:90},{n:'探索·AI视频工作流 explore.html',s:'已上线',c:'#1a9e5c',v:90}];
      var MILES=[{v:'v1.0.23',t:'自动化技术栈 AeroCAD 科研卡上线'},{v:'v1.0.53',t:'P0 数据底座：store / sync / idb-backup 三件套落地'},{v:'v1.0.71',t:'数一真题(2024/2025) + KaTeX 本地化渲染'},{v:'v1.0.76',t:'高翻·PEKI 沉淀库本地子系统接入'},{v:'v1.0.78',t:'游戏架接入游戏时长统计'},{v:'v1.0.80',t:'本视图：工作台完善度六维雷达上线'},{v:'v1.0.82',t:'分享集成台 share-hub 双主题种子库'},{v:'v1.0.85',t:'cube-01 空间思维训练游戏集成'},{v:'v1.0.87',t:'空间训练套件(4 款) + zk-ky meta 三处一致修复'},{v:'v1.0.91',t:'分享集成台全量入 seed(3801 条) + 空状态优化'},{v:'v1.0.96',t:'分享集成台心理状态回归个人语义(小待 319 条)'},{v:'v1.0.102',t:'mind id 修复 + 4-8 月数据找回 + 三端同步'},{v:'v1.0.105',t:'民航旅客体验深度解析平台子系统集成(lab/products)'},{v:'v1.0.106',t:'合并双线：民航体验平台 + 资讯真爬取/知识星球，三端对齐'},{v:'v1.0.112',t:'3D 小世界多主题场景模式（5 套可切换环境 + 昼夜按场景调色板）'},{v:'v1.0.113',t:'安全加固：外部内容协议/属性白名单 + 三大渲染入口错误边界'},{v:'v1.0.114',t:'性能优化：face-api 懒加载省 1.3MB + CSS 外置 + 存储配额预警 + 校验流程'},{v:'v1.0.115',t:'错误边界回归修复：viewGuard 包裹 renderGames 跨 script 块触发 ReferenceError，导致徽标卡在 v1.0.0 / renderAll/loadNews 未执行'},{v:'v1.0.116',t:'校验流程自我纠错：test-safefn 硬编码本地路径致 CI 假绿灯，改为按脚本位置解析仓库根'},{v:'v1.0.117',t:'游戏架跨 IIFE 错误边界修复（viewGuard 导出 window）+ verify 分级防假绿灯 + _private 错误边界补齐'},{v:'v1.0.122',t:'探索·AI视频工作流板块上线：MoneyPrinterTurbo 本地最大集成（一键启动/服务探测/WebUI 嵌入）+ 六大开源方案便携入口'}];

      var avg=Math.round(RADAR.reduce(function(a,b){return a+b.v;},0)/RADAR.length);
      var ob=document.getElementById('whOverall'); if(ob) ob.textContent='综合 ≈ '+avg+'%';

      function radar(){
        var cx=170,cy=150,R=100,lr=120,n=RADAR.length,s='';
        [0.25,0.5,0.75,1].forEach(function(rr){
          var p=[];for(var i=0;i<n;i++){var a=-Math.PI/2+i*2*Math.PI/n,r=R*rr;p.push((cx+r*Math.cos(a)).toFixed(1)+','+(cy+r*Math.sin(a)).toFixed(1));}
          s+='<polygon points="'+p.join(' ')+'" fill="none" stroke="var(--border)" stroke-width="1" opacity="'+(rr===1?0.9:0.45)+'"/>';
        });
        for(var i=0;i<n;i++){
          var a=-Math.PI/2+i*2*Math.PI/n,x2=cx+R*Math.cos(a),y2=cy+R*Math.sin(a);
          s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+x2.toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="var(--border)" stroke-width="1" opacity="0.45"/>';
          var lx=cx+lr*Math.cos(a),ly=cy+lr*Math.sin(a);
          var anc=Math.abs(Math.cos(a))<0.3?'middle':(Math.cos(a)>0?'start':'end');
          s+='<text x="'+lx.toFixed(1)+'" y="'+(ly+3).toFixed(1)+'" text-anchor="'+anc+'" font-size="11" font-weight="700" fill="var(--muted)">'+RADAR[i].n+'</text>';
          s+='<text x="'+lx.toFixed(1)+'" y="'+(ly+17).toFixed(1)+'" text-anchor="'+anc+'" font-size="12" font-weight="800" fill="var(--primary)">'+RADAR[i].v+'</text>';
        }
        var dp=[];for(var i=0;i<n;i++){var a=-Math.PI/2+i*2*Math.PI/n,r=R*RADAR[i].v/100;dp.push((cx+r*Math.cos(a)).toFixed(1)+','+(cy+r*Math.sin(a)).toFixed(1));}
        s+='<polygon class="wh-rpoly" points="'+dp.join(' ')+'" fill="var(--primary)" fill-opacity="0.20" stroke="var(--primary)" stroke-width="2.5"/>';
        s+='<g class="wh-rpoly-pts">';
        for(var i=0;i<n;i++){var a=-Math.PI/2+i*2*Math.PI/n,r=R*RADAR[i].v/100;s+='<circle cx="'+(cx+r*Math.cos(a)).toFixed(1)+'" cy="'+(cy+r*Math.sin(a)).toFixed(1)+'" r="3.5" fill="var(--primary)"/>';}
        s+='</g>';
        return '<svg viewBox="0 0 340 300" width="100%" style="max-width:330px;display:block;margin:0 auto">'+s+'</svg>';
      }
      var r=document.getElementById('whRadar'); if(r) r.innerHTML=radar();

      function whFill(sel){
        var els=document.querySelectorAll('#'+sel+' .wh-dbar i');
        setTimeout(function(){Array.prototype.forEach.call(els,function(el){el.style.width=(el.getAttribute('data-w')||'0')+'%';});},180);
      }

      var dd=document.getElementById('whDims');
      if(dd){dd.innerHTML=RADAR.map(function(d){return '<div class="wh-dim"><div class="wh-dname">'+d.n+'</div><div class="wh-dbar"><i data-w="'+d.v+'"></i></div><div class="wh-dval">'+d.v+'</div></div>';}).join('');whFill('whDims');}

      var mm=document.getElementById('whModules');
      if(mm){mm.innerHTML=MODULES.map(function(d){return '<div class="wh-dim"><div class="wh-dname">'+d.n+'</div><div class="wh-dbar"><i data-w="'+d.v+'"></i></div><div class="wh-dval">'+d.v+'</div></div>';}).join('');whFill('whModules');}

      var ss=document.getElementById('whSubs');
      if(ss) ss.innerHTML=SUBS.map(function(d){return '<div class="wh-sub-item"><span class="nm">'+d.n+'</span><span class="wh-pill" style="background:'+d.c+'">'+d.s+' · '+d.v+'%</span></div>';}).join('');

      var ms=document.getElementById('whMiles');
      if(ms) ms.innerHTML=MILES.map(function(d){return '<div class="wh-ms"><span class="v">'+d.v+'</span><span class="t">'+d.t+'</span></div>';}).join('');

      // 统计数字自动对齐数组长度：新增/删除主视图模块或子系统后，无需再改 HTML 里的硬编码数字
      (function syncCounts(){
        var map={'主视图模块':MODULES.length,'子系统 / 页面':SUBS.length};
        Array.prototype.forEach.call(document.querySelectorAll('.wh-stat'),function(st){
          var lb=st.querySelector('span'),bb=st.querySelector('b[data-n]');
          if(!lb||!bb) return;
          var k=lb.textContent.trim();
          if(map[k]!=null) bb.setAttribute('data-n',map[k]);
        });
        var em=document.getElementById('whCntMod'),es=document.getElementById('whCntSub');
        if(em) em.textContent=MODULES.length;
        if(es) es.textContent=SUBS.length;
      })();
      // 单元素计数动画（供版本数据异步到达后补跑；函数声明会提升，可安全前置引用）
      function animateCount(el){
        var t=parseInt(el.getAttribute('data-n'),10)||0;
        el.textContent='0';
        var start=null;
        function st(ts){ if(!start)start=ts; var p=Math.min(1,(ts-start)/900); el.textContent=Math.round(t*(1-Math.pow(1-p,3))); if(p<1) requestAnimationFrame(st); else el.textContent=t; }
        requestAnimationFrame(st);
      }
      // 版本沿革数字：优先取 version.json 实时数据，取不到则保留 HTML 里的兜底值（离线/file:// 场景）
      (function syncVersion(){
        var ids=['whCntVer','whFootVer','whCntNotes','whFootNotes'];
        var hit=false;
        for(var i=0;i<ids.length;i++){ if(document.getElementById(ids[i])){hit=true;break;} }
        if(!hit) return;
        function apply(d){
          if(!d||!d.version) return;
          var n=(d.notes&&d.notes.length)||0;
          var ev=document.getElementById('whCntVer'),ef=document.getElementById('whFootVer');
          var en=document.getElementById('whCntNotes'),efn=document.getElementById('whFootNotes');
          if(ev) ev.textContent=d.version;
          if(ef) ef.textContent=d.version;
          if(n){ if(en) en.textContent=n; if(efn) efn.textContent=n; }
          // 发布版本 / 功能变更记录：同属版本沿革口径，一并实时对齐
          var er=document.getElementById('whCntRel'),ec=document.getElementById('whCntChg');
          var seg=String(d.version).split('.');
          var rel=parseInt(seg[seg.length-1],10);
          if(er&&rel){ er.setAttribute('data-n',rel); }
          if(ec&&n){ ec.setAttribute('data-n',n); }
          // 若完善度视图此刻已可见，计数器动画早已按兜底值跑完，这里补跑一次
          var sec=document.getElementById('sec-health');
          if(sec&&sec.offsetParent!==null){ if(er&&rel) animateCount(er); if(ec&&n) animateCount(ec); }
        }
        try{
          var raw=null;
          try{ raw=localStorage.getItem('wb_hub_verinfo'); }catch(e){}
          if(raw){ try{ apply(JSON.parse(raw)); }catch(e){} }
          fetch('version.json?_='+Date.now(),{cache:'no-store'})
            .then(function(r){return r.ok?r.json():null;})
            .then(apply)
            .catch(function(){});
        }catch(e){}
      })();
      var cnts=document.querySelectorAll('.wh-stat b[data-n]');
      Array.prototype.forEach.call(cnts,function(el){
        var t=parseInt(el.getAttribute('data-n'),10)||0,cur=0,start=null;
        function step(ts){if(!start)start=ts;var p=Math.min(1,(ts-start)/1100);el.textContent=Math.round(t*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step);else el.textContent=t;}
        requestAnimationFrame(step);
      });

      // 视图初始 display:none（.view 默认隐藏），切到可见时重放数字滚动与进度条填充动画
      var secEl=document.getElementById('sec-health');
      if(secEl){
        var chk=setInterval(function(){
          if(secEl.offsetParent!==null){
            clearInterval(chk);
            var cs=document.querySelectorAll('#sec-health .wh-stat b[data-n]');
            Array.prototype.forEach.call(cs,function(el){el.textContent='0';});
            Array.prototype.forEach.call(cs,function(el){
              var t=parseInt(el.getAttribute('data-n'),10)||0,cur=0,start=null;
              function st2(ts){if(!start)start=ts;var p=Math.min(1,(ts-start)/1000);el.textContent=Math.round(t*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(st2);else el.textContent=t;}
              requestAnimationFrame(st2);
            });
            whFill('whDims'); whFill('whModules');
          }
        },350);
      }
}
