<script setup>

import Breadcrumbs from "@/components/sections/Breadcrumbs.vue";
import SeoHead from '~/components/SeoHead.vue'
import FAQ from '~/components/sections/FAQ.vue'
import PhoneSelection from '~/components/sections/product/PhoneSelection.vue'
import CommonRepairs from '~/components/sections/product/CommonRepairs.vue'
import Identification from '~/components/sections/product/Identification.vue'
import InfoText from '~/components/sections/product/InfoText.vue'
import Reasons from '~/components/sections/product/Reasons.vue'

const config = useRuntimeConfig();
const { locale } = useI18n();
const route = useRoute();

const slug = route.params.product;

const { data: ProductPageData} = await useAsyncData(
    `product-${locale.value}-${slug}`,
    () =>
        $fetch(`${config.public.apiBase}/products/${slug}`, {
          params: { pLevel: 4, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true  }
);

</script>
<template>
  <div v-if="ProductPageData">
    <SeoHead :seo="ProductPageData?.data?.SEO" />
    <Breadcrumbs
        :currentPageTitle="ProductPageData?.data?.PageTitle"
        :css-class="'bg2'"/>
    <PhoneSelection :data="ProductPageData?.data"/>
    <CommonRepairs :data="ProductPageData?.data?.common_repairs"/>
    <Identification :data="ProductPageData?.data?.identification"/>
    <InfoText :data="ProductPageData?.data?.InfoText"/>
    <FAQ :data="ProductPageData?.data?.FAQ"/>
    <Reasons :data="ProductPageData?.data?.reasons"/>
  </div>
</template>