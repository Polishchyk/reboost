import { defineNuxtRouteMiddleware, useRouter } from '#app'
import { useLanguageStore } from '@/store/language'

export default defineNuxtRouteMiddleware((to) => {
  const router = useRouter()
  const languageStore = useLanguageStore()

  const supportedLangs = ['en', 'fr', 'de', 'it']
  const defaultLang = 'it'

  
  const langParam = to.params.lang as string || to.fullPath.split('/')[1]

  if (langParam && !supportedLangs.includes(langParam)) {
    
    const newPath = `/${defaultLang}${to.fullPath}`
    if (newPath !== to.fullPath) {
      return router.replace(newPath)
    }
  }

  if (!langParam) {
    
    languageStore.setLanguage(defaultLang)
    return
  }

  languageStore.setLanguage(langParam)

  
  if (langParam === defaultLang) {
    const newPath = to.fullPath.replace(/^\/it/, '') || '/'
    if (newPath !== to.fullPath) {
      return router.replace(newPath) 
    }
  }
})
