import {
  shallowMount,
  flushPromises,
  RouterLinkStub,
  mount,
} from "@vue/test-utils";
import JobListings from "@/components/JobResults/JobListings";

describe("JobListings", () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  });

  const createStore = (config = {}) => ({
    getters: {
      FILTERED_JOBS: [],
    },
    dispatch: jest.fn(),
    ...config,
  });

  const createConfig = ($route, $store) => ({
    global: {
      mocks: {
        $route,
        $store,
      },
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  describe("when component mounts", () => {
    it("makes call to fetch jobs from API", () => {
      const $route = createRoute();
      const dispatch = jest.fn();
      const $store = createStore({
        dispatch,
      });
      shallowMount(JobListings, createConfig($route, $store));
      expect(dispatch).toHaveBeenCalledWith("FETCH_JOBS");
    });
  });

  it("creates job listing for a maximum of 10 jobs", async () => {
    const queryParams = {
      page: "1",
    };
    const $route = createRoute(queryParams);
    const $store = createStore({
      getters: {
        FILTERED_JOBS: Array(15).fill({}),
      },
    });
    const wrapper = shallowMount(JobListings, createConfig($route, $store));
    await flushPromises();
    const jobListingsList = wrapper.findAll('[data-test="job-listing"]');
    expect(jobListingsList).toHaveLength(10);
  });

  describe("when query params exclude page number", () => {
    it("displays page number 1", () => {
      const queryParams = { page: undefined };
      const $route = createRoute(queryParams);
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      expect(wrapper.text()).toMatch("Page 1");
    });
  });

  describe("when query params include page number", () => {
    it("displays page number", () => {
      const queryParams = { page: 3 };
      const $route = createRoute(queryParams);
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      expect(wrapper.text()).toMatch("Page 3");
    });
  });

  describe("when a user is on the first page ", () => {
    it("doesn't show previous page", () => {
      const queryParams = {
        page: "1",
      };
      const $route = createRoute(queryParams);
      const $store = createStore();
      const wrapper = mount(JobListings, createConfig($route, $store));
      const previousLink = wrapper.find('[data-test="previous-link"]');
      expect(previousLink.exists()).toBe(false);
    });

    it("shows next page", async () => {
      const queryParams = {
        page: "1",
      };
      const $route = createRoute(queryParams);
      const $store = createStore({
        getters: {
          FILTERED_JOBS: Array(15).fill({}),
        },
      });
      const wrapper = mount(JobListings, createConfig($route, $store));
      await flushPromises();
      const nextPage = wrapper.find('[data-test="next-link"]');
      expect(nextPage.exists()).toBe(true);
    });
  });

  describe("when a user on the last page", () => {
    it("doesn't show next page", async () => {
      const queryParams = {
        page: "2",
      };
      const $route = createRoute(queryParams);
      const $store = createStore({
        getters: {
          FILTERED_JOBS: Array(15).fill({}),
        },
      });
      const wrapper = mount(JobListings, createConfig($route, $store));
      const nextPage = wrapper.find('[data-test="next-link"]');
      await flushPromises();

      expect(nextPage.exists()).toBe(false);
    });
    it("shows previous page", async () => {
      const queryParams = {
        page: "2",
      };
      const $route = createRoute(queryParams);
      const $store = createStore({
        getters: {
          FILTERED_JOBS: Array(15).fill({}),
        },
      });
      const wrapper = mount(JobListings, createConfig($route, $store));
      const previousPage = wrapper.find('[data-test="previous-link"]');
      await flushPromises();

      expect(previousPage.exists()).toBe(true);
    });
  });
});
