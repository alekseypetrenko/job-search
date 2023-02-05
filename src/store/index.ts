import { createStore } from "vuex";
import actions from "@/store/actions";
import mutations from "@/store/mutations";
import getters from "@/store/getters";
import state from "@/store/state";

const store = createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {},
  strict: process.env.NODE_ENV !== "production",
});

export default store;
