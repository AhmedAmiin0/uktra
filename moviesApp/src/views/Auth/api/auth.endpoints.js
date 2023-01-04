export const loginRequest = (data) => ({
  method: "post",
  url: "/login",
  data,
});
export const registerRequest = (data) => ({
  method: "post",
  url: "/register",
  data,
});
export const getProfileRequest = () => ({
  method: "get",
  url: "/profile",
});
