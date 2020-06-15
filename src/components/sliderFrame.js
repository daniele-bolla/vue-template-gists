export default {
  props: {
    slides: {
      type: Array,
      requied: true
    }
  },
  data() {
    return {
      currentIndex: 0,
      currentTransition: "next"
    };
  },
  computed: {
    currentItem() {
      return this.slides[Math.abs(this.currentIndex) % this.slides.length];
    }
  },
  methods: {
    next() {
      this.currentIndex += 1;
      this.currentTransition = "next";
    },
    prev() {
      this.currentIndex -= 1;
      this.currentTransition = "prev";
    }
  },
  render() {
    return this.$scopedSlots.default({
      currentIndex: this.currentIndex,
      currentItem: this.currentItem,
      currentTransition: this.currentTransition,
      next: this.next,
      prev: this.prev
    });
  }
};
