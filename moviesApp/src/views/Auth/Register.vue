<!-- TODO:REFACTOR this component -->

<template>
  <VCard class="elevation-12">
    <VForm ref="form" @submit.prevent="handleSubmit" lazy-validation>
      <VToolbar dark color="primary">
        <VToolbarTitle>Login form</VToolbarTitle>
      </VToolbar>
      <VCardText>
        <VTextField id="name" prepend-icon="mdi-account" name="name" label="Name" v-model="name"
          :rules="[validateName]" />

        <VTextField id="email" prepend-icon="mdi-email" name="email" label="Email" type="email" v-model="email"
          :rules="[validateEmail]" />
        <VTextField id="password" name="password" label="Password" v-model="password" prepend-icon="mdi-lock"
          :rules="[validatePassword]" :type="passwordVisible ? 'text' : 'password'"
          :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="passwordVisible = !passwordVisible" />
        <VTextField id="password" name="password_confirmation" label="Confirm Password" v-model="passwordConfirmation"
          prepend-icon="mdi-lock" :rules="[validatePassword]" :type="passwordVisible ? 'text' : 'password'"
          :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="passwordVisible = !passwordVisible" />
      </VCardText>
      <VCardActions style="justify-content: space-between; width: 100%">
        <VBtn color="primary" :to="{ name: 'Login' }">
          Already have an account?
        </VBtn>
        <VBtn color="primary" type="submit" :loading="loading">Register</VBtn>
      </VCardActions>
    </VForm>
  </VCard>
</template>

<script setup>

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import useApi from "@/hooks/useApi";
import { registerRequest } from "@/views/Auth/api/auth.endpoints";
const form = ref(null);
const email = ref("");
const password = ref("");
const name = ref("");
const passwordConfirmation = ref("");
const passwordVisible = ref(false);
const router = useRouter();
const { loading, request } = useApi(registerRequest);

const store = useAuthStore();

async function handleSubmit() {
  try {

    const validate = await form.value.validate();
    if (validate.valid === false) return;
    const { data } = await request({
      email: email.value,
      password: password.value,
      name: name.value,
      password_confirmation: passwordConfirmation.value,
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
</script>