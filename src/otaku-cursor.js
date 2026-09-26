(() => {
  if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const root=document.documentElement;
  const cursor=document.createElement('div'); cursor.className='otaku-cursor';
  const img=document.createElement('img'); img.src='amadeus/assets/amadeus-icon.png'; img.alt=''; cursor.appendChild(img);
  const key=document.createElement('div'); key.className='otaku-key'; document.body.append(cursor,key); root.classList.add('otaku-cursor-on');
  let x=-100,y=-100,last=0;
  const move=e=>{x=e.clientX;y=e.clientY;cursor.style.left=x+'px';cursor.style.top=y+'px';if(performance.now()-last>42){const dot=document.createElement('i');dot.className='otaku-cursor-trail';dot.style.left=x+'px';dot.style.top=y+'px';document.body.append(dot);setTimeout(()=>dot.remove(),600);last=performance.now();}};
  document.addEventListener('pointermove',move,{passive:true});
  document.addEventListener('pointerover',e=>{if(e.target.closest('a,button,[role="button"],input,select,textarea'))cursor.classList.add('is-link');},{passive:true});
  document.addEventListener('pointerout',e=>{if(e.target.closest('a,button,[role="button"],input,select,textarea'))cursor.classList.remove('is-link');},{passive:true});
  document.addEventListener('pointerdown',()=>{cursor.classList.add('is-down');key.textContent='click';key.classList.add('show');setTimeout(()=>key.classList.remove('show'),420);});
  document.addEventListener('pointerup',()=>cursor.classList.remove('is-down'));
  document.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)){key.textContent=e.key===' '?'space':e.key;key.style.left=(x||0)+'px';key.style.top=(y||0)+'px';key.classList.add('show');setTimeout(()=>key.classList.remove('show'),520);}});
})();
