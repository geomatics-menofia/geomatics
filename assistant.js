/* ===== مساعد جيوماتكس: بيرد فوراً من بيانات الموقع نفسها، من غير سيرفر ومن غير إنترنت إضافي ===== */
(()=>{
const AR=s=>String(s).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d)).toLowerCase().replace(/[ً-ْـ]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/ؤ/g,'و').replace(/ئ/g,'ي').replace(/[^ء-يa-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const X=s=>String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const rx=w=>new RegExp('(^| )(?:و|ف|ب|ل|ك|لل|ال|وال|بال|فال|كال)?'+X(AR(w))+'(?= |$)');
const has=(q,list)=>list.some(w=>rx(w).test(q));
const E=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const A=(u,t,same)=>`<a href="${E(u)}"${!same&&(/^https?:/.test(u)||/\.pdf$/.test(u))?' target="_blank" rel="noopener"':''}>${E(t)}</a>`;

/* مرادفات المواد */
const AL={geo101:['طبيعيه','geo101','عواد'],geo102:['مساحه','خرائط','geo102','ايمان عصام','الامام'],geo103:['نظم','gis','جي اي اس','geo103','عاطف','ارك جيس','arcgis','وجدي'],geo106:['بشريه','geo106','صبحي'],geo119:['اقتصاديه','اقتصاد','geo119','شاويش','يوسف'],geo214:['قضايا','معاصره','geo214'],geo210:['صناعه','geo210'],un400:['جوده','اعتماد','un400','موسي','فتحي']};
['geo102','geo210','geo214'].forEach(k=>AL[k].push('اماني'));['geo210','geo214'].forEach(k=>AL[k].push('منشاوي'));
const subjectsIn=q=>S.filter(s=>(AL[s.id]||[]).some(a=>rx(a).test(q))||q.includes(AR(s.n)));

const DAYS=['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const TIMES=['9:00–10:30','10:30–12:00','12:00–1:30','1:30–3:00'];
const dayIn=q=>{for(const d of DAYS)if(rx(d).test(q))return d;return null};
const slot=x=>`${x[0]} ${x[1]} · مدرج ${x[3]}${x[4]?' · مجموعة '+x[4]:''}`;
const sn=s=>`${s.i} ${s.n}`;
const drs=s=>s.d.concat(s.a||[]).map(x=>x+(x==SITE.head?' (رئيس القسم)':'')).join(' + ');

let ctx=[]; /* آخر مادة اتسأل عنها، عشان الأسئلة التكميلية */
const need=(q,fn,what)=>{const f=subjectsIn(q);const l=f.length?f:ctx;if(!l.length)return ask(what);if(f.length)ctx=f;return fn(l)};
const ask=what=>`تقصد أنهي مادة${what?' ('+what+')':''}؟<div class="ai-ch">${S.map(s=>`<button class="chip" data-q="${E(what||'عن')} ${E(s.n)}">${sn(s)}</button>`).join('')}</div>`;

/* ===== الأسئلة ===== */
const H={
 schedule(q){
  const td=new Date(),want=/\bبكره\b|^بكره| بكره|غدا/.test(q)?DAYS[(td.getDay()+1)%7]:/النهارده|انهارده|اليوم|دلوقتي/.test(q)?DAYS[td.getDay()]:dayIn(q);
  const f=subjectsIn(q);
  if(want&&!f.length){const r=SCHED.filter(x=>AR(x[0])==AR(want)).sort((a,b)=>TIMES.indexOf(a[1])-TIMES.indexOf(b[1]));
   return r.length?`<b>محاضرات ${want}:</b><br>${r.map(x=>{const s=S.find(v=>v.id==x[2]);return `• ${x[1]}: ${A('subject.html?id='+s.id,sn(s),1)} · مدرج ${x[3]}${x[4]?' · مجموعة '+x[4]:''}`}).join('<br>')}<br><small>حسب جدول الأسبوع الثاني، راجع إعلانات الكلية.</small>`:`مفيش محاضرات يوم ${want} في الجدول الحالي 🎉`}
  const l=f.length?f:ctx;if(!l.length)return `${A('schedule.html','افتح جدول المحاضرات كامل',1)}<br>أو اسألني عن مادة معينة أو يوم، مثلاً: <i>محاضرة المساحة امتى؟</i> أو <i>جدول الأحد</i>.`;
  ctx=l;return l.map(s=>{const r=SCHED.filter(x=>x[2]==s.id);return `<b>${sn(s)}</b><br>${r.length?r.map(slot).join('<br>'):'مش موجودة في الجدول الحالي.'}`}).join('<br><br>')+`<br><small>جدول الأسبوع الثاني، ${A('schedule.html','الجدول كامل',1)}</small>`},
 doctor(q){
  const STOP=['دكتور','دكتوره','استاذ','معيد','معيده','مدرس','بيدرس','مين','هو','هي'];
  const f=subjectsIn(q);
  if(has(q,['رئيس القسم','رئيس'])&&!f.length)return `رئيس القسم: <b>${E(SITE.head)}</b>${ppl[SITE.head]?'، بيدرّس '+ppl[SITE.head].map(([s])=>s.n).join(' و'):''}.`;
  if(f.length)return need(q,l=>l.map(s=>`<b>${sn(s)}</b><br>${drs(s)}`).join('<br><br>'),'الدكاترة');
  const m=Object.keys(ppl).filter(n=>q.split(' ').some(t=>t.length>3&&!STOP.includes(t)&&AR(n).includes(t)));
  if(m.length)return m.map(n=>`<b>${E(n)}</b> (${role(n)})<br>${ppl[n].map(([s,l])=>A('subject.html?id='+s.id,s.n+(l?' (عملي)':''),1)).join(' · ')}`).join('<br><br>');
  return ctx.length?need(q,l=>l.map(s=>`<b>${sn(s)}</b><br>${drs(s)}`).join('<br><br>'),'الدكاترة'):`${A('doctors.html','كل الدكاترة والمعيدين',1)}، أو اسأل عن مادة: <i>مين دكتور المساحة؟</i>`},
 group(q){
  const f=subjectsIn(q);
  if(has(q,['تيليجرام','تلجرام','قناه','قنوات','وطنيه','عسكريه']))return GROUPS.filter(g=>/تيليجرام|الوطنيه|العسكريه|قنوات/.test(AR(g.t))).flatMap(g=>g.items).map(x=>`${x.i} ${A(x.u,x.n)}`).join('<br>')||'';
  if(has(q,['الدفعه','دفعه','سكشن','كليه الاداب','الكليه'])&&!f.length){const g=GROUPS[1].items;return g.map(x=>`${x.i} ${A(x.u,x.n)}`).join('<br>')}
  if(!f.length&&!ctx.length)return `جروبات واتساب لكل مادة، والدفعة، والسكاشن: ${A('groups.html','افتح صفحة الجروبات',1)}<br>أو اسأل عن مادة: <i>جروب الجودة</i>.`+ask('جروب');
  return need(q,l=>l.map(s=>GROUP_OF[s.id]?`💬 ${A(GROUP_OF[s.id],'جروب '+s.n)}`:`${sn(s)}: لسه مفيش جروب ليها، ${A('groups.html','شوف باقي الجروبات',1)}`).join('<br>'),'جروب')},
 files(q){
  const kind=has(q,['كتاب','كتب'])?'b':has(q,['اسايمنت','اسئله','سكشن','تدريب'])?'a':'l';
  return need(q,l=>l.map(s=>{const bk=(BOOKS[s.id]||[]),lc=(LECT[s.id]||[]),all=(kind=='b'?bk:kind=='a'?lc.filter(x=>/اسايمنت|سكشن|اسئله/.test(AR(x.t))):bk.concat(lc));
   const list=all.length?all:bk.concat(lc);
   return `<b>${sn(s)}</b><br>`+(kind=='b'&&!bk.length&&list.length?'الكتاب لسه مترفعش، بس فيه:<br>':'')+(list.length?list.map(x=>`📄 ${A(x.f,x.t)}`).join('<br>'):'لسه مفيش ملفات ليها.')+`<br>${A('subject.html?id='+s.id,'صفحة المادة (فيها ملخصات الطلبة)',1)}`}).join('<br><br>'),'ملفات')},
 rules(q){
  if(has(q,['معدل','gpa','حساب','احسب']))return `احسب معدلك بسهولة من ${A('tools.html','صفحة الأدوات',1)}.`;
  return `من اللائحة: <br>• الإجباري <b>120 ساعة (40 مادة)</b> ولازم تتسجل وتنجح فيها.<br>• الاختياري: تختار <b>8 مواد من 24</b>، ومعاهم مادتين متطلب كلية من 4 (التنمية البشرية، دراسة الجدوى، إدارة الأزمات، مهارات التواصل).<br>• مادتين متطلب جامعة (قضايا مجتمعية، مدخل إلى الجودة) ومش بتتحسب في الساعات.<br>📘 ${A('department-regulations.pdf','افتح ملف اللائحة')}`},
 links(q){
  const it=GROUPS[GROUPS.length-1].items;
  const m=it.filter(x=>(has(q,['ابن الهيثم','برنامج','بوابه','خدمات'])&&/هيثم/.test(AR(x.n)))||(has(q,['تعلم','منصه','الكتروني','ايليرنينج'])&&/تعلم/.test(AR(x.n)))||(has(q,['دفع','رسوم','مصروفات','سداد'])&&/دفع/.test(AR(x.n)))||(has(q,['فيسبوك','صفحه','اخبار'])&&/صفحه|الصفحه/.test(AR(x.n)))||(has(q,['ارشاد','توجيه'])&&/ارشاد/.test(AR(x.n)))||(has(q,['جدول'])&&/جدول/.test(AR(x.n)))||(has(q,['لايحه'])&&/لايحه/.test(AR(x.n))));
  return (m.length?m:it).map(x=>`${x.i} ${A(x.u,x.n)}<br><small>${E(x.d)}</small>`).join('<br>')},
 upload(){return `لرفع ملخص: افتح صفحة المادة، اكتب عنوان الملخص، واختار صورة أو PDF لحد 15MB. بيظهر بعد مراجعة المسؤول.<div class="ai-ch">${S.map(s=>`<a class="chip" href="subject.html?id=${s.id}">${s.i} ${E(s.n)}</a>`).join('')}</div>`},
 contact(){return `المطوّر: <b>${E(SITE.author)}</b><br>📞 <a href="tel:+2${E(SITE.phone)}" dir="ltr">${E(SITE.phone)}</a>${SITE.links.whatsapp?'<br>💬 '+A(SITE.links.whatsapp,'كلمني على واتساب'):''}`},
 tools(){return `الأدوات: ${TOOLS.map(t=>t.t).join('، ')} وحاسبة المعدل وعدّاد الامتحان.<br>${A('tools.html','افتح الأدوات',1)}`},
 look(){return `غيّر الألوان والإضاءة وحجم الخط من ${A('look.html','صفحة المظهر',1)}. ولو الموبايل بطيء، اقفل "الأنيميشن" من هناك.`},
 subjects(q){
  const f=subjectsIn(q);
  if(f.length){ctx=f;return f.map(s=>{const r=SCHED.filter(x=>x[2]==s.id);return `<b>${sn(s)}</b> <small>(${s.code})</small><br>${E(s.desc)}<br>👨‍🏫 ${drs(s)}<br>⏱️ ${s.t} نظري${s.p?' + '+s.p+' عملي':''}${r.length?'<br>🗓️ '+r.map(slot).join('<br>🗓️ '):''}<br>${A('subject.html?id='+s.id,'صفحة المادة',1)}${GROUP_OF[s.id]?' · '+A(GROUP_OF[s.id],'الجروب'):''}`}).join('<br><br>')}
  return `مواد الفصل الأول (${S.length}):<br>${S.map(s=>`• ${A('subject.html?id='+s.id,sn(s),1)} <small>${s.code}</small>`).join('<br>')}`}
};

const SUG=['جدول النهاردة','جروبات المواد','اللائحة والمقررات','كتب ومحاضرات','مين دكتور المساحة؟','تواصل مع المطوّر'];

const E2A=[['tomorrow','بكره'],['today','النهارده'],['saturday','السبت'],['sunday','الأحد'],['monday','الاثنين'],['tuesday','الثلاثاء'],['wednesday','الأربعاء'],['thursday','الخميس'],['friday','الجمعة'],['schedule','جدول'],['timetable','جدول'],['when','امتي'],['hall','مدرج'],['doctors','دكتور'],['doctor','دكتور'],['professor','دكتور'],['teacher','دكتور'],['who teaches','مين بيدرس'],['teaches','بيدرس'],['head of department','رئيس القسم'],['department head','رئيس القسم'],['groups','جروبات'],['group','جروب'],['whatsapp','واتساب'],['telegram','تيليجرام'],['channels','قنوات'],['channel','قناه'],['links','روابط'],['link','لينك'],['books','كتب'],['book','كتاب'],['download','تحميل'],['summaries','ملخصات'],['summary','ملخص'],['assignment','اسايمنت'],['section','سكشن'],['lectures','محاضرات'],['lecture','محاضره'],['regulations','لايحه'],['credit hours','ساعات'],['hours','ساعات'],['gpa','معدل'],['graduation','تخرج'],['tools','ادوات'],['tool','اداه'],['calculator','حاسبه'],['coordinates','احداثيات'],['distance','مسافه'],['upload','ارفع'],['developer','المطور'],['contact','تواصل'],['theme','ثيم'],['colors','الوان'],['dark','ليلي'],['light','نهاري'],['slow','بطيء'],['subjects','المواد'],['courses','المقررات'],['hello','مرحبا'],['hi','هاي'],['hey','هاي'],['thanks','شكرا'],['thank you','شكرا'],['help','ساعدني'],['fees','رسوم'],['payment','دفع'],['e-learning','تعلم الكتروني'],['facebook','فيسبوك'],['advising','ارشاد'],['ibn al haytham','ابن الهيثم'],['physical geography','طبيعيه'],['surveying','مساحه'],['mapping','خرائط'],['maps','خرائط'],['human geography','بشريه'],['economic','اقتصاديه'],['economics','اقتصاد'],['contemporary','معاصره'],['industrial','صناعه'],['industry','صناعه'],['quality','جوده'],['accreditation','اعتماد']].sort((a,b)=>b[0].length-a[0].length);
const en2ar=r=>{if(document.documentElement.lang!='en')return r;let q=' '+String(r).toLowerCase().replace(/[^a-z0-9 \-\u0600-\u06FF]/g,' ')+' ';E2A.forEach(([e,a])=>{q=q.split(' '+e+' ').join(' '+a+' ').split(' '+e+' ').join(' '+a+' ')});return q.trim()};
function answer(raw){raw=en2ar(raw);
 const q=AR(raw);if(!q)return 'اكتب سؤالك وأنا أرد فوراً 🙂';
 if(has(q,['شكرا','تسلم','جزاك','ميرسي','thanks'])&&q.split(' ').length<5)return 'العفو! لو احتجت أي حاجة تانية أنا هنا 🙌';
 if(has(q,['السلام عليكم','سلام','مرحبا','اهلا','هاي','ازيك','صباح الخير','مساء الخير'])&&q.split(' ').length<5)return 'أهلاً بيك! 👋 أنا مساعد جيوماتكس. اسألني عن الجدول أو المواد أو الدكاترة أو الجروبات أو الكتب.';
 if(has(q,['ساعدني','تقدر','بتعمل ايه','تعمل ايه','مساعده','help','انت مين']))return `أنا مساعد الموقع، بجاوب فوراً من بيانات المنصة: <br>🗓️ مواعيد المحاضرات والمدرجات<br>👨‍🏫 الدكاترة والمعيدين<br>💬 جروبات واتساب وتيليجرام<br>📚 الكتب والمحاضرات والأسايمنت<br>📘 اللائحة وروابط الجامعة<br>🧭 الأدوات`;
 const TW=['مواعيد','ميعاد','جدول','امتي','الساعه','مدرج','النهارده','انهارده','بكره','غدا','اليوم','يوم','دلوقتي'];
 const FW=['كتاب','كتب','pdf','ملف','ملفات','تحميل','ملخص','ملخصات','مذكره','مذكرات','اسايمنت','اسئله','سكشن'];
 if((has(q,TW)||dayIn(q))&&(!has(q,FW)||has(q,['جدول','امتي','ميعاد','مدرج'])))return H.schedule(q);
 if(has(q,['تواصل','رقم','المطور','احمد','ابلغ','مشكله','اقتراح','كلم']))return H.contact();
 if(has(q,['ارفع','رفع','ارفع ملخص','اضيف ملخص','ابعت ملخص','اعمل ملخص']))return H.upload();
 if(has(q,['اسايمنت','اسئله','سكشن','كتاب','كتب','ملف','ملفات','ملخص','ملخصات','مذكره','مذكرات','تحميل','pdf','محاضرات','محاضره','تدريبات','شرح']))return H.files(q);
 if(has(q,['دكتور','دكتوره','دكاتره','دكاتر','استاذ','مدرس','معيد','معيده','رئيس القسم','مين بيدرس','بيدرس','مين دكتور']))return H.doctor(q);
 if(has(q,['جروب','جروبات','قروب','واتساب','واتس','تيليجرام','تلجرام','قناه','قنوات','لينك','رابط الجروب']))return H.group(q);
 if(has(q,['لايحه','المقررات','ساعات معتمده','ساعات','اجباري','اختياري','اختياريه','تخرج','متطلب','gpa','معدل','تراكمي','فصلي','تسجيل']))return H.rules(q);
 if(has(q,['ابن الهيثم','بوابه','دفع','رسوم','مصروفات','سداد','منصه التعلم','تعلم الكتروني','فيسبوك','ارشاد','روابط','لينكات']))return H.links(q);
 if(has(q,['اداه','ادوات','حاسبه','احداثيات','مسافه','مساحه الارض','عداد','تحويل']) && !subjectsIn(q).length)return H.tools();
 if(has(q,['لون','ثيم','مظهر','ليلي','نهاري','الوان','بطيء','تقيل','تهنج']))return H.look();
 if(has(q,['المواد','مقررات الفصل','كام ماده','مواد الترم'])||subjectsIn(q).length)return H.subjects(q);
 return null}
const FALL=()=>`مش متأكد إني فهمت 🤔 جرّب سؤال من دول:<div class="ai-ch">${SUG.map(t=>`<button class="chip" data-q="${E(t)}">${E(t)}</button>`).join('')}</div>`;
const KB=()=>{const L=['المواد:'];S.forEach(s=>L.push(`- ${s.n} (${s.code}) | ${s.t} نظري${s.p?' + '+s.p+' عملي':''} | ${drs(s)} | ${s.desc}`));L.push('الجدول (الأسبوع الثاني):');SCHED.forEach(x=>{const s=S.find(v=>v.id==x[2]);L.push(`- ${slot(x)} ${s.n}`)});L.push('رئيس القسم: '+SITE.head);L.push('اللائحة: الإجباري 120 ساعة (40 مادة)، الاختياري 8 مواد من 24 + مادتين متطلب كلية من 4، ومادتين متطلب جامعة (قضايا مجتمعية، مدخل إلى الجودة) ولا تحسب في الساعات.');L.push('الجروبات: '+GROUPS.flatMap(g=>g.items).map(i=>i.n).join('، '));L.push('المطوّر: '+SITE.author+' - '+SITE.phone);return L.join('\n').slice(0,7500)};
const HIST=[]; /* آخر كلام مع الذكاء الاصطناعي عشان يفتكر السياق */
const askAI=(t,m)=>{const ac=new AbortController(),to=setTimeout(()=>ac.abort(),25000);
 fetch(SITE.url+'/functions/v1/ask',{method:'POST',signal:ac.signal,headers:{'Content-Type':'application/json',apikey:SITE.key},body:JSON.stringify({q:t+(document.documentElement.lang=='en'?' (Please reply in English)':''),kb:KB(),h:HIST.slice(-6)})}).then(r=>r.json()).then(d=>{if(d&&d.a){HIST.push({r:'user',t:t},{r:'model',t:d.a})}m.innerHTML=d&&d.a?E(d.a).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/\n/g,'<br>')+'<br><small>🤖 رد ذكاء اصطناعي، راجع الإعلانات الرسمية للتأكيد.</small>':FALL()}).catch(()=>{m.innerHTML=FALL()}).finally(()=>clearTimeout(to))};


/* ===== الواجهة ===== */
const fab=document.createElement('button');fab.id='ai-fab';fab.type='button';fab.setAttribute('aria-label','افتح مساعد جيوماتكس');fab.textContent='🤖';
let box=null,log=null,inp=null;
const add=(html,me)=>{const m=document.createElement('div');m.className='ai-m '+(me?'me':'bot');if(me)m.textContent=html;else m.innerHTML=html;log.append(m);log.scrollTop=log.scrollHeight;return m};
const send=t=>{t=String(t).trim().slice(0,200);if(!t)return;add(t,1);inp.value='';const r=answer(t);if(r!==null){add(r);return}if(!SITE.ai||!SITE.url){add(FALL());return}askAI(t,add('بفكّر… 🤔'))};
function build(){
 box=document.createElement('section');box.id='ai';box.setAttribute('role','dialog');box.setAttribute('aria-label','مساعد جيوماتكس');
 box.innerHTML=`<header><b>🤖 مساعد جيوماتكس</b><button type="button" class="ai-x" aria-label="إغلاق">✕</button></header><div class="ai-log" aria-live="polite"></div><div class="ai-sg">${SUG.map(t=>`<button class="chip" type="button" data-q="${E(t)}">${E(t)}</button>`).join('')}</div><form><input type="text" maxlength="200" placeholder="اسألني: محاضرة المساحة امتى؟" aria-label="اكتب سؤالك" autocomplete="off"><button type="submit" aria-label="إرسال">←</button></form>`;
 document.body.append(box);log=box.querySelector('.ai-log');inp=box.querySelector('input');
 box.querySelector('.ai-x').onclick=toggle;
 box.querySelector('form').onsubmit=e=>{e.preventDefault();send(inp.value)};
 box.addEventListener('click',e=>{const b=e.target.closest('[data-q]');if(b)send(b.dataset.q)});
 box.addEventListener('keydown',e=>{if(e.key=='Escape')toggle()});
 add('أهلاً! 👋 أنا مساعد جيوماتكس. اسألني عن <b>الجدول</b> أو <b>المواد</b> أو <b>الدكاترة</b> أو <b>الجروبات</b> أو <b>الكتب</b> وهرد فوراً.')}
function toggle(){if(!box)build();const o=box.classList.toggle('open');fab.classList.toggle('hide',o&&matchMedia('(max-width:820px)').matches);if(o)inp.focus();else fab.focus()}
fab.onclick=toggle;document.body.append(fab);
})();
