<script setup>
import { ref } from "vue";
import Breadcrumbs from "@/components/sections/Breadcrumbs.vue";
import SeoHead from '~/components/SeoHead.vue';

const config = useRuntimeConfig();
const { locale, defaultLocale } = useI18n();

// Сторінка блогу
const { data: BlogPageData } = await useAsyncData(
    `blog-${locale.value}`,
    () =>
        $fetch(`${config.public.apiBase}/blog-page`, {
          params: { pLevel: 2, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true }
);

// Стани для пагінації
const articles = ref([]);
const page = ref(1);
const totalPages = ref(1);
const loading = ref(false);

// Завантаження першої порції статей на сервері
const { data: ArticlesData } = await useAsyncData(
    `articles-${locale.value}-page-1`,
    () =>
        $fetch(`${config.public.apiBase}/articles`, {
          params: {
            fields: ["id", "Title", "slug", "Short_Description", "createdAt"],
            populate: "Image",
            "pagination[page]": 1,
            "pagination[pageSize]": 9,
            sort: ["createdAt:desc"],
            ...(locale.value !== "it" ? { locale: locale.value } : {}),
          },
        }),
    { watch: [locale], server: true }
);

// Завантажуємо додаткові статті клієнтським запитом
const loadArticles = async () => {
  if (loading.value || page.value > totalPages.value) return;

  loading.value = true;
  try {
    const response = await $fetch(`${config.public.apiBase}/articles`, {
      params: {
        fields: ["id", "Title", "slug", "Short_Description", "createdAt"],
        populate: "Image",
        "pagination[page]": page.value,
        "pagination[pageSize]": 9,
        sort: ["createdAt:desc"],
        ...(locale.value !== "it" ? { locale: locale.value } : {}),
      },
    });

    if (response?.data) {
      articles.value.push(...response.data);
      totalPages.value = response.meta.pagination.pageCount;
      page.value++;
    }
  } finally {
    loading.value = false;
  }
};

// Підвантажуємо першу порцію статей, якщо є
if (ArticlesData?.value?.data) {
  articles.value = ArticlesData.value.data;
  totalPages.value = ArticlesData.value.meta.pagination.pageCount;
  page.value++;
}
</script>

<template>
  <div v-if="BlogPageData?.data">
    <SeoHead :seo="BlogPageData?.data?.SEO" />
    <Breadcrumbs :currentPageTitle="BlogPageData?.data?.title" :css-class="'bg2'" />

    <div class="sect-blog">
      <div class="wrap">
        <div class="content">
          <h1>{{ BlogPageData?.data?.title }}</h1>
        </div>
      </div>
    </div>

    <div class="sect-blogs" v-if="articles.length > 0">
      <div class="wrap">
        <div class="blogs">
          <div class="item" v-for="article in articles" :key="article.id">
            <nuxt-link :to="`${locale !== defaultLocale ? `/${locale}/` : `/`}blog/${article?.slug}`">
              <div class="icon" v-if="article?.Image">
                <img :src="config.public.publicUrl+article?.Image?.formats?.small?.url" :alt="article?.Image?.alternativeText">
              </div>
              <div class="title">{{ article.Title }}</div>
              <div class="desc">{{ article.Short_Description }}</div>
            </nuxt-link>
          </div>
        </div>

        <!-- Кнопка "Load More" -->
        <div class="load-more" v-if="page <= totalPages">
          <button @click="loadArticles" :disabled="loading" class="but colored">
            {{ loading ? "Loading..." : "Load More" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img{
  max-width: unset;
}
.load-more{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
}
</style>