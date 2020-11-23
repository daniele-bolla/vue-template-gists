module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/variables.scss";`
      }
    }
  },
  publicPath: "/vue-template-gists/"

};
