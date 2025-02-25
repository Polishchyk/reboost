<script setup>
defineProps({
  data: Object
});
</script>
<template>
  <div class="sect-online-access">
    <div class="wrap" v-if="data">
      <div class="box">
        <h2>{{data?.Title}}</h2>
        <div class="sub">{{data?.Description}}</div>
        <div class="cols" v-if="data?.online_access_items && data?.online_access_items.length > 0">
          <div class="item" v-for="online_access_item in data?.online_access_items">
            <a :href="online_access_item?.Url?.Url" :target="online_access_item?.Url?.Target">
              <div class="icon" v-if="online_access_item?.SvgImage" v-html="online_access_item?.SvgImage"></div>
              <h3>{{online_access_item?.Title}}</h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>