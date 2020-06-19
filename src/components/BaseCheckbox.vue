<template>
  <div class="checkbox__wrapper">
    <input
      class="checkbox__input"
      :id="name"
      type="checkbox"
      :checked="value"
      @input="$emit('input', $event.target.checked)"
    />
    <label :for="name" class="checkbox__label" v-text="label"></label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    validation: {
      type: Object,
      default: () => ({
        isRequired: false,
        isValid: true,
        isInvalid: false,
        isDirty: false,
        showErrors: false
      })
    },
    errors: {
      type: Array,
      default: () => []
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/checkbox.scss";
</style>
