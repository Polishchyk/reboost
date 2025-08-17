<script setup>
import { ref, watch, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const config = useRuntimeConfig()

const props = defineProps({
  items: { type: Array, default: () => [] },
})

const modules = [Navigation]
const prevEl = ref(null)
const nextEl = ref(null)
const swiperInst = ref(null)

// Після ініціалізації інстансу надійно підчіплюємо кастомні кнопки
const onSwiper = (swiper) => {
  swiperInst.value = swiper
  setupNav()
}

const setupNav = async () => {
  await nextTick()
  const s = swiperInst.value
  if (!s || !prevEl.value || !nextEl.value) return

  s.params.navigation = {
    ...(s.params.navigation || {}),
    enabled: true,
    prevEl: prevEl.value,
    nextEl: nextEl.value,
  }

  // Перезапускаємо навігацію, щоб точно підхопило елементи
  s.navigation?.destroy()
  s.navigation?.init()
  s.navigation?.update()
}

// Якщо слайди “доїхали” пізніше — оновимо Swiper
watch(() => props.items?.length, async () => {
  await nextTick()
  swiperInst.value?.update()
})

const srcFor = (it) => config.public.publicUrl + it?.formats?.medium?.url || config.public.publicUrl + it?.url
const altFor = (it, i) => it?.alternativeText || it?.name || `slide-${i + 1}`
</script>

<template>
  <ClientOnly>
    <div class="list__swiper slider-sw">
      <Swiper
          class="swiper__promo"
          :modules="modules"
          :loop="true"
          :auto-height="true"
          slides-per-view="auto"
          :space-between="32"
          :breakpoints="{ 320: { spaceBetween: 8 }, 1150: { spaceBetween: 32 } }"
          :navigation="false"
      @swiper="onSwiper"
      >
      <SwiperSlide
          v-for="(it, i) in (props.items || [])"
          :key="it?.id ?? i"
      >
        <img :src="srcFor(it)" :alt="altFor(it, i)" />
      </SwiperSlide>
      </Swiper>

      <!-- Твої кнопки навігації -->
      <div class="swiper-button-prev" ref="prevEl">
        <!-- SVG як у тебе -->
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_769_9945)">
            <circle cx="20" cy="20" r="20" fill="white"/>
            <path d="M18.36 26.36L24.73 20L18.36 13.64"
                  stroke="#142835" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs><clipPath id="clip0_769_9945"><rect width="40" height="40" fill="white"/></clipPath></defs>
        </svg>
      </div>

      <div class="swiper-button-next" ref="nextEl">
        <!-- SVG як у тебе (такий самий) -->
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_769_9945)">
            <circle cx="20" cy="20" r="20" fill="white"/>
            <path d="M18.36 26.36L24.73 20L18.36 13.64"
                  stroke="#142835" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs><clipPath id="clip0_769_9945"><rect width="40" height="40" fill="white"/></clipPath></defs>
        </svg>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
/* Базові стилі, щоб було видно контент */
.swiper__promo { width: 100%; }
.swiper-slide img { display: block; width: 100%; height: auto; }
</style>