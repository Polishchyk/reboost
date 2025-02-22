<script setup>
import { computed, ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useLanguage } from '@/composables/useLanguage';
import { useAsyncData, useRuntimeConfig } from '#imports';

const props = defineProps({
  currentPageTitle: {
    type: String,
    default: '',
  },
  dynamicCollections: {
    type: Object,
    default: () => ({}) // { 'products': 'title', 'articles': 'headline' }
  },
  cssClass: {
    type: String,
    default: '',
  }
});

const route = useRoute();
const { currentLang, defaultLang } = useLanguage();
const config = useRuntimeConfig();

// Отримуємо список назв сторінок з кастомного API Strapi
const { data: pageTitles } = await useAsyncData(() =>
    $fetch(`${config.public.apiBase}/page-titles`, {
      params: { locale: currentLang.value }
    })
);

// Функція для отримання назви динамічного запису за slug
const fetchDynamicTitle = async (collection, slug, field) => {
  try {
    const response = await $fetch(`${config.public.apiBase}/${collection}`, {
      params: { locale: currentLang.value, filters: { slug } }
    });
    return response?.data?.[0]?.attributes?.[field] || slug;
  } catch (error) {
    return slug;
  }
};

// Видаляємо мовний префікс, якщо він є
const getPathSegments = () => {
  const segments = route.path.split('/').filter(segment => segment);
  if (segments[0] === currentLang.value && currentLang.value !== defaultLang) {
    return segments.slice(1);
  }
  return segments;
};

const breadcrumbs = ref([]);

const generateBreadcrumbs = async () => {
  let path = '';
  const items = [];
  const segments = getPathSegments();

  for (const [index, segment] of segments.entries()) {
    path += `/${segment}`;
    let title = pageTitles.value?.[segment] || (props.currentPageTitle ?? segment);

    // Перевіряємо, чи поточний сегмент належить до динамічної колекції
    const prevSegment = segments[index - 1];
    if (prevSegment && props.dynamicCollections[prevSegment]) {
      title = await fetchDynamicTitle(prevSegment, segment, props.dynamicCollections[prevSegment]);
    }

    items.push({
      text: title,
      to: index < segments.length - 1 ? path : null,
    });
  }

  breadcrumbs.value = items;
};

watchEffect(() => {
  generateBreadcrumbs();
});
</script>

<template>
  <div class="breadcrumbs" :class="cssClass ?? ''">
    <div class="wrap">
      <div class="nav">
        <nuxt-link :to="currentLang !== defaultLang ? `/${currentLang}` : '/'">Home</nuxt-link>
        <template v-for="(crumb, index) in breadcrumbs" :key="index">
          <nuxt-link v-if="crumb.to" :to="crumb.to">{{ crumb.text }}</nuxt-link>
          <span v-else>{{ crumb.text }}</span>
        </template>
      </div>
    </div>
  </div>
</template>
