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

const { data: ContactUsPageData } = await useAsyncData(
    `it-support-${locale.value}`,
    () =>
        $fetch(`${config.public.apiBase}/contact-us`, {
          params: { pLevel: 3, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true }
);

const { data: globalDataDevicePage } = await useAsyncData(`globalData-${locale.value}-contact-us-page`, () =>
        $fetch(`${config.public.apiBase}/global`, {
          params: { pLevel: 4, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true }
);

const contactFields = computed(() => ContactUsPageData.value?.data?.contact_form_fields || []);

const normalizeFieldName = (title) => title.replace(/\s+/g, '_').toLowerCase();

const validationSchema = computed(() => {
  return yup.object(
      Object.fromEntries(
          contactFields.value.map(field => [
            normalizeFieldName(field.Title),
            field.Type === 'email'
                ? yup.string().email(t('validation.email')).required(t('validation.required'))
                : field.Type === 'number'
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
        normalizeFieldName(field.Title),
        defineField(normalizeFieldName(field.Title))
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
  <div v-if="ContactUsPageData?.data">
    <SeoHead :seo="ContactUsPageData?.data?.SEO" />
    <Breadcrumbs :currentPageTitle="ContactUsPageData?.data?.title" class="bg2" />

    <div class="sect-support">
      <div class="wrap">
        <div class="content">
          <h1>{{ ContactUsPageData?.data?.title }}</h1>
          <div class="sub" v-html="ContactUsPageData?.data?.Description"></div>

          <form @submit.prevent="onSubmit" class="mt-6 space-y-4">
            <div v-for="field in contactFields" :key="field.id">
              <label class="label">{{ field.Title }}</label>
              <input v-if="field.Type !== 'textarea'"
                     :type="field.Type"
                     v-model="fields[normalizeFieldName(field.Title)][0].value"
                     class="w-full p-2 border rounded-md" />
              <textarea v-else
                        v-model="fields[normalizeFieldName(field.Title)][0].value"
                        class="w-full p-2 border rounded-md"></textarea>
              <p class="text-red-500 text-sm">{{ errors[normalizeFieldName(field.Title)] || backendErrors[normalizeFieldName(field.Title)] }}</p>
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
    <InfoText :data="ContactUsPageData?.data?.InfoText" />
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