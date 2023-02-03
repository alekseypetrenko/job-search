import mutations from "@/store/mutations";
import { GlobalState } from "@/store/types";
import state from "@/store/state";
import { Job } from "@/api/types";

describe("mutations", () => {
  const createState = (config: Partial<GlobalState> = {}): GlobalState => {
    const initialState = state();

    return { ...initialState, ...config };
  };

  const createJob = (config: Partial<Job> = {}): Job => ({
    id: 1,
    title: "Angular Developer",
    organization: "Vue and Me",
    degree: "Master's",
    jobType: "Intern",
    locations: ["Lisbon"],
    minimumQualifications: [],
    preferredQualifications: [],
    description: [],
    dateAdded: "2021-07-04",
    ...config,
  });

  describe("LOGIN_USER", () => {
    it("loggs the user in", () => {
      const state = createState({ isLoggedIn: false });
      mutations.LOGIN_USER(state);
      expect(state.isLoggedIn).toBe(true);
    });
  });
  describe("RECIEVE_JOBS", () => {
    it("recieves jobs from API response", () => {
      const state = createState({ jobs: [] });
      const job1 = createJob();
      const job2 = createJob();
      mutations.RECIEVE_JOBS(state, [job1, job2]);
      expect(state.jobs).toEqual([job1, job2]);
    });
  });
  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updates organizations that the user has chosen to filter jobs by", () => {
      const state = createState({ selectedOrganizations: [] });
      mutations.ADD_SELECTED_ORGANIZATIONS(state, ["Youtube", "Google"]);
      expect(state.selectedOrganizations).toEqual(["Youtube", "Google"]);
    });
  });
  describe("ADD_SELECTED_JOB_TYPES", () => {
    it("updates job types  that the user has chosen to filter by", () => {
      const state = createState({ selectedJobTypes: [] });
      mutations.ADD_SELECTED_JOB_TYPES(state, ["Full-time", "Part-time"]);
      expect(state.selectedJobTypes).toEqual(["Full-time", "Part-time"]);
    });
  });
});
