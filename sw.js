const CACHE="banda-tiffany-v2";
const ASSETS=["./","./index.html","./config.js","./manifest.webmanifest","./icon-180.png","./icon-512.png","./egypt_01.png","./egypt_02.png","./egypt_03.png","./egypt_04.png","./egypt_05.png","./egypt_06.png","./egypt_07.png","./egypt_08.png","./egypt_09.png","./egypt_10.png","./egypt_11.png","./egypt_12.png","./egypt_13.png","./egypt_14.png","./egypt_15.png","./egypt_16.png","./egypt_17.png","./egypt_18.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res;
  }).catch(()=>caches.match("./index.html"))));
});
