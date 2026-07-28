const CACHE_NAME = 'soundcover-v3005-init-fix';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // APK 파일 다운로드는 Service Worker가 가로채지 않고 브라우저가 직접 처리하도록 함
  const url = e.request.url;
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes('.apk') || lowerUrl.includes('.zip') || lowerUrl.includes('.exe')) {
    return; // 브라우저 순정 다운로드 처리
  }

  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
