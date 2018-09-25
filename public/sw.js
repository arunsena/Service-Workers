self.addEventListener('install', function (event) {
  event.waitUntil(
   caches.open('service-worker-cache').then(function (cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/install.png',
       '/register.png',
       '/return.png',
       '/update.png'
     ]);
   })
 );
});
self.addEventListener('fetch', function (event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
self.addEventListener('activate', function (event) {
  console.log('Activating new service worker...');
  const cacheWhitelist = ['service-worker-cache'];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return false;
        })
      );
    })
  );
})