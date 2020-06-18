<template>
  <form-validator
    v-slot="{
      formModels,
      isValid,
      validateAndSubmit,
      fieldsValidationMap,
      isDirty
    }"
    :scheme="scheme"
    :form-models="formData"
    :send="submit"
  >
    <form class="form" @submit.prevent="validateAndSubmit" novalidate>
      <base-input
        class="form__block"
        :label="scheme.lastname.label"
        :name="scheme.lastname.name"
        @blur="isDirty('lastname')"
        v-model.lazy="formModels.lastname"
        :id="scheme.lastname.name"
        type="text"
        :validation="fieldsValidationMap.lastname"
        :errors="fieldsValidationMap.lastname.errors"
      ></base-input>

      <base-input
        class="form__block"
        :label="scheme.postcode.label"
        :name="scheme.postcode.name"
        @blur="isDirty('postcode')"
        v-model.lazy="formModels.postcode"
        :id="scheme.postcode.name"
        type="text"
        :post-addon="true"
        :validation="fieldsValidationMap.postcode"
        :errors="fieldsValidationMap.postcode.errors"
      >
        <base-button slot="postaddon" @click="submit">preaddon</base-button>
      </base-input>
      <base-button @click="submit">Submit</base-button>
    </form>
  </form-validator>
</template>

<script>
/* eslint-disable no-debugger */

import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormValidator from "@/components/FormValidator";
const scheme = {
  lastname: {
    label: "Last Name",
    isDirty: false,
    validations: ["required"]
  },
  postcode: {
    label: "Post Code",
    isDirty: false,
    validations: ["required", "isPostCode"]
  },
  bday: {
    label: "Bitrh Day",
    isDirty: false,
    validations: ["required"]
  }
};

export default {
  components: {
    BaseInput,
    BaseButton,
    FormValidator
  },
  data() {
    return {
      scheme,
      formData: {
        lastname: "",
        postcode: "",
        bday: ""
      },
      validation: {
        isRequired: true,
        isValid: false,
        isInvalid: true,
        showErrors: true
      },
      errors: ["This field is required"]
    };
  },
  methods: {
    submit() {
      alert(234);
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/form.scss";
</style>
