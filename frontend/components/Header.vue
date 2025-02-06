<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: "Header"
});
</script>

<script setup>
import { useLanguage } from '@/composables/useLanguage';
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
const config = useRuntimeConfig();
const { currentLang, changeLanguage } = useLanguage();

// Для активування випадаючого меню
const dropdownActive = ref(false);
const toggleDropdown = () => {
  dropdownActive.value = !dropdownActive.value;
};

// Асинхронне отримання даних для хедера з сервером
const { data: headerData, refresh: refreshHeader } = useAsyncData('headerData', () =>
    $fetch(
        `${config.public.apiBase}/header`, {
          params: {
            pLevel: 3,
            ...(currentLang.value !== "en" ? { locale: currentLang.value } : {}),
          }
        }
    )
);

// Асинхронне отримання даних для головного меню
const { data: mainMenuData, refresh: refreshMainMenuData } = useAsyncData('mainMenuData', () =>
    $fetch(
        `${config.public.apiBase}/main-menu`, {
          params: {
            pLevel: 4,
            ...(currentLang.value !== "en" ? { locale: currentLang.value } : {}),
          }
        }
    )
);

// Перелік доступних мов
const availableLanguages = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "fr", label: "Français" },
];

// Переміщуємо асинхронне оновлення даних через спостереження за зміною мови
watch(currentLang, async () => {
  await headerData.refresh();
  await mainMenuData.refresh();
});

// Для керування станом меню
const menuActive = ref(false);
const scrollPos = ref(0);

// Функція для перемикання стану меню
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

// Закриття випадаючого меню при кліку поза його межами
const handleClickOutside = (event) => {
  if (!event.target.closest('.lang') && !event.target.classList.contains('selected')) {
    dropdownActive.value = false;
  }
};

// Додавання слухача подій при монтуванні компонента
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

// Видалення слухача подій при демонтажі компонента
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <header :class="{ 'menu-active': menuActive }">
    <div class="wrap">
      <div class="box">
        <div class="logo">
          <a href="index.html">
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
                        <a :href="childItem.Url" :target="childItem.Target">{{ childItem.Title }}</a>
                      </li>
                    </template>
                  </ul>
                </div>
              </template>
              <template v-else>
                <a :href="itemMenu.Url" :target="itemMenu.Target">{{ itemMenu.Title }}</a>
              </template>
            </li>
          </ul>
        </div>
        <div class="number">
          <a :href="'tel:' + headerData?.data?.Phone">{{ headerData?.data?.Phone }}</a>
        </div>
        <div class="lang">
          <div @click="toggleDropdown" class="selected">{{ currentLang.toUpperCase() }}</div>
          <div class="dropdown" :class="{ active: dropdownActive }">
            <ul>
              <li v-for="item in headerData?.data?.menu_section.Items" :key="item.id">
                <a href="#" @click.prevent="changeLanguage(item.Url)">{{ item.Title }}</a>
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
/* Додаткові стилі */
</style>