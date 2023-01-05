<script setup>
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";

const { user } = storeToRefs(useAuthStore());
</script>
<template>
  <slot v-if="user && user.role === 'admin'" name="default"></slot>
  <slot v-else name="notAdmin"></slot>
</template>
