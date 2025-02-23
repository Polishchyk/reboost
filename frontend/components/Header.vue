<script setup>
import { useLanguage } from '@/composables/useLanguage';
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue';
const config = useRuntimeConfig();
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})

const dropdownActive = ref(false);
const toggleDropdown = () => {
  dropdownActive.value = !dropdownActive.value;
};

const { data: globalData, refresh: refreshHeadIcon } = await useAsyncData(`globalData-${locale.value}`, () =>
        $fetch(`${config.public.apiBase}/global`, {
          params: { pLevel: 3 },
        }),
    { watch: [locale], server: true }
);

const faviconUrl = ref("/favicon.ico");
const analyticsCode = ref(globalData.value?.data?.analytics_code || '');

watchEffect(() => {
  const newFaviconUrl = globalData.value?.data?.favicon?.url;
  if (newFaviconUrl) {
    faviconUrl.value = `${config.public.publicUrl}${newFaviconUrl}?v=${Date.now()}`;
  }
});

useHead({
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: faviconUrl.value,
    },
  ],
});

const { data: headerData, refresh: refreshHeader } = await useAsyncData(`headerData-${locale.value}`, () =>
        $fetch(`${config.public.apiBase}/header`, {
          params: { pLevel: 3, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true }
);

const { data: mainMenuData, refresh: refreshMainMenuData } = await useAsyncData(`mainMenuData-${locale.value}`, () =>
        $fetch(`${config.public.apiBase}/main-menu`, {
          params: { pLevel: 4, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true }
);

watch(locale, () => {
  refreshHeader();
  refreshMainMenuData();
  refreshHeadIcon();
});

const menuActive = ref(false);
const scrollPos = ref(0);

const toggleMenu = () => {
  menuActive.value = !menuActive.value;
  if (menuActive.value) {
    scrollPos.value = window.scrollY;
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
    window.scrollTo(0, scrollPos.value);
  }
};

const handleClickOutside = (event) => {
  if (!event.target.closest('.lang') && !event.target.classList.contains('selected')) {
    dropdownActive.value = false;
  }
};

onMounted(() => {
  if (analyticsCode.value) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = analyticsCode.value;

    while (tempDiv.firstChild) {
      document.head.appendChild(tempDiv.firstChild);
    }
  }
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <header :class="{ 'menu-active': menuActive }">
    <div class="wrap">
      <div class="box">
        <div class="logo">
          <a href="/">
            <img :src="config.public.publicUrl + headerData?.data?.Logo?.url" alt="reboost - logo" />
          </a>
        </div>
        <div class="menu">
          <ul>
            <li v-for="itemMenu in mainMenuData?.data?.Items" :key="itemMenu.id">
              <template v-if="itemMenu.__component === 'menu.menu-sub-items'">
                <a @click.prevent="false">{{ itemMenu.Title }}</a>
                <div class="submenu" v-if="itemMenu.menu_sections.length > 0">
                  <ul v-for="subItem in itemMenu.menu_sections" :key="subItem.id">
                    <template v-if="subItem.Title !== null">
                      <li class="title">{{ subItem.Title }}</li>
                    </template>
                    <template v-if="subItem.Items.length > 0">
                      <li v-for="childItem in subItem.Items" :key="childItem.id">
                        <a :href="`${locale !== 'it' ? '/' + locale : ''}${childItem.Url}`" :target="childItem.Target">{{ childItem.Title }}</a>
                      </li>
                    </template>
                  </ul>
                </div>
              </template>
              <template v-else>
                <a :href="`${locale !== 'it' ? '/' + locale : ''}${itemMenu.Url}`" :target="itemMenu.Target">{{ itemMenu.Title }}</a>
              </template>
            </li>
          </ul>
        </div>
        <div class="number">
          <a :href="'tel:' + headerData?.data?.Phone">{{ headerData?.data?.Phone }}</a>
        </div>
        <div class="lang">
          <div @click="toggleDropdown" class="selected">{{ locale.toUpperCase() }}</div>
          <div class="dropdown" :class="{ active: dropdownActive }">
            <ul>
              <li v-for="locale in availableLocales" :key="locale.code">
                <NuxtLink :to="switchLocalePath(locale.code)">
                  {{ locale.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="mmenu" @click="toggleMenu"></div>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>
