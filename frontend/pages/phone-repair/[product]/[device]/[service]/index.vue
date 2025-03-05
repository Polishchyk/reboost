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

const slug = route.params.service;
const product = route.params.product;
const device = route.params.device;

const { data: servicePageData} = await useAsyncData(
    `service-${locale.value}-${slug}`,
    () =>
        $fetch(`${config.public.apiBase}/services/${slug}`, {
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
  <div v-if="servicePageData?.data">
    <SeoHead :seo="servicePageData?.data?.SEO" />

    <div class="breadcrumbs bg2">
      <div class="wrap">
        <div class="nav">
          <nuxt-link :to="locale !== defaultLocale ? `/${locale}` : '/'">Home</nuxt-link>
          <nuxt-link :to="`${locale !== defaultLocale ? `/${locale}/` : `/`}phone-repair`">{{ pageTitles?.['phone-repair'] }}</nuxt-link>
          <span>{{ servicePageData?.data?.Title }}</span>
        </div>
      </div>
    </div>

    <div class="sect-book-repair">
      <div class="wrap">
        <div class="content">
          <div class="icon" v-if="servicePageData?.data?.Icon">
            <img :src="config.public.publicUrl + servicePageData?.data?.Icon.url" :alt="servicePageData?.data?.Icon.alternativeText">
          </div>
          <h1>{{servicePageData?.data?.Title}}</h1>
          <div class="sub">{{servicePageData?.data?.Description}}</div>
          <div class="price"><span>{{servicePageData?.data?.Price}}</span></div>
          <div class="booking" v-if="servicePageData?.data?.booking">
            <template v-if="servicePageData?.data?.booking?.info && servicePageData?.data?.booking?.info.length > 0">
              <div class="info" v-for="infoItem in servicePageData?.data?.booking?.info">
                <div class="label">{{infoItem?.Label}}</div>
                <div class="value">{{infoItem?.Value}}</div>
              </div>
            </template>
            <div class="action" v-if="servicePageData?.data?.booking?.Action">
              <a :href="servicePageData?.data?.booking?.Action?.Url" :target="servicePageData?.data?.booking?.Action?.Target">
                <div class="but colored large">{{servicePageData?.data?.booking?.Action?.Title}}</div>
              </a>
            </div>
          </div>
          <div class="description">
            <div class="head">{{servicePageData?.data?.Subtitle}}</div>
            <p>{{servicePageData?.data?.SubDescription}}</p>
          </div>
        </div>
      </div>
    </div>

    <FAQ :data="servicePageData?.data?.FAQ" />

    <div class="sect-repair-selection" v-if="servicePageData?.data?.other_services">
      <div class="wrap">
        <h1>{{servicePageData?.data?.other_services?.Title}}</h1>
        <div class="selection" v-if="servicePageData?.data?.other_services?.services">
          <template  v-if="servicePageData?.data?.other_services?.services?.length > 0">
            <div class="item" v-for="service in servicePageData?.data?.other_services?.services">
              <nuxt-link :to="`${locale !== defaultLocale ? `/${locale}/` : `/`}phone-repair/${product}/${device}/${service?.slug}`">
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

    <RepairCenters :data="globalDataDevicePage?.data?.our_repair_centers" />
    <Reasons :data="globalDataDevicePage?.data?.reasons"/>
  </div>
</template>