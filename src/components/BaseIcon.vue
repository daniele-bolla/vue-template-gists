<template>
  <i class="icon" aria-hidden="true">
    <svg
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="icon__svg"
      :aria-labelledby="name"
      role="presentation"
    >
      <title :id="name" lang="en">{{ name }}</title>
      <path :d="path" />
    </svg>
  </i>
</template>
<script>
const icons = {
  arrowCircleRight: "M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z",
  email: `M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 
  110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4`
};
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    path() {
      return icons[this.name];
    }
  }
};
</script>
<style>
.icon {
  color: inherit;
  display: block;
  height: 100%;
  padding: 0.8em;
  position: relative;
}
.icon__svg {
  font-size: 0.6rem;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
