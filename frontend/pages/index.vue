<script setup>
import { useLanguage } from "@/composables/useLanguage";
import MainOffer from "@/components/sections/MainOffer.vue";
import DevicesList from "@/components/sections/DevicesList.vue";
import Solutions from "@/components/sections/Solutions.vue";
import Principle from "@/components/sections/Principle.vue";
import Benefits from "@/components/sections/Benefits.vue";
import RepairCenters from "@/components/sections/RepairCenters.vue";
import Proposals from "@/components/sections/Proposals.vue";
import FAQ from "@/components/sections/FAQ.vue";
import InfoText from "@/components/sections/InfoText.vue";

const config = useRuntimeConfig();
const { currentLang } = useLanguage();

const localeParam = computed(() =>
    currentLang.value !== "en" ? { locale: currentLang.value } : {}
);

const { data: HomePageData, refresh, error } = await useAsyncData(
    `index-${currentLang.value}`,
    () =>
        $fetch(`${config.public.apiBase}/home-page`, {
          params: { pLevel: 4, ...localeParam.value },
        }),
    { watch: [localeParam], server: true  }
);
</script>

<template>
  <div v-if="HomePageData">
    <MainOffer :data="HomePageData?.data?.MainOffer" />
    <DevicesList :data="HomePageData?.data?.DevicesList" />
    <Solutions :data="HomePageData?.data?.Solutions" />
    <Principle :data="HomePageData?.data?.Principle" />
    <Benefits :data="HomePageData?.data?.Benefits" />
    <RepairCenters :data="HomePageData?.data?.RepairCenters" />
    <Proposals :data="HomePageData?.data?.Proposals" />
    <FAQ :data="HomePageData?.data?.FAQ" />
    <InfoText :data="HomePageData?.data?.InfoText" />
  </div>
</template>

<style scoped></style>
