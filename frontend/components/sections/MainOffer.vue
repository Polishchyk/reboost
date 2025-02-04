<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "MainOffer"
})

</script>

<script setup>
import CascadeSelects from "@/components/elements/Cascade-selects.vue";
defineProps({
  data: Object,
});
</script>

<template>
  <div class="sect-main-offer" v-if="data">
    <div class="wrap">
      <div class="content">
        <h1>{{data.Title}}<strong>{{data.TitleBlue}}</strong></h1>
        <div class="info">
          <div class="col">{{data.InfoLeft}}</div>
          <div class="col" v-html="data.InfoRight"></div>
        </div>
        <div class="selection">
          <div class="label">{{data.SelectLabel}}</div>
          <CascadeSelects :data="data"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>