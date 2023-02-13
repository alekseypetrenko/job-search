import mutations from "@/store/mutations";
import { createState, createJob, createDegree } from "./utils";

describe("mutations", () => {
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
  describe("RECIEVE_DEGREES", () => {
    it("recieves degrees from API response", () => {
      const state = createState({ degrees: [] });
      const degree = createDegree();
      mutations.RECIEVE_DEGREES(state, [degree]);
      expect(state.degrees).toEqual([degree]);
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

  describe("ADD_SELECTED_DEGREES", () => {
    it("keeps track of which degree the user has chosen to filter job by", () => {
      const state = createState({ selectedDegrees: [] });
      mutations.ADD_SELECTED_DEGREES(state, ["Associate", "Bachelor"]);
      expect(state.selectedDegrees).toEqual(["Associate", "Bachelor"]);
    });
  });
});
