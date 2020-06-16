<template>
  <base-input
    :id="id"
    :value="value"
    :type="passwordType"
    classes="form-control"
    :errors="errors"
    :name="name"
    :placeholder="placeholder"
    autocomplete="new-password"
    :post-addon="true"
    @input="newValue => $emit('input', newValue)"
  >
    <template slot="postaddon">
      <a class="toggle-password" role="button" @click.prevent="togglePassword"
        ><i class="fa fa-eye"></i
      ></a>
    </template>
  </base-input>
</template>

<script>
import BaseInput from "./BaseInput";

export default {
  components: {
    BaseInput
  },
  props: {
    id: {
      type: [String, Number]
    },
    name: {
      type: String
    },
    placeholder: {
      type: String
    },
    value: {
      type: [Number, String],
      default: ""
    },
    errors: {
      type: [Array, Object],
      default: () => []
    }
  },
  data() {
    return {
      passwordType: "password"
    };
  },
  methods: {
    togglePassword() {
      this.passwordType = this.passwordType == "password" ? "text" : "password";
    }
  }
};
</script>

<style scoped></style>
