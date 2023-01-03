import {
  UNIQUE_ORGANIZATIONS,
  FILTERED_JOBS_BY_ORGANIZATIONS,
  UNIQUE_JOB_TYPES,
} from "@/store/constants";

const getters = {
  [UNIQUE_ORGANIZATIONS](state) {
    const uniqeOrganizations = new Set();
    state.jobs.forEach((job) => {
      uniqeOrganizations.add(job.organization);
    });

    return uniqeOrganizations;
  },

  [FILTERED_JOBS_BY_ORGANIZATIONS](state) {
    if (state.selectedOrganizations.length === 0) {
      return state.jobs;
    }

    return state.jobs.filter((job) =>
      state.selectedOrganizations.includes(job.organization),
    );
  },
  [UNIQUE_JOB_TYPES](state) {
    const uniqJobTypes = new Set();

    state.jobs.forEach((job) => {
      uniqJobTypes.add(job.jobType);
    });

    return uniqJobTypes;
  },
};

export default getters;
