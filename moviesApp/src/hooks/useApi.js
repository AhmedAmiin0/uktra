import { computed, ref } from "vue";
import apiClient from "@/api/client";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";
import { useNotificationsStore } from "@/store/notifications";

export default function useApi(fun) {
  const loading = ref(false);
  const error = ref(null);
  const controller = new AbortController();
  const authStore = useAuthStore();
  const notificationStore = useNotificationsStore();
  const router = useRouter();
  const request = async (...data) => {
    loading.value = true;
    try {
      const response = await apiClient({
        ...fun(...data),
        signal: controller.signal,
      });
      loading.value = false;
      if (
        response?.config?.method &&
        response?.config?.method.toLocaleLowerCase() !== "get"
      ) {
        notificationStore.setSuccessMessage("Success! Action Have Been Done!");
        notificationStore.setErrorMessage("");
      }

      return response;
    } catch (e) {
      loading.value = false;
      error.value = e;
      notificationStore.setErrorMessage(e.response?.data?.message);
      notificationStore.setSuccessMessage("");
      if (e.response?.status === 401) {
        localStorage.removeItem("access_token");
        authStore.logout();
        router.push("/login");
      }
      throw e;
    }
  };
  const abort = () => {
    controller.abort();
  };

  return {
    error,
    request,
    abort,
    loading,
  };
}
