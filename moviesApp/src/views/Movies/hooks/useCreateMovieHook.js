import { reactive, computed } from "vue";
import useApi from "@/hooks/useApi";
import { createMovieRequest } from "@/views/Movies/api/movies.api";
import movieInitialColumns from "./movieInitialColumns";
import { useRouter } from "vue-router";
const useCreateMovieHook = (form) => {
  const movie = reactive(movieInitialColumns);
  const createMovie = useApi(createMovieRequest);
  const router = useRouter();
  async function handleSubmit(e) {
    try {
      const validate = await form.value.validate();
      if (validate.valid === false) return;
      const formData = new FormData(e.target);
      const { data } = await createMovie.request(formData);
      router.push("/movies");
    } catch (err) {
      console.log(err);
    }
  }
  return {
    movie,
    handleSubmit,
    createMovie,
  };
};
export default useCreateMovieHook;
