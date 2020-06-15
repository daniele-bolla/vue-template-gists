import Vue from "vue";
import Vuex from "vuex";

import alerts from "./modules/alerts";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    alerts
  },
  strict: debug
});
