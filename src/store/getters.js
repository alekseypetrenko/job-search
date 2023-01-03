import {
  UNIQUE_ORGANIZATIONS,
  FILTERED_JOBS_BY_ORGANIZATIONS,
} from "@/store/constants";

const getters = {
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

export default getters;
