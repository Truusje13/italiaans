// Service Worker for Impara l'Italiano PWA
const CACHE_NAME = 'impara-italiano-v22';
const USERDATA_CACHE = 'impara-italiano-userdata'; // nooit verwijderen

// Files to cache for offline use
const FILES_TO_CACHE = [
    './',
    './index.html',
    './css/style.css?v=13',
    './js/app.js?v=13',
    './js/data.js?v=13',
    './js/progress.js?v=13',
    './js/feedback.js?v=13',
    './js/vocabulary.js?v=13',
    './js/grammar.js?v=13',
    './js/conjugation.js?v=13',
    './js/speaking.js?v=13',
    './js/game.js?v=13',
    './js/custom-words.js?v=13',
    './js/listening.js?v=13',
    './js/pronunciation.js?v=13',
    './manifest.json',
    './icons/icon.svg',
    './icons/icon-maskable.svg'
];

// Install event - cache all files
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Install v14');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[ServiceWorker] Caching app shell');
                return cache.addAll(FILES_TO_CACHE);
            })
            .then(() => {
                console.log('[ServiceWorker] Skip waiting');
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activate v14');
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                // Bewaar gebruikersdata-cache altijd, wis alleen oude app-caches
                if (key !== CACHE_NAME && key !== USERDATA_CACHE) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        }).then(() => {
            console.log('[ServiceWorker] Claiming clients');
            return self.clients.claim();
        })
    );
});

// Helper: is this a local app file (HTML, CSS, JS)?
function isAppFile(url) {
    const path = new URL(url).pathname;
    return path.endsWith('.html') ||
           path.endsWith('.css') ||
           path.endsWith('.js') ||
           path === '/' ||
           path.endsWith('/');
}

// Fetch event
// - HTML/CSS/JS: network-first (altijd vers ophalen, cache als fallback)
// - Overige assets: cache-first (icons, manifest)
self.addEventListener('fetch', (event) => {
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    if (isAppFile(event.request.url)) {
        // Network-first: probeer altijd vers van het net
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    if (response && response.status === 200) {
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    // Offline fallback: serveer vanuit cache
                    return caches.match(event.request)
                        .then(cached => cached || caches.match('./index.html'));
                })
        );
    } else {
        // Cache-first voor statische assets
        event.respondWith(
            caches.match(event.request)
                .then((response) => {
                    if (response) return response;

                    return fetch(event.request).then((response) => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                        return response;
                    });
                })
                .catch(() => {
                    if (event.request.mode === 'navigate') {
                        return caches.match('./index.html');
                    }
                })
        );
    }
});

// Listen for messages from the app
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))));
    }
});
