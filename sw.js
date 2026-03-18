const CACHE_NAME = 'keihi-otose-v3';
const ASSETS = [
  '/keihi-otose/',
  '/keihi-otose/index.html',
  '/keihi-otose/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // キャッシュを使わず常に最新を取得（開発中）
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
