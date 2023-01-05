import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { registerRequest } from "@/views/Auth/api/auth.endpoints";
import useApi from "@/hooks/useApi";

const useRegisterHook = (form) => {
  const router = useRouter();
  const { request, loading } = useApi(registerRequest);

  const store = useAuthStore();

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      return "E-mail must be valid.";
    }
    return true;
  }
  function validatePassword(password) {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return true;
  }
  const registerFields = reactive({
    name: {
      text: "",
      rules: [validateName],
      label: "Name",
      name: "name",
      prependIcon: "mdi-account",
    },
    email: {
      text: "",
      rules: [validateEmail],
      label: "Email",
      name: "email",
      prependIcon: "mdi-email",
      type: "email",
    },
    password: {
      text: "",
      rules: [validatePassword],
      label: "Password",
      name: "password",
      prependIcon: "mdi-lock",
      type: "password",
    },
    passwordConfirmation: {
      text: "",
      rules: [validatePassword],
      label: "Confirm Password",
      name: "password_confirmation",
      prependIcon: "mdi-lock",
      type: "password",
    },
  });
  async function handleSubmit() {
    try {
      const validate = await form.value.validate();
      if (validate.valid === false) return;
      const { data } = await request({
        email: registerFields.email.text,
        password: registerFields.password.text,
        name: registerFields.name.text,
        password_confirmation: registerFields.passwordConfirmation.text,
      });
      store.login(data.access_token, data.user);
      router.push({ name: "Movies" });
    } catch (e) {
      console.log(e);
    }
  }
  function validateName(name) {
    if (name.length < 3) {
      return "Name must be at least 3 characters long.";
    }
    return true;
  }
  return {
    registerFields,
    handleSubmit,
    loading,
  };
};
export default useRegisterHook;
