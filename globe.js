/* كرة أرضية بخريطة (مرسومة بالكود، من غير أي تحميل خارجي) + موقع الجهاز */
(()=>{
const cv=document.getElementById('gcv');if(!cv)return;
const RT=document.documentElement,ctx=cv.getContext('2d'),D=Math.PI/180;
const P=s=>s.trim().split(/\s+/).map(p=>p.split(',').map(Number));
const dens=a=>{const o=[];for(let i=0;i<a.length;i++){const p=a[i],q=a[(i+1)%a.length],n=Math.max(1,Math.ceil(Math.hypot(q[0]-p[0],q[1]-p[1])/4));for(let k=0;k<n;k++)o.push([p[0]+(q[0]-p[0])*k/n,p[1]+(q[1]-p[1])*k/n])}return o};
const LAND=[
/* أفريقيا */ "-5.9,35.8 -2,35.1 3,36.8 10,37.3 11,35 10.2,33.8 13.2,32.9 16,31 19.5,30.3 20.1,32.1 22,32.9 25,31.6 29,30.9 29.9,31.2 32.3,31.3 34.2,31.3 34.9,29.5 34.25,27.75 33.8,27.2 35.5,24 37.2,21 38.5,18 39.5,15.5 41.5,13.5 43.3,11.6 44.5,10.4 51,11.8 51,10.4 48,4.5 43,-1 41,-2 39.5,-4.7 39,-7 40.5,-10.5 40.5,-15 37,-18 35,-20 33,-26 32.9,-28.5 30,-31 27,-33.5 22,-34 18.5,-34.2 18,-31 15,-27 14.5,-22.5 12,-17 13.5,-12 12.2,-6 9,-1 9.5,3.8 6,4.3 4,6.3 0,5.7 -3,5 -7.5,4.4 -11,6.7 -13.5,9 -16.5,12.5 -17.5,14.7 -16.5,19.5 -17,21 -14.5,26 -12,28 -9.7,30 -9.8,32 -6.8,34",
/* أوروبا + آسيا */ "-5.4,36.1 -2.2,36.7 -0.3,38.5 0.9,41 3.2,41.9 3.1,43.2 6,43.1 8,43.8 7.2,44.5 7,46 13.5,46.5 13.7,45.5 14.5,45 16,43.5 19,42 19.5,40.5 21,38 23,36.5 24,38 23,40 26,40.8 29,41 26.5,38.5 27.3,37 29,36.5 32,36.1 34.5,36.7 36,36.6 36,35 35.1,33 34.4,31.5 34.9,29.5 35,28 36.5,26 38.5,24 39.2,21.5 40.5,19 42.5,16.5 43.2,13 45,12.8 48.5,14 52,16 55.5,17.5 57.5,19 59,22.5 56.3,26.3 54.5,24.5 51.6,24.6 51.6,25.9 50.4,26.2 49.5,28 48.5,29.9 49.5,30 50.8,28.8 52.6,27.4 54.5,26.6 56.3,27.1 57.3,25.7 61.5,25.2 66.5,25.4 70,22 72.7,21 73,17 75,12 77.5,8.1 80.3,13 82,16.5 86.5,20.5 88.5,22 91,22.5 92.5,20 94.5,16 97.5,16.5 98.3,8 100.3,5.5 101.3,2.5 103.5,1.3 103.5,4 102.2,6.5 100.8,13 105,10 107,10.5 109.3,12.5 109,15 107,17 106,20.5 108,21.5 110.5,21 114,22.3 117,23.5 119.5,25.5 121.5,28 121.8,30.8 120.5,32 119.5,34.5 121,36.5 122.5,37.3 118,38.8 121.5,39 122,40.6 124.5,39.8 125.2,37.6 126.5,34.5 129.3,35.2 129.5,37 128,38.5 129.7,41 131,43 135.5,43.5 140.5,48 141.3,52 143,59 150,59.5 155.5,59.5 156.5,57 158,52 160,61 164,60 170,60 177,62.5 179.5,65 180,68.5 160,69.5 140,72.5 130,71 113,73.7 104,77.7 90,75.5 80,73.5 72.5,72.8 67,69 60,69.5 53,68.5 44,68.5 40,66.5 33,69.3 29,70.1 21,70 14,67.5 10,63.5 5.2,62 5,58.5 8.3,55 8.6,54 5,53 3.5,51.3 1.5,50 -1.8,48.7 -4.7,48.4 -2.5,47.3 -1.3,44.5 -1.8,43.4 -8,43.7 -9.2,43 -8.9,41.5 -9.5,38.7 -8.9,37.1 -6.3,36.6",
/* إيطاليا */ "8.5,44.4 10.2,43.9 12.4,41.7 15.7,40 16,38.1 16.5,38.5 17,39.5 18.5,40.1 16.5,41.5 14,42.5 12.5,44.2 12.3,45.3 13,45.5 10,44.5",
/* بريطانيا */ "-5.7,50 1.4,51 1.7,52.7 -0.2,53.6 -2,55.8 -1.8,57.6 -3.5,58.6 -5.5,58.4 -6,56.5 -5,55 -3,54.6 -3,53.3 -4.5,53.3 -4.2,52.2 -5.2,51.7 -3,51.3",
/* أيرلندا */ "-10,52 -6,52.2 -6,54.2 -8,55.2 -10,54",
/* قبرص */ "32.3,35 34.5,35.7 34.6,35.1 33,34.6",
/* كريت */ "23.5,35.3 26.3,35.2 24,35.1",
/* صقلية */ "12.5,38.1 15.6,38.3 15.1,36.7 12.5,37.6",
/* مدغشقر */ "49.3,-12 50.4,-15.5 47.5,-24.5 44,-25 43.3,-22 44.5,-16.5 47,-15",
/* اليابان */ "130.5,31.3 132,33.8 135,33.5 137,34.6 140,35 141,38 141.5,41.2 140,40 139.5,38 137,37 133,35.5 131,34.5",
/* جرينلاند */ "-73,78 -60,82 -30,83.5 -20,80 -18,76 -22,70 -32,68 -42,60 -50,62 -54,67 -58,75",
/* الأمريكتين */ "-168,65.5 -157,71 -140,69.5 -125,70 -95,69 -82,69 -80,63 -94,59 -92,57 -82,55 -79,51.5 -78,62 -72,61 -65,60 -61,56 -56,52 -60,47 -66,44.5 -70,43 -74,40.5 -76,37 -76,35 -81,31 -80,26 -82,26.5 -83,29.5 -89,30 -94,29.5 -97.5,26 -97.8,22 -96,19 -94,18.3 -91,19 -90.5,21 -87,21.5 -88,16 -84,15.7 -83.5,11 -80,9 -77,8 -72,12 -67,10.7 -62,10.7 -60,8.5 -55,6 -51,4.5 -50,0 -44,-2.5 -38,-3.7 -35,-5.5 -35,-9 -39,-13.5 -39,-18 -41,-22 -45,-23.5 -48.5,-26 -49,-29 -52,-32 -54,-34.5 -58,-34.8 -57,-37 -62,-39 -65,-41 -64.5,-43 -67.5,-46.5 -66,-48 -69,-51 -68.5,-52.5 -72,-53.5 -74,-50 -75.5,-47 -73.5,-42 -73.5,-37 -71.5,-32 -70.3,-27 -70.5,-18.5 -76,-14 -79,-8 -81,-5 -80,-2 -80.5,0.5 -78.5,2 -77.3,7.5 -79.5,7.5 -83,8.2 -85.7,10 -87.5,13 -91.5,14 -94.5,16 -97,15.8 -101,17.5 -105.5,20.5 -105.5,23 -109,25.5 -112.5,29 -114.8,31.5 -112.2,27 -110,23 -115,28 -117,32.5 -120.5,34.5 -124,40 -124.5,46 -123,48.5 -128,51 -133,55 -140,59.5 -146,60.5 -152,59 -158,57 -163,55 -158,58.7 -162,60 -165,62 -161,64.5",
/* أستراليا */ "113,-22 114,-26 115,-34 118,-35 123.5,-34 129,-31.7 134,-32.7 137.5,-35.3 140,-37.7 145,-38.3 150,-37.5 153,-31 153,-25 149,-20 146,-18.8 145.3,-14.5 143.5,-11 141.5,-13 141.5,-17.5 139,-17.3 135.5,-15 136.8,-12.2 132,-11.3 129.5,-14.8 126,-14 122.2,-17.5 121,-19.5"
].map(s=>dens(P(s)));
const LAKES=["28,41.5 28.5,43.5 30,45.5 32,46.3 33.5,44.5 35.5,45.2 37.5,44.8 41.5,41.8 37,41 35,42 32,41.8 29,41.2","47,45 49,46.5 53,45.8 53,41.5 54,37.5 50.5,37 49,38.5 49.5,40.5 47.5,43"].map(s=>dens(P(s)));
const EGY=dens(P("25,31.6 27.2,31.4 29,30.9 29.9,31.2 31,31.6 32.3,31.3 34.2,31.3 34.9,29.5 34.25,27.75 33.8,27.2 35.5,24 36.9,22 25,22"));
const DELTA=dens(P("30.15,31.6 30.2,31.0 31.15,30.1 32.0,30.7 32.35,31.4 32.3,31.8"));
const NILE=[ "32.88,23.97 32.87,24.98 32.55,25.29 32.64,25.7 32.72,26.16 31.69,26.56 31.18,27.18 30.74,28.11 31.1,29.07 31.23,30.03 31.13,30.19", "31.13,30.19 30.9,30.6 30.55,31.0 30.42,31.46", "31.13,30.19 31.3,30.55 31.6,31.0 31.82,31.5" ].map(x=>dens(P(x)));
const SUEZ=dens(P("32.3,31.27 32.35,30.8 32.37,30.4 32.55,30.0"));
const LAKEN=dens(P("32.88,23.97 32.75,23.2 32.9,22.6 32.5,22.1 31.7,22.0"));
/* ===== بيانات حدود الدول الحقيقية (Natural Earth عن طريق world-atlas) مع نسخة احتياطية مرسومة بالكود ===== */
const toV=(lo,la)=>{const a=lo*D,b=la*D,c=Math.cos(b);return[c*Math.cos(a),c*Math.sin(a),Math.sin(b)]};
function prep(id,ring,simp){const V=[];let last=null;
 ring.forEach((q,i)=>{const v=toV(q[0],q[1]);if(!last||i==ring.length-1||Math.hypot(v[0]-last[0],v[1]-last[1],v[2]-last[2])>=simp){V.push(v);last=v}});
 const o=[];for(let i=0;i<V.length;i++){const a=V[i],b=V[(i+1)%V.length];o.push(a);if(i==V.length-1)break;
  const d=Math.min(1,a[0]*b[0]+a[1]*b[1]+a[2]*b[2]),n=Math.ceil(Math.acos(d)/(3*D));
  for(let k=1;k<n;k++){const t=k/n,x=a[0]+(b[0]-a[0])*t,y=a[1]+(b[1]-a[1])*t,z=a[2]+(b[2]-a[2])*t,h=Math.hypot(x,y,z)||1;o.push([x/h,y/h,z/h])}}
 const n=o.length,p=new Float32Array(n*3);let cx=0,cy=0,cz=0;
 o.forEach((v,i)=>{p[i*3]=v[0];p[i*3+1]=v[1];p[i*3+2]=v[2];cx+=v[0];cy+=v[1];cz+=v[2]});
 const h=Math.hypot(cx,cy,cz)||1;cx/=h;cy/=h;cz/=h;let rad=0;
 o.forEach(v=>{rad=Math.max(rad,Math.acos(Math.max(-1,Math.min(1,v[0]*cx+v[1]*cy+v[2]*cz))))});
 return{id:String(id),p,n,c:[cx,cy,cz],rad,eg:String(id)=='818'}}
function decode(t,name){const tf=t.transform,arcs=t.arcs.map(a=>{let x=0,y=0;return a.map(q=>{x+=q[0];y+=q[1];return tf?[x*tf.scale[0]+tf.translate[0],y*tf.scale[1]+tf.translate[1]]:[x,y]})});
 const ring=r=>{const out=[];r.forEach(i=>{const a=i<0?arcs[~i].slice().reverse():arcs[i];for(let k=out.length?1:0;k<a.length;k++)out.push(a[k])});return out};
 const F=[];(function w(g){if(g.type=='GeometryCollection')g.geometries.forEach(w);else if(g.type=='Polygon')F.push({id:g.id,r:ring(g.arcs[0])});else if(g.type=='MultiPolygon')g.arcs.forEach(pl=>F.push({id:g.id,r:ring(pl[0])}))})(t.objects[name]);return F}
/* ===== وضع العرض: WebGL (سريع وخفيف) أو الرسم القديم بالـ 2D لو الجهاز مش بيدعمه ===== */
const co=matchMedia('(pointer:coarse)').matches;
let GLM=null,DATA=[],lvl=0,RINGS=LAND.map(r=>({id:'',r})).concat([{id:'818',r:EGY}]),texDirty=true,texDark=null;
const prepAll=()=>{DATA=RINGS.map(f=>prep(f.id,f.r,lvl>=2?(co?.01:.0008):0))};
const BASE='https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/';
function load(file,simp,L){return fetch(BASE+file).then(r=>{if(!r.ok)throw 0;return r.json()}).then(t=>{const F=decode(t,t.objects.countries?'countries':Object.keys(t.objects)[0]),d=[];
 F.forEach(f=>{if(f.r&&f.r.length>3)d.push(f)});if(d.length&&L>lvl){RINGS=d;lvl=L;texDirty=true;if(!GLM)prepAll()}}).catch(()=>{})}
/* الخريطة بتتحمّل بعد ما الصفحة تهدى عشان متعطلش أول ظهور (وعلى الموبايل بنكتفي بالنسخة الأخف في الوضع الاحتياطي) */
const later=f=>('requestIdleCallback' in window)?requestIdleCallback(f,{timeout:2500}):setTimeout(f,300);
later(()=>{load('countries-110m.json',0,1).then(()=>later(()=>{if(!co&&!SOFT)load('countries-50m.json',.0008,2)}))});
let loc={lat:30.55,lon:31.01},src='def';
try{const s=JSON.parse(localStorage.gxloc||'null');if(s&&isFinite(s.lat)&&isFinite(s.lon)){loc=s;src='gps'}}catch(e){}
const save=(l,s)=>{loc=l;src=s;try{localStorage.gxloc=JSON.stringify(l)}catch(e){}};
async function byIP(){try{const r=await fetch('https://get.geojs.io/v1/ip/geo.json');const j=await r.json();const la=parseFloat(j.latitude),lo=parseFloat(j.longitude);if(isFinite(la)&&isFinite(lo))save({lat:+la.toFixed(2),lon:+lo.toFixed(2)},'ip')}catch(e){}}
function ask(){if(!navigator.geolocation){byIP();return}
 navigator.geolocation.getCurrentPosition(p=>save({lat:+p.coords.latitude.toFixed(2),lon:+p.coords.longitude.toFixed(2)},'gps'),()=>byIP(),{timeout:9000,maximumAge:6e5})}
ask();cv.style.cursor='pointer';cv.addEventListener('click',ask);

let S=0,R=0,dpr=1,GLC=null,SOFT=false;
const fit=()=>{const w=cv.getBoundingClientRect().width||cv.parentNode.clientWidth||300;dpr=Math.min(devicePixelRatio||1,GLM?(co?1.75:2):((co||SOFT)?1:2));S=Math.round(w*dpr);cv.width=cv.height=S;R=S*.39;if(GLC&&GLM&&(GLC.width!=S)){GLC.width=GLC.height=S}if(GLM&&texW()!=GLM.tw)texDirty=true};
fit();new ResizeObserver(()=>{fit();render(performance.now())}).observe(cv);
const proj=(lo,la,l0,p0)=>{const a=(lo-l0)*D,f=la*D,f0=p0*D,cf=Math.cos(f);return[cf*Math.sin(a),Math.cos(f0)*Math.sin(f)-Math.sin(f0)*cf*Math.cos(a),Math.sin(f0)*Math.sin(f)+Math.cos(f0)*cf*Math.cos(a)]};
const cssC={};const css=v=>cssC[v]!==undefined?cssC[v]:(cssC[v]=getComputedStyle(RT).getPropertyValue(v).trim());
function poly(pts,l0,p0,close){const c=S/2;let vis=0;ctx.beginPath();pts.forEach((q,i)=>{let[x,y,z]=proj(q[0],q[1],l0,p0);if(z<0){const h=Math.hypot(x,y)||1;x/=h;y/=h}else vis++;const X=c+R*x,Y=c-R*y;i?ctx.lineTo(X,Y):ctx.moveTo(X,Y)});if(close)ctx.closePath();return vis}
function line(pts,l0,p0){const c=S/2;ctx.beginPath();let pen=false;pts.forEach(q=>{const[x,y,z]=proj(q[0],q[1],l0,p0);if(z<0){pen=false;return}const X=c+R*x,Y=c-R*y;pen?ctx.lineTo(X,Y):ctx.moveTo(X,Y);pen=true})}
const fmt=l=>`${Math.abs(l.lat).toFixed(2)}°${l.lat>=0?'N':'S'} ${Math.abs(l.lon).toFixed(2)}°${l.lon>=0?'E':'W'}`;
function orbit(back,t){const c=S/2,rx=R*1.25,ry=R*.36,a=t*.00075;ctx.save();ctx.translate(c,c);ctx.rotate(-24*D);
 ctx.strokeStyle=css('--ink')||'#fff';ctx.globalAlpha=.3;ctx.lineWidth=S*.003;ctx.setLineDash([S*.006,S*.016]);
 ctx.beginPath();ctx.ellipse(0,0,rx,ry,0,back?Math.PI:0,back?2*Math.PI:Math.PI);ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=1;
 const sy=Math.sin(a);if((sy<0)===back){ctx.fillStyle=css('--g2')||'#FDE047';ctx.beginPath();ctx.arc(rx*Math.cos(a),ry*sy,S*.012,0,6.3);ctx.fill()}ctx.restore()}
function draw(t){if(!S)return;const c=S/2,dk=RT.dataset.t!='light',en=RT.lang=='en';ctx.clearRect(0,0,S,S);
 const l0=loc.lon-9+14*Math.sin(t*.00028),p0=loc.lat-7+3*Math.sin(t*.00021);
 orbit(true,t);
 ctx.save();ctx.beginPath();ctx.arc(c,c,R,0,6.3);ctx.clip();
 let g=ctx.createRadialGradient(c-R*.35,c-R*.4,R*.05,c,c,R*1.05);
 if(dk){g.addColorStop(0,'#2b86c4');g.addColorStop(.55,'#12498a');g.addColorStop(1,'#071a33')}else{g.addColorStop(0,'#8fd0f5');g.addColorStop(.6,'#3f95d6');g.addColorStop(1,'#1f62a6')}
 ctx.fillStyle=g;ctx.fillRect(0,0,S,S);
 const land=dk?'#2f7a5c':'#5fae7a',edge=dk?'rgba(190,255,225,.4)':'rgba(255,255,255,.65)';
 const cl=Math.cos(l0*D),sl=Math.sin(l0*D),cp=Math.cos(p0*D),sp=Math.sin(p0*D),vx=cp*cl,vy=cp*sl,vz=sp,md=.45*dpr;
 const ring=f=>{const P=f.p,n=f.n;let px=-1e9,py=-1e9,vis=0,first=true;ctx.beginPath();
  for(let i=0;i<n;i++){const X=P[i*3],Y=P[i*3+1],Z=P[i*3+2],x1=X*cl+Y*sl;let sx=Y*cl-X*sl,sy=Z*cp-x1*sp;
   if(Z*sp+x1*cp<0){const h=Math.hypot(sx,sy)||1;sx/=h;sy/=h}else vis++;
   const X2=c+R*sx,Y2=c-R*sy;if(!first&&i<n-1&&Math.abs(X2-px)+Math.abs(Y2-py)<md)continue;
   first?ctx.moveTo(X2,Y2):ctx.lineTo(X2,Y2);first=false;px=X2;py=Y2}
  ctx.closePath();return vis};
 const seen=f=>f.rad>1.5||f.c[0]*vx+f.c[1]*vy+f.c[2]*vz>-Math.sin(f.rad);
 ctx.lineWidth=Math.max(S*.0012,.6*dpr);ctx.strokeStyle=edge;ctx.fillStyle=land;ctx.lineJoin='round';
 let eg=null;DATA.forEach(f=>{if(f.eg)eg=f;if(f.eg||!seen(f))return;if(ring(f)){ctx.fill();ctx.stroke()}});
 if(lvl==0){ctx.fillStyle=dk?'#12498a':'#3f95d6';LAKES.forEach(p=>{if(poly(p,l0,p0,true))ctx.fill()})}
 /* مصر */
 if(eg&&seen(eg)){ctx.fillStyle=dk?'#c9a35e':'#d9b873';ctx.strokeStyle='rgba(255,236,170,.95)';ctx.lineWidth=S*.0024;
  if(ring(eg)){ctx.fill();ctx.stroke();ring(eg);ctx.save();ctx.clip();
   ctx.fillStyle='#34b36b';if(poly(DELTA,l0,p0,true))ctx.fill();
   ctx.strokeStyle='#4aa8e8';ctx.lineWidth=S*.0022;ctx.lineCap='round';line(SUEZ,l0,p0);ctx.stroke();
   ctx.lineWidth=S*.0058;line(LAKEN,l0,p0);ctx.stroke();
   ctx.strokeStyle='#38d67f';ctx.lineWidth=S*.0034;NILE.forEach(n=>{line(n,l0,p0);ctx.stroke()});ctx.restore()}}
 /* شبكة الإحداثيات */
 ctx.strokeStyle=dk?'rgba(190,225,255,.22)':'rgba(255,255,255,.4)';ctx.lineWidth=S*.0012;
 for(let la=-60;la<=60;la+=30){const a=[];for(let lo=-180;lo<=180;lo+=5)a.push([lo,la]);line(a,l0,p0);ctx.stroke()}
 for(let lo=-180;lo<180;lo+=30){const a=[];for(let la=-90;la<=90;la+=5)a.push([lo,la]);line(a,l0,p0);ctx.stroke()}
 /* ظل وإضاءة */
 g=ctx.createRadialGradient(c-R*.4,c-R*.45,R*.3,c,c,R*1.02);g.addColorStop(0,'rgba(255,255,255,.10)');g.addColorStop(.6,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,10,30,.55)');ctx.fillStyle=g;ctx.fillRect(0,0,S,S);
 ctx.restore();
 /* حافة الغلاف الجوي */
 ctx.save();ctx.strokeStyle=css('--g1')||'#34D399';ctx.globalAlpha=.75;ctx.lineWidth=S*.004;ctx.shadowColor=ctx.strokeStyle;ctx.shadowBlur=S*.03;ctx.beginPath();ctx.arc(c,c,R,0,6.3);ctx.stroke();ctx.restore();
 /* اسم مصر */
 const ink=css('--ink')||'#fff',[ex,ey,ez]=proj(29.6,26.6,l0,p0);
 const nearU=Math.hypot(loc.lon-29.6,loc.lat-26.6)<7;
 if(ez>.25&&!nearU){ctx.save();ctx.font=`700 ${S*.026}px "IBM Plex Sans Arabic",sans-serif`;ctx.textAlign='center';ctx.fillStyle='#fff7d6';ctx.shadowColor='#000';ctx.shadowBlur=S*.008;ctx.fillText(en?'EGYPT':'مصر',c+R*ex,c-R*ey);ctx.restore()}
 /* مكان الجهاز */
 const[x,y,z]=proj(loc.lon,loc.lat,l0,p0);
 if(z>.05){const X=c+R*x,Y=c-R*y,k=(t%2000)/2000;
  ctx.strokeStyle=css('--g3')||'#FB923C';ctx.globalAlpha=.8*(1-k);ctx.lineWidth=S*.004;ctx.beginPath();ctx.arc(X,Y,S*.01+S*.045*k,0,6.3);ctx.stroke();ctx.globalAlpha=1;
  ctx.fillStyle=ctx.strokeStyle;ctx.beginPath();ctx.arc(X,Y,S*.011,0,6.3);ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=S*.003;ctx.stroke();
  const right=X<c+R*.45,cap=src=='gps'?(en?'You are here':'موقعك'):src=='ip'?(en?'Approx. location':'موقعك التقريبي'):(en?'Menoufia':'المنوفية');
  ctx.save();ctx.textAlign=right?'left':'right';const ox=(right?1:-1)*S*.025;ctx.shadowColor='rgba(0,0,0,.7)';ctx.shadowBlur=S*.01;ctx.fillStyle='#fff';
  const f1=Math.max(S*.03,11*dpr),f2=Math.max(S*.024,9.5*dpr);ctx.font=`500 ${f1}px "IBM Plex Mono",monospace`;ctx.fillText(fmt(loc),X+ox,Y-S*.012);
  ctx.font=`500 ${f2}px "IBM Plex Sans Arabic",sans-serif`;ctx.globalAlpha=.85;ctx.fillText(cap,X+ox,Y+S*.022);ctx.restore()}
 orbit(false,t)}
/* =====================================================================
   العرض السريع (WebGL): الخريطة بتترسم مرة واحدة على "تكستشر" مسطّح،
   والكرة نفسها بيحسبها كارت الشاشة في كل فريم (من غير ما المعالج يرسم أي حدود).
   لو WebGL2 مش متاح بيرجع تلقائياً للرسم القديم فوق.
   ===================================================================== */
const VS=`#version 300 es
void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}`;
const FS=`#version 300 es
precision highp float;
uniform sampler2D uT;uniform vec2 uC;uniform float uR,uL0,uP0,uSig,uHw;uniform vec3 uO0,uO1,uO2,uRim;
out vec4 o;const float PI=3.14159265359;
float grad(vec2 q,vec2 e,float r0,float dr){float A=dot(e,e)-dr*dr,B=-(2.*dot(q,e)+2.*r0*dr),C=dot(q,q)-r0*r0;
 float d=B*B-4.*A*C;if(d<0.)d=0.;d=sqrt(d);float t1=(-B+d)/(2.*A),t2=(-B-d)/(2.*A);
 float t=(r0+t1*dr>=0.)?max(t1,t2):t2;if(r0+t1*dr<0.&&r0+t2*dr<0.)t=0.;return clamp(t,0.,1.);}
void main(){
 vec2 p=(gl_FragCoord.xy-uC)/uR;float r2=dot(p,p),r=sqrt(r2);
 float dpx=(r-1.)*uR;
 /* حافة الغلاف الجوي (خط + توهج) */
 float line=(1.-smoothstep(uHw-.8,uHw+.8,abs(dpx)))*.75,glow=exp(-dpx*dpx/(2.*uSig*uSig))*.12;
 float ar=max(line,glow);
 float a=clamp(-dpx+.5,0.,1.);
 vec3 col;
 {
  float z=sqrt(max(0.,1.-r2)),sp=sin(uP0),cp=cos(uP0);
  float sph=clamp(p.y*cp+z*sp,-1.,1.);
  float lon=uL0+atan(p.x,z*cp-p.y*sp);
  float u=lon/(2.*PI)+.5,v=.5-asin(sph)/PI;
  vec2 A=vec2(u,v),B=vec2(fract(u+.5)-.5,v);
  vec2 dx=abs(dFdx(A.x))<abs(dFdx(B.x))?dFdx(A):dFdx(B),dy=abs(dFdy(A.x))<abs(dFdy(B.x))?dFdy(A):dFdy(B);
  vec4 tx=textureGrad(uT,vec2(fract(u),v),dx,dy);
  float t=grad(p-vec2(-.35,.4),vec2(.35,-.4),.05,1.0);
  vec3 oc=t<.55?mix(uO0,uO1,t/.55):mix(uO1,uO2,(t-.55)/.45);
  col=tx.rgb+oc*(1.-tx.a);
  /* ظل وإضاءة */
  float s=grad(p-vec2(-.4,.45),vec2(.4,-.45),.3,.72);
  float wa=s<.6?.10*(1.-s/.6):0.;
  float da=s>.6?.55*(s-.6)/.4:0.;
  col=col*(1.-wa)+vec3(wa);
  col=col*(1.-da)+vec3(0.,10.,30.)/255.*da;
 }
 /* premultiplied */
 vec3 pc=col*a;float al=a;
 pc=pc*(1.-ar)+uRim*ar;al=al*(1.-ar)+ar;
 o=vec4(pc,al);
}`;
const hex=h=>{h=h.replace('#','');return[parseInt(h.slice(0,2),16)/255,parseInt(h.slice(2,4),16)/255,parseInt(h.slice(4,6),16)/255]};
const OCN={d:['#2b86c4','#12498a','#071a33'].map(hex),l:['#8fd0f5','#3f95d6','#1f62a6'].map(hex)};
function glSetup(){try{
 const c=document.createElement('canvas'),gl=c.getContext('webgl2',{alpha:true,premultipliedAlpha:true,antialias:false,depth:false,stencil:false,powerPreference:'low-power'});
 if(!gl)return null;
 /* لو الجهاز مفيش عنده كارت شاشة شغال (WebGL بالبرنامج) الرسم القديم المخفّف أسرع */
 const dbg=gl.getExtension('WEBGL_debug_renderer_info'),rn=dbg?String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)):'';
 if(/swiftshader|llvmpipe|software|basic render/i.test(rn)&&!window.__GX_FORCE_GL){SOFT=true;return null}
 const sh=(t,src)=>{const x=gl.createShader(t);gl.shaderSource(x,src);gl.compileShader(x);if(!gl.getShaderParameter(x,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(x));return x};
 const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);
 if(!gl.getProgramParameter(pr,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(pr));
 gl.useProgram(pr);gl.disable(gl.BLEND);
 const U={};['uT','uC','uR','uL0','uP0','uSig','uHw','uO0','uO1','uO2','uRim'].forEach(n=>U[n]=gl.getUniformLocation(pr,n));
 const tex=gl.createTexture();gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,tex);gl.uniform1i(U.uT,0);
 gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(4));
 c.addEventListener('webglcontextlost',e=>{e.preventDefault();GLM=null;if(!DATA.length)prepAll();fit()});
 c.addEventListener('webglcontextrestored',()=>{GLM=glSetup();if(GLM){texDirty=true;fit()}});
 GLC=c;return{gl,U,tex,tw:0,mx:gl.getParameter(gl.MAX_TEXTURE_SIZE),an:gl.getExtension('EXT_texture_filter_anisotropic')}
}catch(e){console.warn('globe: WebGL غير متاح، هيتم استخدام الرسم الاحتياطي —',e&&e.message);GLC=null;return null}}
/* مقاس التكستشر على حسب حجم الكرة على الشاشة (من غير ما يزيد عن اللازم) */
function texW(){let w=1024;while(w<Math.min(4096,R*6.3)&&w<4096)w*=2;return Math.min(w,GLM?GLM.mx:4096)}
/* ===== رسم الخريطة المسطّحة (بتتنفذ مرة واحدة، ومرة تانية لو الثيم أو البيانات اتغيرت) ===== */
const TC=document.createElement('canvas');
function buildTex(dk){
 const W=texW(),H=W/2,t=TC.getContext('2d');TC.width=W;TC.height=H;t.clearRect(0,0,W,H);
 const lw=Math.max(1,W/2048*1.1),X=lo=>(lo+180)/360*W,Y=la=>(90-la)/180*H;
 /* حلقة → مسار (بيتعامل مع خط التاريخ ±180 والقطبين) */
 const path=(ring,k)=>{const n=ring.length;if(n<3)return;const xs=new Float32Array(n);xs[0]=ring[0][0];let mn=xs[0],mx=xs[0],la=0;
  for(let i=1;i<n;i++){let x=ring[i][0];while(x-xs[i-1]>180)x-=360;while(x-xs[i-1]<-180)x+=360;xs[i]=x;if(x<mn)mn=x;if(x>mx)mx=x}
  for(let i=0;i<n;i++)la+=ring[i][1];
  const polar=Math.abs(xs[n-1]-xs[0])>300,pole=la/n<0?-90:90,offs=[0];if(mn<-180)offs.push(1);if(mx>180)offs.push(-1);
  offs.forEach(o=>{if(k!==undefined&&o!==k)return;const dx=o*W;t.moveTo(X(xs[0])+dx,Y(ring[0][1]));for(let i=1;i<n;i++)t.lineTo(X(xs[i])+dx,Y(ring[i][1]));
   if(polar){t.lineTo(X(xs[n-1])+dx,Y(pole));t.lineTo(X(xs[0])+dx,Y(pole))}t.closePath()})};
 const land=dk?'#2f7a5c':'#5fae7a',edge=dk?'rgba(190,255,225,.4)':'rgba(255,255,255,.65)';
 t.lineJoin='round';t.lineWidth=lw;t.fillStyle=land;t.strokeStyle=edge;
 const eg=[];t.beginPath();RINGS.forEach(f=>{if(String(f.id)=='818')eg.push(f);else path(f.r)});t.fill();t.stroke();
 if(lvl==0){t.globalCompositeOperation='destination-out';LAKES.forEach(p=>{t.beginPath();path(p);t.fill()});t.globalCompositeOperation='source-over'}
 /* مصر */
 if(eg.length){const ep=()=>{t.beginPath();eg.forEach(f=>path(f.r))};
  ep();t.fillStyle=dk?'#c9a35e':'#d9b873';t.strokeStyle='rgba(255,236,170,.95)';t.lineWidth=lw*2;t.fill();t.stroke();
  ep();t.save();t.clip();
  t.fillStyle='#34b36b';t.beginPath();path(DELTA);t.fill();
  const ln=(pts,w,c)=>{t.beginPath();pts.forEach((q,i)=>i?t.lineTo(X(q[0]),Y(q[1])):t.moveTo(X(q[0]),Y(q[1])));t.strokeStyle=c;t.lineWidth=w;t.stroke()};
  t.lineCap='round';ln(SUEZ,lw*1.83,'#4aa8e8');ln(LAKEN,lw*4.8,'#4aa8e8');NILE.forEach(n=>ln(n,lw*2.83,'#38d67f'));t.restore()}
 /* شبكة الإحداثيات */
 t.strokeStyle=dk?'rgba(190,225,255,.22)':'rgba(255,255,255,.4)';t.lineWidth=lw;t.beginPath();
 for(let la=-60;la<=60;la+=30){t.moveTo(0,Y(la));t.lineTo(W,Y(la))}
 for(let lo=-180;lo<=180;lo+=30){t.moveTo(X(lo),0);t.lineTo(X(lo),H)}
 t.stroke();
 const{gl,tex}=GLM;gl.bindTexture(gl.TEXTURE_2D,tex);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);
 gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,TC);gl.generateMipmap(gl.TEXTURE_2D);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
 if(GLM.an)gl.texParameterf(gl.TEXTURE_2D,GLM.an.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(4,gl.getParameter(GLM.an.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));
 GLM.tw=W;texDirty=false;texDark=dk}
