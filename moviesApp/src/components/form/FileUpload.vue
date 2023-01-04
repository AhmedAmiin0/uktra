<template>
  <VFileInput
    :accept="['image/jpeg', 'image/png']"
    :label="field.label"
    prepend-icon="mdi-camera"
    :show-size="1000"
    :name="field.name"
    @change="field.text = $event.target.files[0]"
    v-bind="field"
  />
</template>
<script>
export default {
  name: "FileUpload",
  props: ["fields"],
  data() {
    return {
      field: this.fields,
    };
  },
  created() {
    this.$emit("fields", this.field);
  },
};
</script>
