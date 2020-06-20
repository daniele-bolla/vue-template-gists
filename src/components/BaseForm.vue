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
      <div class="form__blocks--inline">
        <base-input
          class="form__block"
          :label="scheme.name.label"
          :name="scheme.name.name"
          @blur="isDirty('name')"
          v-model.lazy="formModels.name"
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
          type="text"
          :validation="fieldsValidationMap.lastname"
          :errors="fieldsValidationMap.lastname.errors"
        />
      </div>

      <base-input
        class="form__block"
        :label="scheme.email.label"
        :name="scheme.email.name"
        @blur="isDirty('email')"
        v-model.lazy="formModels.email"
        type="email"
        :validation="fieldsValidationMap.email"
        :errors="fieldsValidationMap.email.errors"
        autocomplete="email"
      >
        <span
          slot="postaddon"
          style="display: inline-flex; padding: 0.3em 0.6em;"
        >
          <base-icon name="email"></base-icon>
        </span>
        <span
          slot="preaddon"
          style="display: inline-flex; padding: 0.3em 0.6em;"
        >
          <base-icon name="email"></base-icon>
        </span>
      </base-input>
      <base-password
        class="form__block"
        :label="scheme.password.label"
        :name="scheme.password.name"
        @blur="isDirty('password')"
        v-model.lazy="formModels.password"
        :validation="fieldsValidationMap.password"
        :errors="fieldsValidationMap.password.errors"
      >
      </base-password>

      <base-input
        class="form__block"
        :label="scheme.postcode.label"
        :name="scheme.postcode.name"
        @blur="isDirty('postcode')"
        v-model.lazy="formModels.postcode"
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
          type="button"
          text="Check"
        />
      </base-input>
      <base-input
        class="form__block"
        :label="scheme.bday.label"
        :name="scheme.bday.name"
        @blur="isDirty('bday')"
        v-model.lazy="formModels.bday"
        type="date"
        :validation="fieldsValidationMap.bday"
        :errors="fieldsValidationMap.bday.errors"
        autocomplete="bday"
      />
      <base-checkbox
        name="terms"
        v-model="formModels.terms"
        :validation="fieldsValidationMap.terms"
        :errors="fieldsValidationMap.terms.errors"
        label="Accept our terms and privacy conditions"
        class="form__block"
      >
      </base-checkbox>
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
import BasePassword from "@/components/BasePassword.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseCheckbox from "@/components/BaseCheckbox.vue";
import BaseIcon from "@/components/BaseIcon.vue";

import FormValidator from "@/components/FormValidator";

export default {
  components: {
    BaseInput,
    BasePassword,
    BaseButton,
    FormValidator,
    BaseCheckbox,
    BaseIcon
  },
  data() {
    return {
      scheme: {
        name: {
          label: "Name",
          name: "name",
          isDirty: false,
          validations: ["required"]
        },
        lastname: {
          label: "Last Name",
          name: "lastname",
          isDirty: false,
          validations: ["required"]
        },

        email: {
          label: "Email",
          name: "email",
          isDirty: false,
          validations: ["required", "email"]
        },
        password: {
          label: "password",
          name: "password",
          isDirty: false,
          validations: ["required"]
        },
        postcode: {
          label: "Post Code",
          name: "postcode",
          isDirty: false,
          validations: ["required", "postcode"]
        },
        bday: {
          label: "Bitrh Day",
          name: "bday",
          isDirty: false,
          checkIf: () => this.formData.terms,
          validations: ["required"]
        },
        terms: {
          label: "Accept our terms and privacy conditions",
          name: "terms",
          isDirty: false,
          validations: ["checked"]
        }
      },
      formData: {
        name: "",
        lastname: "",
        email: "",
        password: "",
        postcode: "",
        bday: "",
        terms: false
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
