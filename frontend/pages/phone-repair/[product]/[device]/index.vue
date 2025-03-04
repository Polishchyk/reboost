<script setup>
import SeoHead from '~/components/SeoHead.vue';
import FAQ from '~/components/sections/FAQ.vue';
import InfoText from '~/components/sections/product/InfoText.vue';
import Reasons from '~/components/sections/product/Reasons.vue';
import RepairCenters from '~/components/sections/RepairCenters.vue'
import { useAsyncData } from '#imports'

const config = useRuntimeConfig();
const { locale, defaultLocale } = useI18n();
const route = useRoute();

const slug = route.params.device;

const { data: devicePageData} = await useAsyncData(
    `product-${locale.value}-${slug}`,
    () =>
        $fetch(`${config.public.apiBase}/devices/${slug}`, {
          params: { pLevel: 4, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true  }
);

const { data: globalDataDevicePage } = await useAsyncData(`globalData-${locale.value}-device-page`, () =>
        $fetch(`${config.public.apiBase}/global`, {
          params: { pLevel: 4, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true }
);

const { data: pageTitles } = await useAsyncData(() =>
    $fetch(`${config.public.apiBase}/page-titles`, {
      params: { locale: locale.value }
    })
);

</script>

<template>
  <div v-if="devicePageData?.data">
    <SeoHead :seo="devicePageData?.data?.SEO" />
    <div class="breadcrumbs bg2">
      <div class="wrap">
        <div class="nav">
          <nuxt-link :to="locale !== defaultLocale ? `/${locale}` : '/'">Home</nuxt-link>
            <nuxt-link :to="`${locale !== defaultLocale ? `/${locale}/` : `/`}phone-repair`">{{ pageTitles?.['phone-repair'] }}</nuxt-link>
            <nuxt-link :to="`${locale !== defaultLocale ? `/${locale}/` : `/`}phone-repair/${devicePageData?.data?.product?.slug}`">
              {{ devicePageData?.data?.product?.PageTitle }}
            </nuxt-link>
            <span>{{ devicePageData?.data?.PageTitle }}</span>
        </div>
      </div>
    </div>

    <div class="sect-repair-selection">
      <div class="wrap">
        <h1>{{devicePageData?.data?.PageTitle}}</h1>
        <div class="sub" v-html="devicePageData?.data?.Description"></div>
        <div class="selection" v-if="devicePageData?.data?.hardware">
          <template  v-if="devicePageData?.data?.hardware?.services && devicePageData?.data?.hardware?.services?.length > 0">
            <div class="item" v-for="service in devicePageData?.data?.hardware?.services">
              <nuxt-link :to="`${locale !== defaultLocale ? `/${locale}/` : `/`}phone-repair/${devicePageData?.data?.product?.slug}/${devicePageData?.data?.slug}/${service?.slug}`">
                <div class="icon" v-if="service?.Icon">
                  <img :src="config.public.publicUrl + service?.Icon?.url" :alt="service?.Icon?.alternativeText">
                </div>
                <div class="title">{{service?.Title}}</div>
                <div class="price"><span>{{service?.Price}}</span></div>
              </nuxt-link>
            </div>
          </template>
        </div>
      </div>
    </div>
    <FAQ :data="devicePageData?.data?.FAQ" />
    <InfoText :data="devicePageData?.data?.InfoText" />
    <RepairCenters :data="globalDataDevicePage?.data?.our_repair_centers" />
    <Reasons :data="globalDataDevicePage?.data?.reasons"/>
  </div>
</template>