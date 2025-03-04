<script setup>

const config = useRuntimeConfig();
const { locale, defaultLocale } = useI18n();

defineProps({
  data: Object,
});
</script>

<template>
  <div class="sect-identification" v-if="data">
    <div class="wrap">
      <div class="row">
        <div class="text">
          <h2>{{data?.Title}}</h2>
          <div v-html="data?.Description"></div>
        </div>
        <div class="image" v-if="data?.Image">
          <img :src="config.public.publicUrl + data?.Image?.url" :alt="data?.Image?.alternativeText">
        </div>
      </div>
    </div>
  </div>
</template>