const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const P=document.body.dataset.p,sb=SITE.url&&window.supabase?supabase.createClient(SITE.url,SITE.key):null;
const nm=x=>x.split('/')[1].trim(),au=SITE.author||'طالب بالقسم';
const role=n=>n==SITE.head?'رئيس القسم':/^أ\.م\.د/.test(n)?'أستاذ مساعد':/^أ\.د/.test(n)?'أستاذ':/^د\//.test(n)?'مدرس':'الهيئة المعاونة';
const ppl={};S.forEach(s=>{s.d.forEach(x=>(ppl[x]=ppl[x]||[]).push([s,0]));(s.a||[]).forEach(x=>(ppl[x]=ppl[x]||[]).push([s,1]))});
const bks=s=>BOOKS[s.id]||[];

/* ===== إعدادات المظهر (الثيمات) ===== */
const GX_DEF={m:'dark',pal:'emerald',fs:'m',r:'m',bg:'on',an:'on'};
const gx={...GX_DEF};try{Object.assign(gx,JSON.parse(localStorage.gx||'{}'))}catch(e){}
const light=matchMedia('(prefers-color-scheme:light)');
const eff=()=>gx.m=='auto'?(light.matches?'light':'dark'):gx.m;
function applyGX(save){const d=document.documentElement.dataset;d.t=eff();d.pal=gx.pal;d.fs=gx.fs;d.r=gx.r;d.bg=gx.bg;d.an=gx.an;
 const tc=document.querySelector('meta[name=theme-color]');if(tc)tc.content=getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
 const gs=$('.globe svg');if(gs&&gs.pauseAnimations)gx.an=='off'?gs.pauseAnimations():gs.unpauseAnimations();
 if(save)try{localStorage.gx=JSON.stringify(gx)}catch(e){}
 dispatchEvent(new Event('gx'))}
light.addEventListener&&light.addEventListener('change',()=>gx.m=='auto'&&applyGX());

/* ===== اللوجو: طبقات (GIS) + نقطة موقع، بيلبس ألوان الثيم ===== */
const logo=id=>`<svg class="logo" viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="${id}" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse"><stop offset="0" style="stop-color:var(--g1)"/><stop offset="1" style="stop-color:var(--g2)"/></linearGradient></defs><path d="M6 34.5 24 43.5 42 34.5" fill="none" stroke="url(#${id})" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" opacity=".4"/><path d="M6 25 24 34 42 25" fill="none" stroke="url(#${id})" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/><path d="M24 5.5 42 14.5 24 23.5 6 14.5Z" fill="url(#${id})" stroke="url(#${id})" stroke-width="3.4" stroke-linejoin="round"/><circle cx="24" cy="14.5" r="3.4" style="fill:var(--bg)"/></svg>`;

const NAV=[['index','الرئيسية','🏠'],['subjects','المواد','📚'],['books','الكتب','📖'],['doctors','الدكاترة','👨‍🏫'],['groups','الجروبات','💬'],['tools','الأدوات','🧭'],['schedule','الجدول','🗓️']];
const lk=[['whatsapp','واتساب'],['telegram','تيليجرام'],['linkedin','LinkedIn'],['github','GitHub'],['email','إيميل']].filter(([k])=>SITE.links[k]).map(([k,t])=>`<a class="chip" href="${esc(k=='email'?'mailto:'+SITE.links[k]:SITE.links[k])}" target="_blank" rel="noopener">${t}</a>`).join('');
const nv=k=>`<nav class="${k}" aria-label="القائمة">${NAV.map(([f,t,i])=>`<a href="${f}.html"${P==f||(P=='subject'&&f=='subjects')?' class="on" aria-current="page"':''}><i>${i}</i>${t}</a>`).join('')}</nav>`;
document.body.insertAdjacentHTML('afterbegin',`<div id="sp"></div><a class="skip" href="#main">تخطَّ للمحتوى</a><header class="top"><div class="bar"><a class="brand" href="index.html" aria-label="جيوماتكس، الرئيسية">${logo('lgh')}<span class="bt"><b>جيوماتكس</b><small>GEOMATICS</small></span></a>${nv('dn')}<button id="th" aria-label="تبديل الوضع بين الليلي والنهاري" title="ليلي / نهاري">🌓</button></div></header><main id="main"></main><footer><div class="w"><div class="sb"><svg width="26" height="34" viewBox="0 0 24 32" role="img" aria-label="الشمال"><path d="M12 1l8 22-8-6-8 6z" fill="currentColor"/><text x="12" y="31" font-size="8" text-anchor="middle" fill="currentColor">N</text></svg><div class="scale"><i></i><div><span>0</span><span>5</span><span>10 km</span></div></div></div><p>برنامج الجيوماتكس، كلية الآداب، جامعة المنوفية. مبادرة طلابية وليست موقعاً رسمياً للكلية.</p><p>صُنع بواسطة <b>${esc(au)}</b></p><div class="fl2"><a href="schedule.html">الجدول</a><a href="files/department-regulations.pdf" target="_blank" rel="noopener">لائحة القسم</a><a href="about.html">عن المنصة</a><a href="look.html">لو مش عاجبك شكل الموقع</a></div><div class="chips">${lk}</div></div></footer>${nv('mn')}`);
const M=$('#main');
applyGX();
$('#th').onclick=()=>{gx.m=eff()=='dark'?'light':'dark';applyGX(1)};

