import { useLanguageStore } from '@/store/language'
import { useRoute, useRouter } from '#app'

export const useLanguage = () => {
  const route = useRoute()
  const router = useRouter()
  const languageStore = useLanguageStore()

  const defaultLang = 'it'
  const supportedLangs = ['en', 'fr', 'de', 'it']

  
  const currentLang = computed(() => languageStore.currentLang)

  const changeLanguage = (lang: string) => {
    /*if (currentLang.value !== lang) {
      languageStore.setLanguage(lang)

      
      let newPath = route.fullPath.replace(/^\/(en|fr|de|it)/, '')

      
      if (lang === defaultLang) {
        newPath = newPath || '/'  
      } else {
        newPath = `/${lang}${newPath}`

        
        if (newPath.endsWith('/')) {
          newPath = newPath.slice(0, -1)
        }
      }

      router.replace(newPath)
    }*/
    if (currentLang.value !== lang) {
      languageStore.setLanguage(lang)

      let newPath = route.fullPath.replace(/^\/(en|fr|de|it)(\/|$)/, '/')

      if (lang === defaultLang) {
        newPath = newPath === '/' ? '/' : newPath.replace(/\/$/, '')
      } else {
        newPath = `/${lang}${newPath}`.replace(/\/$/, '')
      }

      router.replace(newPath)
    }
  }

  return { currentLang, changeLanguage }
}