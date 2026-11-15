const SITE={
 /* اسم صاحب الموقع (أحمد هاني) متثبّت جوه app.js ومينفعش يتغير من هنا */
 vapid:'', /* المفتاح العام للإشعارات (VAPID public key). شوف supabase/README-push.txt */
 ai:true, /* لازم دالة ask تكون متعملة في Supabase (شوف ask-function.ts) */
 phone:'01094751342',
 head:'', /* رئيس القسم (فاضي دلوقتي) */
 links:{whatsapp:'https://wa.me/201094751342',telegram:'',linkedin:'',github:'',email:''},
 url:'https://lvbsipznsabwxcxbvrbr.supabase.co',
 key:'sb_publishable_VBTTES9ZDs0oLBPCVbBznA_MKefYDHX'
};
/* ===== المواد: فاضية دلوقتي =====
   لإضافة مادة حط سطر بالشكل ده جوه [ ]:
   {id:'geo101',n:'اسم المادة',code:'Geo101',i:'⛰️',c:'#34D399',t:3,p:0,d:['د/ اسم الدكتور'],desc:'وصف المادة'} */
const S=[];
/* الكتب: BOOKS={geo101:[{t:'اسم الكتاب',a:'المؤلف',f:'geo101.pdf'}]} */
const BOOKS={};
/* جروب واتساب لكل مادة: GROUP_OF={geo101:'https://chat.whatsapp.com/...'} */
const GROUP_OF={};
/* جدول المحاضرات: [اليوم, الوقت, id المادة, المدرج, المجموعة] */
const SCHED=[];
/* المحاضرات والملفات: LECT={geo101:[{t:'الاسم',a:'التفاصيل',f:'ملف.pdf'}]} */
const LECT={};
/* الجروبات والروابط: [{t:'عنوان القسم',s:'وصف',c:'#34D399',items:[{i:'💬',n:'الاسم',d:'الوصف',u:'الرابط'}]}] */
const GROUPS=[];
