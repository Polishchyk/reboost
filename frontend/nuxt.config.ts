// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  vite: {
    server: {
      host: '0.0.0.0',
      strictPort: true,
    },
    build: {
      cssCodeSplit: true,
    },
    plugins: [],
  },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  ssr: true,
  pages: true,
  /*css: [
    "@/assets/css/style.css"
  ],*/
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  router: {
    options: {
      strict: true,
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:1337/api",
      publicUrl: process.env.NUXT_PUBLIC_URL || "http://localhost:1337",
    },
  },
})
