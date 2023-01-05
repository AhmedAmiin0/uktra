<script setup>
import { useAuthStore } from "@/store/auth";
import useListAllMoviesHook from "@/views/Movies/hooks/useListAllMoviesHook";
import { storeToRefs } from "pinia";

const {
  movies,
  search,
  movieState,
  handleBtnClick,
  handleDeleteBtnClick,
  MoviesCard,
} = useListAllMoviesHook();
const { user } = storeToRefs(useAuthStore());

</script>
<template>
  <!-- <VBtn :to="{ name: 'CreateMovie' }" color="success"> Create Movie </VBtn> -->
  <VTextField v-model.lazy="search" label="Search" placeholder="Search" class="mb-4" outlined />

  <VBtn :to="{ name: 'CreateMovie' }" color="success" class="mb-5" v-if="user && user.role === 'admin'">
    Add Movie
  </VBtn>

  <VRow>
    <VCol v-for="movie in movies" :key="movie.id" cols="12" md="4">
      <MoviesCard :title="movie.title" :description="movie.description" :image="movie.thumbnail" :id="movie.id"
        :subtitle="movie.unbooked_chairs + ' chairs available'" @btn-click="handleBtnClick"
        @delete-btn-click="handleDeleteBtnClick" />
    </VCol>
  </VRow>
</template>
