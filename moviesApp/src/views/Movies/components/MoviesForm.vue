<script setup>
import { onMounted, watchEffect } from "vue";
import TextField from "@/components/form/TextField.vue";
import Textarea from "@/components/form/Textarea.vue";
import FileUpload from "@/components/form/FileUpload.vue";
import PreviewImage from "@/components/form/PreviewImage.vue";
import DatePicker from "@/components/form/DatePicker.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";
import movieInitialColumns from "../hooks/movieInitialColumns";
const props = defineProps({
  movie: {
    type: Object,
    default: () => movieInitialColumns,
    required: true,
  },
  edit: {
    type: Boolean,
    required: true,
  },
});
const emits = defineEmits(["movie"]);
const { user } = storeToRefs(useAuthStore());

onMounted(() => {
  emits("movie", props.movie);
});
</script>
<template>
  <VRow style="padding: 20px">
    <VCol cols="12" md="6">
      <template v-if="props.edit === true && user && user.role === 'admin'">
        <TextField :fields="movie.title" variant="outlined" />
        <TextField :fields="movie.excerpt" variant="outlined" />
        <Textarea :fields="movie.description" variant="outlined" />
        <FileUpload :fields="movie.thumbnail" variant="outlined" />
        <DatePicker :fields="movie.start_date" />
        <DatePicker :fields="movie.end_date" />
      </template>
      <template v-else>
        <VCardTitle class="headline">{{ movie.title.text }}</VCardTitle>
        <VCardSubtitle>
          {{ movie.excerpt.text }}
        </VCardSubtitle>
        <VCardText class="mb-4 text--primary">
          {{ movie.description.text }}
        </VCardText>
      </template>
    </VCol>
    <VCol cols="12" md="6">
      <PreviewImage :image="movie.thumbnail.text" />
      <VCardText class="mb-4 text--primary">
        <VCardSubtitle v-if="movie.end_date.text < new Date().toISOString().split('T')[0]">
          <span style="color: red">Movie Ended</span>
        </VCardSubtitle>
        <VCardSubtitle v-else>
          {{ movie.start_date.text }} --
          {{ movie.end_date.text }}
        </VCardSubtitle>
      </VCardText>
    </VCol>
  </VRow>
</template>
