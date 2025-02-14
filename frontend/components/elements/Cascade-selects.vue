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
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';

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
        ...(currentLang.value !== "it" ? { locale: currentLang.value } : {})
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
      ...(currentLang.value !== "it" ? { locale: currentLang.value } : {})
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
      ...(currentLang.value !== "it" ? { locale: currentLang.value } : {})
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
  <form class="space-y-4 max-w-md mx-auto" style="margin-top: 8px">
    <!-- Вибір бренду -->
    <div class="select-1">
      <Listbox v-model="selectedBrand" as="div" class="relative">
        <ListboxButton class="select_btn w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:outline-none inline-flex">
          {{ selectedBrand ? brands.find(b => b.id === selectedBrand)?.name : data.SelectBrandPlaceholder }}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="-mr-1 ml-auto h-5 w-5">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"></path>
          </svg>
        </ListboxButton>
        <ListboxOptions class="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <ListboxOption :value="null" class="px-4 py-2 cursor-pointer hover:bg-gray-100">
            <span>{{ data.SelectBrandPlaceholder }}</span>
          </ListboxOption>
          <ListboxOption v-for="brand in brands" :key="brand.id" :value="brand.id" class="px-4 py-2 cursor-pointer hover:bg-gray-100" v-slot="{ active, selected }">
            <span>
              {{ brand.name }}
              <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
              >
                </span>
            </span>
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>

    <!-- Вибір продукту -->
    <div class="select-2" v-if="products.length">
      <Listbox v-model="selectedProduct" as="div" class="relative">
        <ListboxButton class="select_btn w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:outline-none inline-flex">
          {{ selectedProduct ? products.find(p => p.id === selectedProduct)?.name : data.SelectProductPlaceholder }}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="-mr-1 ml-auto h-5 w-5">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"></path>
          </svg>
        </ListboxButton>
        <ListboxOptions class="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <ListboxOption :value="null" class="px-4 py-2 cursor-pointer hover:bg-gray-100">
            <span>{{ data.SelectProductPlaceholder }}</span>
          </ListboxOption>
          <ListboxOption v-for="product in products" :key="product.id" :value="product.id" class="px-4 py-2 cursor-pointer hover:bg-gray-100">
            <span>{{ product.name }}</span>
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>

    <!-- Вибір пристрою -->
    <div class="select-3" v-if="devices.length">
      <Listbox v-model="selectedDevice" as="div" class="relative">
        <ListboxButton class="select_btn w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:outline-none inline-flex">
          {{ selectedDevice ? devices.find(d => d.id === selectedDevice)?.name : data.SelectDevicePlaceholder }}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="-mr-1 ml-auto h-5 w-5">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"></path>
          </svg>
        </ListboxButton>
        <ListboxOptions class="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <ListboxOption :value="null" class="px-4 py-2 cursor-pointer hover:bg-gray-100">
            <span>{{ data.SelectDevicePlaceholder }}</span>
          </ListboxOption>
          <ListboxOption v-for="device in devices" :key="device.id" :value="device.id" class="px-4 py-2 cursor-pointer hover:bg-gray-100">
            <span>{{ device.name }}</span>
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>
  </form>
</template>


<style scoped>

</style>
