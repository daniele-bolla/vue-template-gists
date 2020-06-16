<template functional>
  <div class=" form__block">
    <label for="2mfa_method">One time password method</label>
    <div
      :class="{ 'input-group': preAddon || postAddon, 'has-error': has_error }"
    >
      <div v-if="preAddon" class="input-group-prepend">
        <span class="input-group-text">
          <slot name="preaddon"> </slot>
        </span>
      </div>
      <select class="form__element" id="2mfa_method" name="2mfa_method">
        <option selected>Choose...</option>
        <option value="1">OnOneOneOneOneOneOne OneOnee</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
      <div v-if="postAddon" class="input-group-append input-group-addon">
        <span class="input-group-text">
          <slot name="postaddon"> </slot>
        </span>
      </div>
    </div>
    <select
      :value="props.value"
      @input="
        listeners.input &&
          listeners.input($event.target.selectedOptions[0].value)
      "
    >
      <option value="">-</option>
      <option v-for="item in props.Data" :key="item" :value="item">{{
        item
      }}</option>
    </select>
  </div>
</template>
<script>
export default {
  name: "BaseSelect",
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
