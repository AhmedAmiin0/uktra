<script setup>
import useListAllMoviesHook from "@/views/Movies/hooks/useListAllMoviesHook";
const {
  movies,
  search,
  movieState,
  handleBtnClick,
  handleDeleteBtnClick,
  MoviesCard,
} = useListAllMoviesHook();
</script>
<template>
  <!-- <VBtn :to="{ name: 'CreateMovie' }" color="success"> Create Movie </VBtn> -->
  <VTextField
    v-model.lazy="search"
    label="Search"
    placeholder="Search"
    class="mb-4"
    outlined
  />
  <VRow>
    <VCol v-for="movie in movies" :key="movie.id" cols="12" md="4">
      <MoviesCard
        :title="movie.title"
        :description="movie.description"
        :image="movie.thumbnail"
        :id="movie.id"
        :subtitle="movie.unbooked_chairs + ' chairs available'"
        @btn-click="handleBtnClick"
        @delete-btn-click="handleDeleteBtnClick"
      />
    </VCol>
  </VRow>
</template>
