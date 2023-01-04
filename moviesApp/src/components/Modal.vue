<template>
  <v-row justify="center">
    <v-dialog
      v-model="props.dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="$emit('close')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>
            <slot name="title"></slot>
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <slot name="subheader"></slot>
        <v-divider style="margin-bottom: 10px"></v-divider>
        <slot name="content"></slot>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup>
const props = defineProps({
  dialog: {
    type: Boolean,
    required: true,
  },
});
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
</style>
