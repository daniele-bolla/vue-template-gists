<template>
  <base-input
    :id="id"
    :value="value"
    :type="passwordType"
    :errors="errors"
    :name="name"
    :placeholder="placeholder"
    autocomplete="new-password"
    :label="label"
    :validation="validation"
    @blur="$emit('blur')"
    @input="newValue => $emit('input', newValue)"
  >
    <template slot="postaddon">
      <base-button
        skin="transparent"
        class="toggle-password"
        :icon="iconEye"
        type="button"
        @click="togglePassword"
      >
      </base-button>
    </template>
  </base-input>
</template>

<script>
import BaseInput from "./BaseInput";
import BaseButton from "./BaseButton";

export default {
  components: {
    BaseInput,
    BaseButton
  },
  props: {
    id: {
      type: [String, Number]
    },
    name: {
      type: String
    },
    label: {
      type: String
    },
    value: {
      type: String
    },
    placeholder: {
      type: String
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
  data() {
    return {
      passwordType: "password",
      iconEye: "eyeOff"
    };
  },
  methods: {
    togglePassword() {
      this.passwordType = this.passwordType == "password" ? "text" : "password";
      this.iconEye = this.iconEye == "eye" ? "eyeOff" : "eye";
    }
  }
};
</script>

<style scoped></style>
