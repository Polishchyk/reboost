<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Proposals"
})
</script>

<script setup>
defineProps({
  data: Object,
});
</script>

<template>
  <div class="sect-proposals">
    <div class="wrap">
      <template v-if="data.ProposalsItems.length > 0">
        <div class="proposals">
          <div class="item" :class="proposal.ItemCssClass" v-for="proposal in data.ProposalsItems">
            <div class="title">{{proposal.Title}}</div>
            <div class="row">
              <div class="desc">{{proposal.Description}}</div>
              <div class="link">
                <a :href="proposal.Url.Url" :target="proposal.Url.Target">
                  <div class="but colored small">{{proposal.Url.Title}}</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>