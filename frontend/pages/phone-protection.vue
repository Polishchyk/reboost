<script setup>

import Breadcrumbs from "@/components/sections/Breadcrumbs.vue";
import SeoHead from '~/components/SeoHead.vue'

const config = useRuntimeConfig();
const { locale } = useI18n();

const { data: PhoneProtectionPageData} = await useAsyncData(
    `phone-protection-${locale.value}`,
    () =>
        $fetch(`${config.public.apiBase}/phone-protection`, {
          params: { pLevel: 4, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true  }
);

</script>
<template>
  <div v-if="PhoneProtectionPageData">
    <SeoHead :seo="PhoneProtectionPageData?.data?.SEO" />
    <Breadcrumbs :currentPageTitle="PhoneProtectionPageData?.data?.title" :css-class="'bg2'"/>
    <div class="sect-phone-protection">
      <div class="wrap">
        <h1>{{PhoneProtectionPageData?.data?.title}}</h1>
        <div class="sub">{{PhoneProtectionPageData?.data?.Description}}</div>
        <h2>{{PhoneProtectionPageData?.data?.Phone_Protection_Plans}}</h2>
        <div class="illustration" v-if="PhoneProtectionPageData?.data?.illustration && PhoneProtectionPageData?.data?.illustration.length > 0">
          <div class="cols">
            <template v-for="(illustration, index) in PhoneProtectionPageData?.data?.illustration" :key="index">
              <div class="item">
                <div class="icon" v-if="illustration?.Icon">
                  <img :src="config.public.publicUrl + illustration?.Icon?.url" :alt="illustration?.Icon?.alternativeText">
                </div>
                <div class="desc">{{illustration?.Description}}</div>
              </div>
              <template v-if="(index + 1) < PhoneProtectionPageData?.data?.illustration.length">
                <div class="plus"></div>
              </template>
            </template>
          </div>
        </div>
        <div class="plans" v-if="PhoneProtectionPageData?.data?.plans && PhoneProtectionPageData?.data?.plans.length > 0">
          <div class="item" v-for="plan in PhoneProtectionPageData?.data?.plans">
            <div class="title" v-html="plan?.Title"></div>
            <div class="price"><span>{{plan?.Price}}</span></div>
          </div>
        </div>
        <h2>{{PhoneProtectionPageData?.data?.phone_protection_plan_year}}</h2>
        <div class="illustration" v-if="PhoneProtectionPageData?.data?.illustration_other && PhoneProtectionPageData?.data?.illustration_other.length > 0">
          <div class="cols">
            <template v-for="(illustration_other, index) in PhoneProtectionPageData?.data?.illustration_other" :key="index">
              <div class="item">
                <div class="icon" v-if="illustration_other?.Icon">
                  <img :src="config.public.publicUrl + illustration_other?.Icon?.url" :alt="illustration_other?.Icon?.alternativeText">
                </div>
                <div class="desc" v-html="illustration_other?.Description"></div>
              </div>
              <template v-if="(index + 1) < PhoneProtectionPageData?.data?.illustration_other.length">
                <div class="plus"></div>
              </template>
            </template>
          </div>
        </div>
        <div class="text-box" v-if="PhoneProtectionPageData?.data?.text_box">
          <h2>{{PhoneProtectionPageData?.data?.text_box.Title}}</h2>
          <div class="sub">{{PhoneProtectionPageData?.data?.text_box?.Subtitle}}</div>
          <div class="sub2" v-html="PhoneProtectionPageData?.data?.text_box?.Subtitle2"></div>
        </div>
        <div class="sub margin">{{PhoneProtectionPageData?.data?.Subtitle}}</div>
        <div class="plans" v-if="PhoneProtectionPageData?.data?.Plans2 && PhoneProtectionPageData?.data?.Plans2.length > 0">
          <div class="item" v-for="plan2 in PhoneProtectionPageData?.data?.Plans2">
            <div class="title" v-html="plan2?.Title"></div>
            <div class="price"><span>{{plan2?.Price}}</span></div>
          </div>
        </div>
        <div class="description" v-if="PhoneProtectionPageData?.data?.how_does_it_work">
          <h2>{{PhoneProtectionPageData?.data?.how_does_it_work?.Title}}</h2>
          <div class="text-cols" v-if="PhoneProtectionPageData?.data?.how_does_it_work?.text_cols && PhoneProtectionPageData?.data?.how_does_it_work?.text_cols.length > 0">
            <div class="item" v-for="cols in PhoneProtectionPageData?.data?.how_does_it_work?.text_cols">{{cols?.Description}}</div>
          </div>
          <div class="picture-cols">
            <div class="film-installation" v-if="PhoneProtectionPageData?.data?.film_installation">
              <h3>{{PhoneProtectionPageData?.data?.film_installation?.Title}}</h3>
              <p>{{PhoneProtectionPageData?.data?.film_installation?.Description}}</p>
              <div class="image">
                <img src="/img/hydrogel-film-installation.png" alt="Hydrogel Film installation">
              </div>
            </div>
            <div class="comparison" v-if="PhoneProtectionPageData?.data?.comparison">
              <div class="labels" v-if="PhoneProtectionPageData?.data?.comparison?.labels && PhoneProtectionPageData?.data?.comparison?.labels.length > 0">
                <div class="item" v-for="label in PhoneProtectionPageData?.data?.comparison?.labels">{{label?.Title}}</div>
              </div>
              <div class="image" v-if="PhoneProtectionPageData?.data?.comparison?.Image">
                <img
                    :src="config.public.publicUrl + PhoneProtectionPageData?.data?.comparison?.Image?.url"
                    :alt="PhoneProtectionPageData?.data?.comparison?.Image?.alternativeText"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>