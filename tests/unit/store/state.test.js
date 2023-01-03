import state from "@/store/state";

describe("state", () => {
  it("keeps track when user is loggin in", () => {
    const startingState = state();
    expect(startingState.isLoggedIn).toBe(false);
  });
  it("jobs listings", () => {
    const startingState = state();
    expect(startingState.jobs).toEqual([]);
  });
  it("stores organizations that user would like to filter by job", () => {
    const startingState = state();
    expect(startingState.selectedOrganizations).toEqual([]);
  });
  it("stores job types that user would like to filter by", () => {
    const startingState = state();
    expect(startingState.selectedJobTypes).toEqual([]);
  });
});
