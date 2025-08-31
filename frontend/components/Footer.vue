<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Footer"
})
</script>

<script setup>
import { onBeforeUnmount, onMounted, watch } from 'vue'
import { useAsyncData, useRoute } from '#imports'

const route = useRoute();

const config = useRuntimeConfig();
const { locale, locales }= useI18n();
const switchLocalePath = useSwitchLocalePath();
const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})

const dropdownActive = ref(false);
const toggleDropdown = () => {
  dropdownActive.value = !dropdownActive.value;
};

const { data: globalDataFooter } = await useAsyncData(`globalData-${locale.value}-footer`, () =>
        $fetch(`${config.public.apiBase}/global`, {
          params: { pLevel: 4, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true }
);

const { data: footerData} = await useAsyncData(
    `footer-${locale.value}`,
    () =>
        $fetch(`${config.public.apiBase}/footer`, {
          params: {
            pLevel: 3,
            ...(locale.value !== "it" ? { locale: locale.value } : {}),
          },
        }),
    { watch: [locale], server: true }
);

const { data: footerMenuData} = await useAsyncData(
    `footerMenu-${locale.value}`,
    () =>
        $fetch(`${config.public.apiBase}/footer-menu`, {
          params: {
            pLevel: 4,
            ...(locale.value !== "it" ? { locale: locale.value } : {}),
          },
        }),
    { watch: [locale], server: true }
);

const handleClickOutside = (event) => {
  if (!event.target.closest('.lang') && !event.target.classList.contains('selected')) {
    dropdownActive.value = false;
  }
};

const localizedUrl = (url) => {
  return locale.value !== 'it' ? `/${locale.value}${url}` : url
}

const isInternalLink = (url) => {
  return url.startsWith('/') && !url.startsWith('http')
}

const isActive = (url) => {
  const currentPath = route.path
  const localizedUrlPath = localizedUrl(url)
  return currentPath === localizedUrlPath
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <footer v-if="footerData && footerMenuData">
    <div class="wrap">
      <div class="box">
        <div class="col">
          <div class="logo">
            <NuxtLink :to="localizedUrl('/')">
              <img
                  :src="config.public.publicUrl + footerData?.data?.Logo?.url"
                  alt="reboost - logo"
              />
            </NuxtLink>
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
                  <a v-if="subItem.Title" @click.prevent="false">{{ subItem.Title }}</a>
                  <ul v-if="subItem.Items.length > 0">
                    <li v-for="childItem in subItem.Items" :key="childItem.Title">
                      <nuxt-link
                          v-if="isInternalLink(childItem.Url)"
                          :to="localizedUrl(childItem.Url)"
                          :class="{'active': isActive(childItem.Url)}"
                      >
                        {{ childItem.Title }}
                      </nuxt-link>
                      <a
                          v-else
                          :href="childItem.Url"
                          :target="childItem.Target"
                          rel="noopener"
                          :class="{'active': isActive(childItem.Url)}"
                      >
                        {{ childItem.Title }}
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </template>
          </div>

          <!-- Блок магазинів -->
          <div class="shops">
            <div class="cap">{{ footerData?.data?.Shops?.TitleComponent }}</div>
            <div class="shop" v-for="(shop, index) in footerData?.data?.Shops?.Shop" :key="index">
              <div class="title">{{ shop.Title }}</div>
              <div class="address">{{ shop.Address }}</div>
              <div class="tel">
                <a :href="'tel:' + shop.Phone">{{ shop.Phone }}</a>
              </div>
              <template v-if="globalDataFooter?.data?.our_repair_centers?.RepairCentersItems[index]?.RepairCenterLinks?.length > 0">
                <div class="links">
                  <a
                    v-for="link in globalDataFooter?.data?.our_repair_centers?.RepairCentersItems[index]?.RepairCenterLinks"
                    :key="link.Url"
                    :href="link.Url"
                  >
                    <div class="but small" :class="link.ItemCssClass">{{link.Title ?? '' }}</div>
                  </a>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- Вибір мови -->
        <div class="col">
          <div class="lang">
            <div @click="toggleDropdown" class="selected">
              {{ locale.toUpperCase() }}
            </div>
            <div class="dropdown" :class="{ active: dropdownActive }">
              <ul>
                <li v-for="loc in availableLocales" :key="loc.code">
                  <NuxtLink :to="switchLocalePath(loc.code, route.fullPath)">
                    {{ loc.name }}
                  </NuxtLink>
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
              <a :href="button.Url" target="_blank" rel="noopener">
                <span v-html="button.SvgImage"></span>
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
footer .shop .links{
  margin-top: 16px;
  display: flex;
  gap: 5px;
}
footer .shop .links .but {
  color: #142835;
  background: linear-gradient(to right, var(--gradientColor1-20), var(--gradientColor2-20));
  transition: --gradientColor1-20 0.5s, --gradientColor2-20 0.5s;
}
footer .shop .links .but:hover{
  --gradientColor1-20: var(--gradientColor1-30);
  --gradientColor2-20: var(--gradientColor2-30);
}
footer .shop .links .but.whatsapp {
  background: #25d366 url(/img/icons/whatsapp.svg) no-repeat center;
  width: 40px;
}
footer .shop .links .but.whatsapp:hover {
  background-color: #25D36699;
}
</style>