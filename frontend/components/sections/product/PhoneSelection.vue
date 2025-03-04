<script setup>

const config = useRuntimeConfig();
const { locale, defaultLocale } = useI18n();

defineProps({
  data: Object,
});
</script>

<template>
  <div class="sect-phone-selection" v-if="data">
    <div class="wrap">
      <h1>{{data?.PageTitle}}</h1>
      <div class="sub">{{data?.Description}}</div>
      <div class="head">{{data?.Head}}</div>
      <div class="selection" v-if="data?.DeviceItems && data?.DeviceItems.length > 0">
        <div class="item" v-for="device in data?.DeviceItems">
          <nuxt-link :to="locale !== defaultLocale ? `/${locale}${device?.Url.Url}` : `${device?.Url.Url}`">
            <div class="image" v-if="device?.Image">
              <img :src="config.public.publicUrl + device?.Image?.url" :alt="device?.Image?.alternativeText">
            </div>
            <div class="title">{{device?.Title}}</div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>