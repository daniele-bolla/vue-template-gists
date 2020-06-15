<template>
  <div class="videoplayer__container">
    <div class="videoplayer__controls">
      <base-button
        classes="btn btn--primary btn--large prev"
        @click="playPause"
      >
        <img v-if="isPaused" src="../assets/btn-play.png" />
        <img v-else src="../assets/btn-pause.png" />
      </base-button>
    </div>

    <video ref="videoPlayer" class="video-js"></video>
  </div>
</template>

<script>
import videojs from "video.js";
import "../../node_modules/video.js/dist/video-js.css";
import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "VideoPlayer",
  components: {
    BaseButton
  },
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      player: null,
      isPaused: true
    };
  },
  methods: {
    playPause() {
      if (this.isPaused) {
        this.player.play();
      } else {
        this.player.pause();
      }
    }
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options);

    this.player.on("pause", () => {
      this.isPaused = true;
    });

    this.player.on("play", () => {
      this.isPaused = false;
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
};
</script>
<style>
.videoplayer__container {
  width: 100%;
}
.videoplayer__controls {
  padding: 1rem;
}
</style>
