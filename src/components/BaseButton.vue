<script>
export default {
  name: "BaseButton",
  props: {
    classes: {
      type: String,
      default: "btn"
    }
  }
};
</script>

<template>
  <button :class="classes" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<style>
button:focus {
  outline: 1px dotted;
  outline: 5px auto -webkit-focus-ring-color;
}

button:disabled {
  opacity: 0.8;
  cursor: not-allowed;
  pointer-events: all;
}

.btn {
  cursor: pointer;
  display: inline-flex;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
}

.btn--large {
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
}

.btn--primary {
  color: #fff;
  background-color: #6c7af6;
}

.btn--primary:hover {
  background-color: #475cf7;
}

.btn--primary:active {
  background-color: #233cf0;
}

.btn__text {
  margin-right: 0.6rem;
}
</style>
