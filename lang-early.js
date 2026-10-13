/* بيتحمّل في أول <head> قبل أي رسم: لو اللغة المحفوظة إنجليزي، بنظبط lang/dir ونخفي الصفحة لحد ما i18n.js يترجمها، فمفيش وميض عربي */
(function(){try{if(localStorage.gxl=='en'){var d=document.documentElement;d.lang='en';d.dir='ltr';d.classList.add('gx-wait');setTimeout(function(){d.classList.remove('gx-wait')},1500)}}catch(e){}})();
