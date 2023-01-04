<template>
  <VTextarea
    v-model="field.text"
    :label="field.label"
    :name="field.name"
    :v-bind="field"
    :rules="field.rules"
    outlined
  />
</template>

<script>
export default {
  props: ["fields"],
  name: "Textarea",
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

<style scoped></style>
