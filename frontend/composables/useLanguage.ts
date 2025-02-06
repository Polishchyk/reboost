import { useLanguageStore } from '@/store/language';

export const useLanguage = () => {
  const route = useRoute();
  const router = useRouter();
  const languageStore = useLanguageStore();

  // Ініціалізуємо мову за параметром URL або 'en'
  const currentLang = computed(() => languageStore.currentLang);

  // При клієнтському завантаженні ініціалізуємо мову зі шляху
  if (process.client && route.params.lang) {
    languageStore.setLanguage(String(route.params.lang));
  }

  const changeLanguage = (lang: string) => {
    if (currentLang.value !== lang) {
      languageStore.setLanguage(lang);

      let newPath = route.fullPath;

      // Якщо мова - англійська
      if (lang === "en") {
        console.log(lang);
        if (route.fullPath === '/') {
          // Для головної сторінки, просто домен
          newPath = '/';
        } else {
          // Для інших сторінок, видаляємо префікс мови
          newPath = route.fullPath.replace(/^\/(de|it|fr)/, "").replace(/\/$/, "");
        }
      } else {
        // Якщо мова не англійська, додаємо її як префікс
        newPath = `/${lang}${route.fullPath.replace(/^\/(en|de|it|fr)/, "")}`;
      }

      newPath = newPath.replace(/\/$/, ""); // Видаляємо `/` в кінці

      // Переходимо на новий шлях без перезавантаження
      router.push(newPath, { replace: true });
    }
  };

  return { currentLang, changeLanguage };
};