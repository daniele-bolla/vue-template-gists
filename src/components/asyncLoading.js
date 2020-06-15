export default {
  name: "AsyncLoading",
  props: {
    promise: {
      type: Function,
      required: true
      // validator: (func) => func instanceof Promise
    },
    delay: {
      type: Number,
      default: 600,
      required: false
    }
  },
  data() {
    return {
      pending: false
    };
  },
  methods: {
    async runPromise() {
      try {
        this.pending = true;
        await this.promise();
      } finally {
        setTimeout(() => {
          this.pending = false;
        }, this.delay);
      }
    }
  },
  render() {
    return this.$scopedSlots.default({
      pending: this.pending,
      runPromise: this.runPromise
    });
  }
};
