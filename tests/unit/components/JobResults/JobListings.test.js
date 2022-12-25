import {
  shallowMount,
  flushPromises,
  RouterLinkStub,
  mount,
} from "@vue/test-utils";
import JobListings from "@/components/JobResults/JobListings";

import axios from "axios";

jest.mock("axios");

describe("JobListings", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
  });

  afterEach(() => {
    axios.get.mockReset();
  });
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
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("fetches jobs", () => {
    const $route = createRoute();

    shallowMount(JobListings, createConfig($route));
    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/jobs");
  });

  it("creates job listing for a maximum of 10 jobs", async () => {
    const queryParams = {
      page: "1",
    };
    const $route = createRoute(queryParams);
    const wrapper = shallowMount(JobListings, createConfig($route));
    await flushPromises();
    const jobListingsList = wrapper.findAll('[data-test="job-listing"]');
    expect(jobListingsList).toHaveLength(10);
  });

  describe("when query params exclude page number", () => {
    it("displays page number 1", () => {
      const queryParams = { page: undefined };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, createConfig($route));
      expect(wrapper.text()).toMatch("Page 1");
    });
  });

  describe("when query params include page number", () => {
    it("displays page number", () => {
      const queryParams = { page: 3 };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, createConfig($route));
      expect(wrapper.text()).toMatch("Page 3");
    });
  });

  describe("when a user is on the first page ", () => {
    it("doesn't show previous page", () => {
      const queryParams = {
        page: "1",
      };
      const $route = createRoute(queryParams);
      const wrapper = mount(JobListings, createConfig($route));
      const previousLink = wrapper.find('[data-test="previous-link"]');
      expect(previousLink.exists()).toBe(false);
    });

    it("shows next page", async () => {
      const queryParams = {
        page: "1",
      };
      const $route = createRoute(queryParams);
      const wrapper = mount(JobListings, createConfig($route));
      await flushPromises();
      const nextPage = wrapper.find('[data-test="next-link"]');
      expect(nextPage.exists()).toBe(true);
    });
  });

  describe("when a user on the last page", () => {
    it("doesn't show next page", async () => {
      axios.get.mockResolvedValue({ data: Array(19).fill({}) });

      const queryParams = {
        page: "2",
      };
      const $route = createRoute(queryParams);
      const wrapper = mount(JobListings, createConfig($route));
      const nextPage = wrapper.find('[data-test="next-link"]');
      await flushPromises();

      expect(nextPage.exists()).toBe(false);
    });
    it("shows previous page", async () => {
      axios.get.mockResolvedValue({ data: Array(19).fill({}) });

      const queryParams = {
        page: "2",
      };
      const $route = createRoute(queryParams);
      const wrapper = mount(JobListings, createConfig($route));
      const previousPage = wrapper.find('[data-test="previous-link"]');
      await flushPromises();

      expect(previousPage.exists()).toBe(true);
    });
  });
});
