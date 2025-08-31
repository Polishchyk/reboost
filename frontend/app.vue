<script setup>
import { useI18n } from 'vue-i18n';
import { useHead } from '#app';

const { locale, locales } = useI18n();

const langAttribute = computed(() => {
  const langConfig = locales.value.find(l => l.code === locale.value);
  return langConfig?.code || locale.value;
});

useHead({
  htmlAttrs: {
    lang: langAttribute
  },
  link: [
    {
      rel: 'stylesheet',
      type: 'text/css',
      href: '/assets/css/style.css',
      tagPriority: 999
    }
  ]
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>