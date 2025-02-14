<script setup>
import { useLanguageStore } from "@/store/language";
import { useHead } from '#app';

const languageStore = useLanguageStore();
const currentLang = computed(() => languageStore.currentLang)


const langAttribute = computed(() => {
  return `${currentLang.value}-CH`
})


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
})
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>