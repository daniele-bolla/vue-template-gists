<template>
  <div
    v-if="alert.type && alert.message"
    class="alert"
    role="alert"
    :class="`alert--${alert.type}`"
  >
    <p>
      {{ alert.message }}
    </p>
    <button @click="remove">x</button>
  </div>
</template>

<script>
export default {
  props: {
    alert: {
      type: Object,
      required: true
    }
  },
  methods: {
    remove() {
      this.$store.dispatch("alerts/remove", alert);
    }
  }
};
</script>

<style>
.alert {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}

.alert--danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
</style>
