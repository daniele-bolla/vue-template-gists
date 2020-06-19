<template>
  <fieldset>
    <legend></legend>
    <base-checkbox></base-checkbox>
  </fieldset>
</template>

<script>
import BaseCheckbox from "@/components/BaseCheckbox.vue";
export default {
  props: {
    value: Boolean,
    label: String,
    name: String
  },
  components: {
    BaseCheckbox
  }
};
</script>
<style lang="css">
.form-check {
  position: relative;
  display: block;
  padding-left: 1.25rem;
}
.form-check-input {
  position: absolute;
  margin-top: 0.3rem;
  margin-left: -1.25rem;
}
.form-check-label {
  margin-bottom: 0;
}
</style>
