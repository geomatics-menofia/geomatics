const f2=(x,d=2)=>Number(x).toLocaleString('en',{maximumFractionDigits:d});
const B=x=>`<b dir="ltr">${x}</b>`;
const dms=v=>{const a=Math.abs(v),t=Math.round(a*3600000)/1000,d=Math.floor(t/3600),m=Math.floor(t%3600/60),s=t%60;return `${v<0?'-':''}${d}° ${m}′ ${f2(s,3)}″`};
const TOOLS=[
{id:'dms',t:'تحويل الإحداثيات',i:'🧭',d:'درجات عشرية ⇄ درجات ودقائق وثواني. الجنوب والغرب بإشارة سالبة.',
 f:[['dd','درجات عشرية','30.5594'],['dg','درجات','30'],['mn','دقائق','33'],['sc','ثواني','33.84']],
 run:v=>{const o=[],dd=parseFloat(v.dd),g=parseFloat(v.dg),m=parseFloat(v.mn)||0,s=parseFloat(v.sc)||0;
  if(!isNaN(dd))o.push(`${B(f2(dd,6)+'°')} = ${B(dms(dd))}`);
  if(!isNaN(g)){const r=Math.abs(g)+m/60+s/3600;o.push(`${B(`${g}° ${m}′ ${s}″`)} = ${B(f2(g<0?-r:r,6)+'°')}`)}
  return o.join('<br>')||'أدخل قيمة'}},
{id:'dist',t:'المسافة والاتجاه',i:'📏',d:'المسافة على سطح الأرض والسمت بين نقطتين (الإحداثيات بالدرجات العشرية).',
 f:[['a','عرض النقطة 1','30.5594'],['b','طول النقطة 1','31.0108'],['c','عرض النقطة 2','30.0444'],['e','طول النقطة 2','31.2357']],
 run:v=>{const [la1,lo1,la2,lo2]=[v.a,v.b,v.c,v.e].map(parseFloat);if([la1,lo1,la2,lo2].some(isNaN))return 'أدخل الإحداثيات الأربعة';
  const r=Math.PI/180,p1=la1*r,p2=la2*r,dl=(lo2-lo1)*r,h=Math.sin((p2-p1)/2)**2+Math.cos(p1)*Math.cos(p2)*Math.sin(dl/2)**2,km=2*6371.0088*Math.asin(Math.min(1,Math.sqrt(h)));
  const az=(Math.atan2(Math.sin(dl)*Math.cos(p2),Math.cos(p1)*Math.sin(p2)-Math.sin(p1)*Math.cos(p2)*Math.cos(dl))/r+360)%360,D=['شمال','شمال شرق','شرق','جنوب شرق','جنوب','جنوب غرب','غرب','شمال غرب'];
  return `المسافة: ${B(f2(km)+' كم')} (${B(f2(km*1000,0)+' م')})<br>السمت: ${B(f2(az)+'°')} ناحية ${D[Math.round(az/45)%8]}`}},
{id:'scale',t:'مقياس الرسم',i:'📐',d:'امسح الخانة اللي عايز تحسبها وسيب الباقي.',
 f:[['s','المقياس 1 :','50000'],['m','المسافة على الخريطة (سم)','3'],['g','المسافة على الأرض (م)','']],
 run:v=>{let s=+v.s||0,m=+v.m||0,g=+v.g||0;if(s&&m)g=m*s/100;else if(s&&g)m=g*100/s;else if(m&&g)s=g*100/m;else return 'أدخل خانتين على الأقل';
  return `المقياس 1:${B(f2(s,0))}<br>${B(f2(m,3)+' سم')} على الخريطة = ${B(f2(g)+' م')} على الأرض (${B(f2(g/1000,3)+' كم')})`}},
{id:'area',t:'مساحة مضلع بالإحداثيات',i:'🔷',d:'طريقة الإحداثيات (Shoelace). اكتب نقطة في كل سطر: X ثم Y بالمتر، بمسافة بينهم.',
 f:[['p','النقاط','0 0\n100 0\n100 50\n0 50','ta']],
 run:v=>{const Q=v.p.trim().split(/\n+/).map(l=>l.trim().split(/[\s;]+/).map(parseFloat)).filter(a=>a.length>=2&&!isNaN(a[0])&&!isNaN(a[1]));
  if(Q.length<3)return 'محتاج 3 نقاط على الأقل';let a=0,pr=0;Q.forEach((q,i)=>{const n=Q[(i+1)%Q.length];a+=q[0]*n[1]-n[0]*q[1];pr+=Math.hypot(n[0]-q[0],n[1]-q[1])});a=Math.abs(a)/2;
  return `عدد النقاط: ${B(Q.length)}<br>المساحة: ${B(f2(a)+' م²')} = ${B(f2(a/4200.833,3)+' فدان')} = ${B(f2(a/1e4,4)+' هكتار')}<br>المحيط: ${B(f2(pr)+' م')}`}},
{id:'unit',t:'وحدات المساحة المصرية',i:'🌾',d:'الفدان = 4200.833 م²، والفدان 24 قيراط، والقيراط 24 سهم.',
 f:[['x','القيمة','1'],['u','الوحدة','fed','sel',[['m2','متر مربع'],['fed','فدان'],['qir','قيراط'],['sah','سهم'],['ha','هكتار']]]],
 run:v=>{const K={m2:1,fed:4200.833,qir:4200.833/24,sah:4200.833/576,ha:1e4},x=parseFloat(v.x);if(isNaN(x))return 'أدخل قيمة';
  const m=x*K[v.u],sh=Math.round(m/K.sah),fd=Math.floor(sh/576),q=Math.floor(sh%576/24);
  return [['m2','م²'],['fed','فدان'],['qir','قيراط'],['sah','سهم'],['ha','هكتار']].map(([k,n])=>`${B(f2(m/K[k],4))} ${n}`).join('<br>')+`<br>بالصيغة المصرية: ${B(fd)} فدان و ${B(q)} قيراط و ${B(sh%24)} سهم`}}
];
