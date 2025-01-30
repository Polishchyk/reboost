export const useLanguage = () => {
  const route = useRoute();
  const router = useRouter();

  const currentLang = useState("currentLang", () =>
    route.params.lang ? String(route.params.lang) : "en"
  );

  const changeLanguage = (lang: string) => {
    if (currentLang.value !== lang) {
      currentLang.value = lang;

      // Видаляємо `lang` з URL, якщо це `en`
      let newPath =
        lang === "en"
          ? route.fullPath.replace(/^\/(de|it|fr)/, "").replace(/\/$/, "")
          : `/${lang}${route.fullPath.replace(/^\/(de|it|fr)/, "")}`;

      newPath = newPath.replace(/\/$/, ""); // Видаляємо `/` в кінці

      router.push(newPath, { replace: true });
    }
  };

  return { currentLang, changeLanguage };
};
