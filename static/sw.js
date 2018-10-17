importScripts('/_nuxt/workbox.5c678697.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/205b981536a5b46a422b.js",
    "revision": "7abd76df3a565e44c58cfb0566e05c3a"
  },
  {
    "url": "/_nuxt/2186cea47b85de4a3e57.js",
    "revision": "93ce4cad4c14c5ad60419a8979052920"
  },
  {
    "url": "/_nuxt/49297cdd1900c78dbf99.js",
    "revision": "350c4988cb94d5071d71629ff1d6d35b"
  },
  {
    "url": "/_nuxt/63c63f904b027101b95e.js",
    "revision": "dac7b81c8c043d96dc1f4543267a5920"
  },
  {
    "url": "/_nuxt/cfb6f6100156bc34065a.js",
    "revision": "16f85ee6e33ecaf8876cc839c14e9aca"
  },
  {
    "url": "/_nuxt/f7c60f5fdfc90b52732c.js",
    "revision": "c5ae1441974bde71c103802d7f57af56"
  }
], {
  "cacheId": "book-management-nuxt-pwa",
  "directoryIndex": "/",
  "cleanUrls": false
})



workbox.clientsClaim()
workbox.skipWaiting()


workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')





