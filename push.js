/* زرار الإشعارات 🔔: الطالب بيدوس عليه مرة واحدة ويسمح، وبعدين بتوصله كل إشعارات الموقع */
(()=>{
const V=SITE.vapid;
if(!V||typeof sb==='undefined'||!sb)return;
const hd=document.querySelector('header .bar');
if(!hd)return;
const ios=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone;
const supported='serviceWorker' in navigator&&'PushManager' in window&&'Notification' in window;
/* جوه تطبيق الأندرويد أو متصفح مش بيدعم الإشعارات: مفيش لازمة للزرار فنشيله (الآيفون بيفضل عشان خطوات التثبيت) */
if((window.Capacitor&&Capacitor.isNativePlatform&&Capacitor.isNativePlatform())||(!supported&&!ios))return;

const b=document.createElement('button');
b.id='pb';b.type='button';b.textContent='🔔';
b.setAttribute('aria-label','تفعيل إشعارات الموقع');b.title='تفعيل الإشعارات';
const th=document.getElementById('th');
th?th.before(b):hd.append(b);

const u8=s=>{const p='='.repeat((4-s.length%4)%4),r=atob((s+p).replace(/-/g,'+').replace(/_/g,'/'));return Uint8Array.from(r,c=>c.charCodeAt(0))};
const paint=on=>{b.classList.toggle('on',on);b.textContent=on?'🔔':'🔕';b.title=on?'الإشعارات شغالة (دوس لإيقافها)':'تفعيل الإشعارات';b.setAttribute('aria-pressed',on)};

async function current(){
  if(!supported)return null;
  const r=await navigator.serviceWorker.register('sw.js');
  await navigator.serviceWorker.ready;
  return {r,s:await r.pushManager.getSubscription()};
}

async function enable(){
  if(!supported||(ios&&!standalone)){
    alert(ios?'على الآيفون لازم تثبّت الموقع الأول: دوس زرار المشاركة ثم "إضافة إلى الشاشة الرئيسية"، وافتحه من الأيقونة وبعدها فعّل الإشعارات.':'المتصفح ده مش بيدعم الإشعارات. جرّب Chrome أو Edge.');
    return;
  }
  if(Notification.permission==='denied'){alert('الإشعارات متقفلة للموقع ده. افتح إعدادات الموقع في المتصفح واسمح بالإشعارات.');return}
  const perm=await Notification.requestPermission();
  if(perm!=='granted')return;
  const {r,s}=await current();
  const sub=s||await r.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:u8(V)});
  const j=sub.toJSON();
  const {error}=await sb.from('push_subs').insert({endpoint:j.endpoint,p256dh:j.keys.p256dh,auth:j.keys.auth});
  if(error&&error.code!=='23505'){await sub.unsubscribe();alert('حصلت مشكلة في التفعيل، جرّب تاني بعد شوية.');return}
  paint(true);
}

async function disable(){
  const c=await current();
  if(c&&c.s)await c.s.unsubscribe();
  paint(false);
}

b.addEventListener('click',async()=>{
  try{b.disabled=true;(b.classList.contains('on'))?await disable():await enable()}
  catch(e){alert('حصلت مشكلة، جرّب تاني.')}
  finally{b.disabled=false}
});

if(supported&&Notification.permission==='granted'){current().then(c=>paint(!!(c&&c.s))).catch(()=>paint(false))}else paint(false);
})();
