const CACHE_NAME = 'soundcover-vMASTER_STABLE_RELEASE';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js?v=MASTER_STABLE_RELEASE',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Cache fetch disabled to ensure zero-cache instant file updates
self.addEventListener('fetch', (e) => {
  // Let the browser handle all network requests naturally without SW interception
});
