// Saltamundos: guarda el juego en el dispositivo para jugar sin internet.
const CACHE='saltamundos-v4';
const FILES=["./", "index.html", "manifest.webmanifest", "lib/three.min.js", "lib/BufferGeometryUtils.js", "fonts/fredoka-latin-500-normal.woff2", "fonts/fredoka-latin-700-normal.woff2", "fonts/nunito-latin-600-normal.woff2", "fonts/nunito-latin-800-normal.woff2", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);if(url.origin!==location.origin)return;
  // la página: primero la red (para recibir actualizaciones), si no hay conexión, la copia guardada
  if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put('index.html',cp));return r;}).catch(()=>caches.match('index.html')));return;}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return res;})));
});
