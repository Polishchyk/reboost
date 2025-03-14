export default defineNuxtConfig({
  compatibilityDate: '2025-03-07',
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
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', "@nuxtjs/i18n"],
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'it', language: 'it-IT', name: 'Italiano', file: 'it.json' },
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' }
    ],
    langDir: 'locales/',
    lazy: true,
    defaultLocale: 'it',
  },
  ssr: true,
  pages: true,
  css: [
    "@/assets/css/style.css"
  ],
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
      publicUrl: process.env.NUXT_PUBLIC_URL || "http://localhost:3000",
    },
  },
});