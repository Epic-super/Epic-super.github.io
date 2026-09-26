// src/character-dock.js — 统一角色栏：只管理入口/折叠，不接管各角色引擎
(function(){
  'use strict';
  function init(){
    var trigger=document.getElementById('navCharacters');
    var dock=document.getElementById('characterDock');
    var close=document.getElementById('characterDockClose');
    if(!trigger||!dock) return;
    function setOpen(open){
      dock.hidden=!open;
      trigger.setAttribute('aria-expanded',String(open));
      try{localStorage.setItem('wb_character_dock_open',open?'1':'0')}catch(_){ }
    }
    trigger.addEventListener('click',function(){setOpen(dock.hidden)});
    trigger.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();setOpen(dock.hidden)}});
    if(close) close.addEventListener('click',function(){setOpen(false)});
    dock.addEventListener('click',function(e){
      var card=e.target.closest('.character-card');
      if(card){setOpen(false);}
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
