const CACHE_NAME = 'hbd-ma-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './assets/photos/photo_01.png',
  './assets/photos/photo_02.png',
  './assets/photos/photo_03.png',
  './assets/photos/photo_04.png',
  './assets/photos/photo_05.png',
  './assets/photos/photo_06.png',
  './assets/photos/photo_07.png',
  './assets/photos/photo_08.png',
  './assets/photos/photo_09.png',
  './assets/photos/photo_10.png',
  './assets/photos/photo_11.png',
  './assets/audio/happy_birthday_celebration.mp3',
  './assets/audio/happy_birthday_traditional.mp3',
  './assets/audio/happy_birthday_piano.mp3',
  './assets/audio/happy_birthday_choir.mp3'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
