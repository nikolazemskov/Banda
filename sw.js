const CACHE="banda-tiffany-v2";
const ASSETS=["./","./index.html","./config.js","./manifest.webmanifest","./icon-180.png","./icon-512.png","./emojis/egypt_01.png","./emojis/egypt_02.png","./emojis/egypt_03.png","./emojis/egypt_04.png","./emojis/egypt_05.png","./emojis/egypt_06.png","./emojis/egypt_07.png","./emojis/egypt_08.png","./emojis/egypt_09.png","./emojis/egypt_10.png","./emojis/egypt_11.png","./emojis/egypt_12.png","./emojis/egypt_13.png","./emojis/egypt_14.png","./emojis/egypt_15.png","./emojis/egypt_16.png","./emojis/egypt_17.png","./emojis/egypt_18.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res;
  }).catch(()=>caches.match("./index.html"))));
});
