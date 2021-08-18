module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'My Dapp',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js and web3 layouts project'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'shortcut icon', href: 'https://cryptonaute.fr/wp-content/uploads/2020/06/ethereum-logo.png' }
    ]
  },
  components: true,
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  modules: [
    '@nuxtjs/vuetify'
  ],
  vuetify: {
    /* module options */
    defaultAssets: {
      icons: 'fa'
    }
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['web3']
  },
  srcDir: 'src/',
  rootDir: './'
}
