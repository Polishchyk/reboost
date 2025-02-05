<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Solutions"
})
</script>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

defineProps({
  data: Object,
});

const imageRef = ref(null);
const partsRef = ref(null);

const handleScroll = () => {
  if (!imageRef.value) return;

  const image = imageRef.value;
  const windowHeight = window.innerHeight;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const imageOffsetTop = image.offsetTop;
  const imageHeight = image.offsetHeight;

  if (
      scrollTop + windowHeight > imageOffsetTop + imageHeight / 2 &&
      scrollTop < imageOffsetTop + imageHeight
  ) {
    image.classList.add('animation-start');

    nextTick(() => {
      setTimeout(saveScrollTransforms, 100);
    });
  }
};

const saveScrollTransforms = () => {
  if (!partsRef.value) return;
  const figures = partsRef.value.querySelectorAll('.figure');

  figures.forEach((figure) => {
    const computedStyle = window.getComputedStyle(figure);
    figure.dataset.scrollTransform = computedStyle.transform !== 'none' ? computedStyle.transform : '';
  });
};

const handleMouseMove = (event) => {
  if (!partsRef.value) return;

  const { clientX, clientY } = event;
  const { width, height, left, top } = partsRef.value.getBoundingClientRect();

  const x = (clientX - left - width / 2) / (width / 2);
  const y = (clientY - top - height / 2) / (height / 2);

  const figures = partsRef.value.querySelectorAll('.figure');

  figures.forEach((figure, index) => {
    const depth = 5.18 + index * 2.59;
    const rotateX = y * depth * 1.0368;
    const rotateY = x * depth * 1.0368;
    const translateZ = depth * 2.0736;

    const baseTransform = figure.dataset.scrollTransform || '';

    figure.style.transform = `${baseTransform} rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
  });
};

const handleMouseLeave = () => {
  if (!partsRef.value) return;

  const figures = partsRef.value.querySelectorAll('.figure');

  figures.forEach((figure) => {
    figure.style.transform = figure.dataset.scrollTransform || '';
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  nextTick(() => {
    setTimeout(saveScrollTransforms, 200);
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="sect-solutions">
    <div class="wrap">
      <h2 v-html="data.Title"></h2>
      <div class="sub" v-html="data.Description"></div>
      <div class="row">
        <template v-if="data.SolutionItems.length > 0">
          <div class="solutions">
            <div class="item" v-for="solution in data.SolutionItems" :key="solution.Title">
              <div class="title">{{ solution.Title }}</div>
              <div class="desc">{{ solution.Description }}</div>
            </div>
          </div>
        </template>
        <div
            class="image"
            ref="imageRef"
            @mousemove="handleMouseMove"
            @mouseleave="handleMouseLeave"
        >
          <div class="parts" ref="partsRef">
            <div class="figure case">
              <img src="/img/mobile-parts-1_1.png" alt="Mobile case">
            </div>
            <div class="figure slot">
              <img src="/img/mobile-parts-1_2.png" alt="Mobile slot">
            </div>
            <div class="figure innards1">
              <img src="/img/mobile-parts-2.png" alt="Mobile inner part 1">
            </div>
            <div class="figure innards2">
              <img src="/img/mobile-parts-3.png" alt="Mobile inner part 2">
            </div>
            <div class="figure screen">
              <img src="/img/mobile-parts-8.png" alt="Mobile screen">
            </div>
            <div class="figure glass">
              <img src="/img/mobile-parts-4.png" alt="Mobile glass">
            </div>
            <div class="figure camera-top">
              <img src="/img/mobile-parts-5.png" alt="Mobile camera top part">
            </div>
            <div class="figure camera-middle">
              <img src="/img/mobile-parts-6.png" alt="Mobile camera middle part">
            </div>
            <div class="figure camera-bottom">
              <img src="/img/mobile-parts-7.png" alt="Mobile camera bottom part">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
