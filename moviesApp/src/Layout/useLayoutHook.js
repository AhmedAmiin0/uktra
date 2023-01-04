import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { ref, watchEffect, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useNotificationsStore } from "@/store/notifications";
import useApi from "@/hooks/useApi";
import { getProfileRequest } from "@/views/Auth/api/auth.endpoints";
import { useThemeStore } from "@/store/theme";
const useLayoutHook = () => {
  const themeStore = useThemeStore();
  const { token, user } = storeToRefs(useAuthStore());
  const { theme } = storeToRefs(useThemeStore());
  const authStore = useAuthStore();
  const notificationsStore = useNotificationsStore();
  const { successMessage, errorMessage } = storeToRefs(notificationsStore);
  const drawer = ref(false);
  const getUser = useApi(getProfileRequest);
  const items = [
    {
      title: "MoviesList",
      icon: "mdi-email",
      to: "Movies",
    },
    {
      title: "Home",
      icon: "mdi-account-supervisor-circle",
      to: "Movies",
    },
  ];
  const router = useRouter();
  function onClick() {
    themeStore.setTheme(theme.value === "light" ? "dark" : "light");
    localStorage.setItem("theme", theme.value);
  }
  function logout() {
    authStore.logout();
    router.push({ name: "Login" });
  }
  watchEffect(() => {
    if (successMessage.value) {
      setTimeout(() => {
        notificationsStore.setSuccessMessage("");
      }, 3000);
    }
    if (errorMessage.value) {
      setTimeout(() => {
        notificationsStore.setErrorMessage("");
      }, 3000);
    }

    console.log(theme);
  });

  onMounted(async () => {
    if (token.value) {
      const response = await getUser.request();
      if (response) {
        authStore.setCurrentUser({ ...response.data.data });
      }
    }
  });

  return {
    items,
    drawer,
    onClick,
    logout,
    user,
    successMessage,
    errorMessage,

    theme,
    token,

    getUser,
  };
};

export default useLayoutHook;
