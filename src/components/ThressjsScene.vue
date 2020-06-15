<template>
  <div class="scene" ref="scene"></div>
</template>

<script>
import { Scene, PerspectiveCamera, WebGLRenderer, Color } from "three";

var scene = new Scene();
scene.background = new Color("skyblue");
var renderer = new WebGLRenderer({ antialias: true });

export default {
  name: "Scene",
  data() {
    return {
      renderer,
      scene,
      container: null,
      camera: null
    };
  },
  computed: {
    width() {
      return this.container.clientWidth;
    },
    height() {
      return this.container.clientHeight;
    },
    aspect() {
      return this.container.clientWidth / this.container.clientHeight;
    }
  },
  async mounted() {
    this.container = this.$refs.scene;

    const fov = 60;
    const near = 0.1;
    const far = 30;
    this.camera = new PerspectiveCamera(fov, this.aspect, near, far);
    this.camera.position.set(0, 5, 10);

    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.gammaFactor = 2.2;
    this.renderer.physicallyCorrectLights = true;

    this.container.appendChild(this.renderer.domElement);
  }
};
</script>

<style scoped>
.scene {
  width: 100%;
  height: 100%;
}
</style>
