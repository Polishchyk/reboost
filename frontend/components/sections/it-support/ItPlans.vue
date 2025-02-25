<script setup>
defineProps({
  data: Object,
});
</script>

<template>
  <div class="sect-it-plans" v-if="data">
    <div class="wrap">
      <h2>{{data?.Title}}</h2>
      <div class="plans" v-if="data?.plan_item && data?.plan_item.length > 0">
        <div class="item" v-for="item in data?.plan_item" :class="item?.isBest ? 'best' : ''">
          <div class="content">
            <h3>{{item?.Title}}</h3>
            <div class="sub">{{item?.Description}}</div>
            <template v-if="item?.plan_options && item?.plan_options.length > 0">
              <div class="add" v-for="option in item?.plan_options">{{option?.Title}}</div>
            </template>
            <div class="action" v-if="item?.button">
              <a :href="item?.button?.Url"
                 class="but"
                 :class="item?.isBest ? 'colored' : ''"
                 :target="item?.button?.Target"
              >{{item?.button?.Title}}</a>
            </div>
            <div class="includes" v-if="item?.plan_includes && item?.plan_includes.length > 0">
              <ul>
                <li v-for="plan_include in item?.plan_includes">{{plan_include?.Title}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>