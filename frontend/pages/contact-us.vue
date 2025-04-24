<script setup>
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import Breadcrumbs from "~/components/sections/Breadcrumbs.vue";
import SeoHead from '~/components/SeoHead.vue';
import RepairCenters from '~/components/sections/RepairCenters.vue'
import { useAsyncData } from '#imports'
import InfoText from '~/components/sections/InfoText.vue'

const config = useRuntimeConfig();
const { locale, t } = useI18n();

// Функція для нормалізації назв полів, використовується для формування ключів
const normalizeFieldName = (title) => title.replace(/\s+/g, '_').toLowerCase();

// Завантажуємо дані форми для локалізованої та англійської версій
const { data: localizedContactUsPageData } = await useAsyncData(
  `it-support-${locale.value}`,
  () =>
    $fetch(`${config.public.apiBase}/contact-us`, {
      params: { pLevel: 3, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
    }),
  { watch: [locale], server: true }
);

const { data: englishContactUsPageData } = await useAsyncData(
  `it-support-en`, // Завантажуємо англійську версію
  () =>
    $fetch(`${config.public.apiBase}/contact-us`, {
      params: { pLevel: 3, locale: "en" }, // жорстко задаємо "en"
    }),
  { watch: [locale], server: true }
);

const { data: globalDataDevicePage } = await useAsyncData(`globalData-${locale.value}-contact-us-page`, () =>
  $fetch(`${config.public.apiBase}/global`, {
    params: { pLevel: 4, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
  }),
  { watch: [locale], server: true }
);

// Формуємо поля форми, базуючись на англійських ключах
const localizedContactFields = computed(() => localizedContactUsPageData.value?.data?.contact_form_fields || []);
const englishContactFields = computed(() => englishContactUsPageData.value?.data?.contact_form_fields || []);

// Генеруємо масив зі зв’язком між локалізованими назвами (для інтерфейсу) та нормалізованими ключами (з англійської версії)
const contactFields = computed(() => {
  return englishContactFields.value.map((englishField, index) => ({
    key: normalizeFieldName(englishField.Title), // Формуємо ключ на основі англійської назви через normalizeFieldName
    label: localizedContactFields.value[index]?.Title || englishField.Title, // Локалізована назва для інтерфейсу
    type: englishField.Type, // Тип поля (email, textarea тощо)
  }));
});

// Схема валідації, побудована на основі нормалізованих англійських ключів
const validationSchema = computed(() => {
  return yup.object(
    Object.fromEntries(
      contactFields.value.map(field => [
        field.key, // Використовуємо нормалізований ключ
        field.type === 'email'
          ? yup.string().email(t('validation.email')).required(t('validation.required'))
          : field.type === 'number'
            ? yup.number().typeError(t('validation.number')).required(t('validation.required'))
            : yup.string().required(t('validation.required'))
      ])
    )
  );
});

const { handleSubmit, errors, defineField } = useForm({ validationSchema });

const fields = computed(() => {
  return Object.fromEntries(
    contactFields.value.map(field => [
      field.key, // Використовуємо нормалізований англійський ключ
      defineField(field.key)
    ])
  );
});

const successMessage = ref('');
const isSubmitting = ref(false);
const backendErrors = ref({});

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  backendErrors.value = {};

  try {
    await $fetch(`${config.public.apiBase}/contacts`, {
      method: 'POST',
      body: {
        data: {
          ...values,
          phone_number: String(values.phone_number),
        }
      }
    });

    successMessage.value = 'Form submitted successfully!';
  } catch (error) {
    console.error('Submission error:', error);
    if (error?.data?.error?.details?.errors) {
      error.data.error.details.errors.forEach((err) => {
        const fieldName = err.path[0];
        backendErrors.value[fieldName] = t(`validation.${fieldName}`) || err.message;
      });
    }
  }

  isSubmitting.value = false;
});
</script>

<template>
  <div v-if="localizedContactUsPageData?.data">
    <SeoHead :seo="localizedContactUsPageData?.data?.SEO" />
    <Breadcrumbs :currentPageTitle="localizedContactUsPageData?.data?.title" class="bg2" />

    <div class="sect-support">
      <div class="wrap">
        <div class="content">
          <h1>{{ localizedContactUsPageData?.data?.title }}</h1>
          <div class="sub" v-html="localizedContactUsPageData?.data?.Description"></div>

          <form @submit.prevent="onSubmit" class="mt-6 space-y-4">
            <div v-for="field in contactFields" :key="field.key">
              <label class="label">{{ field.label }}</label>
              <input v-if="field.type !== 'textarea'"
                     :type="field.type"
                     v-model="fields[field.key][0].value"
                     class="w-full p-2 border rounded-md" />
              <textarea v-else
                        v-model="fields[field.key][0].value"
                        class="w-full p-2 border rounded-md"></textarea>
              <p class="text-red-500 text-sm">{{ errors[field.key] || backendErrors[field.key] }}</p>
            </div>

            <button type="submit" class="w-full but colored" :disabled="isSubmitting">
              Submit
            </button>
            <p v-if="successMessage" class="text-green-500 text-sm mt-2">{{ successMessage }}</p>
          </form>
        </div>
      </div>
    </div>

    <RepairCenters :data="globalDataDevicePage?.data?.our_repair_centers" />
    <InfoText :data="localizedContactUsPageData?.data?.InfoText" />
  </div>
</template>

<style scoped>
input{
  height: 52px;
}
label.label {
  display: flex;
  padding-left: 8px;
}
</style>