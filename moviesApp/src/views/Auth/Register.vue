<!-- TODO:REFACTOR this component -->

<template>
  <VCard class="elevation-12">
    <VForm ref="form" @submit.prevent="handleSubmit" lazy-validation>
      <VToolbar dark color="primary">
        <VToolbarTitle>Register form</VToolbarTitle>
      </VToolbar>
      <VCardText>
        <TextField :fields="registerFields.name" />
        <TextField :fields="registerFields.email" />
        <TextField :fields="registerFields.password" :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="passwordVisible = !passwordVisible" />
        <TextField :fields="registerFields.passwordConfirmation"
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
import TextField from "@/components/form/TextField.vue";
import useRegisterHook from "@/views/Auth/hooks/useRegisterHook";
const form = ref(null);
const passwordVisible = ref(false);
const { handleSubmit, registerFields, loading } = useRegisterHook(form);

</script>