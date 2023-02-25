import { defineStore } from "pinia";
import { FETCH_JOBS } from "./constants";
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
  },
});
