<script setup>

import Breadcrumbs from "~/components/sections/Breadcrumbs.vue";
import SeoHead from '~/components/SeoHead.vue'

const config = useRuntimeConfig();
const { locale } = useI18n();

const { data: PhoneRepairPageData} = await useAsyncData(
    `it-support-${locale.value}`,
    () =>
        $fetch(`${config.public.apiBase}/phone-repair`, {
          params: { pLevel: 3, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true  }
);

</script>
<template>
  <div v-if="PhoneRepairPageData?.data">
    <SeoHead :seo="PhoneRepairPageData?.data?.SEO" />
    <Breadcrumbs :currentPageTitle="PhoneRepairPageData?.data?.title" :css-class="'bg2'"/>

    <div class="sect-devices-list sect-support">
      <div class="wrap">
        <div class="content">
          <h1>{{PhoneRepairPageData?.data?.title}}</h1>
          <div class="sub" v-html="PhoneRepairPageData?.data?.Description"></div>
        </div>
        <div class="brands brands-phone-repair" v-if="PhoneRepairPageData?.data?.BrandsItems && PhoneRepairPageData?.data?.BrandsItems.length > 0">
          <a v-for="brandItem in PhoneRepairPageData?.data?.BrandsItems"
             class="item"
             :href="brandItem?.Url?.Url"
          >
            <img :src="config.public.publicUrl + brandItem?.Logo?.url" :alt="brandItem?.Logo?.alternativeText" />
          </a>
        </div>
        <div class="content content-phone-repair">
          <h2>{{PhoneRepairPageData?.data?.Subtitle}}</h2>
          <div class="sub" v-html="PhoneRepairPageData?.data?.SubDescription"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sect-devices-list .brands {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px 20px;
  margin-top: 100px;
  padding: 0 150px;
  justify-items: center;
}
.sect-devices-list .brands .item {
  text-align: center;
  width: 100%;
}
.sect-devices-list .brands .item img {
  margin: auto;
  max-height: 100px;
}
@media (max-width: 768px) {
  .sect-devices-list .brands {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 20px;
  }
}
</style>