import { defineStore } from "pinia";
import { FETCH_JOBS, UNIQUE_ORGANIZATIONS } from "./constants";
import getJobs from "@/api/getJobs";

export const useJobsStore = defineStore("jobs", {
  state: () => ({
    jobs: [],
  }),
  actions: {
    async [FETCH_JOBS]() {
      const jobs = await getJobs();
      this.jobs = jobs;
    },
  },
  getters: {
    ALL_JOBS(state) {
      return state.jobs;
    },
    [UNIQUE_ORGANIZATIONS](state) {
      const uniqOrganiations = new Set();
      state.jobs.forEach((job) => uniqOrganiations.add(job.organization));
      return uniqOrganiations;
    },
  },
});
