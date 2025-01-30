<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: "Header"
});
</script>

<script setup>
const config = useRuntimeConfig();
const { currentLang, changeLanguage } = useLanguage();

const dropdownActive = ref(false);
const toggleDropdown = () => {
  dropdownActive.value = !dropdownActive.value;
};

const { data: headerData } = await useAsyncData(`header-${currentLang.value}`, () =>
    $fetch(
        `${config.public.apiBase}/header`, {
          params: {
            pLevel: 3,
            ...(currentLang.value !== "en" ? { locale: currentLang.value } : {})
          }
        }
    )
);
const { data: mainMenuData } = await useAsyncData(`mainMenu-${currentLang.value}`, () =>
    $fetch(
        `${config.public.apiBase}/main-menu`, {
          params: {
            pLevel: 4,
            ...(currentLang.value !== "en" ? { locale: currentLang.value } : {})
          }
        }
    )
);

const availableLanguages = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "fr", label: "Français" },
];
</script>

<template>
  <header>
    <div class="wrap">
      <div class="box">
        <div class="logo">
          <a href="index.html">
            <img :src="config.public.publicUrl+headerData.data.Logo.url" alt="reboost - logo">
          </a>
        </div>
        <div class="menu">
          <ul>
            <li v-for="itemMenu in mainMenuData.data.Items">
              <template v-if="itemMenu.__component === 'menu.menu-sub-items'">
                <a @click.prevent="false">{{itemMenu.Title}}</a>
                <div class="submenu" v-if="itemMenu.menu_sections.length > 0">
                  <ul v-for="subItem in itemMenu.menu_sections">
                    <template v-if="subItem.Title !== null">
                      <li class="title">{{subItem.Title}}</li>
                    </template>
                    <template v-if="subItem.Items.length > 0">
                      <li v-for="childItem in subItem.Items">
                        <a :href="childItem.Url" :target="childItem.Target">{{childItem.Title}}</a>
                      </li>
                    </template>
                  </ul>
                </div>
              </template>
              <template v-else>
                <a :href="itemMenu.Url" :target="itemMenu.Target">{{itemMenu.Title}}</a>
              </template>
            </li>
          </ul>
        </div>
        <div class="number"><a :href="'tel:' + headerData.data.Phone">{{ headerData.data.Phone }}</a></div>
        <div class="lang">
          <div @click="toggleDropdown" class="selected">{{currentLang.toUpperCase()}}</div>
          <div class="dropdown" :class="{ active: dropdownActive }">
            <ul>
              <li v-for="item in headerData.data.menu_section.Items">
                <a href="#" @click.prevent="changeLanguage(item.Url)">{{ item.Title }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mmenu"></div>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>