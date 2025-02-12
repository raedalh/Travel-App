self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('travel-app-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/bundle.js',
          '/styles/style.css',
          '/js/app.js',
          '/images/default-image.jpg' // Add any necessary assets like images
        ]);
      })
    );
  });
  
  // Cache retrieval logic for fetching assets from cache when offline
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Return the cached response if it exists, otherwise fetch from network
        return cachedResponse || fetch(event.request);
      })
    );
  });
  
  // Update cache when a new service worker is activated
  self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['travel-app-cache'];
  
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
  