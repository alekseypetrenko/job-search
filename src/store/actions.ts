import { FETCH_JOBS, RECIEVE_JOBS } from "@/store/constants";
import getJobs from "@/api/getJobs";
// import getDegrees from "@/api/getDegrees";

import { Commit } from "vuex";

interface Context {
  commit: Commit;
}

const actions = {
  [FETCH_JOBS]: async (context: Context) => {
    const jobListings = await getJobs();
    context.commit(RECIEVE_JOBS, jobListings);
  },
  // [FETCH_JOBS]: async (context: Context) => {
  //   const jobListings = await getJobs();
  //   context.commit(RECIEVE_JOBS, jobListings);
  // },
};

export default actions;
