import {
  UNIQUE_ORGANIZATIONS,
  FILTERED_JOBS_BY_ORGANIZATIONS,
  UNIQUE_JOB_TYPES,
  FILTERED_JOBS,
  INCLUDE_JOB_BY_ORGANIZATION,
  INCLUDE_JOB_BY_JOB_TYPE,
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
  [INCLUDE_JOB_BY_ORGANIZATION]: (state) => (job) => {
    if (state.selectedOrganizations.length === 0) return true;

    return state.selectedOrganizations.includes(job.organization);
  },
  [INCLUDE_JOB_BY_JOB_TYPE]: (state) => (job) => {
    if (state.selectedJobTypes.length === 0) return true;

    return state.selectedJobTypes.includes(job.jobType);
  },
  [FILTERED_JOBS](state, getters) {
    return state.jobs
      .filter((job) => getters.INCLUDE_JOB_BY_ORGANIZATION(job))
      .filter((job) => getters.INCLUDE_JOB_BY_JOB_TYPE(job));
  },
};

export default getters;
