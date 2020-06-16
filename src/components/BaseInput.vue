<template functional>
  <div class="form__block">
    <label for="lastname"
      >Last Name
      <span v-if="props.isRequired || props.isValid" class="icon-asterisk"
        >*</span
      >
      <span v-if="props.isRequired && props.isValid" class="icon-check"
        >&check;</span
      ></label
    >
    <input
      class="form__element"
      id="lastname"
      v-model="formDataToValidate.lastname"
      @change="isDirty('lastname')"
      autocomplete="name"
      maxlength="50"
      type="text"
      aria-described="describe-lastname"
      :aria-invalid="props.isInvalid"
      :aria-required="props.isRequired"
    />
    <ul
      class="alert alert--danger"
      role="alert"
      id="describe-lastname"
      v-if="props.showErrors"
    >
      <li v-for="(item, index) in props.errors" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    value: null,
    label: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    ariaDescription: {
      type: String,
      default: ""
    }
  }
};
</script>
