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
  <button
    :type="type"
    :class="`btn btn--${size} btn--${skin}`"
    @click="$emit('click')"
  >
    <span v-if="icon" class="btn__icon">
      <base-icon :name="icon" />
    </span>
    <span v-if="text" class="btn__text">{{ text }}</span>
  </button>
</template>

<script>
import BaseIcon from "@/components/BaseIcon.vue";

export default {
  name: "BaseButton",
  components: {
    BaseIcon
  },
  props: {
    size: {
      type: String,
      default: "medium",
      validator: val => ["small", "medium", "large"].includes(val)
    },
    skin: {
      type: String,
      default: "primary",
      validator: val =>
        ["secondary", "primary", "default", "transparent"].includes(val)
    },
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: "button"
    },
    icon: {
      type: String
    }
  },
  computed: {
    classModifiers() {
      return this.skin.split(",").reduce((classes, modifier) => {
        classes += `btn--${modifier} `;
        return classes;
      }, "");
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/button.scss";
</style>
