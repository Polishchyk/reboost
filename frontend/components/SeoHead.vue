<script setup>
import { useI18n } from 'vue-i18n';
const { locale, locales, defaultLocale } = useI18n();

const props = defineProps({
  seo: Object
});

const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const baseUrl = process.server
    ? useRequestURL().origin
    : window.location.origin;

const languages = locales.value.map(l => l.code);
const currentPath = route.path.replace(/^\/(de|en|fr|it)/, '').replace(/\/$/, '') || '';

const alternateLinks = languages.map(lang => {
  const langConfig = locales.value.find(l => l.code === lang);
  return {
    rel: 'alternate',
    href: `${baseUrl}/${lang === defaultLocale ? '' : lang}${currentPath}`,
    hreflang: langConfig?.language || lang
  };
});

const canonicalUrl = `${baseUrl}/${locale.value !== defaultLocale ? locale.value : ''}${currentPath}`;

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
