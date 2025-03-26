<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

const props = defineProps({
  error: Object
})

const { locale, defaultLocale } = useI18n();
const homeUrl = locale.value !== defaultLocale ? `/${locale.value}` : '/'
const handleError = () => clearError({ redirect: homeUrl })
</script>

<template>
  <div class="error-wrap">
    <Header />
    <div class="breadcrumbs">
      <div class="wrap">
        <div class="nav">
          <nuxt-link :to="locale !== defaultLocale ? `/${locale}` : '/'">Home</nuxt-link>
          <span>{{ error.statusCode }}</span>
        </div>
      </div>
    </div>

    <div class="sect-support">
      <div class="wrap">
        <div class="content">
          <h1>{{ error.statusCode }}</h1>
          <p>{{error.message}}</p>
          <button class="colored but" @click="handleError">Go back home</button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
  .error-wrap{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  h1{
    font-size: 84px;
    margin-bottom: 16px;
  }
  p{
    margin-bottom: 50px;
  }
</style>
