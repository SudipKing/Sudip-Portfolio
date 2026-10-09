(function(){
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const id=a.getAttribute('href');if(id==="#"||!document.querySelector(id))return;e.preventDefault();document.querySelector(id).scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});});
 const canvas=document.getElementById('parakeet-bird');if(!canvas)return;const ctx=canvas.getContext('2d');
 const grid=['......YYYY......','.....YYYYYY.....','....YYYYYYYY....','...YYYGYYYYYY...','...YYGGGGBBYY...','..YYGGGGGBBBY...','..YGGGGGGGBBY...','..YGGGGGGGYYY...','..YGGGGGGYYYY...','..YGGGGGYYYYY...','..YGGGGYYYYYY...','...GGGGGYYYY....','...GGGGGGYY......','....GGGGG........','.....GGG.........','......G..........','.....GGG.........','....GG.GG........','...GG...GG.......'];
 const colors={Y:'#f4df52',G:'#58a832',B:'#6fc5cf'};let x=0,y=40,tx=x,ty=y,lastMove=0,flip=false;
 const isMobile=()=>matchMedia('(max-width:900px)').matches;
 function draw(){ctx.clearRect(0,0,64,64);const px=3,ox=8,oy=2;ctx.save();if(flip){ctx.translate(64,0);ctx.scale(-1,1)}grid.forEach((row,ry)=>[...row].forEach((ch,cx)=>{if(colors[ch]){ctx.fillStyle=colors[ch];ctx.fillRect(ox+cx*px,oy+ry*px,px,px)}}));ctx.fillStyle='#26352c';ctx.fillRect(38,17,3,3);ctx.fillStyle='#fff2cf';ctx.fillRect(38,17,1,1);ctx.fillStyle='#287ac1';ctx.fillRect(32,26,3,3);ctx.fillRect(29,29,3,3);ctx.fillStyle='#e5b64e';ctx.fillRect(44,23,3,3);ctx.restore()}
 function perch(){const logo=document.querySelector('.logo'),branch=document.querySelector('.parakeet-branch');if(!logo||!branch)return{x:150,y:45};const l=logo.getBoundingClientRect(),b=branch.getBoundingClientRect();return{x:Math.min(b.left+b.width*.68,l.right+95),y:b.top-3}}
 function pointer(e){if(isMobile())return;tx=e.clientX+25;ty=e.clientY-28;lastMove=performance.now();flip=e.movementX<0}
 window.addEventListener('pointermove',pointer,{passive:true});
 function frame(now){if(isMobile()||now-lastMove>2200){const p=perch();tx=p.x;ty=p.y}const ease=reduce?1:.13;x+=(tx-x)*ease;y+=(ty-y)*ease;const size=isMobile()?52:64;canvas.style.width=size+'px';canvas.style.height=size+'px';canvas.style.transform='translate3d('+(x-size/2)+'px,'+(y-size/2)+'px,0)';draw();requestAnimationFrame(frame)}
 const p=perch();x=tx=p.x;y=ty=p.y;lastMove=performance.now();draw();requestAnimationFrame(frame);
})();