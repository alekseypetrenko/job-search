import { shallowMount, flushPromises } from "@vue/test-utils";
import JobListings from "@/components/JobResults/JobListings";

import axios from "axios";

jest.mock("axios");

describe("JobListings", () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  });

  const createConfig = ($route) => ({
    global: {
      mocks: {
        $route,
      },
    },
  });

  it("fetches jobs", () => {
    axios.get.mockResolvedValue({ data: [] });
    const $route = createRoute();

    shallowMount(JobListings, createConfig($route));
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/jobs");
  });

  it("creates job listing for a maximum of 10 jobs", async () => {
    axios.get.mockResolvedValue({ data: Array(10).fill({}) });
    const queryParams = {
      page: "1",
    };
    const $route = createRoute(queryParams);

    const wrapper = shallowMount(JobListings, createConfig($route));
    await flushPromises();
    const jobListingsList = wrapper.findAll('[data-test="job-listing"]');
    expect(jobListingsList).toHaveLength(10);
  });
});
