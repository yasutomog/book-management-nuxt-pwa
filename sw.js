importScripts('/book-management-nuxt-pwa/_nuxt/workbox.dev.5c678697.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/book-management-nuxt-pwa/_nuxt/7fec0b8ecc02026792b8.js",
    "revision": "d10c848c910238fc657a97ef454c1d64"
  },
  {
    "url": "/book-management-nuxt-pwa/_nuxt/a90065045ee525af002a.js",
    "revision": "abd661a2d3adf58aa36dfb20f4ab9f31"
  },
  {
    "url": "/book-management-nuxt-pwa/_nuxt/b8e286046f0a0e11c13e.js",
    "revision": "82581aa4cdea597b9d8fb32cd450ef45"
  },
  {
    "url": "/book-management-nuxt-pwa/_nuxt/bb56a4722520d260c30b.js",
    "revision": "a037d30a7656164d6aeb403ea31f1431"
  },
  {
    "url": "/book-management-nuxt-pwa/_nuxt/d0f4b53b3187089a43c6.js",
    "revision": "e83a4019362e21344111a9b9695f2ff8"
  },
  {
    "url": "/book-management-nuxt-pwa/_nuxt/ebc3ac6196fa0b4826b6.js",
    "revision": "9ea4b0bb731f25a8323471b0f779a02f"
  }
], {
  "cacheId": "book-management-nuxt-pwa",
  "directoryIndex": "/",
  "cleanUrls": false
})



workbox.clientsClaim()
workbox.skipWaiting()


workbox.routing.registerRoute(new RegExp('/book-management-nuxt-pwa/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/book-management-nuxt-pwa/.*'), workbox.strategies.networkFirst({}), 'GET')





