<script setup>
const props = defineProps({
  seo: Object
});
if (props.seo) {
  useHead({
    title: props.seo?.metaTitle || "Default Title",
    meta: [
      {name: "description", content: props.seo?.metaDescription || "Default description"},
      {name: "keywords", content: props.seo?.keywords || ""},
      {name: "robots", content: props.seo?.metaRobots || "index, follow"},
      {name: "viewport", content: props.seo?.metaViewport || "width=device-width, initial-scale=1.0"},
      {property: "og:title", content: props.seo?.openGraph?.ogTitle || props.seo?.metaTitle},
      {property: "og:description", content: props.seo?.openGraph?.ogDescription || props.seo?.metaDescription},
      {property: "og:image", content: props.seo?.openGraph?.ogImage?.url ? `${useRuntimeConfig().public.apiBase}${props.seo.openGraph.ogImage.url}` : ""},
      {property: "og:url", content: props.seo?.canonicalURL || ""},
      {property: "og:type", content: props.seo?.openGraph?.ogType || "website"},
      {rel: "canonical", href: props.seo?.canonicalURL || ""}
    ]
  });
}
</script>

<template>
  <div></div>
</template>
