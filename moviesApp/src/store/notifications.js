import { defineStore } from "pinia";

export const useNotificationsStore = defineStore({
  id: "notifications",
  state: () => ({
    successMessage: "",
    errorMessage: "",
  }),
  actions: {
    setSuccessMessage(message) {
      this.successMessage = message;
    },
    setErrorMessage(message) {
      this.errorMessage = message;
    },
  },
});
