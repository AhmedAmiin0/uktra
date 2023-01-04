<script setup>
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";

const props = defineProps({
  title: String,
  description: String,
  image: String,
  id: Number,
  subtitle: String,
});
const { token, user } = storeToRefs(useAuthStore());
const authStore = useAuthStore();
defineEmits(["btn-click", "delete-btn-click"]);
</script>
<template>
  <VCard class="mx-auto my-12" max-width="374">
    <VImg cover maxHeight="250" :src="image" v-if="image" />

    <VCardItem v-if="title">
      <VCardTitle>
        {{ title }}
      </VCardTitle>
    </VCardItem>

    <VCardText v-if="description">
      <div>
        {{ description }}
      </div>
    </VCardText>

    <v-card-subtitle> {{ subtitle }}</v-card-subtitle>
    <VDivider class="mx-4 mb-1" />
    <VCardActions>
      <VBtn
        color="deep-purple-lighten-2"
        variant="text"
        @click="$emit('btn-click', id)"
      >
        details
      </VBtn>
      <VBtn
        color="error"
        variant="text"
        @click="$emit('delete-btn-click', id)"
        v-if="user?.role === 'admin'"
      >
        delete
      </VBtn>
    </VCardActions>
  </VCard>
</template>