/* ===== لافتات (اسم مصر + إحداثيات الموقع): بتتجهز مرة وبتتنسخ كل فريم ===== */
const SPR={};
function sprite(key,w,h,fn){let o=SPR[key.k];if(o&&o.s==key.s)return o;const c=document.createElement('canvas');c.width=Math.ceil(w);c.height=Math.ceil(h);fn(c.getContext('2d'));return SPR[key.k]={s:key.s,c}}
const PXC=document.createElement('canvas');PXC.width=PXC.height=1;const PXX=PXC.getContext('2d',{willReadFrequently:true});
function rgbOf(v,fb){const k='rgb:'+v;if(cssC[k])return cssC[k];PXX.clearRect(0,0,1,1);PXX.fillStyle=fb;PXX.fillStyle=css(v)||fb;PXX.fillRect(0,0,1,1);const d=PXX.getImageData(0,0,1,1).data;return cssC[k]=[d[0]/255,d[1]/255,d[2]/255]}
const mono=px=>`500 ${px}px "IBM Plex Mono",monospace`,sans=(px,w)=>`${w||500} ${px}px "IBM Plex Sans Arabic",sans-serif`;
document.fonts&&document.fonts.addEventListener&&document.fonts.addEventListener('loadingdone',()=>{for(const k in SPR)delete SPR[k]});
/* ===== فريم WebGL ===== */
function drawGL(t){
 if(!S)return;const c=S/2,dk=RT.dataset.t!='light',en=RT.lang=='en';
 if(texDirty||texDark!==dk)buildTex(dk);
 const l0=loc.lon-9+14*Math.sin(t*.00028),p0=loc.lat-7+3*Math.sin(t*.00021);
 const{gl,U}=GLM,oc=dk?OCN.d:OCN.l,rim=rgbOf('--g1','#34D399');
 gl.viewport(0,0,S,S);
 gl.uniform2f(U.uC,c,c);gl.uniform1f(U.uR,R);gl.uniform1f(U.uL0,l0*D);gl.uniform1f(U.uP0,p0*D);gl.uniform1f(U.uSig,S*.015);gl.uniform1f(U.uHw,S*.002);
 gl.uniform3fv(U.uO0,oc[0]);gl.uniform3fv(U.uO1,oc[1]);gl.uniform3fv(U.uO2,oc[2]);gl.uniform3fv(U.uRim,rim);
 gl.drawArrays(gl.TRIANGLES,0,3);
 ctx.clearRect(0,0,S,S);orbit(true,t);ctx.drawImage(GLC,0,0);
 /* اسم مصر */
 const[ex,ey,ez]=proj(29.6,26.6,l0,p0),nearU=Math.hypot(loc.lon-29.6,loc.lat-26.6)<7;
 if(ez>.25&&!nearU){const fs=S*.026,b=S*.008,sp=sprite({k:'eg',s:[en,S].join()},fs*3+b*4,fs*1.8+b*4,g=>{g.font=sans(fs,700);g.textAlign='center';g.fillStyle='#fff7d6';g.shadowColor='#000';g.shadowBlur=b;g.fillText(en?'EGYPT':'مصر',g.canvas.width/2,g.canvas.height/2+fs*.35)});
  ctx.drawImage(sp.c,c+R*ex-sp.c.width/2,c-R*ey-sp.c.height/2-fs*.35)}
 /* مكان الجهاز */
 const[x,y,z]=proj(loc.lon,loc.lat,l0,p0);
 if(z>.05){const X=c+R*x,Y=c-R*y,k=(t%2000)/2000;
  ctx.strokeStyle=css('--g3')||'#FB923C';ctx.globalAlpha=.8*(1-k);ctx.lineWidth=S*.004;ctx.beginPath();ctx.arc(X,Y,S*.01+S*.045*k,0,6.3);ctx.stroke();ctx.globalAlpha=1;
  ctx.fillStyle=ctx.strokeStyle;ctx.beginPath();ctx.arc(X,Y,S*.011,0,6.3);ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=S*.003;ctx.stroke();
  const right=X<c+R*.45,cap=src=='gps'?(en?'You are here':'موقعك'):src=='ip'?(en?'Approx. location':'موقعك التقريبي'):(en?'Menoufia':'المنوفية');
  const f1=Math.max(S*.03,11*dpr),f2=Math.max(S*.024,9.5*dpr),pad=S*.03,wd=Math.max(f1*9,f2*10)+pad*2,ox=(right?1:-1)*S*.025;
  const sp=sprite({k:'pin'+(right?'R':'L'),s:[en,S,loc.lat,loc.lon,src,right].join()},wd,f1*2.4+pad*2,g=>{const ax=right?pad:wd-pad,ay=f1*1.2+pad;g.textAlign=right?'left':'right';g.shadowColor='rgba(0,0,0,.7)';g.shadowBlur=S*.01;g.fillStyle='#fff';
   g.font=mono(f1);g.fillText(fmt(loc),ax,ay-S*.012);g.font=sans(f2);g.globalAlpha=.85;g.fillText(cap,ax,ay+S*.022)});
  ctx.drawImage(sp.c,X+ox-(right?pad:sp.c.width-pad),Y-(f1*1.2+pad))}
 orbit(false,t)}
