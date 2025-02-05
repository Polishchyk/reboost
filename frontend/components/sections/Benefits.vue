<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Benefits"
})
</script>

<script setup>
defineProps({
  data: Object,
});
</script>

<template>
  <div class="sect-benefits">
    <div class="wrap">
      <div class="benefits-bg">
        <h2>{{data.Title}}</h2>
        <template v-if="data.BenefitsItem.length > 0">
          <div class="benefits">
            <div class="item" v-for="benefit in data.BenefitsItem" :class="benefit.ItemCssClass">
              <div class="title">{{benefit.Title}}</div>
              <div class="desc">{{benefit.Description}}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>