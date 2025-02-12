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
  }
})
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>