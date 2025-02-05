<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "InfoText"
})
</script>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

const props = defineProps({
  data: Object,
});

const textRef = ref(null);
const isOpened = ref(false);
const isShrinked = ref(false);
const windowWidth = ref(0);

const toggleText = () => {
  isOpened.value = !isOpened.value;
};

const textLayoutAdjust = () => {
  if (textRef.value) {
    const textHeight = textRef.value.scrollHeight;
    isShrinked.value = textHeight > 297;
  }
};

const handleResize = () => {
  const newWidth = window.innerWidth;
  if (newWidth !== windowWidth.value) {
    nextTick(textLayoutAdjust);
    windowWidth.value = newWidth;
  }
};

onMounted(() => {
  windowWidth.value = window.innerWidth;
  nextTick(textLayoutAdjust);
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="sect-info-text">
    <div class="wrap">
      <h2>{{ data.Title }}</h2>
      <div
          ref="textRef"
          class="text"
          :class="{ opened: isOpened, shrinked: isShrinked }"
      >
        <div class="text-wrap" v-html="data.Description"></div>
      </div>
      <div class="more">
        <a @click="toggleText" v-if="!isOpened">See more benefits</a>
        <a @click="toggleText" v-else>Hide</a>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>