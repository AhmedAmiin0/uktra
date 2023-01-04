import { reactive, computed, ref } from "vue";
import useApi from "@/hooks/useApi";
import {
  bookChairRequest,
  cancelChairRequest,
  getMovieRequest,
  updateMovieRequest,
} from "@/views/Movies/api/movies.api";
import movieInitialColumns from "./movieInitialColumns";

const useEditMovieHook = (form, movieId) => {
  const movie = reactive(movieInitialColumns);

  const updateMovie = useApi(updateMovieRequest);
  const getMovie = useApi(getMovieRequest);
  const bookChair = useApi(bookChairRequest);
  const cancelChair = useApi(cancelChairRequest);
  const chairs = ref([]);

  async function getMovieById() {
    const { data } = await getMovie.request(movieId);
    movie.title.text = data.data.title;
    movie.description.text = data.data.description;
    movie.thumbnail.text = data.data.thumbnail;
    movie.excerpt.text = data.data.excerpt;
    movie.start_date.text = data.data.start_date;
    movie.end_date.text = data.data.end_date;
    chairs.value = data.data.chairs;
    console.log(chairs.value);
  }

  async function handleSubmit(e) {
    try {
      const validate = await form.value.validate();
      if (validate.valid === false) return;
      const formData = new FormData(e.target);
      formData.append("_method", "PUT");
      if (movie.image instanceof File)
        formData.append("thumbnail", movie.thumbnail.text);
      const { data } = await updateMovie.request(movieId, formData);
    } catch (err) {
      console.log(err);
    }
  }
  async function handleBookChair(chair) {
    try {
      const { data } = await bookChair.request(movieId, chair.id);
      chairs.value = data.data;
    } catch (err) {
      console.log(err);
    }
  }

  async function handleCancelChair(chair) {
    try {
      const { data } = await cancelChair.request(movieId, chair.id);

      chairs.value = data.data;
    } catch (err) {
      console.log(err);
    }
  }

  return {
    movie,
    getMovieById,
    handleSubmit,
    updateMovie,
    form,
    chairs,
    bookChair,
    cancelChair,
    handleBookChair,
    handleCancelChair,
  };
};
export default useEditMovieHook;
