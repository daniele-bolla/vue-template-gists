<template>
  <div :id="id" :data-cy="id" :class="classes">
    <div v-for="option in options" :key="option.value" class="form-check">
      <label :for="option.id" class="form-check-label">
        <input
          :id="option.id"
          class="form-check-input"
          type="radio"
          :value="option.value"
          :checked="option.value == value"
          @input="$emit('input', $event.target.value)"
          @change="$emit('change', $event.target.value)"
        />
        {{ option.label }}</label
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: [String, Number],
      default: () => null
    },
    name: {
      type: String,
      default: () => ""
    },
    classes: {
      type: String,
      default: () => ""
    },
    options: {
      type: [Array],
      default: () => []
    },
    value: {
      type: [String],
      default: () => null
    },
    errors: {
      type: [Array, Object],
      default: () => []
    }
  }
};
</script>

<style scoped>
label {
  display: flex;
  padding: 1rem;
  cursor: pointer;
}
input {
  margin: 4px;
}
</style>
