<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import Breadcrumbs from '~/components/sections/Breadcrumbs.vue'
import SeoHead from '~/components/SeoHead.vue'
import { useAsyncData } from '#imports'
import InfoText from '~/components/sections/InfoText.vue'

const config = useRuntimeConfig()
const {locale, t} = useI18n()

// Функція для нормалізації назв полів, використовується для формування ключів
const normalizeFieldName = (title) => title.replace(/\s+/g, '_').toLowerCase()

// Завантажуємо дані форми для локалізованої та англійської версій
const {data: localizedContactUsPageData} = await useAsyncData(
    `it-support-${locale.value}`,
    () =>
        $fetch(`${config.public.apiBase}/contact-us`, {
          params: {pLevel: 3, ...(locale.value !== 'it' ? {locale: locale.value} : {})},
        }),
    {watch: [locale], server: true}
)

const {data: englishContactUsPageData} = await useAsyncData(
    `it-support-en`, // Завантажуємо англійську версію
    () =>
        $fetch(`${config.public.apiBase}/contact-us`, {
          params: {pLevel: 3, locale: 'en'}, // жорстко задаємо "en"
        }),
    {watch: [locale], server: true}
)

const {data: SeoPageData} = await useAsyncData(
    `seo-page-data-${locale.value}`,
    () =>
        $fetch(`${config.public.apiBase}/seo`, {
          params: {pLevel: 4, ...(locale.value !== 'it' ? {locale: locale.value} : {})},
        }),
    {watch: [locale], server: true}
)

// Формуємо поля форми, базуючись на англійських ключах
const localizedContactFields = computed(() => localizedContactUsPageData.value?.data?.contact_form_fields || [])
const englishContactFields = computed(() => englishContactUsPageData.value?.data?.contact_form_fields || [])

// Генеруємо масив зі зв’язком між локалізованими назвами (для інтерфейсу) та нормалізованими ключами (з англійської версії)
const contactFields = computed(() => {
  return englishContactFields.value.map((englishField, index) => ({
    key: normalizeFieldName(englishField.Title), // Формуємо ключ на основі англійської назви через normalizeFieldName
    label: localizedContactFields.value[index]?.Title || englishField.Title, // Локалізована назва для інтерфейсу
    type: englishField.Type, // Тип поля (email, textarea тощо)
  }))
})

// Схема валідації, побудована на основі нормалізованих англійських ключів
const validationSchema = computed(() => {
  return yup.object(
    Object.fromEntries(
      contactFields.value.map(field => [
        field.key,
        field.type === 'email'
          ? yup.string()
              .email(t('validation.email'))
              .required(t('validation.required'))
          : field.type === 'number'
            ? yup.number()
                .typeError(t('validation.number'))
                .nullable()       // дозволяє null
                .notRequired()    // робить поле необов'язковим
            : yup.string()
                .required(t('validation.required'))
      ])
    )
  )
})

const {handleSubmit, errors, defineField} = useForm({validationSchema})

const fields = computed(() => {
  return Object.fromEntries(
      contactFields.value.map(field => [
        field.key, // Використовуємо нормалізований англійський ключ
        defineField(field.key)
      ])
  )
})

const successMessage = ref('')
const isSubmitting = ref(false)
const backendErrors = ref({})

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true
  backendErrors.value = {}

  try {
    await $fetch(`${config.public.apiBase}/contacts`, {
      method: 'POST',
      body: {
        data: {
          ...values,
          phone_number: String(values.phone_number),
        }
      }
    })

    successMessage.value = 'Form submitted successfully!'
  } catch (error) {
    console.error('Submission error:', error)
    if (error?.data?.error?.details?.errors) {
      error.data.error.details.errors.forEach((err) => {
        const fieldName = err.path[0]
        backendErrors.value[fieldName] = t(`validation.${fieldName}`) || err.message
      })
    }
  }

  isSubmitting.value = false
})
</script>

