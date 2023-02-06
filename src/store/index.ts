import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

import actions from "@/store/actions";
import mutations from "@/store/mutations";
import getters from "@/store/getters";
import state from "@/store/state";

import { GlobalState } from "./types";

export const key: InjectionKey<Store<GlobalState>> = Symbol();

const store = createStore<GlobalState>({
  state,
  mutations,
  actions,
  getters,
  modules: {},
  strict: process.env.NODE_ENV !== "production",
});

export default store;
