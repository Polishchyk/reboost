<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "FAQ"
})
</script>

<script setup>
import { onMounted, onBeforeUnmount, nextTick } from 'vue';

const props = defineProps({
  data: Object,
});

const faqLayoutAdjust = () => {
  const questions = document.querySelector('.sect-faq .questions');
  const answers = document.querySelectorAll('.sect-faq .answer');

  if (questions) {
    questions.classList.remove('ready');
  }

  answers.forEach(answer => {
    answer.style.marginTop = `-${answer.offsetHeight}px`;
  });

  setTimeout(() => {
    if (questions) {
      questions.classList.add('ready');
    }
  }, 10);
};

const handleResize = () => {
  faqLayoutAdjust();
};

const toggleFAQ = (index) => {
  props.data.FAQItems.forEach((faq, i) => {
    faq.active = i === index ? !faq.active : false;
  });
};

onMounted(() => {
  nextTick(() => {
    faqLayoutAdjust();
    window.addEventListener('resize', handleResize);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="sect-faq">
    <div class="wrap">
      <div class="head-wrap">
        <h2>{{ data.Title }}</h2>
        <div class="sub">{{ data.Description }}</div>
      </div>
      <template v-if="data.FAQItems.length > 0">
        <div class="questions">
          <div
              class="item"
              v-for="(question, index) in data.FAQItems"
              :key="index"
              :class="{ active: question.active }"
          >
            <div class="question" @click="toggleFAQ(index)">{{ question.Question }}<i></i></div>
            <div class="answer-wrap">
              <div class="answer">
                <p>{{ question.Answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>