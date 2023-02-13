import { useStore } from "vuex";
jest.mock("vuex");

const useStoreMock = useStore as jest.Mock;

import {
  useFilteredJobs,
  useUniqueJobTypes,
  useUniqueOrganizations,
  useFetchJobsDispatch,
  useUniqueDegrees,
  useFetchDegreesDispatch,
} from "@/store/composables";

describe("composables", () => {
  describe("useFilteredJobs", () => {
    it("retrieves filtered jobs from store", () => {
      useStoreMock.mockReturnValue({
        getters: {
          FILTERED_JOBS: [{ id: 1 }],
        },
      });
      const result = useFilteredJobs();
      expect(result.value).toEqual([{ id: 1 }]);
    });
  });

  describe("useUniqueJobTypes", () => {
    it("retrieves unique jobs from store", () => {
      useStoreMock.mockReturnValue({
        getters: {
          UNIQUE_JOB_TYPES: new Set(["Full-time"]),
        },
      });

      const result = useUniqueJobTypes();
      expect(result.value).toEqual(new Set(["Full-time"]));
    });
  });

  describe("useUniqueOrganizations", () => {
    it("retrieves unique organizations from store", () => {
      useStoreMock.mockReturnValue({
        getters: {
          UNIQUE_ORGANIZATIONS: new Set(["Google"]),
        },
      });

      const result = useUniqueOrganizations();
      expect(result.value).toEqual(new Set(["Google"]));
    });
  });

  describe("useUniqueDegrees", () => {
    it("retrieves unique degrees from store", () => {
      useStoreMock.mockReturnValue({
        getters: {
          UNIQUE_DEGREES: ["Associate"],
        },
      });

      const result = useUniqueDegrees();
      expect(result.value).toEqual(["Associate"]);
    });
  });

  describe("useFetchJobsDispatch", () => {
    it("send call to fetch jobs from API", () => {
      const dispatch = jest.fn();
      useStoreMock.mockReturnValue({
        dispatch,
      });

      useFetchJobsDispatch();
      expect(dispatch).toHaveBeenCalledWith("FETCH_JOBS");
    });
  });

  describe("useFetchDegreesDispatch", () => {
    it("send call to fetch degrees from API", () => {
      const dispatch = jest.fn();
      useStoreMock.mockReturnValue({
        dispatch,
      });

      useFetchDegreesDispatch();
      expect(dispatch).toHaveBeenCalledWith("FETCH_DEGREES");
    });
  });
});
