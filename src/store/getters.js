import {
  UNIQUE_ORGANIZATIONS,
  FILTERED_JOBS_BY_ORGANIZATIONS,
  UNIQUE_JOB_TYPES,
  FILTERED_JOBS,
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
  [FILTERED_JOBS](state) {
    const noSelectedOrganizations = state.selectedOrganizations.length === 0;
    const noSelectedJobTypes = state.selectedJobTypes.length === 0;
    if (noSelectedOrganizations && noSelectedJobTypes) return state.jobs;

    return state.jobs
      .filter((job) => {
        if (noSelectedOrganizations) return true;

        return state.selectedOrganizations.includes(job.organization);
      })
      .filter((job) => {
        if (noSelectedJobTypes) return true;

        return state.selectedJobTypes.includes(job.jobType);
      });
  },
};

export default getters;
