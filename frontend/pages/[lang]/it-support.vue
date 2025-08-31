<script setup>

import Breadcrumbs from "@/components/sections/Breadcrumbs.vue";
import SeoHead from '~/components/SeoHead.vue'
import Support from '~/components/sections/it-support/Support.vue'
import ItServices from '~/components/sections/it-support/ItServices.vue'
import ItPlans from '~/components/sections/it-support/ItPlans.vue'
import FAQ from '~/components/sections/FAQ.vue'
import OnlineAccess from '~/components/sections/it-support/OnlineAccess.vue'
import InfoText from '~/components/sections/InfoText.vue'

const config = useRuntimeConfig();
const { locale } = useI18n();

const { data: ITSupportPageData} = await useAsyncData(
    `it-support-${locale.value}`,
    () =>
        $fetch(`${config.public.apiBase}/it-support`, {
          params: { pLevel: 4, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true  }
);

</script>

<template>
  <div v-if="ITSupportPageData">
    <SeoHead :seo="ITSupportPageData?.data?.SEO" />
    <Breadcrumbs :currentPageTitle="ITSupportPageData?.data?.Support?.Title" :css-class="'bg2'"/>
    <Support :data="ITSupportPageData?.data?.Support"/>
    <ItServices
        :data="ITSupportPageData?.data?.it_services"
        :other_services="ITSupportPageData?.data?.other_services"
        :service_text="ITSupportPageData?.data?.service_text"
    />
    <InfoText :data="ITSupportPageData?.data?.service_text"/>
    <ItPlans :data="ITSupportPageData?.data?.it_management_plans"/>
    <FAQ :data="ITSupportPageData?.data?.FAQ"/>
    <OnlineAccess :data="ITSupportPageData?.data?.online_access"/>
  </div>
</template>