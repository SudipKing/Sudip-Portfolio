(function(){
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const id=a.getAttribute('href');if(id==="#"||!document.querySelector(id))return;e.preventDefault();document.querySelector(id).scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});});
 const canvas=document.getElementById('parakeet-bird');if(!canvas)return;const ctx=canvas.getContext('2d');
 const grid=['......YYYY......','.....YYYYYY.....','....YYYYYYYY....','...YYYGYYYYYY...','...YYGGGGBBYY...','..YYGGGGGBBBY...','..YGGGGGGGBBY...','..YGGGGGGGYYY...','..YGGGGGGYYYY...','..YGGGGGYYYYY...','..YGGGGYYYYYY...','...GGGGGYYYY....','...GGGGGGYY......','....GGGGG........','.....GGG.........','......G..........','.....GGG.........','....GG.GG........','...GG...GG.......'];
 const colors={Y:'#f4df52',G:'#58a832',B:'#6fc5cf'};
 let x=0,y=40,tx=x,ty=y,lastMove=0,lastPointerX=0,flip=false,lastTargetAt=0,phase=0,wing=0;
 const isMobile=()=>matchMedia('(max-width:900px)').matches;
 function draw(now){
   ctx.clearRect(0,0,64,64);
   const px=3,ox=8,oy=2;
   ctx.save();if(flip){ctx.translate(64,0);ctx.scale(-1,1)}
   grid.forEach((row,ry)=>[...row].forEach((ch,cx)=>{if(colors[ch]){ctx.fillStyle=colors[ch];ctx.fillRect(ox+cx*px,oy+ry*px,px,px)}}));
   // Pixel eye, cheek markings, and beak.
   ctx.fillStyle='#26352c';ctx.fillRect(38,17,3,3);ctx.fillStyle='#fff2cf';ctx.fillRect(38,17,1,1);
   ctx.fillStyle='#287ac1';ctx.fillRect(32,26,3,3);ctx.fillRect(29,29,3,3);
   ctx.fillStyle='#e5b64c';ctx.fillRect(44,23,3,3);
   // A two-frame wing animation makes the bird visibly flap while travelling.
   const flap=Math.sin(now/85);
   ctx.fillStyle=flap>0?'#347e32':'#75bd3e';
   if(Math.abs(flap)>.25){
     const wy=flap>0?27:32;
     ctx.fillRect(26,wy,6,3);ctx.fillRect(23,wy+3,6,3);ctx.fillRect(26,wy+6,3,3);
     ctx.fillStyle='#a5d94c';ctx.fillRect(26,wy+3,3,3);
   }
   // Tail feathers move slightly with each flap.
   ctx.fillStyle='#36852f';ctx.fillRect(29,48+(flap>0?-2:1),3,9);ctx.fillRect(32,48+(flap>0?1:-1),3,7);
   ctx.restore();
 }
 function perch(){const logo=document.querySelector('.logo'),branch=document.querySelector('.parakeet-branch');if(!logo||!branch)return{x:150,y:45};const l=logo.getBoundingClientRect(),b=branch.getBoundingClientRect();return{x:Math.min(b.left+b.width*.68,l.right+95),y:b.top-3}}
 function pointer(e){
   if(isMobile())return;
   const now=performance.now();lastMove=now;
   if(now-lastTargetAt<95)return;lastTargetAt=now;
   const dx=e.clientX-lastPointerX;lastPointerX=e.clientX;
   // Follow with a trailing offset and small variation rather than snapping to the cursor.
   tx=e.clientX+(dx<0?30:-30)+(Math.sin(now/240)*9);
   ty=e.clientY-24+Math.sin(now/190)*12;
   if(Math.abs(dx)>1)flip=dx<0;
 }
 window.addEventListener('pointermove',pointer,{passive:true});
 function frame(now){
   const idle=isMobile()||now-lastMove>2600;
   if(idle){const p=perch();tx=p.x;ty=p.y}
   const easing=reduce?1:(idle?.055:.045);
   x+=(tx-x)*easing;y+=(ty-y)*easing;
   // Subtle mid-flight flutter keeps the motion organic without moving the resting perch.
   if(!idle&&!reduce){x+=Math.sin(now/260)*.22;y+=Math.sin(now/170)*.28}
   const size=isMobile()?52:64;
   canvas.style.width=size+'px';canvas.style.height=size+'px';
   canvas.style.transform='translate3d('+(x-size/2)+'px,'+(y-size/2)+'px,0)';
   draw(now);
   requestAnimationFrame(frame);
 }
 const p=perch();x=tx=p.x;y=ty=p.y;lastMove=performance.now();draw(0);requestAnimationFrame(frame);
})();