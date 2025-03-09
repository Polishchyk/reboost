<script setup>

import Breadcrumbs from "@/components/sections/Breadcrumbs.vue";
import SeoHead from '~/components/SeoHead.vue'

const config = useRuntimeConfig();
const { locale } = useI18n();

const { data: termsConditionPageData} = await useAsyncData(
    `terms-and-condition-${locale.value}`,
    () =>
        $fetch(`${config.public.apiBase}/terms-and-condition`, {
          params: { pLevel: 3, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true  }
);

</script>

<template>
  <div v-if="termsConditionPageData?.data">
    <SeoHead :seo="termsConditionPageData?.data?.SEO" />
    <Breadcrumbs :currentPageTitle="termsConditionPageData?.data?.title" :css-class="'bg2'"/>

    <div class="sect-blog">
      <div class="wrap">
        <div class="content">
          <h1>{{termsConditionPageData?.data?.title}}</h1>
        </div>
      </div>
    </div>

    <div class="sect-blog-content">
      <div class="wrap">
        <div class="blog-content">
          <div class="item">
            <div v-html="termsConditionPageData?.data?.Description"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>