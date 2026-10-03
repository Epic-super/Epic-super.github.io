(function(){
  'use strict';
  var nav=document.getElementById('navAtri');
  if(!nav) return;
  var isPublic=window.__WB_PUBLIC__===true;
  var box=document.createElement('section');box.id='atriWidget';box.hidden=true;
  box.innerHTML=isPublic
    ? '<div class="atri-public-card" role="status"><div class="atri-public-avatar" aria-hidden="true">ATRI</div><strong>ATRI · 海边记忆</strong><span>公开站仅展示头像预览</span></div>'
    : '<iframe class="atri-frame" src="atri/atri.html?v=5" title="ATRI 海边记忆桌宠" loading="lazy"></iframe>';
  document.body.appendChild(box);
  var frame=box.querySelector('iframe'),frameReady=false;
  function send(type){if(!frameReady||!frame)return;try{frame.contentWindow.postMessage({type:type},'*')}catch(_){} }
  function sendResize(){send('atri-resize')}
  function setOpen(open){box.hidden=!open;var n=document.getElementById('navAtri');if(n)n.setAttribute('aria-expanded',String(open));if(open){send('atri-start');sendResize()}else send('atri-stop')}
  /* 触发用「事件委托」而非直接绑定：角色栏卡片由 src/character-registry.js 动态渲染，
     直接绑在 nav 上的监听会随旧元素一起失效（实测点击完全无响应），委托到 document 免疫。
     ⚠️ 本脚本是同步立即执行（不像 pet-core/amadeus-core 延迟到 DOMContentLoaded），
     对元素重建最敏感，故此处必须用委托。 */
  function isTrigger(e){
    var t=e.target;
    return !!(t && t.closest && t.closest('#navAtri'));
  }
  document.addEventListener('click',function(e){
    if(!isTrigger(e)) return;
    e.preventDefault(); setOpen(box.hidden);
  });
  document.addEventListener('keydown',function(e){
    if(e.key!=='Enter' && e.key!==' ') return;
    if(!isTrigger(e)) return;
    e.preventDefault(); setOpen(box.hidden);
  });
  window.addEventListener('message',function(e){if(e.data&&e.data.type==='atri-close')setOpen(false)});
  window.addEventListener('resize',sendResize);
  var saved;try{saved=JSON.parse(localStorage.getItem('wb_atri_pos')||'null')}catch(_){saved=null}
  if(saved&&saved.left&&saved.top){box.style.left=saved.left;box.style.top=saved.top;box.style.right='auto';box.style.bottom='auto'}
  var head;
  if(frame) frame.addEventListener('load',function(){frameReady=true;head=frame.contentDocument&&frame.contentDocument.getElementById('atriHeader');if(!box.hidden){send('atri-start');sendResize()}if(!head)return;var drag=false,ox=0,oy=0;head.addEventListener('pointerdown',function(e){drag=true;var r=box.getBoundingClientRect();ox=e.clientX-r.left;oy=e.clientY-r.top;head.setPointerCapture(e.pointerId);box.classList.add('dragging')});head.addEventListener('pointermove',function(e){if(!drag)return;var x=Math.max(4,Math.min(innerWidth-box.offsetWidth-4,e.clientX-ox));var y=Math.max(4,Math.min(innerHeight-box.offsetHeight-4,e.clientY-oy));box.style.left=x+'px';box.style.top=y+'px';box.style.right='auto';box.style.bottom='auto'});head.addEventListener('pointerup',function(e){if(!drag)return;drag=false;box.classList.remove('dragging');try{head.releasePointerCapture(e.pointerId);localStorage.setItem('wb_atri_pos',JSON.stringify({left:box.style.left,top:box.style.top}))}catch(_){} })});
})();
