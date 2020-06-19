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
    <base-alert
      type="danger"
      :id="`describe-${name}`"
      v-if="validation.showErrors"
    >
      <li v-for="(item, index) in errors" :key="index">
        {{ item }}
      </li>
    </base-alert>
  </div>
</template>

<script>
import BaseAlert from "@/components/BaseAlert.vue";

export default {
  name: "BaseCheckbox",
  components: {
    BaseAlert
  },
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
