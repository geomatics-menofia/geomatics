const $=s=>document.querySelector(s);
const msg=(t,ok)=>{const m=$('#msg');m.textContent=t;m.style.color=ok?'#34D399':'#FB7185'};
const key=()=>$('#k').value;
$('#ps').innerHTML=S.map(s=>`<option value="${s.id}">${s.i} ${s.n}</option>`).join('');

$('#f').addEventListener('submit',async e=>{
  e.preventDefault();
  const btn=$('#go');btn.disabled=true;msg('جاري الإرسال…',true);
  try{
    const r=await fetch(SITE.url+'/functions/v1/notify',{method:'POST',headers:{'Content-Type':'application/json','x-admin-key':key(),apikey:SITE.key},
      body:JSON.stringify({title:$('#t').value.trim(),body:$('#b').value.trim(),url:$('#u').value})});
    const j=await r.json().catch(()=>({}));
    if(r.status===401)msg('كلمة السر غلط.',false);
    else if(!r.ok)msg('حصل خطأ: '+(j.error||r.status),false);
    else msg(`اتبعت لـ ${j.sent} جهاز من ${j.total}${j.removed?` (اتشال ${j.removed} جهاز قديم)`:''}.`,true);
  }catch(_){msg('مقدرتش أوصل للسيرفر. اتأكد إن الـFunction اتنشرت.',false)}
  btn.disabled=false;
});

const pcall=async o=>{const r=await fetch(SITE.url+'/functions/v1/publish',{method:'POST',headers:{'Content-Type':'application/json','x-admin-key':key(),apikey:SITE.key},body:JSON.stringify(o)});return{status:r.status,d:await r.json().catch(()=>({}))}};
const esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
async function list(){
  if(!key())return;
  const r=await pcall({action:'list'});
  if(r.status!==200){$('#pl').textContent='';return}
  $('#pl').innerHTML=r.d.publishers.map(p=>`<div class="row"><span>${p.active?'✅':'⛔'} <b>${esc(p.name)}</b><br><small class="mute">${p.subjects?p.subjects.map(esc).join('، '):'كل المواد'}</small></span><button data-id="${p.id}" data-a="${p.active?0:1}" style="padding:8px 14px;border-radius:10px;cursor:pointer">${p.active?'إيقاف':'تفعيل'}</button></div>`).join('')||'<p class="mute">لسه مفيش حد.</p>';
  $('#pl').querySelectorAll('button').forEach(b=>b.onclick=async()=>{await pcall({action:'revoke',id:b.dataset.id,active:b.dataset.a=='1'});list()});
}
$('#k').addEventListener('change',list);
$('#pf').addEventListener('submit',async e=>{
  e.preventDefault();const m=$('#pm');m.textContent='جاري الإنشاء…';
  const subs=[...$('#ps').selectedOptions].map(o=>o.value);
  const r=await pcall({action:'add',name:$('#pn').value.trim(),subjects:subs});
  if(r.status===401){m.textContent='اكتب كلمة السر الأول (فوق).';return}
  if(!r.d.code){m.textContent='حصل خطأ: '+(r.d.error||r.status);return}
  m.textContent=r.d.code;$('#pn').value='';list();
});
