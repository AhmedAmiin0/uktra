<script setup>
import { ref, watchEffect } from "vue";

import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";

import useEditMovieHook from "./hooks/useEditMovieHook";
import MoviesForm from "./components/MoviesForm.vue";
import Modal from "@/components/Modal.vue";

const { user } = storeToRefs(useAuthStore());
const edit = ref(false);
const valid = ref(false);
const dialog = ref(false);
const form = ref(null);
const router = useRouter();
const movieId = router.currentRoute.value.params.movieId;
const excelUrl = import.meta.env.VITE_API_URL + "/movies/" + movieId + "/excel";
const pdfUrl = import.meta.env.VITE_API_URL + "/movies/" + movieId + "/pdf";
const {
  movie,
  getMovieById,
  handleSubmit,
  updateMovie,
  chairs,
  handleBookChair,
  handleCancelChair,
} = useEditMovieHook(form, movieId);

getMovieById();
</script>

<template>
  <VCard>
    <VToolbar color="primary">
      <VToolbarTitle>Edit Movie</VToolbarTitle>
      <VSpacer />
      <VBtn class="mr-4" :icon="edit ? 'mdi-close' : 'mdi-pencil'" @click="edit = !edit"
        v-if="user && user.role === 'admin'" />
    </VToolbar>
    <VForm @submit.prevent="handleSubmit" v-model="valid" ref="form">
      <MoviesForm :movie="movie" :edit="edit" />
      <VCardActions>
        <VSpacer />
        <VBtn v-if="edit === true && user && user.role === 'admin'" color="primary" type="submit"
          :loading="updateMovie.loading && updateMovie.loading == true">Save</VBtn>
        <VBtn color="primary" v-else @click="dialog = true">Book</VBtn>
      </VCardActions>
    </VForm>
  </VCard>
  <div v-if="user && user.role === 'admin'" style="display: flex; justify-content: space-between; margin-top: 20px">
    <VBtn color="primary" :href="excelUrl"> Download Excel File </VBtn>
    <VBtn color="secondary" :href="pdfUrl"> Download PDF File </VBtn>
  </div>
  <Modal :dialog="dialog" @close="dialog = false">
    <template #title>Book Movie Chair</template>
    <template #content>
      <VRow v-for="chair in chairs" :key="chair.id">
        <VCol cols="3" style="text-align: center">
          <span :disabled="chair.user_id">{{ chair.price }}$</span>
        </VCol>
        <VCol cols="3" style="text-align: center">
          <span :disabled="chair.user_id">{{ chair.column }} </span>
        </VCol>
        <VCol cols="3" style="text-align: center">
          <span :disabled="chair.user_id">{{ chair.row }} </span>
        </VCol>
        <VCol cols="3" style="text-align: center" v-if="user">
          <VBtn v-if="chair.user_id && chair.user_id === user.id" color="red" @click="handleCancelChair(chair)">Cancel
          </VBtn>
          <VBtn v-else-if="chair.user_id === null" color="primary" @click="handleBookChair(chair)">Book</VBtn>
        </VCol>
      </VRow>
    </template>

  </Modal>
</template>
