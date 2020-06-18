<template>
  <div>
    <label :for="name"
      >{{ label }}
      <span
        v-if="validation.isRequired && validation.isInvalid"
        class="icon-asterisk"
        >*</span
      >
      <span
        v-if="validation.isRequired && validation.isValid"
        class="icon-check"
        >&check;</span
      >
    </label>
    <input
      class="form__element"
      :type="type"
      @blur="$emit('blur')"
      @input="$emit('input', $event.target.value)"
      :value="value"
      :autocomplete="autocomplete"
      id="name"
      name="name"
      :aria-described="`describe-${name}`"
      :aria-invalid="validation.isInvalid"
      :aria-required="validation.isRequired"
    />
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
  name: "BaseInput",
  components: {
    BaseAlert
  },
  props: {
    value: {
      type: [String],
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    autocomplete: {
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
  },
  methods: {}
};
</script>
<style lang="scss">
@import "@/assets/form.scss";
</style>