<template>
  <div v-if="SeoPageData?.data">
    <SeoHead :seo="SeoPageData?.data?.SEO"/>
    <Breadcrumbs :currentPageTitle="SeoPageData?.data?.title" class="bg2"/>

    <div id="sect-promo" class="sect-support">
      <div class="wrap">
        <div class="content">
          <h1>{{ SeoPageData?.data?.title }}</h1>
          <div class="sub">
            <p v-html="SeoPageData?.data?.Description?.replaceAll('\n\n', '<br><br>').replaceAll('\n', '<br>') ?? ''"></p>
          </div>
        </div>
      </div>
    </div>

    <section id="seo__services">
      <div class="wrap">
        <div class="inn flex">
          <div class="text">
            <h2>{{ SeoPageData?.data?.SEOServices?.title }}</h2>
            <p v-html="SeoPageData?.data?.SEOServices?.Description?.replaceAll('\n\n', '<br><br>').replaceAll('\n', '<br>') ?? ''"></p>
            <nuxt-link :to="SeoPageData?.data?.SEOServices?.button?.Url" class="but colored">{{ SeoPageData?.data?.SEOServices?.button?.Title }}</nuxt-link>
          </div>
          <div class="image">
            <img :src="config.public.publicUrl + SeoPageData?.data?.SEOServices?.Image?.url" :alt="SeoPageData?.data?.SEOServices?.Image?.alternativeText"/>
          </div>
        </div>
      </div>
    </section>

    <section id="services">
      <div class="wrap">
        <div class="items" v-if="SeoPageData?.data?.Services && SeoPageData?.data?.Services.length > 0">
          <div class="item flex" v-for="service_item in SeoPageData?.data?.Services">
            <div class="image">
              <img :src="config.public.publicUrl + service_item.Image?.url" :alt="service_item.Image?.alternativeText">
            </div>
            <div class="text">
              <h2>{{service_item.title}}</h2>
              <p v-html="service_item.Description?.replaceAll('\n\n', '<br><br>').replaceAll('\n', '<br>') ?? ''"></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="generative">
      <div class="wrap">
        <div class="content">
          <h2>{{ SeoPageData?.data?.Generative?.title }}</h2>
          <div class="text">
            <p v-html="SeoPageData?.data?.Generative?.Description?.replaceAll('\n\n', '<br><br>').replaceAll('\n', '<br>') ?? ''"></p>
          </div>
          <nuxt-link :to="SeoPageData?.data?.Generative?.button?.Url" class="but colored">{{ SeoPageData?.data?.Generative?.button?.Title }}</nuxt-link>
        </div>
      </div>
    </section>

    <section id="reporting">
      <div class="wrap">
        <div class="top flex">
          <div class="text">
            <h2>{{ SeoPageData?.data?.Reporting?.title }}</h2>
            <p v-html="SeoPageData?.data?.Reporting?.Description?.replaceAll('\n\n', '<br><br>').replaceAll('\n', '<br>') ?? ''"></p>
          </div>
          <img :src="config.public.publicUrl + SeoPageData?.data?.Reporting?.Image?.url" :alt="SeoPageData?.data?.Reporting?.Image?.alternativeText">
        </div>
        <div class="items grid" v-if="SeoPageData?.data?.Reporting?.Items && SeoPageData?.data?.Reporting?.Items.length > 0">
          <div class="item" v-for="reporting_item in SeoPageData?.data?.Reporting?.Items">
            <div class="title">{{reporting_item.title}}</div>
            <p v-html="reporting_item?.Description?.replaceAll('\n\n', '<br><br>').replaceAll('\n', '<br>') ?? ''"></p>
          </div>
        </div>
      </div>
    </section>

    <div class="sect-support" id="sect-support">
      <div class="wrap">
        <div class="content">
          <h2>{{ SeoPageData?.data?.SoWhat?.title }}</h2>

          <form @submit.prevent="onSubmit" class="mt-6 space-y-4">
            <div v-for="field in contactFields" :key="field.key">
              <label class="label">{{ field.label }}</label>
              <input v-if="field.type !== 'textarea'"
                     :type="field.type"
                     v-model="fields[field.key][0].value"
                     class="w-full p-2 border rounded-md"/>
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

    <InfoText :data="SeoPageData?.data?.InfoText"/>
  </div>
</template>

<style scoped>
input {
  height: 52px;
}

label.label {
  display: flex;
  padding-left: 8px;
}
</style>