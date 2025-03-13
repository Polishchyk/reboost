<template>
  <div class="error-page">
    <h1 v-if="error.statusCode === 404">Page Not Found</h1>
    <h1 v-else>Something went wrong</h1>
    <NuxtLink to="/">Go Home</NuxtLink>
  </div>
</template>

<script setup>
defineProps(['error'])
</script>

<style scoped>
.error-page {
  text-align: center;
  margin-top: 50px;
}
</style>