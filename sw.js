// NarrativeX Service Worker
const CACHE_NAME = 'narrativex-v1';
const urlsToCache = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  './sw.js'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Network First, then Cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((response) => {
          return response || new Response('Offline - Content not available', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});

// Background Sync for auto-save
self.addEventListener('sync', (event) => {
  if (event.tag === 'auto-save') {
    event.waitUntil(
      (async () => {
        const comics = await getAllComics();
        // Auto-save logic here
      })()
    );
  }
});

// Helper function to get all comics from IDB or localStorage
async function getAllComics() {
  // This would integrate with IndexedDB for better storage
  return Promise.resolve([]);
}
