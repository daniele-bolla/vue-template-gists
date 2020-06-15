<template>
  <slider-frame
    :slides="slides"
    v-slot="{ currentIndex, currentItem, currentTransition, next, prev }"
  >
    <div class="slider__wrapper">
      <div class="slider__controls">
        <base-button classes="btn btn--primary btn--large prev" @click="prev"
          >&#10094; Previous</base-button
        >
        <base-button classes="btn btn--primary btn--large next" @click="next">
          Next &#10095;</base-button
        >
      </div>
      <transition-group
        class="slide"
        :name="currentTransition"
        tag="div"
        mode="out-in"
      >
        <div v-for="i in [currentIndex]" :key="i">
          <base-thumbnail
            v-if="currentItem"
            :title="currentItem.title"
            :path="currentItem.path"
            :img="currentItem.poster"
          >
          </base-thumbnail>
        </div>
      </transition-group>
    </div>
  </slider-frame>
</template>
<script>
import SliderFrame from "@/components/SliderFrame";
import BaseButton from "@/components/BaseButton";
import BaseThumbnail from "@/components/BaseThumbnail";

export default {
  components: {
    SliderFrame,
    BaseButton,
    BaseThumbnail
  },
  props: {
    slides: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>
.slider__wrapper {
  overflow: hidden;
}

.slider__controls {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 1rem 0;
}

.next-leave-active,
.next-enter-active {
  transition: 0.5s;
}
.next-enter {
  transform: translate(100%, 0);
}
.next-leave-to {
  transform: translate(-100%, 0);
}

.prev-leave-active,
.prev-enter-active {
  transition: 0.5s;
}
.prev-enter {
  transform: translate(-100%, 0);
}
.prev-leave-to {
  transform: translate(100%, 0);
}
</style>
