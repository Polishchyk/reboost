<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Footer"
})
</script>

<script setup>
import { useLanguage } from "@/composables/useLanguage";
import { watch } from "vue";

const config = useRuntimeConfig();
const { currentLang, changeLanguage } = useLanguage();

const dropdownActive = ref(false);
const toggleDropdown = () => {
  dropdownActive.value = !dropdownActive.value;
};

const { data: footerData, refresh: refreshFooter } = await useAsyncData(
    `footer-${currentLang.value}`, // ✅ Фікс: передаємо рядок
    () =>
        $fetch(`${config.public.apiBase}/footer`, {
          params: {
            pLevel: 3,
            ...(currentLang.value !== "en" ? { locale: currentLang.value } : {}),
          },
        }),
    { watch: [currentLang], server: true }
);

const { data: footerMenuData, refresh: refreshFooterMenu } = await useAsyncData(
    `footerMenu-${currentLang.value}`, // ✅ Фікс: передаємо рядок
    () =>
        $fetch(`${config.public.apiBase}/footer-menu`, {
          params: {
            pLevel: 4,
            ...(currentLang.value !== "en" ? { locale: currentLang.value } : {}),
          },
        }),
    { watch: [currentLang], server: true }
);

// Слідкуємо за зміною мови та оновлюємо дані
watch(currentLang, () => {
  refreshFooter();
  refreshFooterMenu();
});

const availableLanguages = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "fr", label: "Français" },
];
</script>

<template>
  <footer v-if="footerData && footerMenuData">
    <div class="wrap">
      <div class="box">
        <div class="col">
          <div class="logo">
            <a href="/">
              <img
                  :src="config.public.publicUrl + footerData?.data?.Logo?.url"
                  alt="reboost - logo"
              />
            </a>
          </div>
          <div class="number">
            <a :href="'tel:' + footerData?.data?.Phone">{{
                footerData?.data?.Phone
              }}</a>
          </div>
          <div class="copy">{{ footerData?.data?.Copyright }}</div>
        </div>

        <!-- Меню футера -->
        <div class="col">
          <div class="menu" v-for="itemMenu in footerMenuData?.data?.Items" :key="itemMenu.Title">
            <template v-if="itemMenu.__component === 'menu.menu-sub-items'">
              <div class="cap">{{ itemMenu.Title }}</div>
              <ul v-if="itemMenu.menu_sections.length > 0">
                <li v-for="subItem in itemMenu.menu_sections" :key="subItem.Title">
                  <a v-if="subItem.Title" @click.prevent="false">{{
                      subItem.Title
                    }}</a>
                  <ul v-if="subItem.Items.length > 0">
                    <li v-for="childItem in subItem.Items" :key="childItem.Title">
                      <a :href="childItem.Url" :target="childItem.Target">{{
                          childItem.Title
                        }}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </template>
          </div>

          <!-- Блок магазинів -->
          <div class="shops">
            <div class="cap">{{ footerData?.data?.Shops?.TitleComponent }}</div>
            <div class="shop" v-for="shop in footerData?.data?.Shops?.Shop" :key="shop.Title">
              <div class="title">{{ shop.Title }}</div>
              <div class="address">{{ shop.Address }}</div>
              <div class="tel">
                <a :href="'tel:' + shop.Phone">{{ shop.Phone }}</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Вибір мови -->
        <div class="col">
          <div class="lang">
            <div @click="toggleDropdown" class="selected">
              {{ currentLang.toUpperCase() }}
            </div>
            <div class="dropdown" :class="{ active: dropdownActive }">
              <ul>
                <li v-for="lang in availableLanguages" :key="lang.code">
                  <a href="#" @click.prevent="changeLanguage(lang.code)">{{
                      lang.label
                    }}</a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Соцмережі -->
          <div class="social" v-if="footerData?.data?.SocialMediaButtons?.length > 0">
            <div
                class="icon"
                v-for="button in footerData?.data?.SocialMediaButtons"
                :key="button.Url"
            >
              <a :href="button.Url" target="_blank">
                <template v-html="button.SvgImage"></template>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- SVG Gradient -->
  <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg" class="hidden">
    <defs>
      <linearGradient
          id="icon-gradient"
          x1="1.78565"
          y1="22.9211"
          x2="75.368"
          y2="58.3399"
          gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#017CFF" />
        <stop offset="1" stop-color="#3EC1FF" />
      </linearGradient>
    </defs>
  </svg>
</template>

<style scoped>
/* Можна додати стилі тут */
</style>