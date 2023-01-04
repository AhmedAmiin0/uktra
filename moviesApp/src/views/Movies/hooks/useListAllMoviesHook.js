import { ref, computed, watch } from "vue";
import useApi from "@/hooks/useApi";
import { useRoute, useRouter } from "vue-router";
import MoviesCard from "@/components/Card.vue";
import { deleteMovieRequest, getAllMoviesRequest } from "../api/movies.api";
const useListAllMoviesHook = () => {
  const router = useRouter();
  const route = useRoute();
  const movies = ref([]);
  const getMoviesRequest = useApi(getAllMoviesRequest);
  const search = ref(route.query["filter[search]"] || "");
  const deleteMovie = useApi(deleteMovieRequest);

  watch(
    search,
    async () => {
      router.push({
        query: {
          "filter[search]": search.value,
        },
      });
      const response = await getMoviesRequest.request(
        "filter[search]=" + search.value
      );
      movies.value = response?.data?.data;
      return () => {
        movies.value = [];
        getMoviesRequest.abort();
      };
    },
    { immediate: true }
  );

  const handleBtnClick = (id) => {
    router.push({ name: "EditMovie", params: { movieId: id } });
  };
  async function handleDeleteBtnClick(id) {
    await deleteMovie.request(id);
    movies.value = movies.value.filter((movie) => movie.id !== id);
  }

  return {
    movies,
    search,
    handleBtnClick,
    handleDeleteBtnClick,
    MoviesCard,
  };
};
export default useListAllMoviesHook;
