const add = "add";
const remove = "remove";

const state = [
  {
    id: Date.now(),
    message: "test",
    type: "danger"
  }
];

const getters = {
  // find: (state, _, __, rootGetters) => id => {
  //   return resolveRelations(state.byId[id], ["author"], rootGetters);
  // },
  // list: (state, getters) => {
  //   return state.allIds.map(id => getters.find(id));
  // }
};

const actions = {
  add({ commit }, payload) {
    payload.id = Date.now();
    commit(add, payload);
  },
  remove({ commit }, payload) {
    commit(remove, payload);
  }
};

const mutations = {
  [add](state, payload) {
    state.push(payload);
  },
  [remove](state, payload) {
    state = state.alerts.filter(alert => alert.id !== payload.id);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
