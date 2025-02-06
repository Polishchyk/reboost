<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "cascade-selects"
});
</script>

<script setup>
import { useLanguage } from '@/composables/useLanguage';
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

defineProps({
  data: Object,
});

const router = useRouter();
const config = useRuntimeConfig();
const apiBase = config.public.apiBase;
const { currentLang } = useLanguage();

const { data: brandsData } = await useAsyncData(`brands-${currentLang.value}`, () =>
    $fetch(`${apiBase}/brands`, {
      params: {
        pLevel: 2,
        ...(currentLang.value !== "en" ? { locale: currentLang.value } : {})
      },
    })
);

const brands = ref([]);
if (brandsData.value?.data) {
  brands.value = brandsData.value.data.map(b => ({
    id: b.id,
    name: b.Name
  }));
}

const products = ref([]);
const devices = ref([]);
const selectedBrand = ref(null);
const selectedProduct = ref(null);
const selectedDevice = ref(null);

const fetchProducts = async () => {
  if (!selectedBrand.value) return;
  const response = await $fetch(`${apiBase}/products`, {
    params: {
      "filters[brand][id][$eq]": selectedBrand.value,
      pLevel: 2,
      ...(currentLang.value !== "en" ? { locale: currentLang.value } : {})
    },
  });

  products.value = response.data.map(p => ({
    id: p.id,
    name: p.Title
  }));

  selectedProduct.value = null;
  devices.value = [];
};

const fetchDevices = async () => {
  if (!selectedProduct.value) return;
  const response = await $fetch(`${apiBase}/devices`, {
    params: {
      "filters[product][id][$eq]": selectedProduct.value,
      pLevel: 2,
      ...(currentLang.value !== "en" ? { locale: currentLang.value } : {})
    },
  });

  devices.value = response.data.map(d => ({
    id: d.id,
    name: d.Title,
    slug: d.slug
  }));

  selectedDevice.value = null;
};

watch(selectedBrand, fetchProducts);
watch(selectedProduct, fetchDevices);

watch(selectedDevice, (device) => {
  if (device) {
    const selectedSlug = devices.value.find((d) => d.id === device)?.slug;
    if (selectedSlug) {
      router.push(`/device/${selectedSlug}`);
    }
  }
});
</script>

<template>
  <form>
    <div class="select-1">
      <select v-model="selectedBrand">
        <option disabled :value="null">{{data.SelectBrandPlaceholder}}</option>
        <option v-for="brand in brands" :key="brand.id" :value="brand.id">
          {{ brand.name }}
        </option>
      </select>
    </div>

    <div class="select-2" v-if="products.length">
      <select v-model="selectedProduct">
        <option disabled :value="null">{{data.SelectProductPlaceholder}}</option>
        <option v-for="product in products" :key="product.id" :value="product.id">
          {{ product.name }}
        </option>
      </select>
    </div>

    <div class="select-3" v-if="devices.length">
      <select v-model="selectedDevice">
        <option disabled :value="null">{{data.SelectDevicePlaceholder}}</option>
        <option v-for="device in devices" :key="device.id" :value="device.id">
          {{ device.name }}
        </option>
      </select>
    </div>
  </form>
</template>

<style scoped>
</style>
