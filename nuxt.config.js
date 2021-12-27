export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'zemoga-voting-front',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },


  loading: '~/components/Loading.vue',


  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/moment',
    '@nuxtjs/firebase'
  ],

  firebase: {
      config: {
        apiKey: "AIzaSyBEPMJgJdyonCUKDEWmu_4-bX2XjOTA6hY",
        authDomain: "zemoga-bbd15.firebaseapp.com",
        databaseURL: "https://zemoga-bbd15-default-rtdb.firebaseio.com",
        projectId: "zemoga-bbd15",
        storageBucket: "zemoga-bbd15.appspot.com",
        messagingSenderId: "1028238523450",
        appId: "1:1028238523450:web:a68a1bafd79fcabd270903",
        measurementId: "G-MWXK80MFBJ"
      },
      lazy: false,
      services: {
        database: true
      }
  },

  database: {
    emulatorPort: 9000,
    emulatorHost: 'localhost',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  env: {
    FIREBASE_APIKEY: process.env.FIREBASE_APIKEY
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