const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;io.unobserve(t);t.dataset.c!==undefined?cnt(t,+t.dataset.c):(t.classList.add('in'),setTimeout(()=>t.classList.add('done'),1100))}),{threshold:.12});
function cnt(el,to){let s=null;const f=t=>{s=s||t;const p=Math.min((t-s)/1200,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
const fin=()=>{$$('.rv').forEach((e,i)=>e.style.setProperty('--i',i%6));$$('.rv,[data-c]').forEach(e=>io.observe(e))};
const hrs=s=>`<span class="chip">${s.t} نظري</span>${s.p?`<span class="chip">${s.p} عملي</span>`:''}`;
const sc=(s,i)=>`<a class="row3 rv" style="--c:${s.c}" href="subject.html?id=${s.id}"><span class="num">${String(i+1).padStart(2,'0')}</span><span class="inf"><b>${s.i} ${s.n}</b><small><span class="code">${s.code}</span> ${s.d.join(' + ')}</small><em>${s.desc}</em></span><span class="hrs">${hrs(s)}${bks(s).length?'<span class="chip">📖 كتاب</span>':''}</span><span class="arr">←</span></a>`;

/* ===== الكرة الأرضية ===== */
const GLOBE=`<svg viewBox="-8 -4 216 208" role="img" aria-label="كرة أرضية متحركة"><defs><radialGradient id="gg" cx=".35" cy=".3"><stop offset="0" stop-color="#38BDF8" stop-opacity=".6"/><stop offset=".65" stop-color="#2563EB" stop-opacity=".22"/><stop offset="1" stop-color="#0B1B2E" stop-opacity=".1"/></radialGradient></defs><circle class="sp" cx="100" cy="100" r="90"/>${[[100,90,30.8],[57.7,77.9,26.7],[26.7,45,15.4],[142.3,77.9,26.7],[173.3,45,15.4]].map(([y,rx,ry])=>`<ellipse class="l" cx="100" cy="${y}" rx="${rx}" ry="${ry}"/>`).join('')}${[0,1,2,3,4,5].map(k=>`<ellipse class="m" cx="100" cy="100" rx="0" ry="90"><animate attributeName="rx" values="0;34.5;63.6;83.2;90;83.2;63.6;34.5;0" dur="12s" begin="-${k*2}s" repeatCount="indefinite"/></ellipse>`).join('')}<circle class="o" cx="100" cy="100" r="90"/><g transform="rotate(-24 100 100)"><ellipse class="orb" cx="100" cy="100" rx="118" ry="34"/><circle class="sat" r="4.5"><animateMotion dur="9s" repeatCount="indefinite" path="M218 100A118 34 0 1 1 -18 100A118 34 0 1 1 218 100"/></circle></g><g transform="translate(132 64)"><circle class="pin" r="3"/><circle class="ping" r="3"><animate attributeName="r" values="3;16" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0" dur="2s" repeatCount="indefinite"/></circle><text x="10" y="-8" class="pt">30.55°N 31.01°E</text></g></svg>`;
const KW=['GIS','Remote Sensing','Cartography','Surveying','GNSS','Geodesy','Spatial Analysis','DEM','UTM'].map(x=>`<span>${x}</span>`).join('');

/* ===== الرئيسية: فهرس بس ===== */
function home(){
 const have=S.filter(s=>bks(s).length).length;
 const IX=[
  ['subjects','المواد','مواد الفصل الأول بدكاترتها وملخصات زمايلك.',`${S.length} مواد`],
  ['books','الكتب','كتاب لكل مادة، اقرأه أونلاين أو حمّله.',have?`${have} من ${S.length}`:'قريباً'],
  ['doctors','الدكاترة','هيئة التدريس والمعيدين ومقرراتهم.',`${Object.keys(ppl).length} أسماء`],
  ['tools','الأدوات','إحداثيات ومسافات ومساحات وحاسبة معدل وعدّاد امتحان.',`${TOOLS.length+2} أدوات`],
  ['schedule','الجدول','مواعيد المحاضرات والمدرجات والمجموعات لكل يوم.',`${new Set(SCHED.map(x=>x[0])).size} أيام`],
  ['groups','الجروبات والروابط','جروبات واتساب وقنوات تيليجرام وبوابة الطالب في مكان واحد.',`${GROUPS.reduce((n,g)=>n+g.items.length,0)} رابط`],
  ['look','لو مش عاجبك شكل الموقع','ثيمات وألوان وحجم خط وحواف، على مزاجك بالظبط.','🎨'],
  ['about','عن المنصة','مين ورا الموقع وإزاي تساهم فيه.','ℹ️']];
 M.innerHTML=`<section class="hero w"><div class="ht"><div class="org"><img src="assets/college.jpg" alt="شعار كلية الآداب جامعة المنوفية"><span class="tag">برنامج الجيوماتكس | كلية الآداب | جامعة المنوفية</span></div><h1><span style="--d:0">نقيس.</span> <span style="--d:1">نحلّل.</span> <span class="gt" style="--d:2">نرسم المستقبل.</span></h1><p class="lead">منصة الدفعة: المواد والكتب والدكاترة وملخصات الطلبة، وأدوات مساحة وخرائط بتشتغل من الموبايل.</p><div class="cta"><a class="btn bp mag" href="subjects.html">ابدأ المذاكرة <b>←</b></a><a class="btn mag" href="#toc">الفهرس <b>↓</b></a></div></div><div class="globe">${GLOBE}</div></section>
 <div class="mq" aria-hidden="true"><div>${KW}${KW}</div></div>
 <div class="w sec" id="toc"><h2 data-n="00">الفهرس</h2><p class="mute">كل حاجة في الموقع، من هنا لهناك.</p><nav class="toc" aria-label="فهرس الموقع">${IX.map(([f,t,d,m],i)=>`<a class="ti rv" style="--c:var(--g${i%3+1})" href="${f}.html"><span class="num">${String(i+1).padStart(2,'0')}</span><span class="mid"><span class="tl"><b>${t}</b><i class="dots"></i><em>${m}</em></span><small>${d}</small></span><span class="arr">←</span></a>`).join('')}</nav></div>`}

/* ===== المواد ===== */
function subjectsPage(){
 M.innerHTML=`<div class="w sec"><h2 data-n="01">المواد</h2><p class="mute">الفصل الأول 2026/2027، المستوى الأول. الطالب يختار مقرراً اختيارياً واحداً.</p><div class="srow"><input id="q" type="search" placeholder="ابحث باسم المادة أو الكود أو الدكتور"><div class="chips" id="fc"><button class="chip on" data-f="">الكل</button><button class="chip" data-f="p">فيها عملي</button><button class="chip" data-f="t">نظري فقط</button></div></div><div class="list" id="g">${S.map(sc).join('')}</div><p class="mute" id="none" hidden>مفيش نتائج مطابقة.</p></div>`;
 const run=()=>{const v=$('#q').value.trim().toLowerCase(),f=$('#fc .on').dataset.f;let n=0;$$('#g .row3').forEach((c,i)=>{const s=S[i],ok=(s.n+s.code+s.d.join()+(s.a||[]).join()).toLowerCase().includes(v)&&(!f||(f=='p'?s.p>0:s.p==0));c.hidden=!ok;n+=ok});$('#none').hidden=n>0};
 $('#q').oninput=run;$$('#fc .chip').forEach(b=>b.onclick=()=>{$$('#fc .chip').forEach(x=>x.classList.toggle('on',x==b));run()})}

/* ===== الكتب ===== */
const cover=(s,soon)=>`<div class="cv" style="--c:${s.c}">${soon?'<em class="soon">قريباً</em>':''}<small>${s.code}</small><i>${s.i}</i><b>${s.n}</b><span>جيوماتكس</span></div>`;
const bookBtns=(x,s)=>`<div class="bk-r"><b>${esc(x.t||'كتاب '+s.n)}</b>${x.a?`<small class="mute">${esc(x.a)}</small>`:''}<div class="chips"><a class="btn bp sm" href="${esc(x.f)}" target="_blank" rel="noopener">📖 اقرأ</a><a class="btn sm" href="${esc(x.f)}" download>⬇️ تحميل</a></div></div>`;
const bookCard=s=>{const b=bks(s);return `<article class="bcard rv${b.length?'':' soon'}" style="--c:${s.c}"><a class="cvl" href="subject.html?id=${s.id}" aria-label="${esc(s.n)}">${cover(s,!b.length)}</a><div class="bi"><span class="code">${s.code}</span><h3>${s.n}</h3>${b.length?b.map(x=>bookBtns(x,s)).join(''):`<p class="mute">الكتاب لسه مترفعش، بيتضاف قريب 📚</p><div class="chips"><a class="btn sm" href="subject.html?id=${s.id}">صفحة المادة <b>←</b></a></div>`}</div></article>`};
function booksPage(){
 const have=S.filter(s=>bks(s).length).length;
 M.innerHTML=`<div class="w sec"><h2 data-n="02">الكتب</h2><p class="mute">كتاب لكل مادة من مواد الفصل الأول: اقرأه أونلاين أو حمّله على موبايلك. ${have?`المتاح دلوقتي <b>${have}</b> من <b>${S.length}</b>، والباقي بيتضاف أول بأول.`:'الكتب بتتضاف أول بأول، فخليك قريب.'}</p><div class="srow"><input id="q" type="search" placeholder="ابحث باسم المادة أو الكود"><div class="chips" id="fc"><button class="chip on" data-f="">الكل</button><button class="chip" data-f="y">المتاح</button><button class="chip" data-f="n">قريباً</button></div></div><div class="shelf" id="g">${S.map(bookCard).join('')}</div><p class="mute" id="none" hidden>مفيش نتائج مطابقة.</p></div>`;
 const run=()=>{const v=$('#q').value.trim().toLowerCase(),f=$('#fc .on').dataset.f;let n=0;$$('#g .bcard').forEach((c,i)=>{const s=S[i],has=bks(s).length>0,ok=(s.n+s.code).toLowerCase().includes(v)&&(!f||(f=='y'?has:!has));c.hidden=!ok;n+=ok});$('#none').hidden=n>0};
 $('#q').oninput=run;$$('#fc .chip').forEach(b=>b.onclick=()=>{$$('#fc .chip').forEach(x=>x.classList.toggle('on',x==b));run()})}

/* ===== الدكاترة ===== */
function doctorsPage(){
 M.innerHTML=`<div class="w sec"><h2 data-n="03">هيئة التدريس</h2><p class="mute">دكاترة ومعيدين الفصل الأول ومقرراتهم.</p><div class="grid">${Object.entries(ppl).map(([n,a])=>`<div class="card rv" style="--c:${a[0][0].c}"><div class="av" style="background:${a[0][0].c}">${nm(n)[0]}</div><h3>${esc(n)}</h3><span class="chip">${role(n)}</span><div class="chips">${a.map(([s,l])=>`<a class="chip" href="subject.html?id=${s.id}">${s.n}${l?' (عملي)':''}</a>`).join('')}</div></div>`).join('')}</div></div>`}

/* ===== صفحة المادة ===== */
const emp=t=>`<div class="row"><span class="mute">${t}</span></div>`,pr=(x,l)=>`<div class="row"><span><b>${esc(x)}</b><br><small class="mute">${role(x)}</small></span><small class="mute">${l}</small></div>`;
function subjectPage(){
 const id=new URLSearchParams(location.search).get('id'),k=S.findIndex(s=>s.id==id);if(k<0){location.replace('subjects.html');return}
 const s=S[k],pv=S[(k+S.length-1)%S.length],nx=S[(k+1)%S.length],b=bks(s);document.title=`${s.n} | جيوماتكس`;
 M.innerHTML=`<section class="sh" style="--c:${s.c}"><div class="w"><a class="bc" href="subjects.html">→ كل المواد</a><p class="code" style="display:block">${s.code}</p><h1>${s.i} ${s.n}</h1><p class="lead">${s.desc}</p><div class="chips">${hrs(s)}<span class="chip">الفصل الأول</span>${SCHED.filter(x=>x[2]==s.id).map(x=>`<span class="chip">🗓️ ${slot(x)}</span>`).join('')}${GROUP_OF[s.id]?`<a class="chip" href="${GROUP_OF[s.id]}" target="_blank" rel="noopener">💬 جروب المادة</a>`:''}</div></div></section>
 <div class="w sec two"><div><h2 data-n="01">الكتاب</h2><div class="bkb" style="--c:${s.c}"><a class="cvl sm" href="books.html" aria-label="كل الكتب">${cover(s,!b.length)}</a><div class="bi">${b.length?b.map(x=>bookBtns(x,s)).join(''):`<p class="mute">الكتاب لسه مترفعش للمادة دي، بيتضاف قريب 📚</p><div class="chips"><a class="btn sm" href="books.html">كل الكتب <b>←</b></a></div>`}</div></div>
 <h2 data-n="02" style="margin-top:40px">المحاضرات والملفات</h2>${(LECT[s.id]||[]).length?LECT[s.id].map(x=>bookBtns(x,s)).join(''):emp('لسه مفيش محاضرات للمادة دي.')}
 <h2 data-n="03" style="margin-top:40px">ملخصات الطلبة</h2><div id="fl">${emp('جاري التحميل...')}</div></div><aside><h2 data-n="04">المدرّسون</h2>${s.d.map(x=>pr(x,'محاضر')).join('')}${(s.a||[]).map(x=>pr(x,'عملي')).join('')}<p class="mute" style="font-size:.85rem;margin-top:10px">الوصف تعريفي عام، والمحتوى الرسمي في توصيف المقرر من الكلية.</p>
 <div class="up"><b>ارفع ملخص (صورة أو PDF)</b><input id="ut" maxlength="100" placeholder="عنوان الملخص، مثلاً: محاضرة 2"><input id="ub" maxlength="40" placeholder="اسمك (اختياري)"><input id="hp" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true"><input id="uf" type="file" accept="image/jpeg,image/png,image/webp,application/pdf"><button id="us">رفع</button><small class="mute" id="um">${sb?'الملخص بيظهر بعد مراجعة المسؤول، والحد الأقصى 15MB.':'الربط بقاعدة البيانات غير مفعّل.'}</small></div></aside></div>
 <div class="w nav2"><a class="btn" href="subject.html?id=${pv.id}">→ ${pv.n}</a><a class="btn" href="subject.html?id=${nx.id}">${nx.n} ←</a></div>`;
 const L=$('#fl'),pub=p=>sb.storage.from('summaries').getPublicUrl(p).data.publicUrl;
 const load=async()=>{if(!sb){L.innerHTML=emp('الربط بقاعدة البيانات غير مفعّل بعد.');return}
  const r=await sb.from('summaries').select('*').eq('subject',s.id).eq('status','approved').order('created_at',{ascending:false});
  L.innerHTML=r.error?emp('تعذّر تحميل الملخصات، جرّب بعد شوية.'):r.data.length?r.data.map(x=>`<a class="row" href="${esc(pub(x.file_path))}" target="_blank" rel="noopener"><span>${x.is_pdf?'📄':'🖼️'} ${esc(x.title)}</span><small class="mute">${esc(x.uploader||'طالب')}</small></a>`).join(''):emp('لسه مفيش ملخصات للمادة دي. كن أول من يرفع!')};
 $('#us').onclick=async()=>{const f=$('#uf').files[0],m=$('#um');if($('#hp').value)return;
  if(!sb){m.textContent='الربط بقاعدة البيانات غير مفعّل.';return}
  if(!f){m.textContent='اختار ملف الأول';return}
  const X={'application/pdf':'pdf','image/jpeg':'jpg','image/png':'png','image/webp':'webp'}[f.type];
  if(!X){m.textContent='صور (JPG/PNG/WEBP) أو PDF بس';return}
  if(f.size>15e6){m.textContent='الملف أكبر من 15MB';return}
  m.textContent='جاري الرفع...';$('#us').disabled=true;const path=s.id+'/'+crypto.randomUUID()+'.'+X;
  const u=await sb.storage.from('summaries').upload(path,f,{contentType:f.type});
  const i=u.error?u:await sb.from('summaries').insert({subject:s.id,title:$('#ut').value.trim().slice(0,100)||f.name.slice(0,100),uploader:$('#ub').value.trim().slice(0,40)||'طالب',file_path:path,is_pdf:X=='pdf'});
  $('#us').disabled=false;if(i.error){m.textContent='حصلت مشكلة، جرّب تاني';return}
  m.textContent='تم الرفع! هيظهر بعد مراجعة المسؤول ✅';$('#uf').value='';$('#ut').value=''};
 load()}

/* ===== الأدوات ===== */
const fld=([k,l,v,ty,o])=>`<label class="fl"><span>${l}</span>${ty=='ta'?`<textarea data-f="${k}" rows="5" dir="ltr">${v}</textarea>`:ty=='sel'?`<select data-f="${k}">${o.map(([a,b])=>`<option value="${a}"${a==v?' selected':''}>${b}</option>`).join('')}</select>`:`<input data-f="${k}" value="${v}" inputmode="decimal" dir="ltr">`}</label>`;
const panel=t=>`<section class="panel" id="${t.id}" role="tabpanel"><h3>${t.i} ${t.t}</h3><p class="mute">${t.d}</p><div class="fs">${t.f.map(fld).join('')}</div><div class="out" aria-live="polite"></div></section>`;
const G=[['A',4],['A-',3.7],['B+',3.3],['B',3],['B-',2.7],['C+',2.3],['C',2],['C-',1.7],['D+',1.3],['D',1],['F',0]];

/* بكرة لانهائية: بتلف في دايرة ومالهاش أول ولا آخر. سحب، أسهم، كيبورد، عجلة الماوس */
function makeReel(root,n,start,onPick){
 const items=$$('.ri',root);let pos=start,tgt=start,W=150,SP=130,raf=0,drag=null,wt=0;
 const mod=i=>((i%n)+n)%n,calm=()=>matchMedia('(prefers-reduced-motion:reduce)').matches||document.documentElement.dataset.an=='off';
 const draw=()=>items.forEach((el,i)=>{let d=i-pos;d=((d+n/2)%n+n)%n-n/2;const a=Math.abs(d);
  el.style.transform=`translateX(${(-d*SP).toFixed(1)}px) translateZ(${(-a*40).toFixed(0)}px) rotateY(${(-d*20).toFixed(1)}deg) scale(${(1-Math.min(a,3)*.07).toFixed(3)})`;
  el.style.opacity=Math.max(0,1-a*.24).toFixed(2);el.style.zIndex=String(60-Math.round(a*10));el.style.pointerEvents=a>2.7?'none':''});
 const size=()=>{const cw=root.clientWidth;W=Math.max(104,Math.min(160,cw*.44));SP=W*.88;root.style.setProperty('--w',W+'px');draw()};
 const sel=()=>{const k=mod(Math.round(tgt));items.forEach((el,i)=>{el.classList.toggle('on',i==k);el.setAttribute('aria-selected',i==k);el.tabIndex=i==k?0:-1});onPick(k)};
 const tick=()=>{const df=tgt-pos;if(Math.abs(df)<.002){pos=tgt;draw();raf=0;return}pos+=df*.17;draw();raf=requestAnimationFrame(tick)};
 const go=t=>{tgt=t;if(calm()){cancelAnimationFrame(raf);raf=0;pos=tgt;draw()}else if(!raf)raf=requestAnimationFrame(tick);sel()};
 const pick=i=>{const cur=Math.round(tgt);let d=mod(i-cur);if(d>n/2)d-=n;go(cur+d)};
 root.addEventListener('pointerdown',e=>{if(e.button)return;cancelAnimationFrame(raf);raf=0;drag={x:e.clientX,p:pos,t:e.target.closest('.ri'),m:0,lx:e.clientX,lt:performance.now(),v:0};root.setPointerCapture(e.pointerId);root.classList.add('grab')});
 root.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,now=performance.now();drag.m=Math.max(drag.m,Math.abs(dx));pos=drag.p+dx/SP;draw();
  const dt=Math.max(1,now-drag.lt);drag.v=drag.v*.6+(e.clientX-drag.lx)/dt*.4;drag.lx=e.clientX;drag.lt=now});
 const end=()=>{if(!drag)return;const d=drag;drag=null;root.classList.remove('grab');
  if(d.m<6&&d.t){pick(+d.t.dataset.i);return}
  go(Math.round(pos+Math.max(-2,Math.min(2,d.v*260/SP))))};
 root.addEventListener('pointerup',end);root.addEventListener('pointercancel',end);
 items.forEach(el=>el.addEventListener('click',e=>{if(e.detail===0)pick(+el.dataset.i)}));
 root.addEventListener('wheel',e=>{if(Math.abs(e.deltaX)<=Math.abs(e.deltaY))return;e.preventDefault();cancelAnimationFrame(raf);raf=0;pos-=e.deltaX/SP*.8;draw();clearTimeout(wt);wt=setTimeout(()=>go(Math.round(pos)),110)},{passive:false});
 root.addEventListener('keydown',e=>{const k={ArrowLeft:1,ArrowRight:-1}[e.key];if(!k)return;e.preventDefault();go(Math.round(tgt)+k);items[mod(Math.round(tgt))].focus({preventScroll:true})});
 new ResizeObserver(size).observe(root);size();sel();
 return{pick,step:k=>go(Math.round(tgt)+k)}}

function toolsPage(){
 const all=[...TOOLS,{id:'gpa',t:'حاسبة المعدل',i:'🎓'},{id:'exam',t:'عدّاد الامتحان',i:'⏳'}];
 M.innerHTML=`<div class="w sec"><h2 data-n="04">الأدوات</h2><p class="mute">الحسابات كلها بتتم على جهازك، ومفيش حاجة بتتبعت لأي مكان.</p><div class="reelw"><button class="rb" id="rp" aria-label="الأداة السابقة">→</button><div class="reel" id="rl" role="tablist" aria-label="الأدوات"><div class="rt">${all.map((t,i)=>`<button class="ri" role="tab" data-i="${i}" aria-controls="${t.id}"><i>${t.i}</i><span>${t.t}</span></button>`).join('')}</div></div><button class="rb" id="rn" aria-label="الأداة التالية">←</button></div><p class="rh">اسحب البكرة يمين وشمال، أو استخدم الأسهم. ملهاش آخر 🔄</p>${TOOLS.map(panel).join('')}
 <section class="panel" id="gpa" role="tabpanel"><h3>🎓 حاسبة المعدل</h3><p class="mute">اختار تقدير كل مادة وعدّل الساعات لو لزم. المقياس شائع، راجع لائحة الكلية للتأكد.</p>${S.map(s=>`<div class="g"><span>${s.n}</span><input type="number" min="0" max="6" value="${s.t+s.p}" aria-label="ساعات ${s.n}"><select aria-label="تقدير ${s.n}"><option value="">-</option>${G.map(([a,b])=>`<option value="${b}">${a}</option>`).join('')}</select></div>`).join('')}<div class="out" id="gr">اختار تقديراتك</div></section>
 <section class="panel" id="exam" role="tabpanel"><h3>⏳ عدّاد الامتحان</h3><p class="mute">اكتب اسم الامتحان وتاريخه، والموعد بيتحفظ على جهازك.</p><div class="fs"><label class="fl"><span>اسم الامتحان</span><input id="en" maxlength="40" placeholder="مثلاً: ميد جيو101"></label><label class="fl"><span>التاريخ</span><input id="ed" type="date"></label></div><button class="btn bp" id="es" style="justify-self:start">حفظ الموعد</button><div class="out" id="er">حدد موعد أقرب امتحان</div></section></div>`;
 const show=id=>{$$('.panel',M).forEach(p=>p.classList.toggle('on',p.id==id));history.replaceState(null,'','#'+id)};
 const h0=all.findIndex(t=>t.id==location.hash.slice(1));
 const rl=makeReel($('#rl'),all.length,Math.max(0,h0),k=>show(all[k].id));
 $('#rp').onclick=()=>rl.step(-1);$('#rn').onclick=()=>rl.step(1);
 addEventListener('hashchange',()=>{const k=all.findIndex(t=>t.id==location.hash.slice(1));if(k>=0)rl.pick(k)});
 TOOLS.forEach(t=>{const p=$('#'+t.id),o=$('.out',p),r=()=>{const v={};$$('[data-f]',p).forEach(e=>v[e.dataset.f]=e.value);o.innerHTML=t.run(v)};p.addEventListener('input',r);r()});
 const gp=$('#gpa'),gr=()=>{let h=0,q=0;$$('.g',gp).forEach(r=>{const a=+$('input',r).value,g=$('select',r).value;if(g!==''&&a>0){h+=a;q+=a*g}});const v=q/h;$('#gr').innerHTML=h?`المعدل: ${B(v.toFixed(2))} من 4 عن ${B(h)} ساعة<br>${v>=3.5?'ممتاز! كمّل كده 🔥':v>=3?'جيد جداً، قريب من القمة':v>=2?'كويس، ومعاك فرصة تعلّي':'لسه قدامك وقت، ركّز في الجاي 💪'}`:'اختار تقديراتك'};gp.addEventListener('input',gr);
 let ex=null;try{ex=JSON.parse(localStorage.getItem('exam')||'null')}catch(e){}
 const tick=()=>{if(!ex)return;const d=new Date(ex.d+'T00:00:00')-new Date();$('#er').innerHTML=d<=0?`${esc(ex.n)}: جه الموعد، بالتوفيق! 🎓`:`${esc(ex.n)}: فاضل ${B(Math.floor(d/864e5))} يوم و ${B(Math.floor(d/36e5%24))} ساعة و ${B(Math.floor(d/6e4%60))} دقيقة`};
 $('#es').onclick=()=>{const d=$('#ed').value;if(!d)return;ex={d,n:$('#en').value.trim()||'الامتحان'};try{localStorage.setItem('exam',JSON.stringify(ex))}catch(e){}tick()};
 setInterval(tick,30000);tick()}

/* ===== لو مش عاجبك شكل الموقع ===== */
const PALS=[
 ['emerald','الأخضر الأصلي','الكلاسيك اللي اتعمل عليه الموقع، ومحدش اشتكى (لسه)'],
 ['ocean','محيط','عشان تغرق في المذاكرة بستايل'],
 ['sunset','غروب','لو الامتحان قرّب، اتفرج على الغروب شوية'],
 ['desert','صحرا','سيناء من غير تذكرة قطر'],
 ['neon','نيون','لسهران الفجر وعينه متحمّلة'],
 ['rose','وردي','مين قال إن الجيوماتكس مش لطيف؟'],
 ['coffee','قهوة','المذاكرة من غيرها غير شرعية'],
 ['mono','أبيض وأسود','للجادين بس. ممنوع الهزار 🧐']];
const HINT={
 m:{auto:'الموقع هيمشي على مزاج جهازك.',dark:'للسهر، وللعيون التعبانة.',light:'للشجعان بس. ويا ريت بالنهار.'},
 fs:{s:'خط صغير... عينك زي النسر؟',m:'الوضع الطبيعي، زي ما ربنا خلقه.',l:'للي نسي النضارة في العربية 👓'},
 r:{s:'حواف حادة، شكلك جاد في الشغل.',m:'متوازن، زي حياتك (المفروض).',l:'دايرية ومدلّعة، كإنها بتحضنك.'}};
function lookPage(){
 const seg=(k,o)=>`<div class="seg" role="group" data-k="${k}">${o.map(([v,l])=>`<button type="button" data-v="${v}">${l}</button>`).join('')}</div>`;
 const sw=(k,t,s)=>`<label class="sw"><input type="checkbox" data-k="${k}"><span class="tr"><i></i></span><span class="st"><b>${t}</b><small>${s}</small></span></label>`;
 M.innerHTML=`<div class="w sec look"><h2 data-n="05">لو مش عاجبك شكل الموقع</h2><p class="lead">طب كان من الأول! اتفضل غيّره على مزاجك. الموقع هيفتكر اختيارك المرة الجاية، ومش هنعاتبك... كتير. 😌</p>
 <section class="panel"><h3>🎨 اختار لونك</h3><p class="mute">الاختيار بيتطبق فوراً على الصفحة كلها، وعلى الكرة الأرضية والنقط اللي في الخلفية كمان.</p><div class="pals">${PALS.map(([id,n,d])=>`<button type="button" class="pal rv" data-pal="${id}" aria-pressed="false"><span class="pv"><i></i><i></i><i></i></span><b>${n}</b><small>${d}</small><span class="ck" aria-hidden="true">✓</span></button>`).join('')}</div></section>
 <div class="opts"><section class="panel"><h3>💡 الإضاءة</h3>${seg('m',[['auto','🌗 تلقائي'],['dark','🌙 ليلي'],['light','☀️ نهاري']])}<p class="mute hint" data-h="m"></p></section>
 <section class="panel"><h3>🔠 حجم الكلام</h3>${seg('fs',[['s','صغير'],['m','عادي'],['l','كبير']])}<p class="mute hint" data-h="fs"></p></section>
 <section class="panel"><h3>📐 الحواف</h3>${seg('r',[['s','حاد'],['m','عادي'],['l','دائري']])}<p class="mute hint" data-h="r"></p></section>
 <section class="panel"><h3>⚙️ الحركة</h3>${sw('bg','الخلفية المتحركة','الشبكة والنقط اللي ورا الصفحة. اقفلها لو موبايلك بيسخن.')}${sw('an','الأنيميشن','كل الحركات والتأثيرات. اقفلها لو دماغك بتلف.')}</section></div>
 <section class="panel pvw"><h3>👀 معاينة سريعة</h3><h4 class="gt">نقيس. نحلّل. نرسم.</h4><div class="chips"><span class="chip">Geo101</span><span class="chip">GIS</span><span class="chip on">مختار</span></div><div class="cta"><span class="btn bp">زرار أساسي</span><span class="btn">زرار عادي</span></div><div class="out">المسافة: <b>١٣٠.٤ كم</b> · السمت: <b>١٧٣°</b></div></section>
 <div class="cta"><button class="btn bp" id="rnd" type="button">🎲 اختارلي أنا</button><button class="btn" id="rst" type="button">🙃 رجّعني زي ما كنت</button></div>
 <p class="mute foot">لسه مش عاجبك؟ جرّب تقفل الموقع وتفتحه تاني... مش هيفرق بس هتحس بتحسن. 😅</p></div>`;
 const sync=()=>{$$('.seg').forEach(g=>{const k=g.dataset.k;$$('button',g).forEach(b=>{const on=b.dataset.v==gx[k];b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});$(`[data-h=${k}]`).textContent=HINT[k][gx[k]]||''});
  $$('.sw input').forEach(i=>i.checked=gx[i.dataset.k]=='on');
  $$('.pal').forEach(b=>{const on=b.dataset.pal==gx.pal;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)})};
 const set=(k,v)=>{gx[k]=v;applyGX(1)};
 M.addEventListener('click',e=>{const b=e.target.closest('.seg button,.pal');if(!b)return;b.classList.contains('pal')?set('pal',b.dataset.pal):set(b.closest('.seg').dataset.k,b.dataset.v)});
 M.addEventListener('change',e=>{const i=e.target.closest('.sw input');if(i)set(i.dataset.k,i.checked?'on':'off')});
 $('#rnd').onclick=()=>{const o=PALS.filter(p=>p[0]!=gx.pal);set('pal',o[Math.floor(Math.random()*o.length)][0])};
 $('#rst').onclick=()=>{Object.assign(gx,GX_DEF);applyGX(1)};
 addEventListener('gx',sync);sync()}

