<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Footer"
})
</script>

<script setup>
const config = useRuntimeConfig();
const { currentLang, changeLanguage } = useLanguage();

const dropdownActive = ref(false);
const toggleDropdown = () => {
  dropdownActive.value = !dropdownActive.value;
};

const { data: footerData } = await useAsyncData(`footer-${currentLang.value}`, () =>
    $fetch(
        `${config.public.apiBase}/footer`, {
          params: {
            pLevel: 3,
            ...(currentLang.value !== "en" ? { locale: currentLang.value } : {})
          }
        }
    )
);
const { data: footerMenuData } = await useAsyncData(`footerMenu-${currentLang.value}`, () =>
    $fetch(
        `${config.public.apiBase}/footer-menu`, {
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
  <footer>
    <div class="wrap">
      <div class="box">
        <div class="col">
          <div class="logo">
            <a href="/">
              <img :src="config.public.publicUrl+footerData.data.Logo.url" alt="reboost - logo">
            </a>
          </div>
          <div class="number"><a :href="'tel:'+footerData.data.Phone">{{footerData.data.Phone}}</a></div>
          <div class="copy">{{footerData.data.Copyright}}</div>
        </div>
        <div class="col">
          <div class="menu">
            <template v-for="itemMenu in footerMenuData.data.Items">
              <template v-if="itemMenu.__component === 'menu.menu-sub-items' && itemMenu.Title !== 'Other' && itemMenu.Title !== 'Sell'">
                <div class="cap">{{itemMenu.Title}}</div>
                <template v-if="itemMenu.menu_sections.length > 0">
                  <ul v-for="subItem in itemMenu.menu_sections">
                    <li>
                      <template v-if="subItem.Title !== null">
                        <a @click.prevent="false">{{subItem.Title}}</a>
                      </template>
                      <template v-if="subItem.Items.length > 0">
                        <ul>
                          <li v-for="childItem in subItem.Items">
                            <a :href="childItem.Url" :target="childItem.Target">{{childItem.Title}}</a>
                          </li>
                        </ul>
                      </template>
                    </li>
                  </ul>
                </template>
              </template>
            </template>
          </div>
          <div class="menu">
            <template v-for="itemMenu in footerMenuData.data.Items">
              <template v-if="itemMenu.__component === 'menu.menu-sub-items' && itemMenu.Title === 'Other'">
                <div class="cap">{{itemMenu.Title}}</div>
                <template v-if="itemMenu.menu_sections.length > 0">
                  <ul v-for="subItem in itemMenu.menu_sections">
                    <li>
                      <template v-if="subItem.Title !== null">
                        <a @click.prevent="false">{{subItem.Title}}</a>
                      </template>
                      <template v-if="subItem.Items.length > 0">
                        <ul>
                          <li v-for="childItem in subItem.Items">
                            <a :href="childItem.Url" :target="childItem.Target">{{childItem.Title}}</a>
                          </li>
                        </ul>
                      </template>
                    </li>
                  </ul>
                </template>
              </template>
            </template>
          </div>
          <div class="shops">
            <div class="cap">{{footerData.data.Shops.TitleComponent}}</div>
            <template v-if="footerData.data.Shops.Shop.length > 0">
              <div class="shop" v-for="shop in footerData.data.Shops.Shop">
                <div class="title">{{shop.Title}}</div>
                <div class="address">{{shop.Address}}</div>
                <div class="tel">
                  <a :href="'tel:'+shop.Phone">{{shop.Phone}}</a>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="col">
          <div class="lang">
            <div @click="toggleDropdown" class="selected">{{currentLang.toUpperCase()}}</div>
            <div class="dropdown" :class="{ active: dropdownActive }">
              <ul>
                <li v-for="item in footerData.data.menu_section.Items">
                  <a href="#" @click.prevent="changeLanguage(item.Url)">{{ item.Title }}</a>
                </li>
              </ul>
            </div>
          </div>
          <template v-if="footerData.data.SocialMediaButtons.length > 0">
            <div class="social">
              <div class="icon" v-for="button in footerData.data.SocialMediaButtons">
                <a :href="button.Url" target="_blank">
                  <template v-html="button.SvgImage"></template>
                </a>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </footer>

  <!-- Gradient for SVG -->
  <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg" class="hidden">
    <defs>
      <linearGradient id="icon-gradient" x1="1.78565" y1="22.9211" x2="75.368" y2="58.3399" gradientUnits="userSpaceOnUse">
        <stop stop-color="#017CFF"/>
        <stop offset="1" stop-color="#3EC1FF"/>
      </linearGradient>
    </defs>
  </svg>
</template>

<style scoped>

</style>