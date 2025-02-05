<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "RepairCenters"
})
</script>

<script setup>
defineProps({
  data: Object,
});
</script>

<template>
  <div class="sect-repair-centers">
    <div class="wrap">
      <h2>{{data.Title}}</h2>
      <template v-if="data.RepairCentersItems.length > 0">
        <div class="repair-centers">
          <div class="item" v-for="repairCenter in data.RepairCentersItems">
            <h3>{{repairCenter.Title}}</h3>
            <div class="desc">{{repairCenter.Description}}</div>
            <div class="tel"><a :href="'tel:'+repairCenter.Phone">{{repairCenter.Phone}}</a></div>
            <template v-if="repairCenter.RepairCenterLinks.length > 0">
              <div class="links">
                <a :href="link.Url" v-for="link in repairCenter.RepairCenterLinks">
                  <div class="but small" :class="link.ItemCssClass">{{link.Title ?? '' }}</div>
                </a>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>