/* ===== الجروبات والروابط ===== */
function groupsPage(){
 M.innerHTML=`<div class="w sec">${GROUPS.map((g,k)=>`<h2 data-n="${String(k+1).padStart(2,'0')}" style="margin-top:${k?44:0}px">${g.t}</h2><p class="mute">${g.s}</p><div class="grid">${g.items.map(x=>`<a class="card rv" style="--c:${g.c};text-decoration:none;color:inherit" href="${esc(x.u)}" target="_blank" rel="noopener"><h3>${x.i} ${esc(x.n)}</h3><p class="mute">${esc(x.d)}</p><div class="chips"><span class="chip">انضم ←</span></div></a>`).join('')}</div>`).join('')}<p class="mute" style="margin-top:36px">الجروبات دي مبادرة طلابية. المواعيد والقرارات الرسمية بتتاخد من إعلانات الكلية.</p></div>`}

/* ===== جدول المحاضرات ===== */
const slot=x=>`${x[0]} ${x[1]} · مدرج ${x[3]}${x[4]?' · مجموعة '+x[4]:''}`;
function schedulePage(){
 const days=[...new Set(SCHED.map(x=>x[0]))];
 M.innerHTML=`<div class="w sec"><h2 data-n="10">جدول المحاضرات</h2><p class="mute">الفصل الأول 2026/2027، المستوى الأول (الأسبوع الثاني). الجدول عرضة للتغيير، راجع إعلانات الكلية.</p>
 ${days.map(dy=>`<h3 style="margin:30px 0 6px">${dy}</h3>${SCHED.filter(x=>x[0]==dy).map(x=>{const s=S.find(v=>v.id==x[2]);return `<a class="row rv" style="--c:${s.c}" href="subject.html?id=${s.id}"><span><b>${s.i} ${s.n}</b><br><small class="mute">${s.d.map(nm).join(' + ')}</small></span><small class="mute">${x[1]} · مدرج ${x[3]}${x[4]?' · مجموعة '+x[4]:''}</small></a>`}).join('')}`).join('')}
 <div class="chips" style="margin-top:30px"><a class="btn sm" href="files/schedule-week2.pdf" target="_blank" rel="noopener">📄 الجدول PDF</a><a class="btn sm" href="files/schedule-week2.jpg" target="_blank" rel="noopener">🖼️ صورة الجدول</a></div></div>`}

