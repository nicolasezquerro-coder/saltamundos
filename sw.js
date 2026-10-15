// Saltamundos: guarda el juego en el dispositivo para jugar sin internet.
const CACHE='saltamundos-v12';
const FILES=["./", "index.html", "manifest.webmanifest", "three.min.js", "BufferGeometryUtils.js", "fredoka-latin-500-normal.woff2", "fredoka-latin-700-normal.woff2", "nunito-latin-600-normal.woff2", "nunito-latin-800-normal.woff2", "icon-192.png", "icon-512.png", "maskable-512.png", "apple-touch-icon.png", "CopyShader.js", "LuminosityHighPassShader.js", "EffectComposer.js", "RenderPass.js", "ShaderPass.js", "UnrealBloomPass.js", "Sky.js", "GLTFLoader.js", "SkeletonUtils.js", "Apatosaurus.glb", "Bat.glb", "Boar.glb", "Cat.glb", "Cow.glb", "Croc.glb", "Dragon.glb", "Eagle.glb", "Elephant.glb", "Horse.glb", "Human.glb", "Parasaurolophus.glb", "Pig.glb", "Sheep.glb", "Stegosaurus.glb", "Trex.glb", "Triceratops.glb", "Velociraptor.glb", "Wolf.glb", "Zebra.glb", "bird.glb", "boar.jpg", "croc.jpg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);if(url.origin!==location.origin)return;
  if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put('index.html',cp));return r;}).catch(()=>caches.match('index.html')));return;}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return res;})));
});
