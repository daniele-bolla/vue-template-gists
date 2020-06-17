<script>
export default {
  template: "",
  props: {
    icon: String
  },
  created() {
    this.$options.template = require(`!svg-inline-loader!../../icons/${this.icon}.svg`);
  }
};
</script>