/* ===== عن المنصة ===== */
function aboutPage(){
 const q=[['هل الموقع رسمي؟','لا، دي مبادرة طلابية مستقلة. المواعيد والقرارات الرسمية بتتاخد من إعلانات الكلية.'],['إزاي أرفع ملخص؟','ادخل على صفحة المادة، اكتب عنوان الملخص، واختار صورة أو PDF لحد 15MB. بيظهر بعد المراجعة.'],['ليه ملخصي ما ظهرش؟','كل ملخص بيتراجع يدوياً قبل النشر، فممكن ياخد شوية وقت.'],['فين كتب المواد؟','في قسم الكتب، وكمان في صفحة كل مادة. الكتب بتتضاف أول بأول، والمادة اللي كتابها لسه مجاش بتظهر "قريباً".'],['مش عاجبني شكل الموقع، أعمل إيه؟','ادخل على <a href="look.html">لو مش عاجبك شكل الموقع</a> وغيّر الألوان والإضاءة وحجم الخط والحواف زي ما تحب.'],['الأدوات دقيقة؟','بتستخدم صيغ قياسية (زي هافرساين لحساب المسافة على سطح الأرض)، ومناسبة للدراسة والتقدير. للأعمال الهندسية الرسمية استخدم أجهزة وبرامج معتمدة.']];
 M.innerHTML=`<div class="w sec"><h2 data-n="06">عن المنصة</h2><p class="lead">منصة مجانية بتجمع مواد برنامج الجيوماتكس وكتبها ودكاترتها وملخصات الطلبة، وبتقدّم أدوات مساحة وخرائط مفيدة لأي طالب أو مهتم.</p><div class="grid"><div class="card rv"><h3>🆓 مجانية</h3><p class="mute">من غير اشتراك ولا تسجيل.</p></div><div class="card rv"><h3>🤝 بجهود الطلبة</h3><p class="mute">الملخصات بيرفعها زمايلك وبتتراجع قبل النشر.</p></div><div class="card rv"><h3>📖 كتب المواد</h3><p class="mute">كتاب لكل مادة، تقراه أونلاين أو تحمّله.</p></div><div class="card rv"><h3>🧭 أدوات حقيقية</h3><p class="mute">حسابات إحداثيات ومساحة بتفيدك في الدراسة والشغل.</p></div></div>
 <h2 data-n="07" style="margin-top:50px">إزاي تساهم؟</h2><div class="grid"><div class="card rv"><h3>1. صوّر</h3><p class="mute">لخّص المحاضرة وصوّر الكراسة أو اعملها PDF.</p></div><div class="card rv"><h3>2. ارفع</h3><p class="mute">افتح صفحة المادة وارفع الملف بعنوان واضح.</p></div><div class="card rv"><h3>3. شارك</h3><p class="mute">بعد المراجعة بيظهر لكل الدفعة، وابعت الرابط لزمايلك.</p></div></div>
 <h2 data-n="08" style="margin-top:50px">أسئلة شائعة</h2>${q.map(([a,b])=>`<details><summary>${a}</summary><p>${b}</p></details>`).join('')}
 <h2 data-n="09" style="margin-top:50px">المطوّر</h2><div class="card" style="--c:var(--g1);margin-top:18px"><div class="av" style="background:var(--g1);color:var(--on)">${esc(au)[0]}</div><h3>${esc(au)}</h3><p class="mute">طالب بالفرقة الأولى، برنامج الجيوماتكس. عندك فكرة أو عايز تساهم في التطوير؟ كلمني.</p><div class="chips"><a class="chip" href="tel:+2${SITE.phone}" dir="ltr">📞 ${SITE.phone}</a>${lk}</div></div></div>`}

({index:home,subjects:subjectsPage,subject:subjectPage,books:booksPage,doctors:doctorsPage,groups:groupsPage,schedule:schedulePage,tools:toolsPage,look:lookPage,about:aboutPage})[P]();fin();applyGX();
