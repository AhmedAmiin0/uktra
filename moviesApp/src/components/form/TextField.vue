<template>
  <VTextField v-model="field.text" :label="field.label" :name="field.name" :v-bind="field" :rules="field.rules"
    :type="field.type ? field.type : 'text'" outlined :prepend-icon="field.prependIcon && field.prependIcon" />


</template>

<script>
export default {
  props: ["fields"],
  name: "TextField",
  data() {
    return {
      field: this.fields,
    };
  },
  created() {
    console.log(this.field);
    this.$emit("fields", this.field);
  },
};
</script>

<style scoped>

</style>
