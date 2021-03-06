const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/pwa/',
    middleware: [
      'auth'
    ]
  }
} : {
  router: {
    middleware: [
      'auth'
    ]
  }
}
const importScripts = process.env.DEPLOY_ENV === 'GH_PAGES' ? [
  '/pwa/sw.js'
] : [
  '/sw.js'
]
module.exports = {
  ...routerBase,
  /*
  ** Headers of the page
  */
  head: {
    title: 'pwa',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'tribeat book management' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    // extend (config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
    extend(config) {
      if (process.server && process.browser) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  css: [
    { src: '~assets/sass/main.scss', lang: 'scss' }
  ],
  modules: [
    '@nuxtjs/onesignal',
    '@nuxtjs/pwa',
    '@nuxtjs/vuetify',
    '@nuxtjs/font-awesome',
    '@nuxtjs/axios'
  ],
  manifest: {
    name: 'book-management',
    lang: 'ja',
    short_name: 'TBBooks',
    icons: [
      {
        "src": "/pwa/android-chrome-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/pwa/android-chrome-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      },
      {
        "src": "/pwa/apple-touch-icon.png",
        "sizes": "180x180",
        "type": "image/png"
      },
      {
        "src": "/pwa/apple-touch-icon-60x60.png",
        "sizes": "60x60",
        "type": "image/png"
      },
      {
        "src": "/pwa/apple-touch-icon-76x76.png",
        "sizes": "76x76",
        "type": "image/png"
      },
      {
        "src": "/pwa/apple-touch-icon-120x120.png",
        "sizes": "120x120",
        "type": "image/png"
      },
      {
        "src": "/pwa/apple-touch-icon-152x152.png",
        "sizes": "152x152",
        "type": "image/png"
      },
      {
        "src": "/pwa/apple-touch-icon-180x180.png",
        "sizes": "180x180",
        "type": "image/png"
      },
      {
        "src": "/pwa/favicon-16x16.png",
        "sizes": "16x16",
        "type": "image/png"
      },
      {
        "src": "/pwa/favicon-32x32.png",
        "sizes": "32x32",
        "type": "image/png"
      },
      {
        "src": "/pwa/msapplication-icon-144x144.png",
        "sizes": "144x144",
        "type": "image/png"
      },
      {
        "src": "/pwa/mstile-150x150.png",
        "sizes": "150x150",
        "type": "image/png"
      }
    ]
  },
  oneSignal: {
    init: {
      appId: '',
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: true
      }
    },
    path: '/pwa',
    importScripts: importScripts
  },
  mode: 'spa',
  workbox: {
    dev: true,
    swURL: '/pwa/sw.js',
    swScope: '/pwa'
  },
  plugins: [
    { src: '~/plugins/routerOption.js', ssr: false },
    { src: '~/plugins/axios.js', ssr: false }
  ],
  env: {
    API_URL: ''
  }
}

