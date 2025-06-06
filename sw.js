// 缓存名称
const CACHE_NAME = '90min-clock-v3';

// 需要缓存的资源列表
const urlsToCache = [
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'a1.png',
  'a2.png'
];

// 安装Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async cache => {
        // 逐个缓存文件，避免addAll原子失败
        for (const url of urlsToCache) {
          try {
            await cache.add(url);
          } catch (error) {
            console.log(`缓存${url}失败:`, error);
          }
        }
      })
  );
});

// 激活Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

// 拦截网络请求
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  // 处理根路径请求为index.html
  if (requestUrl.pathname === '/') {
    event.respondWith(
      caches.match('index.html')
        .then(response => response || fetch(event.request))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});