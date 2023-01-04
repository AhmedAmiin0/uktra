export const getAllMoviesRequest = (query = "") => ({
  method: "get",
  url: "/movies?" + query,
});
export const getMovieRequest = (id) => ({
  method: "get",
  url: `/movies/${id}`,
});
export const createMovieRequest = (movie) => ({
  method: "post",
  url: "/movies",
  data: movie,
});
export const updateMovieRequest = (id, movie) => ({
  method: "POST",
  url: `/movies/${id}`,
  data: movie,
});
export const deleteMovieRequest = (id) => ({
  method: "delete",
  url: `/movies/${id}`,
});
export const bookChairRequest = (id, chairId) => ({
  method: "get",
  url: `/movies/${id}/chairs/${chairId}/book`,
});
export const cancelChairRequest = (id, chairId) => ({
  method: "get",
  url: `/movies/${id}/chairs/${chairId}/cancel`,
});