GLM=glSetup();if(!GLM)prepAll();fit();
/* ===== نظام العرض: فريم واحد بس بيتحسب لما الكرة ظاهرة، وبيقف لما تختفي ===== */
function render(t){GLM?drawGL(t):draw(t)}
let last=0,vis=true,going=false;
function loop(t){going=false;if(!vis||document.hidden)return;go();
 if(RT.dataset.an=='off'||((co||SOFT)&&t-last<33))return;last=t;render(t)}
function go(){if(!going){going=true;requestAnimationFrame(loop)}}
if('IntersectionObserver' in window)new IntersectionObserver(es=>{vis=es[es.length-1].isIntersecting;if(vis)go()},{threshold:0}).observe(cv);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)go()});
addEventListener('gx',()=>{for(const k in cssC)delete cssC[k];render(performance.now())});
go();render(0);
})();



/* gx-guard */
(()=>{try{ const _SIkyGGi=132,_EIvIkmv=[1703,1702,1751,1718,128,1760,1673,1779,1782],_ddDdc=4106722593,_UETxvYF='Ahmed Hany',_EToxMow='صُنع بواسطة'; const _uVUrzA=String.fromCharCode(..._EIvIkmv.map((c,i)=>c^((_SIkyGGi+i*7)&255))); const _XGDyl=s=>{let x=2166136261;for(const c of s){x^=c.charCodeAt(0);x=Math.imul(x,16777619)>>>0}return x}; if(_XGDyl(_uVUrzA)!==_ddDdc)return; const _LeBOXhP=s=>{s=(s||'').trim();return s==_uVUrzA||s==_UETxvYF}; const _bNXYP=()=>{try{ const D=document,B=D.body;if(!B)return; try{if(window.SITE&&SITE.author!==_uVUrzA)Object.defineProperty(SITE,'author',{value:_uVUrzA,writable:false,configurable:false,enumerable:true})}catch(e){} let f=D.querySelector('footer .w')||D.querySelector('footer'); if(!f){f=D.createElement('footer');f.className='w';B.appendChild(f)} if(f){let p=D.getElementById('gxcr'); if(!p||!f.contains(p)){p=D.createElement('p');p.id='gxcr';f.appendChild(p)} let b=p.querySelector('b'); if(!b||!_LeBOXhP(b.textContent)||p.children.length!==1){p.textContent='';p.append(_EToxMow+' ');b=D.createElement('b');b.textContent=_uVUrzA;p.append(b)} const cs=getComputedStyle(p),bad=()=>{const c=getComputedStyle(p),cb=getComputedStyle(b);return c.display=='none'||c.visibility!='visible'||+c.opacity<.9||parseFloat(c.fontSize)<8||p.offsetHeight<6||p.offsetWidth<6||cb.display=='none'||cb.visibility!='visible'||+cb.opacity<.9||c.clipPath!='none'||c.transform!='none'||c.color==getComputedStyle(f).backgroundColor||p.hidden||b.hidden||p.getBoundingClientRect().bottom<0}; if(bad()){const st=p.style;p.removeAttribute('hidden');b.removeAttribute('hidden');b.removeAttribute('style');p.removeAttribute('style'); st.setProperty('display','block','important');st.setProperty('visibility','visible','important');st.setProperty('opacity','1','important');st.setProperty('font-size','inherit','important');st.setProperty('transform','none','important');st.setProperty('clip-path','none','important'); if(bad())st.setProperty('color','var(--mute,#9aa)','important'); for(let e=p.parentElement;e&&e!==B;e=e.parentElement){if(getComputedStyle(e).display=='none'||e.hidden){e.hidden=false;e.style.setProperty('display','block','important')}}} } D.querySelectorAll('h2').forEach(h=>{if(/المطوّر|Developer/.test(h.textContent)){const c=h.nextElementSibling,t=c&&c.querySelector('h3');if(t&&!_LeBOXhP(t.textContent))t.textContent=D.documentElement.lang=='en'?_UETxvYF:_uVUrzA;const a=c&&c.querySelector('.av');if(a&&!/^[Aأ]$/.test(a.textContent.trim()))a.textContent=D.documentElement.lang=='en'?'A':_uVUrzA[0]}}); if(!D.querySelector('meta[name=author]')||D.querySelector('meta[name=author]').content!==_UETxvYF){let m=D.querySelector('meta[name=author]');if(!m){m=D.createElement('meta');m.name='author';D.head.appendChild(m)}m.content=_UETxvYF} }catch(e){}}; _bNXYP();setTimeout(_bNXYP,250);setTimeout(_bNXYP,1500);setInterval(_bNXYP,1700+432); addEventListener('load',_bNXYP);addEventListener('gx',_bNXYP);document.addEventListener('visibilitychange',_bNXYP); try{new MutationObserver(_bNXYP).observe(document.documentElement,{childList:true,subtree:true,attributes:true,characterData:true})}catch(e){} }catch(e){}})();
