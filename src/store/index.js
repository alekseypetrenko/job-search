import { createStore } from "vuex";

export const state = () => {
  return {
    isLoggedIn: false,
  };
};

export const mutations = {
  LOGIN_USER(state) {
    state.isLoggedIn = true;
  },
};

const store = createStore({
  state,
  mutations,
  getters: {},
  actions: {},
  modules: {},
  strict: process.env.NODE_ENV !== "production",
});

export default store;
