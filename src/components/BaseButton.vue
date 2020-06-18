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
  <button :class="`btn btn--${size} btn--${skin}`" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    size: {
      type: String,
      default: "medium",
      validator: val => ["small", "medium", "large"].includes(val)
    },
    skin: {
      type: String,
      default: "primary",
      validator: val => ["secondary", "primary", "default"].includes(val)
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/button.scss";
</style>
