const APP_PREFIX = 'BudgetTracker-';
const VERSION = 'version_01';
const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/manifest.webmanifest",
    "/css/styles.css",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png",
];
const BUDGET_CACHE = 'budget-cache-v1';

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(BUDGET_CACHE).then(function(cache) {
            console.log('installing cache: ' + BUDGET_CACHE)
            return cache.addAll(FILES_TO_CACHE)
        })
    )
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            let cacheKeeplist = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            });
            cacheKeeplist.push(BUDGET_CACHE);

            return Promise.all(
                keyList.map(function(key, i) {
                    if (cacheKeeplist.indexOf(key) === -1) {
                        return caches.delete(keyList[i]);
                    }
                })
            )
        })
    )
})