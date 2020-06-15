<template functional>
  <router-link class="thumbnail" :to="props.path">
    <div class="thumbnail__caption text-center">
      <h2>{{ props.title }}</h2>
    </div>
    <img class="thumbnail__image" :src="props.img" :alt="props.title" />
  </router-link>
</template>

<script>
export default {
  name: "Thumbnail",
  props: {
    title: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/variable.scss";

.thumbnail {
  display: block;
  position: relative;
  border-width: 0.125em;
  border-style: solid;
  border-color: rgb(235, 235, 235);
  border-image: initial;
}

.thumbnail:focus {
  outline: 2px solid $outline-color;
}

.thumbnail__caption {
  background-color: rgb(249, 249, 249);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.125em solid rgb(235, 235, 235);
  padding: 0 0 1rem;
}

.thumbnail__image {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
