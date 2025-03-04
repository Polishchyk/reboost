<script setup>

const config = useRuntimeConfig();
const { locale, defaultLocale } = useI18n();

defineProps({
  data: Object,
});
</script>

<template>
  <div class="sect-reasons" v-if="data">
    <div class="wrap">
      <h2>{{data?.Title}}</h2>
      <div class="reasons" v-if="data?.reason_items && data?.reason_items.length > 0">
        <div class="item" v-for="reason in data?.reason_items">
          <div class="icon" v-if="reason?.Icon">
            <img :src="config.public.publicUrl + reason?.Icon?.url" :alt="reason?.Icon?.alternativeText">
          </div>
          <div class="title">{{reason?.Title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>