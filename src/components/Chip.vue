<script>
export default {
  name: "Chip",
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>

<template lang="pug">
  .chip
    <span class="chip_label text_small"> {{text}} </span>
</template>

<style scoped>
.chip {
  padding: 0.2rem 0.8rem;
  background: #dfe6ed;
  margin-right: 0.6rem;
}

.chip_label {
  font-weight: 700;
}
</style>
