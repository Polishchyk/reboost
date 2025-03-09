<script setup>

import Breadcrumbs from "@/components/sections/Breadcrumbs.vue";
import SeoHead from '~/components/SeoHead.vue'

const config = useRuntimeConfig();
const { locale } = useI18n();

const { data: privacyPolicyPageData} = await useAsyncData(
    `privacy-policy-${locale.value}`,
    () =>
        $fetch(`${config.public.apiBase}/privacy-policy`, {
          params: { pLevel: 3, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true  }
);

</script>

<template>
  <div v-if="privacyPolicyPageData?.data">
    <SeoHead :seo="privacyPolicyPageData?.data?.SEO" />
    <Breadcrumbs :currentPageTitle="privacyPolicyPageData?.data?.title" :css-class="'bg2'"/>

    <div class="sect-blog">
      <div class="wrap">
        <div class="content">
          <h1>{{privacyPolicyPageData?.data?.title}}</h1>
        </div>
      </div>
    </div>

    <div class="sect-blog-content">
      <div class="wrap">
        <div class="blog-content">
          <div class="item">
            <div v-html="privacyPolicyPageData?.data?.Description"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>