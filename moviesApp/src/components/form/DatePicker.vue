<template>
  <Datepicker
    v-model="field.text"
    :dark="theme === 'dark'"
    :name="field.name"
    :label="field.label"
    :format="format"
    style="margin-top: 15px"
    :v-bind="field"
  />
</template>

<script setup>
import { useThemeStore } from "@/store/theme";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
const { theme } = storeToRefs(useThemeStore());
const props = defineProps({
  fields: {
    type: Object,
    required: true,
  },
});
const field = ref(props.fields);
const format = (date) => {
  const d = new Date(date);
  const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  const month =
    d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
  const year = d.getFullYear();
  const hours = d.getHours();
  const minutes = d.getMinutes();

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
const emit = defineEmits(["fields"]);
onMounted(() => {
  emit("fields", field);
});
</script>
