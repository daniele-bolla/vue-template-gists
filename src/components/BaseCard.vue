<script>
export default {
  name: "BaseCard"
};
</script>

<template lang="pug">
  .card
    slot
</template>

<style>
.card {
  border: solid 2px #c3cfd9;
  margin: 1.6rem 0;
}

.card--large {
  padding: 2rem 1.6rem 1.8rem 1.6rem;
}

.card--medium {
  padding: 1.8rem 1.2rem 1.2rem 1.2rem;
}

.card__title {
  margin-top: 0;
}

.card__body {
  height: 6em;
}

.card__description {
  width: 60%;
}

.card__portrait {
  width: 20%;
}

.card__portrait__img {
  height: 100%;
  max-height: 60vh;
}

@media screen and (max-width: 767px) {
  .card__body {
    flex-direction: column;
    height: auto;
  }

  .card__portrait {
    width: 100%;
    margin-bottom: 1.6rem;
  }
}
</style>
