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
    <div
      :class="{
        'input-group': preAddon || postAddon,
        'input--has-error': validation.showErrors
      }"
    >
      <slot v-if="preAddon" class="input-group__prepend" name="preaddon">
      </slot>

      <input
        class="input"
        :class="{
          'input-group__input': preAddon || postAddon
        }"
        :type="type"
        @blur="$emit('blur')"
        @input="$emit('input', $event.target.value)"
        :value="value"
        id="name"
        name="name"
        :autocomplete="autocomplete"
        :aria-described="`describe-${name}`"
        :aria-invalid="validation.isInvalid"
        :aria-required="validation.isRequired"
      />
      <div v-if="postAddon" class="input-group__append">
        <slot name="postaddon"> </slot>
      </div>
    </div>
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
      default: "off"
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
  computed: {
    preAddon() {
      return !!this.$slots.preaddon;
    },
    postAddon() {
      return !!this.$slots.postaddon;
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/input.scss";
</style>
