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
let DATA=LAND.map(r=>prep('',r,0)).concat([prep('818',EGY,0)]),lvl=0;
const BASE='https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/';
function load(file,simp,L){return fetch(BASE+file).then(r=>{if(!r.ok)throw 0;return r.json()}).then(t=>{const F=decode(t,t.objects.countries?'countries':Object.keys(t.objects)[0]),d=[];
 F.forEach(f=>{if(f.r&&f.r.length>3)d.push(prep(f.id,f.r,simp))});if(d.length&&L>lvl){DATA=d;lvl=L}}).catch(()=>{})}
load('countries-110m.json',0,1);load('countries-50m.json',.0008,2);
let loc={lat:30.55,lon:31.01},src='def';
try{const s=JSON.parse(localStorage.gxloc||'null');if(s&&isFinite(s.lat)&&isFinite(s.lon)){loc=s;src='gps'}}catch(e){}
const save=(l,s)=>{loc=l;src=s;try{localStorage.gxloc=JSON.stringify(l)}catch(e){}};
async function byIP(){try{const r=await fetch('https://get.geojs.io/v1/ip/geo.json');const j=await r.json();const la=parseFloat(j.latitude),lo=parseFloat(j.longitude);if(isFinite(la)&&isFinite(lo))save({lat:+la.toFixed(2),lon:+lo.toFixed(2)},'ip')}catch(e){}}
function ask(){if(!navigator.geolocation){byIP();return}
 navigator.geolocation.getCurrentPosition(p=>save({lat:+p.coords.latitude.toFixed(2),lon:+p.coords.longitude.toFixed(2)},'gps'),()=>byIP(),{timeout:9000,maximumAge:6e5})}
ask();cv.style.cursor='pointer';cv.addEventListener('click',ask);

let S=0,R=0,dpr=1;
const fit=()=>{const w=cv.getBoundingClientRect().width||cv.parentNode.clientWidth||300;dpr=Math.min(devicePixelRatio||1,2);S=Math.round(w*dpr);cv.width=cv.height=S;R=S*.39};
fit();new ResizeObserver(()=>{fit();draw(performance.now())}).observe(cv);
const proj=(lo,la,l0,p0)=>{const a=(lo-l0)*D,f=la*D,f0=p0*D,cf=Math.cos(f);return[cf*Math.sin(a),Math.cos(f0)*Math.sin(f)-Math.sin(f0)*cf*Math.cos(a),Math.sin(f0)*Math.sin(f)+Math.cos(f0)*cf*Math.cos(a)]};
const css=v=>getComputedStyle(RT).getPropertyValue(v).trim();
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
let last=0;const co=matchMedia('(pointer:coarse)').matches;
function loop(t){requestAnimationFrame(loop);if(document.hidden||RT.dataset.an=='off'||(co&&t-last<33))return;last=t;draw(t)}
addEventListener('gx',()=>draw(performance.now()));
requestAnimationFrame(loop);draw(0);
})();
