<script setup>
import { reactive, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import MoviesForm from "@/views/Movies/components/MoviesForm.vue";
import useCreateMovieHook from "./hooks/useCreateMovieHook";

const valid = ref(false);
const form = ref(null);

const { movie, handleSubmit, createMovie } = useCreateMovieHook(form);
console.log(movie);
</script>

<template>
  <VCard class="elevation-12">
    <VForm
      lazy-validation
      @submit.prevent="handleSubmit"
      v-model="valid"
      ref="form"
    >
      <VToolbar dark color="primary">
        <VToolbarTitle>Add New Movie</VToolbarTitle>
      </VToolbar>
      <VCardText>
        <MoviesForm :movie="movie" :edit="true" />
        <VCardActions>
          <VSpacer />
          <VBtn
            color="primary"
            type="submit"
            :loading="createMovie.loading && createMovie.loading == true"
          >
            Save
          </VBtn>
        </VCardActions>
      </VCardText>
    </VForm>
  </VCard>
</template>
