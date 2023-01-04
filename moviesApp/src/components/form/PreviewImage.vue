<template>
  <VImg
    :src="previewImage"
    :lazy-src="previewImage"
    aspect-ratio="1.5"
    max-width="100%"
    max-height="100%"
    contain
  />
</template>
<script setup>
import { computed } from "@vue/reactivity";
const props = defineProps({
  image: {
    type: [String, File],
    required: true,
  },
});
const previewImage = computed(() => {
  if (props.image instanceof File) {
    return URL.createObjectURL(props.image);
  }
  return props.image;
});
console.log(props);
</script>
