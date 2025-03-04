<script setup>

const config = useRuntimeConfig();
const { locale, defaultLocale } = useI18n();

defineProps({
  data: Object,
});
</script>

<template>
  <div class="sect-common-repairs" v-if="data">
    <div class="wrap">
      <div class="bg">
        <h2>{{data.Title}}</h2>
        <div class="sub">{{data.Description}}</div>
        <div class="cols">
          <div class="repairs" v-if="data?.cols && data?.cols.length > 0">
            <template v-for="(item, index) in data?.cols" :key="index">
              <div class="item" v-if="index <= 2">
                <div class="title">{{item?.Title}}</div>
                <div class="desc">{{item?.Description}}</div>
              </div>
            </template>
          </div>
          <div class="image" v-if="data?.ColsImage">
            <img :src="config.public.publicUrl + data?.ColsImage?.url" :alt="data?.ColsImage?.alternativeText">
          </div>
          <div class="repairs" v-if="data?.cols && data?.cols.length > 0">
            <template v-for="(item, index) in data?.cols" :key="index">
              <div class="item" v-if="index > 2 && index <= 5">
                <div class="title">{{item?.Title}}</div>
                <div class="desc">{{item?.Description}}</div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>