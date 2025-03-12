<script setup>
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import Breadcrumbs from "~/components/sections/Breadcrumbs.vue";
import SeoHead from '~/components/SeoHead.vue';
import { useAsyncData } from '#imports'
import InfoText from '~/components/sections/InfoText.vue'

const config = useRuntimeConfig();
const { locale } = useI18n();

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
                ? yup.string().email('Invalid email').required('This field is required')
                : field.Type === 'number'
                    ? yup.number().typeError('Must be a number').required('This field is required')
                    : yup.string().required('This field is required')
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
        backendErrors.value[fieldName] = err.message;
      });
    }
  }

  isSubmitting.value = false;
});
</script>

<template>

</template>