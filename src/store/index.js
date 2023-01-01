import { createStore } from "vuex";
import getJobs from "@/api/getJobs";

export const LOGIN_USER = "LOGIN_USER";
export const RECIEVE_JOBS = "RECIEVE_JOBS";
export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS";
export const ADD_SELECTED_ORGANIZATIONS = "ADD_SELECTED_ORGANIZATIONS";
export const FILTERED_JOBS_BY_ORGANIZATIONS = "FILTERED_JOBS_BY_ORGANIZATIONS";

export const state = () => {
  return {
    isLoggedIn: false,
    jobs: [],
    selectedOrganizations: [],
  };
};

export const mutations = {
  [LOGIN_USER](state) {
    state.isLoggedIn = true;
  },
  [RECIEVE_JOBS](state, jobs) {
    state.jobs = jobs;
  },
  [ADD_SELECTED_ORGANIZATIONS](state, organizations) {
    state.selectedOrganizations = organizations;
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

  [FILTERED_JOBS_BY_ORGANIZATIONS](state) {
    if (state.selectedOrganizations.length === 0) {
      return state.jobs;
    }

    return state.jobs.filter((job) =>
      state.selectedOrganizations.includes(job.organization),
    );
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
