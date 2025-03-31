<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "DevicesList"
})
</script>
<script setup>
import { onMounted } from 'vue';

defineProps({
  data: Object,
});

const { locale } = useI18n();
const config = useRuntimeConfig();

const getDeviceUrl = (url) => {
  if (locale.value !== 'it') {
    return `/${locale.value}${url}`;
  }
  return url;
};

onMounted(() => {
  const applyHoverStyles = () => {
    const items = document.querySelectorAll('.sect-devices-list .devices .item a');

    items.forEach((item) => {
      const svg = item.querySelector('.icon svg');
      if (!svg) return;

      const paths = svg.querySelectorAll('path');
      const circles = svg.querySelectorAll('circle');
      const rects = svg.querySelectorAll('rect');

      const createGradient = () => {
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'hover-gradient');
        gradient.setAttribute('x1', '1.78565');
        gradient.setAttribute('y1', '22.9211');
        gradient.setAttribute('x2', '75.368');
        gradient.setAttribute('y2', '58.3399');
        gradient.setAttribute('gradientUnits', 'userSpaceOnUse');

        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', '#017CFF');

        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', '#3EC1FF');

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);

        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.appendChild(gradient);

        return defs;
      };

      const applyGradient = () => 'url(#hover-gradient)';
      const applyDefault = () => '#142835';

      item.addEventListener('mouseover', () => {
        const defs = createGradient();
        svg.appendChild(defs);

        if (svg.id === 'iphone-icon') {
          if (rects[0]) rects[0].style.stroke = applyGradient();
          if (rects[1]) rects[1].style.fill = applyGradient();
          if (circles[0]) circles[0].style.fill = applyGradient();
        } else if (svg.id === 'macbook-icon') {
          if (paths[1]) {
            paths[1].style.fill = applyGradient();
            paths[1].style.stroke = 'none';
          }
          if (paths[0]) paths[0].style.stroke = applyGradient();
        } else {
          paths.forEach((path) => {
            path.style.stroke = applyGradient();
          });
          circles.forEach((circle) => {
            circle.style.fill = applyGradient();
          });
        }
      });

      item.addEventListener('mouseout', () => {
        const defs = svg.querySelector('defs');
        if (defs) {
          defs.remove();
        }

        if (svg.id === 'iphone-icon') {
          if (rects[0]) rects[0].style.stroke = applyDefault();
          if (rects[1]) rects[1].style.fill = applyDefault();
          if (circles[0]) circles[0].style.fill = applyDefault();
        } else if (svg.id === 'macbook-icon') {
          if (paths[1]) {
            paths[1].style.fill = applyDefault();
            paths[1].style.stroke = applyDefault();
          }
          if (paths[0]) paths[0].style.stroke = applyDefault();
        } else {
          paths.forEach((path) => {
            path.style.stroke = applyDefault();
          });
          circles.forEach((circle) => {
            circle.style.fill = applyDefault();
          });
        }
      });
    });
  };

  applyHoverStyles();
});
</script>

<template>
  <div class="sect-devices-list">
    <div class="wrap">
      <h2>{{ data.Title }}</h2>
      <template v-if="data.DevicesListItems.length > 0">
        <div class="devices">
          <div class="item" v-for="device in data.DevicesListItems">
            <nuxt-link :to="getDeviceUrl(device.Url)">
              <div class="icon" v-html="device.SvgImage"></div>
              <div class="name">{{ device.Title }}</div>
            </nuxt-link>
          </div>
        </div>
      </template>
      <template v-if="data.BrandsItems[0].Image.length > 0">
        <div class="brands">
          <div class="item" v-for="brand in data.BrandsItems[0].Image">
            <img :src="config.public.publicUrl + brand.url" :alt="brand.alternativeText ?? ''" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>