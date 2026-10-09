(function(){
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href^="#"]');
    if(!a)return;
    const id=a.getAttribute('href');
    if(id==="#"||!document.querySelector(id))return;
    e.preventDefault();
    document.querySelector(id).scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
  });

  const canvas=document.getElementById('parakeet-bird');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const grid=[
    '................',
    '......YYYY......',
    '.....YYYYYY.....',
    '....YYYYYYYY....',
    '...YYYGYYYYYY...',
    '...YYGGGGBBYY...',
    '..YYGGGGGBBBY...',
    '..YGGGGGGGBBY...',
    '..YGGGGGGGYYY...',
    '..YGGGGGGYYYY...',
    '..YGGGGGYYYYY...',
    '..YGGGGYYYYYY...',
    '...GGGGGYYYY....',
    '...GGGGGGYY......',
    '....GGGGG........',
    '.....GGG.........',
    '......G..........',
    '.....GGG.........',
    '....GG.GG........',
    '...GG...GG.......'
  ];
  const palette={Y:'#f4df52',G:'#58a832',B:'#6fc5cf',W:'#f7f0d2',K:'#243b36'};
  function drawBird(flip){
    ctx.clearRect(0,0,64,64);
    const px=3;
    const ox=8,oy=2;
    ctx.save();
    if(flip){ctx.translate(64,0);ctx.scale(-1,1)}
    grid.forEach((row,y)=>[...row].forEach((ch,x)=>{
      if(ch==='.')return;
      let color=palette[ch]||null;
      if(!color)return;
      ctx.fillStyle=color;ctx.fillRect(ox+x*px,oy+y*px,px,px);
    }));
    // Pixel details: eye, cheek dots, beak, wing feathers and tail.
    ctx.fillStyle='#1b2c29';ctx.fillRect(ox+10*px,oy+5*px,px,px);
    ctx.fillStyle='#f7f0d2';ctx.fillRect(ox+10*px,oy+5*px,1.5,1.5);
    ctx.fillStyle='#287ac1';ctx.fillRect(ox+8*px,oy+8*px,px,px);
    ctx.fillRect(ox+7*px,oy+9*px,px,px);
    ctx.fillStyle='#e6b84c';ctx.fillRect(ox+12*px,oy+7*px,px,px);
    ctx.fillStyle='#2c6d36';ctx.fillRect(ox+6*px,oy+12*px,px,px);
    ctx.fillRect(ox+7*px,oy+13*px,px,px);
    ctx.restore();
  }
  const mobile=()=>window.matchMedia('(max-width:900px)').matches;
  let x=window.innerWidth*.2,y=52,tx=x,ty=y,lastMove=0,lastFrame=0,flip=false;
  const canvasSize=()=>mobile()?52:64;
  function perch(){
    const logo=document.querySelector('.logo');
    const branch=document.querySelector('.parakeet-branch');
    if(!logo||!branch)return {x:window.innerWidth*.18,y:48};
    const lr=logo.getBoundingClientRect(),br=branch.getBoundingClientRect();
    return {x:Math.min(br.left+br.width*.66,lr.right+100),y:br.top-5};
  }
  function move(e){
    if(mobile())return;
    tx=e.clientX+24;ty=e.clientY-28;lastMove=performance.now();
    flip=e.movementX<0;
  }
  window.addEventListener('pointermove',move,{passive:true});
  window.addEventListener('resize',()=>{if(mobile()){const p=perch();x=tx=p.x;y=ty=p.y;}},{passive:true});
  function frame(now){
    const idle=mobile()||now-lastMove>2300;
    if(idle){const p=perch();tx=p.x;ty=p.y;}
    const easing=reduce?1:(idle?.09:.16);
    x+=(tx-x)*easing;y+=(ty-y)*easing;
    const size=canvasSize();
    canvas.style.width=size+'px';canvas.style.height=size+'px';
    canvas.style.transform='translate3d('+(x-size/2)+'px,'+(y-size/2)+'px,0)';
    drawBird(flip);
    if(!reduce||now-lastFrame>500){lastFrame=now;requestAnimationFrame(frame);}
  }
  const p=perch();x=tx=p.x;y=ty=p.y;lastMove=performance.now();
  drawBird(false);
  requestAnimationFrame(frame);
})();