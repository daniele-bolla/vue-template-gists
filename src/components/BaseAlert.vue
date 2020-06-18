<template functional>
  <div class="alert" role="alert" :class="`alert--${props.type}`">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BaseAlert",
  props: {
    type: {
      type: String,
      default: "info",
      validator: val => ["danger", "success", "info", "warning"].includes(val)
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/alert.scss";
</style>
