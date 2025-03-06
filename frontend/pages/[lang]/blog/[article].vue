<script setup>
import SeoHead from '~/components/SeoHead.vue';
import { useAsyncData } from '#imports'

const config = useRuntimeConfig();
const { locale, defaultLocale } = useI18n();
const route = useRoute();

const slug = route.params.article;

const { data: articlePageData} = await useAsyncData(
    `article-${locale.value}-${slug}`,
    () =>
        $fetch(`${config.public.apiBase}/articles/${slug}`, {
          params: { pLevel: 2, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true  }
);

const { data: pageTitles } = await useAsyncData(() =>
    $fetch(`${config.public.apiBase}/page-titles`, {
      params: { locale: locale.value }
    })
);

</script>

<template>
  <div v-if="articlePageData?.data">
    <SeoHead :seo="articlePageData?.data?.SEO" />

    <div class="breadcrumbs bg2">
      <div class="wrap">
        <div class="nav">
          <nuxt-link :to="locale !== defaultLocale ? `/${locale}` : '/'">Home</nuxt-link>
          <nuxt-link :to="`${locale !== defaultLocale ? `/${locale}/` : `/`}blog`">{{ pageTitles?.['blog-page'] }}</nuxt-link>
          <span>{{articlePageData?.data?.Title}}</span>
        </div>
      </div>
    </div>

    <div class="sect-blog">
      <div class="wrap">
        <div class="content">
          <h1>{{articlePageData?.data?.Title}}</h1>
        </div>
      </div>
    </div>

    <div class="sect-blog-content">
      <div class="wrap">
        <div class="blog-content">
          <div class="item">
            <div v-if="articlePageData?.data?.Image">
              <img :src="config.public.publicUrl+articlePageData?.data?.Image?.formats?.small?.url"
                   :alt="articlePageData?.data?.Image?.alternativeText"
              >
            </div>
            <div v-html="articlePageData?.data?.Description"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>