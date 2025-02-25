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

const pathSegments = route.path.split('/').filter(Boolean); // Видаляємо пусті елементи

if (languages.includes(pathSegments[0])) {
  pathSegments.shift();
}

const currentPath = pathSegments.length ? `/${pathSegments.join('/')}` : '';

const alternateLinks = languages.map(lang => {
  const langConfig = locales.value.find(l => l.code === lang);
  return {
    rel: 'alternate',
    href: `${baseUrl}${lang === defaultLocale ? '' : '/' + lang}${currentPath}`,
    hreflang: langConfig?.language || lang
  };
});

const canonicalUrl = `${baseUrl}${locale.value !== defaultLocale ? '/' + locale.value : ''}${currentPath}`;
alternateLinks.push({ rel: "canonical", href: canonicalUrl });

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
      { property: "og:url", content: canonicalUrl || "" },
      { property: "og:type", content: props.seo?.openGraph?.ogType || "website" }
    ],
    link: alternateLinks,
  });
}
</script>

<template>
  <div></div>
</template>
