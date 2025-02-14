<script setup>
import { useLanguage } from '@/composables/useLanguage';
const { currentLang } = useLanguage();
const props = defineProps({
  seo: Object
});

const route = useRoute();
const runtimeConfig = useRuntimeConfig();

// Отримуємо поточний домен (працює як на сервері, так і на клієнті)
const baseUrl = process.server
    ? useRequestURL().origin
    : window.location.origin;

// Всі доступні мови
const languages = ["de", "en", "fr", "it"];

// Поточний шлях без мовного префіксу, обрізаємо слеш на кінці (якщо він є)
const currentPath = route.path.replace(/^\/(de|en|fr|it)/, "").replace(/\/$/, "") || "";

// Генерація hreflang посилань
const alternateLinks = languages.map((lang) => ({
  rel: "alternate",
  href: `${baseUrl}/${lang === "it" ? "" : lang}${currentPath}`,
  hreflang: `${lang}-CH`
}));

// Генерація canonical URL для поточної сторінки
const canonicalUrl = `${baseUrl}/${currentLang.value !== "it" ? currentLang.value : ""}${currentPath}`;

if (props.seo) {
  useHead({
    title: props.seo?.metaTitle || "Default Title",
    meta: [
      { name: "description", content: props.seo?.metaDescription || "Default description" },
      { name: "keywords", content: props.seo?.keywords || "" },
      { name: "robots", content: props.seo?.metaRobots || "index, follow" },
      { name: "viewport", content: props.seo?.metaViewport || "width=device-width, initial-scale=1.0" },
      { property: "og:title", content: props.seo?.openGraph?.ogTitle || props.seo?.metaTitle },
      { property: "og:description", content: props.seo?.openGraph?.ogDescription || props.seo?.metaDescription },
      { property: "og:image", content: props.seo?.openGraph?.ogImage?.url ? `${runtimeConfig.public.apiBase}${props.seo.openGraph.ogImage.url}` : "" },
      { property: "og:url", content: props.seo?.canonicalURL || "" },
      { property: "og:type", content: props.seo?.openGraph?.ogType || "website" },
      { rel: "canonical", href: canonicalUrl }
    ],
    link: alternateLinks
  });
}
</script>

<template>
  <div></div>
</template>
