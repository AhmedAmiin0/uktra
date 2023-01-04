import { defineStore } from "pinia";
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
    token: localStorage.getItem("access_token"),
  }),

  actions: {
    login(token, user) {
      this.token = token;
      this.user = user;
      localStorage.setItem("access_token", token);
    },
    logout() {
      this.token = null;
      localStorage.removeItem("access_token");
    },
    setCurrentUser(user) {
      this.user = user;
    },
  },
});
