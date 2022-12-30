import { actions, getters, mutations, state } from "@/store";
import getJobs from "@/api/getJobs";

jest.mock("@/api/getJobs");

describe("state", () => {
  it("keeps track when user is loggin in", () => {
    const startingState = state();
    expect(startingState.isLoggedIn).toBe(false);
  });
  it("jobs listings", () => {
    const startingState = state();
    expect(startingState.jobs).toEqual([]);
  });
});

describe("mutations", () => {
  describe("LOGIN_USER", () => {
    it("loggs the user in", () => {
      const state = { isLoggedIn: false };
      mutations.LOGIN_USER(state);
      expect(state).toEqual({ isLoggedIn: true });
    });
  });
  describe("RECIEVE_JOBS", () => {
    it("recieves jobs from API response", () => {
      const state = { jobs: [] };
      mutations.RECIEVE_JOBS(state, ["Job 1", "Job 2"]);
      expect(state).toEqual({ jobs: ["Job 1", "Job 2"] });
    });
  });
});

describe("actions", () => {
  describe("FETCH_JOBS", () => {
    beforeEach(() => {
      getJobs.mockResolvedValue([
        {
          id: 1,
          title: "Developer",
        },
      ]);
    });

    it("makes request to fetch jobs", async () => {
      const context = { commit: jest.fn() };
      await actions.FETCH_JOBS(context);
      expect(getJobs).toHaveBeenCalled();
    });

    it("send message to save recieved jobs in store", async () => {
      const commit = jest.fn();
      const context = { commit };
      await actions.FETCH_JOBS(context);

      expect(commit).toHaveBeenCalledWith("RECIEVE_JOBS", [
        {
          id: 1,
          title: "Developer",
        },
      ]);
    });
  });
});

describe("getters", () => {
  it("finds unique organizations from the list of jobs", () => {
    const state = {
      jobs: [
        { organization: "Google" },
        { organization: "Amazon" },
        { organization: "Google" },
      ],
    };

    const result = getters.UNIQUE_ORGANIZATIONS(state);
    expect(result).toEqual(new Set(["Google", "Amazon"]));
  });
});
