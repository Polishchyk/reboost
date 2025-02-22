import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', () => {
  const currentLang = ref('it') // Початкове значення
  const setLanguage = (lang: string) => {
    currentLang.value = lang
  }

  return { currentLang, setLanguage }
})
