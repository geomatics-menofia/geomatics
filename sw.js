/* Service worker: بيستقبل الإشعارات ويعرضها حتى لو الموقع مقفول */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));

self.addEventListener('push',e=>{
  let d={};
  try{d=e.data?e.data.json():{}}catch(_){d={body:e.data?e.data.text():''}}
  e.waitUntil(self.registration.showNotification(String(d.title||'جيوماتكس').slice(0,100),{
    body:String(d.body||'').slice(0,300),
    icon:'icon-192.png',
    badge:'icon-192.png',
    lang:'ar',dir:'rtl',
    tag:d.tag||undefined,
    data:{url:d.url||'./'}
  }));
});

self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const u=new URL((e.notification.data&&e.notification.data.url)||'./',self.registration.scope).href;
  /* بنفتح الروابط بتاعة الموقع بس، أي رابط تاني بيتحول للصفحة الرئيسية */
  const ok=u.startsWith(self.registration.scope)?u:self.registration.scope;
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{
    for(const c of l){if(c.url===ok&&'focus' in c)return c.focus()}
    return self.clients.openWindow(ok);
  }));
});
