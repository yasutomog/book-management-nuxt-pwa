const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/book-management-nuxt-pwa/'
  }
} : {}
module.exports = {
  ...routerBase,
  /*
  ** Headers of the page
  */
  head: {
    title: 'book-management-nuxt-pwa',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
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
    '@nuxtjs/pwa',
    '@nuxtjs/vuetify',
    '@nuxtjs/font-awesome'
  ],
  manifest: {
    name: 'book-management',
    lang: 'ja',
    short_name: 'bm',
    title: '図書管理',
    'og:title': '図書管理',
    description: '図書管理',
    'og:description': '図書管理',
    theme_color: '#ffffff',
    background_color: '#ffffff'
  },
  mode: 'spa',
  workbox: {
    dev: false, //開発環境でもPWA
  },
  plugins: [{ src: '~/plugins/routerOption.js', ssr: false }]
}

