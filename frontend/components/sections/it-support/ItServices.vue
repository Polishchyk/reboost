<script setup>
defineProps({
  data: Object,
  other_services: Object,
  service_text: Object
});
const config = useRuntimeConfig();
</script>

<template>
  <div class="sect-it-services">
    <div class="wrap">
      <h2>{{data?.Title}}</h2>
      <div class="sub">{{data?.Description}}</div>
      <div class="services" v-if="data?.service_items && data?.service_items.length > 0">
        <div class="item" v-for="service_item in data?.service_items">
          <div class="icon" v-if="service_item?.Icon">
            <img :src="config.public.publicUrl + service_item?.Icon?.url" :alt="service_item?.Icon?.alternativeText"/>
          </div>
          <div class="title">{{service_item?.Title}}</div>
          <div class="desc">{{service_item?.Description}}</div>
        </div>
      </div>
      <div class="other-services" v-if="other_services">
        <h2>{{other_services?.Title}}</h2>
        <ul v-if="other_services?.other_services_items && other_services?.other_services_items.length > 0">
          <li v-for="other_services_item in other_services?.other_services_items">
            <span>{{other_services_item?.Title}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>