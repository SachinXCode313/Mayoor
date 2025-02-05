// const urlsToCache = ["/", "/assets/style.css", "/manifest.json", "/image/icon.png", "/assets/index.html"]
// const CACHE_NAME = "cache3"

// self.addEventListener('install', (event) => {
//     console.log('Inside the install handler:', event)
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//         .then(cache => {
//            return cache.addAll(urlsToCache)
//         })
//         .then(() => self.skipWaiting())
//      )
//   })
  
// self.addEventListener('activate', (event) => {
//     console.log('Inside the activate handler:', event)
//     event.waitUntil(self.clients.claim())
//   })
  
// self.addEventListener('fetch', (event) => {
//     console.log(`fetching ${event.request.url}`)
//     if(navigator.onLine) { 
//         let fetchRequest = event.request.clone()
//         return fetch(fetchRequest)
//         .then(
//             function (response){
//                 if(!response || response.status != 200 ||response.type != 'basic'){
//                     return response
//                 }

//                 let responseToCache = response.clone()
                
//                 caches.open(CACHE_NAME)
//                 .then(function(cache) {
//                     cache.put(event.request, responseToCache)
//                 })

//                 return response
//             }
//         )
//     } else {
//         event.respondWith(
//             caches.match(event.request)
//             .then(function (response) {
//                 if(response){
//                     return response
//                 }
//             })
//         )
//     }
//   })
// //   self.addEventListener('push', event => {
// //     const options = {
// //       body: event.data.text(),
// //       icon: '/image/icon.png', 
// //     };
// //     event.waitUntil(
// //       self.registration.showNotification('Codeup', options)
// //     );
// //   });

// // // self.addEventListener('install', (event) => {
// // //     console.log('Inside the UPDATED install handler:', event)
// // //   })

const cachename = "site-static-v5";
const dynamicCachename = "site-dynamic-v5";
const assets = [
"/", "/assets/style.css", "/manifest.json", "/image/icon.png", "/assets/index.html"
];
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cachename).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets).then(() => self.skipWaiting());
    })
  );
});
self.addEventListener("activate", (event) => {
  console.log("service worker has been activated");
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== cachename && key !== dynamicCachename)
          .map((key) => caches.delete(key))
      );
    })
  );
});
self.addEventListener("fetch", (event) => {
  console.log("fetch event", event);
  event.respondWith(
    caches
      .match(event.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(event.request).then((fetchRes) => {
            return caches.open(dynamicCachename).then((cache) => {
              cache.put(event.request.url, fetchRes.clone());
              limitCacheSize(dynamicCachename, 15);
              return fetchRes;
            });
          })
        );
      })
      .catch(() => {
        if (event.request.url.indexOf(".js") > -1) {
          caches.match("/offline.html");
        }
        if (event.request.mode === "navigate") {
          return caches.match("/offline.html");
        }
      })
  );
});











  