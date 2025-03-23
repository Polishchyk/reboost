<script setup>
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import Breadcrumbs from "~/components/sections/Breadcrumbs.vue";
import SeoHead from '~/components/SeoHead.vue';
import { useAsyncData } from '#imports'
import InfoText from '~/components/sections/InfoText.vue'
import FAQ from '~/components/sections/FAQ.vue'

const config = useRuntimeConfig();
const { locale, defaultLocale, t } = useI18n();

const route = useRoute();

const slug = route.params.gadget;

const { data: SellPageData } = await useAsyncData(
    `sell-${locale.value}-${slug}`,
    () =>
        $fetch(`${config.public.apiBase}/sells/${slug}`, {
          params: { pLevel: 3, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true }
);

const { data: globalDataSellPage } = await useAsyncData(`globalData-${locale.value}-sell-page`, () =>
        $fetch(`${config.public.apiBase}/global`, {
          params: { pLevel: 4, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true }
);

const contactFields = computed(() => SellPageData.value?.data?.contact_form_fields || []);

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
  <div v-if="SellPageData?.data">
    <SeoHead :seo="SellPageData?.data?.SEO" />

    <div class="breadcrumbs bg2">
      <div class="wrap">
        <div class="nav">
          <nuxt-link :to="locale !== defaultLocale ? `/${locale}` : '/'">Home</nuxt-link>
          <span>{{SellPageData?.data?.Title}}</span>
        </div>
      </div>
    </div>

    <div class="sect-blog">
      <div class="wrap">
        <div class="content">
          <h1>{{SellPageData?.data?.Title}}</h1>
        </div>
      </div>
    </div>

    <div class="sect-blog-content sell">
      <div class="wrap">
        <div class="blog-content">
          <div class="item">
            <div v-html="SellPageData?.data?.Description" class="item-description"></div>
            <div class="sell-grid" v-if="SellPageData?.data?.payments && SellPageData?.data?.payments.length > 0">
              <div class="sell-grid-item" v-for="peyment in SellPageData?.data?.payments">
                <div v-if="peyment.Icon" class="icon">
                  <img :src="config.public.publicUrl+peyment?.Icon?.url"
                       :alt="peyment?.Icon?.alternativeText"
                  >
                </div>
                <div class="title">{{peyment?.Title}}</div>
                <div class="description">{{peyment?.Description}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sect-support">
      <div class="wrap">
        <div class="content">
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

    <FAQ :data="SellPageData?.data?.FAQ" />
  </div>

</template>

<style>
.sell .item-description figure img{
  width: auto!important;
  max-width: 100%;
  margin: 0 auto;
  margin-bottom: 30px;

}
.sell ol{
  margin-top: 32px;
  margin-bottom: 32px;
  counter-reset: li;
}
.sell li{
  position: relative;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  min-height: 50px;
  display: flex;
  align-items: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.sell ol li:before{
  content: counter(li) ".";
  counter-increment: li;
  font-weight: 500;
  line-height: 1;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: font-size 0.5s;
}
.sell-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Відступи між елементами */
}

.sell-grid-item {
  width: calc(50% - 10px); /* 50% ширини мінус половина gap */
  padding: 20px;
  text-align: center;
}
.sell-grid-item .title {
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  margin-top: 20px;
}
.sell-grid-item .description{
  margin-top: 20px;
}
.sell-grid-item .icon{
  display: flex;
  justify-content: center;
}
.sell-grid-item img{
    max-width: 100px;
}
@media (max-width: 600px) {
    .sell-grid-item {
      width: 100%;
    }
}
</style>