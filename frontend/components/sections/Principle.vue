<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Principle"
})
</script>

<script setup>
defineProps({
  data: Object,
});
const config = useRuntimeConfig();
</script>

<template>
  <div class="sect-principle">
    <div class="wrap">
      <h2>{{data.Title}}</h2>
      <div class="sub" v-html="data.Description"></div>
      <template v-if="data.PrinciplesItems.length > 0">
        <div class="principles">
          <div class="item" v-for="principle in data.PrinciplesItems">
            <div class="icon">
              <img :src="config.public.publicUrl+principle.Icon.url" :alt="principle.Icon.alternativeText">
            </div>
            <div class="title">{{principle.Title}}</div>
            <div class="desc">
              <p>{{principle.Description}}</p>
              <template v-if="principle.PrinciplesItemList.length > 0">
                <ul>
                  <li v-for="item in principle.PrinciplesItemList">{{item.ItemTitle}}</li>
                </ul>
              </template>
            </div>
          </div>
        </div>
      </template>
      <div class="addition">{{data.AdditionDescription}}</div>
    </div>
  </div>
</template>

<style scoped>

</style>