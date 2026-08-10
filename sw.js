const CACHE="kolyagram-v9-5-click-fix";
const STATIC=[
  "./manifest.webmanifest",
  "./icon-180.png",
  "./icon-512.png",
  "./config.js",
  "./kolyagram-logo.jpg",
  "./kolyajump.html",
  "./kolyajump-fart.mp3",
  "./kolyajump-burp.mp3",
  "./message-dota-match.mp3",
  "./background-music.mp3",
  "./record-stop.wav",
  "./record-start.wav",
  "./egypt_01.png","./egypt_02.png","./egypt_03.png","./egypt_04.png","./egypt_05.png","./egypt_06.png",
  "./egypt_07.png","./egypt_08.png","./egypt_09.png","./egypt_10.png","./egypt_11.png","./egypt_12.png",
  "./egypt_13.png","./egypt_14.png","./egypt_15.png","./egypt_16.png","./egypt_17.png","./egypt_18.png"
];

self.addEventListener("install", event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(STATIC)));
});

self.addEventListener("activate", event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch", event=>{
  if(event.request.method!=="GET") return;

  const url=new URL(event.request.url);

  // HTML/navigation is always network-first, so GitHub updates appear immediately.
  if(event.request.mode==="navigate" || url.pathname.endsWith("/index.html") || url.pathname.endsWith("/Banda/")){
    event.respondWith(
      fetch(event.request,{cache:"no-store"})
        .then(res=>{
          const copy=res.clone();
          caches.open(CACHE).then(c=>c.put("./index.html",copy));
          return res;
        })
        .catch(()=>caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(res=>{
        const copy=res.clone();
        caches.open(CACHE).then(c=>c.put(event.request,copy));
        return res;
      })
      .catch(()=>caches.match(event.request))
  );
});
