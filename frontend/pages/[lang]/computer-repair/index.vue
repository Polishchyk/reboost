<script setup>

import Breadcrumbs from "~/components/sections/Breadcrumbs.vue";
import SeoHead from '~/components/SeoHead.vue'
import RepairCenters from '~/components/sections/RepairCenters.vue'
import { useAsyncData } from '#imports'

const config = useRuntimeConfig();
const { locale } = useI18n();

const { data: ComputerRepairPageData} = await useAsyncData(
    `computer-repair-${locale.value}`,
    () =>
        $fetch(`${config.public.apiBase}/computer-repair`, {
          params: { pLevel: 3, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true  }
);

const { data: globalDataDevicePage } = await useAsyncData(`globalData-${locale.value}-computer-repair-page`, () =>
        $fetch(`${config.public.apiBase}/global`, {
          params: { pLevel: 4, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true }
);

</script>
<template>
  <div v-if="ComputerRepairPageData?.data">
    <SeoHead :seo="ComputerRepairPageData?.data?.SEO" />
    <Breadcrumbs :currentPageTitle="ComputerRepairPageData?.data?.title" :css-class="'bg2'"/>

    <div class="sect-devices-list sect-support">
      <div class="wrap">
        <div class="content">
          <h1>{{ComputerRepairPageData?.data?.title}}</h1>
          <div class="sub" v-html="ComputerRepairPageData?.data?.Description"></div>
        </div>
        <div class="brands brands-phone-repair" v-if="ComputerRepairPageData?.data?.BrandsItems && ComputerRepairPageData?.data?.BrandsItems.length > 0">
          <a v-for="brandItem in ComputerRepairPageData?.data?.BrandsItems"
             class="item"
             :href="brandItem?.Url?.Url"
          >
            <img :src="config.public.publicUrl + brandItem?.Logo?.url" :alt="brandItem?.Logo?.alternativeText" />
          </a>
        </div>
        <div class="content content-phone-repair">
          <h2>{{ComputerRepairPageData?.data?.Subtitle}}</h2>
          <div class="sub" v-html="ComputerRepairPageData?.data?.SubDescription"></div>
        </div>
      </div>

      <RepairCenters :data="globalDataDevicePage?.data?.our_repair_centers" />

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
.sect-support .sect-repair-centers{
  margin-bottom: 0!important;
}
@media (max-width: 768px) {
  .sect-devices-list .brands {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 20px;
  }
}
</style>