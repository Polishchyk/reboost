<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "DevicesList"
})
</script>
<script setup>
defineProps({
  data: Object,
});
const config = useRuntimeConfig();
</script>

<template>
  <div class="sect-devices-list">
    <div class="wrap">
      <h2>{{data.Title}}</h2>
      <template v-if="data.DevicesListItems.length > 0">
        <div class="devices">
          <div class="item" v-for="device in data.DevicesListItems">
            <a :href="device.Url">
              <div class="icon" v-html="device.SvgImage">
              </div>
              <div class="name">{{device.Title}}</div>
            </a>
          </div>
        </div>
      </template>
      <template v-if="data.BrandsItems[0].Image.length > 0">
        <div class="brands">
          <div class="item" v-for="brand in data.BrandsItems[0].Image">
            <img :src="config.public.publicUrl+brand.url" :alt="brand.alternativeText ?? ''">
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>