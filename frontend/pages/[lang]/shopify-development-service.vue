<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import Breadcrumbs from '~/components/sections/Breadcrumbs.vue'
import SeoHead from '~/components/SeoHead.vue'
import { useAsyncData } from '#imports'
import InfoText from '~/components/sections/InfoText.vue'
import FAQ from '~/components/sections/FAQ.vue'
import HeroSlider from '~/components/elements/HeroSlider.vue'

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

const {data: SDSPageData} = await useAsyncData(
    `sds-page-data-${locale.value}`,
    () =>
        $fetch(`${config.public.apiBase}/shopify-development-service`, {
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
  <div v-if="SDSPageData?.data">
    <SeoHead :seo="SDSPageData?.data?.SEO"/>
    <Breadcrumbs :currentPageTitle="SDSPageData?.data?.title" class="bg2"/>

    <div id="sect-promo" class="sect-support">
      <div class="wrap">
        <div class="data flex">
          <div class="content">
            <h1>{{ SDSPageData?.data?.title }}</h1>
            <div class="sub sub-full">
              <p v-html="SDSPageData?.data?.Description?.replaceAll('\n\n', '<br><br>').replaceAll('\n', '<br>') ?? ''"></p>
            </div>
            <div class="counts flex" v-if="SDSPageData?.data?.counts && SDSPageData?.data?.counts.length > 0">
              <div class="item" v-for="count in SDSPageData?.data?.counts">
                <span>{{ count.title }}</span>
                <p v-html="count.Description?.replaceAll('\n\n', '<br><br>').replaceAll('\n', '<br>') ?? ''"></p>
              </div>
            </div>
          </div>
          <div class="image">
            <img :src="config.public.publicUrl + SDSPageData?.data?.Image?.url" :alt="SDSPageData?.data?.Image?.alternativeText"/>
          </div>
        </div>
      </div>
    </div>

    <section id="insist">
      <div class="wrap wrap-small">
        <h2>{{ SDSPageData?.data?.insist?.title }}</h2>
        <div class="items grid" v-if="SDSPageData?.data?.insist?.items && SDSPageData?.data?.insist?.items.length > 0">
          <div class="item" v-for="item in SDSPageData?.data?.insist?.items">
            <div class="icon">
              <img :src="config.public.publicUrl + item?.Image?.url" :alt="item?.Image?.alternativeText"/>
            </div>
            <div class="title">{{ item?.title }}</div>
            <p>{{ item?.Description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="oneweb" class="taking">
      <div class="wrap">
        <div class="inn flex">
          <div class="text">
            <h2>{{ SDSPageData?.data?.oneweb?.title }}</h2>
            <div v-html="SDSPageData?.data?.oneweb?.Description"></div>
            <nuxt-link :to="SDSPageData?.data?.oneweb?.button?.Url" class="but colored">{{ SDSPageData?.data?.oneweb?.button?.Title }}</nuxt-link>
          </div>
          <img :src="config.public.publicUrl + SDSPageData?.data?.oneweb?.Image?.url" :alt="SDSPageData?.data?.oneweb?.Image?.alternativeText"/>
        </div>
      </div>
    </section>

    <section id="insist" class="blue">
      <div class="wrap wrap-small">
        <h2>{{ SDSPageData?.data?.OurWide?.title }}</h2>
        <div class="note">{{ SDSPageData?.data?.OurWide?.Description }}</div>
        <div class="items grid" v-if="SDSPageData?.data?.OurWide?.Items && SDSPageData?.data?.OurWide?.Items.length > 0">
          <div class="item" v-for="OurWideItem in SDSPageData?.data?.OurWide?.Items">
            <div class="icon">
              <img :src="config.public.publicUrl + OurWideItem?.Image?.url" :alt="OurWideItem?.Image?.alternativeText"/>
            </div>
            <div class="title">{{ OurWideItem?.title }}</div>
            <p>{{ OurWideItem?.Description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="we__work">
      <div class="wrap wrap-small">
        <h2>{{ SDSPageData?.data?.we_work?.title }}</h2>
        <div class="items grid" v-if="SDSPageData?.data?.we_work?.Steps && SDSPageData?.data?.we_work?.Steps.length > 0">
          <div class="item" v-for="step in SDSPageData?.data?.we_work?.Steps">
            <span>{{ step.step }}</span>
            <div class="title">{{ step.title }}</div>
            <p>{{ step.Description }}</p>
          </div>
        </div>
        <nuxt-link :to="SDSPageData?.data?.we_work?.button?.Url" class="but colored">{{ SDSPageData?.data?.we_work?.button?.Title }}</nuxt-link>
      </div>
    </section>

    <section id="works">
      <div class="wrap wrap-small">
        <h2>Our Work</h2>
        <template v-if="SDSPageData?.data?.works?.Images && SDSPageData?.data?.works?.Images.length > 0">
          <HeroSlider :items="SDSPageData?.data?.works?.Images || []" />
        </template>
      </div>
    </section>

    <section id="choose">
      <div class="wrap wrap-small">
        <h2>{{ SDSPageData?.data?.choose?.title }}</h2>

        <div class="items flex" v-if="SDSPageData?.data?.choose?.choose_items && SDSPageData?.data?.choose?.choose_items.length > 0">
          <div class="item">
            <ul>
              <li v-for="(choose_item, i) in (SDSPageData?.data?.choose?.choose_items || []).slice(0, Math.ceil((SDSPageData?.data?.choose?.choose_items || []).length / 2))"
                  :key="`L-${choose_item.id ?? i}`"
              >{{ choose_item.title }}
              </li>
            </ul>
          </div>
          <div class="item">
            <ul>
              <li v-for="(choose_item, i) in (SDSPageData?.data?.choose?.choose_items || []).slice(Math.ceil((SDSPageData?.data?.choose?.choose_items || []).length / 2))"
                  :key="`R-${choose_item.id ?? i}`"
              >{{ choose_item.title }}
              </li>
            </ul>
          </div>
        </div>

        <nuxt-link :to="SDSPageData?.data?.choose?.button?.Url" class="but colored">{{ SDSPageData?.data?.choose?.button?.Title }}</nuxt-link>
      </div>
    </section>

    <FAQ :data="SDSPageData?.data?.FAQ"/>

    <div class="sect-support" id="sect-support">
      <div class="wrap">
        <div class="content">
          <h2>{{ SDSPageData?.data?.SoWhat?.title }}</h2>

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

    <InfoText :data="SDSPageData?.data?.InfoText"/>
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