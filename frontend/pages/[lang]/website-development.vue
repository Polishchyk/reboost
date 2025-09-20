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

const {data: WebsiteDevelopment} = await useAsyncData(
    `website-development-page-data-${locale.value}`,
    () =>
        $fetch(`${config.public.apiBase}/website-development`, {
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
  <div v-if="WebsiteDevelopment?.data">
    <SeoHead :seo="WebsiteDevelopment?.data?.SEO"/>
    <Breadcrumbs :currentPageTitle="WebsiteDevelopment?.data?.title" class="bg2"/>

    <div id="sect-promo" class="sect-support">
      <div class="wrap">
        <div class="content">
          <h1>{{ WebsiteDevelopment?.data?.title }}</h1>
          <div class="sub sub-full">
            <p v-html="WebsiteDevelopment?.data?.Description?.replaceAll('\n\n', '<br><br>').replaceAll('\n', '<br>') ?? ''"></p>
          </div>
        </div>
      </div>
    </div>

    <section id="from">
      <div class="wrap">
        <div class="inn">
          <div class="data flex">
            <div class="text">
              <h2>{{ WebsiteDevelopment?.data?.From?.title }}</h2>
              <h3>{{ WebsiteDevelopment?.data?.From?.Subtitle }}</h3>
              <div v-html="WebsiteDevelopment?.data?.From?.Description"></div>
            </div>
            <div class="image">
              <img :src="config.public.publicUrl + WebsiteDevelopment?.data?.From?.Image?.url" :alt="WebsiteDevelopment?.data?.From?.Image?.alternativeText"/>
            </div>
          </div>
          <div class="what">
            <h3>{{ WebsiteDevelopment?.data?.From?.WhatTitle }}</h3>
            <div class="flex" v-html="WebsiteDevelopment?.data?.From?.WhatDescription"></div>
          </div>
          <div class="technologies" v-if="WebsiteDevelopment?.data?.From?.Technologies && WebsiteDevelopment?.data?.From?.Technologies.length > 0">
            <h3>{{ WebsiteDevelopment?.data?.From?.TechnologiesTitle }}</h3>
            <div class="flex">
              <span v-for="technology in WebsiteDevelopment?.data?.From?.Technologies">{{ technology.title }}</span>
            </div>
          </div>

          <nuxt-link :to="WebsiteDevelopment?.data?.From?.button?.Url" class="but colored">{{ WebsiteDevelopment?.data?.From?.button?.Title }}</nuxt-link>
        </div>
      </div>
    </section>

    <section id="manage">
      <div class="wrap">
        <h2>{{ WebsiteDevelopment?.data?.Manage?.title }}</h2>
        <div class="flex" v-if="WebsiteDevelopment?.data?.Manage?.Images && WebsiteDevelopment?.data?.Manage?.Images.length > 0">
          <template v-for="image in WebsiteDevelopment?.data?.Manage?.Images">
            <img :src="config.public.publicUrl + image.url" :alt="image.alternativeText"/>
          </template>
        </div>
      </div>
    </section>

    <section id="intergrations">
      <div class="wrap">
        <div class="inn">
          <h2>{{ WebsiteDevelopment?.data?.Intergrations?.title }}</h2>
          <div class="flex" v-html="WebsiteDevelopment?.data?.Intergrations?.Description"></div>

          <div class="items grid" v-if="WebsiteDevelopment?.data?.IntergrationsItems && WebsiteDevelopment?.data?.IntergrationsItems.length > 0">
            <div class="item" v-for="(intergrationsItem, index) in WebsiteDevelopment?.data?.IntergrationsItems" :key="intergrationsItem.id">
              <span>{{ (index + 1).toString().padStart(2, '0') }}</span>
              <div class="title">{{ intergrationsItem.title }}</div>
              <p>{{ intergrationsItem.Description }}</p>
            </div>
          </div>

          <div class="technologies flex" v-if="WebsiteDevelopment?.data?.Intergrations?.Images && WebsiteDevelopment?.data?.Intergrations?.Images.length > 0">
            <template v-for="technology_image in WebsiteDevelopment?.data?.Intergrations?.Images">
              <img :src="config.public.publicUrl + technology_image.url" :alt="technology_image.alternativeText"/>
            </template>
          </div>
        </div>
      </div>
    </section>

    <section id="oneweb">
      <div class="wrap">
        <div class="inn flex">
          <img :src="config.public.publicUrl + WebsiteDevelopment?.data?.Oneweb?.Image.url" :alt="WebsiteDevelopment?.data?.Oneweb?.Image.alternativeText"/>
          <div class="text">
            <h2>{{ WebsiteDevelopment?.data?.Oneweb?.title }}</h2>
            <div v-html="WebsiteDevelopment?.data?.Oneweb?.Description"></div>
          </div>
        </div>
      </div>
    </section>

    <div class="sect-support">
      <div class="wrap">
        <div class="content">
          <h2>{{ WebsiteDevelopment?.data?.SoWhatTitle }}</h2>

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
            <p v-if="successMessage" class="text-green-500 text-xl mt-2">{{ successMessage }}</p>
          </form>
        </div>
      </div>
    </div>

    <InfoText :data="WebsiteDevelopment?.data?.InfoText"/>
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