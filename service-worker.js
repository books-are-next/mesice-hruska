/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-0983c4d';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./mesice_001.html","./mesice_002.html","./mesice_003.html","./mesice_004.html","./mesice_005.html","./mesice_006.html","./mesice_007.html","./mesice_008.html","./mesice_009.html","./mesice_010.html","./mesice_011.html","./mesice_012.html","./mesice_013.html","./mesice_014.html","./mesice_015.html","./mesice_016.html","./mesice_017.html","./mesice_018.html","./mesice_019.html","./mesice_020.html","./mesice_021.html","./mesice_022.html","./mesice_023.html","./mesice_024.html","./mesice_025.html","./mesice_026.html","./mesice_027.html","./mesice_028.html","./mesice_029.html","./mesice_030.html","./mesice_031.html","./mesice_032.html","./mesice_033.html","./mesice_034.html","./mesice_035.html","./mesice_036.html","./mesice_037.html","./mesice_038.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.png","./resources/obalka.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
