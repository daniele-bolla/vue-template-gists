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
    :send="onSubmit"
  >
    <form class="form" @submit.prevent="validateAndSubmit" novalidate>
      <base-input
        class="form__block"
        :label="scheme.name.label"
        :name="scheme.name.name"
        @blur="isDirty('name')"
        v-model.lazy="formModels.name"
        :id="scheme.name.name"
        type="text"
        :validation="fieldsValidationMap.name"
        :errors="fieldsValidationMap.name.errors"
        autocomplete="name"
      />
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
      />

      <base-input
        class="form__block"
        :label="scheme.email.label"
        :name="scheme.email.name"
        @blur="isDirty('email')"
        v-model.lazy="formModels.email"
        :id="scheme.email.name"
        type="email"
        :validation="fieldsValidationMap.email"
        :errors="fieldsValidationMap.email.errors"
        autocomplete="email"
      />

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
        autocomplete="postal-code"
      >
        <base-button
          slot="postaddon"
          skin="transparent"
          @click.prevent="() => alert(234)"
          icon="email"
          text="Check"
        />
      </base-input>
      <base-input
        class="form__block"
        :label="scheme.bday.label"
        :name="scheme.bday.name"
        @blur="isDirty('bday')"
        v-model.lazy="formModels.bday"
        :id="scheme.bday.name"
        type="date"
        :validation="fieldsValidationMap.bday"
        :errors="fieldsValidationMap.bday.errors"
        autocomplete="bday"
      />
      <base-button
        class="full-width text-center justify-center"
        size="large"
        skin="transparent"
        type="submit"
        icon="email"
        text="Submit"
      />
    </form>
  </form-validator>
</template>

<script>
/* eslint-disable no-debugger */

import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";

import FormValidator from "@/components/FormValidator";

export default {
  components: {
    BaseInput,
    BaseButton,
    FormValidator
  },
  data() {
    return {
      scheme: {
        name: {
          label: "Name",
          isDirty: false,
          validations: ["required"]
        },
        lastname: {
          label: "Last Name",
          isDirty: false,
          validations: ["required"]
        },
        email: {
          label: "Email",
          isDirty: false,
          validations: ["required", "email"]
        },
        postcode: {
          label: "Post Code",
          isDirty: false,
          validations: ["required", "postcode"]
        },
        bday: {
          label: "Bitrh Day",
          isDirty: false,
          validations: ["required"]
        }
      },
      formData: {
        lastname: "",
        name: "",
        email: "",
        postcode: "",
        bday: ""
      }
    };
  },
  methods: {
    onSubmit(formData) {
      console.log(formData);
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/form.scss";
</style>
