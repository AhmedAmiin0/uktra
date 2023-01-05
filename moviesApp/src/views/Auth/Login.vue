<!-- TODO refactor this component -->
<template>
  <VCard class="elevation-12">
    <VForm ref="form" @submit.prevent="handleSubmit" lazy-validation>
      <VToolbar dark color="primary">
        <VToolbarTitle>Login form</VToolbarTitle>
      </VToolbar>
      <VCardText>
        <TextField :fields="loginFields.email" />
        <TextField :fields="loginFields.password" :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="passwordVisible = !passwordVisible" />
      </VCardText>
      <VCardActions style="justify-content: space-between; width: 100%">
        <VBtn color="primary" :to="{ name: 'Register' }">
          You don't have an account?
        </VBtn>
        <VBtn color="primary" type="submit" :loading="loading">Login</VBtn>
      </VCardActions>
    </VForm>
  </VCard>
</template>

<script setup>
import { ref } from "vue";
import TextField from "@/components/form/TextField.vue";
import useLoginHook from "@/views/Auth/hooks/useLoginHook";

const form = ref(null);
const passwordVisible = ref(false);
const { handleSubmit, loginFields, loading } = useLoginHook(form);

</script>
