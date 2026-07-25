const CACHE_NAME = 'soundcover-v85';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './public/assets/dryer.wav',
  './public/assets/power_shower.wav',
  './public/assets/heavy_downpour.wav',
  './public/assets/profile_avatar.png',
  './public/assets/icon-192.png',
  './public/assets/icon-512.png'
];

// Install Event - Immediately activate new cache
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching SoundCover v85 assets');
      return cache.addAll(ASSETS);
    })
  );
});

// Activate Event - Delete all old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Purging old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
