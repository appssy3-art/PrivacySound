const CACHE_NAME = 'soundcover-v3012-qr-separated';

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
  const url = e.request.url;
  // APK, ZIP, EXE 등 바이너리 파일은 Service Worker가 절대 가로채지 않음
  // 브라우저 네이티브 다운로드 매니저가 직접 처리
  if (url.match(/\.(apk|zip|exe|aab|xapk)(\?|$)/i)) {
    return; // 브라우저 순정 다운로드 처리
  }

  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
