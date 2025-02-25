<script setup>
defineProps({
  data: Object,
});
</script>
<template>
  <div class="sect-support">
    <div class="wrap">
      <div class="content">
        <h1>{{data?.title}}</h1>
        <div class="sub" v-html="data?.Description"></div>
      </div>
      <div class="head">{{data?.Head}}</div>
      <div class="issues" v-if="data?.Issues && data?.Issues.length > 0">
        <ul>
          <li v-for="issue in data?.Issues">{{issue.Item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>