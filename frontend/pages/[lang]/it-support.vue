<script setup>

import Breadcrumbs from "@/components/sections/Breadcrumbs.vue";
import SeoHead from '~/components/SeoHead.vue'
import Support from '~/components/sections/it-support/Support.vue'
import ItServices from '~/components/sections/it-support/ItServices.vue'
import ItPlans from '~/components/sections/it-support/ItPlans.vue'
import FAQ from '~/components/sections/FAQ.vue'

const config = useRuntimeConfig();
const { locale } = useI18n();

const { data: ITSupportPageData} = await useAsyncData(
    `it-support-${locale.value}`,
    () =>
        $fetch(`${config.public.apiBase}/it-support`, {
          params: { pLevel: 4, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true  }
);

</script>

<template>
  <div v-if="ITSupportPageData">
    <SeoHead :seo="ITSupportPageData?.data?.SEO" />
    <Breadcrumbs :currentPageTitle="'Breadcrumbs'" :css-class="'bg2'"/>
    <Support :data="ITSupportPageData?.data?.Support"/>
    <ItServices/>
    <ItPlans/>
    <FAQ :data="ITSupportPageData?.data?.FAQ"/>

    <div class="sect-online-access">
      <div class="wrap">
        <div class="box">
          <h2>Online access</h2>
          <div class="sub">Team Viewer is a tool that enables the Dina Service Desk to help you remotely.</div>
          <div class="cols">
            <div class="item">
              <a href="">
                <div class="icon">
                  <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M47.4364 1.66699C48.0296 5.69646 46.3895 9.64401 44.2259 12.4369C41.9111 15.4327 37.9213 17.7498 34.0555 17.6288C33.3498 13.771 35.1567 9.79614 37.3552 7.12413C39.7669 4.17517 43.9002 1.91274 47.4364 1.66699ZM59.0483 58.3844C61.0412 55.3301 61.7857 53.7893 63.3328 50.341C52.0806 46.0619 50.2776 30.065 61.4135 23.9252C58.0169 19.6656 53.2438 17.1964 48.7383 17.1964C45.4919 17.1964 43.2675 18.0436 41.2454 18.8138C39.5602 19.4556 38.0155 20.044 36.1367 20.044C34.1065 20.044 32.3085 19.3993 30.426 18.7243C28.3573 17.9826 26.1864 17.2042 23.4926 17.2042C18.4364 17.2042 13.0546 20.2936 9.64252 25.5752C4.84618 33.0139 5.66431 46.9981 13.4424 58.911C16.2225 63.1745 19.937 67.9646 24.7954 68.0075C26.8113 68.0275 28.1528 67.4258 29.6044 66.7747C31.266 66.0295 33.0719 65.2195 36.1988 65.2029C39.3441 65.184 41.1215 66.0039 42.761 66.7601C44.1754 67.4125 45.4871 68.0175 47.4859 67.9958C52.3481 67.9568 56.2682 62.6479 59.0483 58.3844Z" fill="#142835"/>
                  </svg>
                </div>
                <h3>Mac OS</h3>
              </a>
            </div>
            <div class="item">
              <a href="">
                <div class="icon">
                  <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.50195 33.5935V11.5334L29.0038 7.98006V33.5935H2.50195Z" fill="#142835"/>
                    <path d="M32.4091 33.5935V7.23975L67.4982 2.50195V33.5935H32.4091Z" fill="#142835"/>
                    <path d="M32.4091 62.4644V36.9989H67.4982V67.4982L32.4091 62.4644Z" fill="#142835"/>
                    <path d="M29.0038 62.4644V36.9989H2.50195V58.4669L29.0038 62.4644Z" fill="#142835"/>
                  </svg>
                </div>
                <h3>Windows</h3>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>