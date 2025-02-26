<script setup>
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue';
import { useRoute } from '#imports'

const route = useRoute();
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

const { data: globalData } = await useAsyncData(`globalData-${locale.value}`, () =>
        $fetch(`${config.public.apiBase}/global`, {
          params: { pLevel: 3 },
        }),
    { watch: [locale], server: true }
);

const faviconUrl = ref("/favicon.ico");
const analyticsCode = ref(globalData.value?.data?.analytics_code || '');
const apple_touch_icon = ref('');
const icon_svg = ref('');

watchEffect(() => {
  const newFaviconUrl = globalData.value?.data?.favicon_ico?.url;
  const newApple_touch_icon = globalData.value?.data?.apple_touch_icon?.url;
  const newIcon_svg = globalData.value?.data?.icon_svg?.url;
  if (newFaviconUrl) {
    faviconUrl.value = `${config.public.publicUrl}${newFaviconUrl}`;
  }
  if (newApple_touch_icon) {
    apple_touch_icon.value = `${config.public.publicUrl}${newApple_touch_icon}`;
  }
  if (newIcon_svg) {
    icon_svg.value = `${config.public.publicUrl}${newIcon_svg}`;
  }
});

useHead({
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: faviconUrl.value,
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: apple_touch_icon.value,
    },
    {
      rel: "icon",
      type: "image/svg+xml",
      href: icon_svg.value,
    },
  ],
});

const { data: headerData} = await useAsyncData(`headerData-${locale.value}`, () =>
        $fetch(`${config.public.apiBase}/header`, {
          params: { pLevel: 3, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true }
);

const { data: mainMenuData} = await useAsyncData(`mainMenuData-${locale.value}`, () =>
        $fetch(`${config.public.apiBase}/main-menu`, {
          params: { pLevel: 4, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true }
);

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

const localizedUrl = (url) => {
  if(url == '/'){
    return locale.value !== 'it' ? `/${locale.value}` : url
  }
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
          <nuxt-link :to="localizedUrl('/')">
            <img :src="config.public.publicUrl + headerData?.data?.Logo?.url" alt="reboost - logo" />
          </nuxt-link>
        </div>
        <div class="menu">
          <ul>
            <li v-for="itemMenu in mainMenuData?.data?.Items" :key="itemMenu.id">
              <template v-if="itemMenu.__component === 'menu.menu-sub-items'">
                <template v-if="!itemMenu.IsLink">
                  <a @click.prevent="false">{{ itemMenu.Title }}</a>
                </template>
                <template v-if="itemMenu.IsLink && itemMenu.Url">
                  <nuxt-link
                      v-if="isInternalLink(itemMenu?.Url)"
                      :to="localizedUrl(itemMenu?.Url)"
                      :class="{'active': isActive(itemMenu?.Url)}"
                  >
                    {{ itemMenu.Title }}
                  </nuxt-link>
                </template>
                <div class="submenu" v-if="itemMenu.menu_sections.length > 0">
                  <ul v-for="subItem in itemMenu.menu_sections" :key="subItem.id">
                    <template v-if="subItem.Title">
                      <li class="title">{{ subItem.Title }}</li>
                    </template>
                    <template v-if="subItem.Items.length > 0">
                      <li v-for="childItem in subItem.Items" :key="childItem.id">
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
                            :class="{'active': isActive(childItem.Url)}"
                        >
                          {{ childItem.Title }}
                        </a>
                      </li>
                    </template>
                  </ul>
                </div>
              </template>
              <template v-else>
                <nuxt-link
                    v-if="isInternalLink(itemMenu.Url)"
                    :to="localizedUrl(itemMenu.Url)"
                    :class="{'active': isActive(itemMenu.Url)}"
                >
                  {{ itemMenu.Title }}
                </nuxt-link>
                <a
                    v-else
                    :href="itemMenu.Url"
                    :target="itemMenu.Target"
                    :class="{'active': isActive(itemMenu.Url)}"
                >
                  {{ itemMenu.Title }}
                </a>
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
