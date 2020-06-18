<template>
  <article class="page page--home">
    <base-form></base-form>
  </article>
</template>

<script>
// @ is an alias to /src

import BaseForm from "@/components/BaseForm.vue";

export default {
  name: "Home",
  components: {
    BaseForm
  }
};
</script>
