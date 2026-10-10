(()=>{const RT=document.documentElement,dm=false,fine=matchMedia('(pointer:fine)').matches;
const c=document.createElement('canvas');c.id='bg';document.body.prepend(c);const x=c.getContext('2d');
let W,H,mx=-999,my=-999,cols=['#34D399','#FDE047','#FB923C'],run=false;const N=innerWidth<700?24:78,pts=[];
let lw=innerWidth;const R=()=>{W=c.width=innerWidth;H=c.height=innerHeight};R();addEventListener('resize',()=>{if(innerWidth!=lw){lw=innerWidth;R()}});
for(let i=0;i<N;i++)pts.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.28,vy:(Math.random()-.5)*.28,k:i%3});
/* ألوان النقط بتتبع الثيم المختار */
const rc=()=>{const s=getComputedStyle(RT);cols=['--g1','--g2','--g3'].map((v,i)=>s.getPropertyValue(v).trim()||cols[i])};
const on=()=>RT.dataset.bg!='off'&&RT.dataset.an!='off',co=matchMedia('(pointer:coarse)').matches;let lt=0;
function f(t){if(!on()||document.hidden){x.clearRect(0,0,W,H);run=false;return}
 if(co&&t&&t-lt<33){requestAnimationFrame(f);return}lt=t||0;
 x.clearRect(0,0,W,H);const dk=RT.dataset.t=='dark',lc=dk?'140,200,255':'20,60,110';
 pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1});
 /* نفس الشكل بالظبط، بس الخطوط والنقط بتترسم على دفعات (٤ مستويات شفافية + لون لكل مجموعة) بدل مئات الأوامر في كل فريم */
 const LV=4,bk=[[],[],[],[]],mx2=190*190;x.lineWidth=1;
 for(let i=0;i<N;i++){const a=pts[i];
  for(let j=i+1;j<N;j++){const b=pts[j],dx=a.x-b.x,dy=a.y-b.y,d2=dx*dx+dy*dy;if(d2<22500){const k=Math.min(LV-1,((1-Math.sqrt(d2)/150)*LV)|0);bk[k].push(a,b)}}}
 for(let k=0;k<LV;k++){const L=bk[k];if(!L.length)continue;x.strokeStyle=`rgba(${lc},${((k+.5)/LV)*.18})`;x.beginPath();for(let n=0;n<L.length;n+=2){x.moveTo(L[n].x,L[n].y);x.lineTo(L[n+1].x,L[n+1].y)}x.stroke()}
 for(let i=0;i<N;i++){const a=pts[i],dx=a.x-mx,dy=a.y-my;if(dx*dx+dy*dy<mx2){const q=Math.sqrt(dx*dx+dy*dy);x.strokeStyle=cols[a.k];x.globalAlpha=(1-q/190)*.75;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(mx,my);x.stroke()}}
 x.globalAlpha=.85;
 for(let c=0;c<3;c++){x.fillStyle=cols[c];x.beginPath();for(let i=0;i<N;i++){const a=pts[i];if(a.k!==c)continue;const dx=a.x-mx,dy=a.y-my,r=dx*dx+dy*dy<mx2?2.7:1.6;x.moveTo(a.x+r,a.y);x.arc(a.x,a.y,r,0,6.3)}x.fill()}
 x.globalAlpha=1;
 if(dm){run=false;return}requestAnimationFrame(f)}
const start=()=>{if(run||!on())return;run=true;rc();f()};
rc();start();
/* تغيير الإعدادات من صفحة المظهر */
document.addEventListener('visibilitychange',()=>{if(!document.hidden)start()});
addEventListener('gx',()=>{rc();if(on()){if(dm)f();else start()}else{x.clearRect(0,0,W,H);run=false}});
let ox=innerWidth/2,oy=innerHeight/2,tx=ox,ty=oy;
if(fine&&!dm){const o=document.createElement('div');o.id='orb';document.body.prepend(o);let wx=NaN,wy=NaN;(function L(){ox+=(tx-ox)*.08;oy+=(ty-oy)*.08;if(on()&&(!(Math.abs(ox-wx)<.05)||!(Math.abs(oy-wy)<.05))){wx=ox;wy=oy;o.style.transform=`translate(${ox-250}px,${oy-250}px)`}requestAnimationFrame(L)})()}
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;tx=mx;ty=my;
 const g=e.target.closest&&e.target.closest('.card,.row3,.ti,.bcard,.pal');
 if(g){const b=g.getBoundingClientRect(),px=e.clientX-b.left,py=e.clientY-b.top;g.style.setProperty('--mx',px+'px');g.style.setProperty('--my',py+'px');
  if(e.pointerType=='mouse'&&g.matches('.card')){g.style.setProperty('--ry',((px/b.width-.5)*-9).toFixed(1)+'deg');g.style.setProperty('--rx',((py/b.height-.5)*7).toFixed(1)+'deg')}}
 const gl=document.querySelector('.globe');if(gl){gl.style.setProperty('--gx',((mx/innerWidth-.5)*-26).toFixed(1)+'px');gl.style.setProperty('--gy',((my/innerHeight-.5)*-18).toFixed(1)+'px')}
 document.querySelectorAll('.mag').forEach(m=>{const b=m.getBoundingClientRect(),dx=e.clientX-(b.left+b.width/2),dy=e.clientY-(b.top+b.height/2),d=Math.hypot(dx,dy);m.style.setProperty('--tx',d<100?dx*.22+'px':'0px');m.style.setProperty('--ty',d<100?dy*.22+'px':'0px')})});
document.addEventListener('pointerout',e=>{const g=e.target.closest&&e.target.closest('.card');if(g&&!g.contains(e.relatedTarget)){g.style.setProperty('--rx','0deg');g.style.setProperty('--ry','0deg')}});
document.addEventListener('pointerleave',()=>{mx=my=-999});
document.addEventListener('click',e=>{const t=e.target.closest('.btn,.row3,.ti,.pal,.bcard');if(!t)return;const b=t.getBoundingClientRect(),r=document.createElement('span');r.className='rip';r.style.left=e.clientX-b.left+'px';r.style.top=e.clientY-b.top+'px';t.append(r);setTimeout(()=>r.remove(),700)});
const sp=document.getElementById('sp');addEventListener('scroll',()=>{const h=document.documentElement;sp.style.setProperty('--p',(h.scrollTop/((h.scrollHeight-h.clientHeight)||1)).toFixed(3))},{passive:true});
})();
