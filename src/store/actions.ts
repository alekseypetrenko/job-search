import {
  FETCH_JOBS,
  RECIEVE_JOBS,
  FETCH_DEGREES,
  RECIEVE_DEGREES,
} from "@/store/constants";
import getJobs from "@/api/getJobs";
import getDegrees from "@/api/getDegrees";

import { Commit } from "vuex";

interface Context {
  commit: Commit;
}

const actions = {
  [FETCH_JOBS]: async (context: Context) => {
    const jobListings = await getJobs();
    context.commit(RECIEVE_JOBS, jobListings);
  },
  [FETCH_DEGREES]: async (context: Context) => {
    const degrees = await getDegrees();
    context.commit(RECIEVE_DEGREES, degrees);
  },
};

export default actions;
