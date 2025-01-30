<template>
  <div :key="currentLang">
    <MainOffer />
    <DevicesList />
    <Solutions />
    <Principle />
    <Benefits />
    <RepairCenters />
    <Proposals />
    <FAQ />
    <InfoText />
  </div>
</template>

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

const route = useRoute();
const router = useRouter();
const { currentLang } = useLanguage();

const availableLanguages = ["de", "it", "fr"];
if (!availableLanguages.includes(route.params.lang)) {
  router.push("/");
}

currentLang.value = route.params.lang;
</script>