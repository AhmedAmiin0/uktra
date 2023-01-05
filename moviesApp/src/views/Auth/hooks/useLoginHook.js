import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import useApi from "@/hooks/useApi";
import { loginRequest } from "@/views/Auth/api/auth.endpoints";
const useLoginHook = (form) => {
  const loginFields = reactive({
    email: {
      label: "Email",
      type: "email",
      rules: [validateEmail],
      name: "email",
      text: "",
    },
    password: {
      label: "Password",
      type: "password",
      text: "",
      rules: [(v) => !!v || "Password is required"],
      name: "password",
    },
  });
  const router = useRouter();
  const { loading, request } = useApi(loginRequest);

  const store = useAuthStore();

  async function handleSubmit() {
    try {
      const validate = await form.value.validate();
      if (validate.valid === false) return;
      const { data } = await request({
        email: loginFields.email.text,
        password: loginFields.password.text,
      });
      store.login(data.access_token, data.user);
      router.push({ name: "Movies" });
    } catch (e) {
      console.log(e);
    }
  }
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      return "E-mail must be valid.";
    }
    return true;
  }
  return {
    loginFields,
    handleSubmit,
    loading,
  };
};

export default useLoginHook;
