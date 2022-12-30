import { createStore } from "vuex";
import getJobs from "@/api/getJobs";

export const LOGIN_USER = "LOGIN_USER";
export const RECIEVE_JOBS = "RECIEVE_JOBS";
export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS";

export const state = () => {
  return {
    isLoggedIn: false,
    jobs: [],
  };
};

export const mutations = {
  [LOGIN_USER](state) {
    state.isLoggedIn = true;
  },
  [RECIEVE_JOBS](state, jobs) {
    state.jobs = jobs;
  },
};

export const actions = {
  [FETCH_JOBS]: async (context) => {
    const jobListings = await getJobs();
    context.commit(RECIEVE_JOBS, jobListings);
  },
};

export const getters = {
  [UNIQUE_ORGANIZATIONS](state) {
    const uniqeORganizations = new Set();
    state.jobs.forEach((job) => {
      uniqeORganizations.add(job.organization);
    });

    return uniqeORganizations;
  },
};

const store = createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {},
  strict: process.env.NODE_ENV !== "production",
});

export default store;
