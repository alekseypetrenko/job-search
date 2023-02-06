import { ref } from "vue";

import {
  shallowMount,
  flushPromises,
  RouterLinkStub,
  mount,
} from "@vue/test-utils";
import JobListings from "@/components/JobResults/JobListings.vue";

import { useFilteredJobs, useFetchJobsDispatch } from "@/store/composables";
jest.mock("@/store/composables");
const useFilteredJobsMock = useFilteredJobs as jest.Mock;

import useCurrentPage from "@/composables/useCurrentPage";
jest.mock("@/composables/useCurrentPage");
const useCurrentPageMock = useCurrentPage as jest.Mock;

import usePeviousAndNextPage from "@/composables/usePeviousAndNextPage";
jest.mock("@/composables/usePeviousAndNextPage");
const usePeviousAndNextPageMock = usePeviousAndNextPage as jest.Mock;

describe("JobListings", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  describe("when component mounts", () => {
    it("makes call to fetch jobs from API", () => {
      useFilteredJobsMock.mockReturnValue({ value: [] });
      useCurrentPageMock.mockReturnValue({ value: 2 });
      usePeviousAndNextPageMock.mockReturnValue({
        previousPage: 1,
        nextPage: 3,
      });

      shallowMount(JobListings, createConfig());
      expect(useFetchJobsDispatch).toHaveBeenCalled();
    });
  });

  it("creates job listing for a maximum of 10 jobs", async () => {
    useFilteredJobsMock.mockReturnValue({ value: Array(15).fill({}) });
    useCurrentPageMock.mockReturnValue({ value: 1 });
    usePeviousAndNextPageMock.mockReturnValue({
      previousPage: undefined,
      nextPage: 2,
    });

    const wrapper = shallowMount(JobListings, createConfig());
    await flushPromises();
    const jobListingsList = wrapper.findAll('[data-test="job-listing"]');
    expect(jobListingsList).toHaveLength(10);
  });

  it("displays page number ", () => {
    useFilteredJobsMock.mockReturnValue({ value: [] });
    useCurrentPageMock.mockReturnValue(ref(5));
    usePeviousAndNextPageMock.mockReturnValue({ previousPage: 4, nextPage: 6 });

    const wrapper = shallowMount(JobListings, createConfig());
    expect(wrapper.text()).toMatch("Page 5");
  });

  describe("when a user is on the first page ", () => {
    it("doesn't show previous page", () => {
      useFilteredJobsMock.mockReturnValue({ value: [] });
      useCurrentPageMock.mockReturnValue(ref(1));
      usePeviousAndNextPageMock.mockReturnValue({
        previousPage: undefined,
        nextPage: 2,
      });

      const wrapper = mount(JobListings, createConfig());
      const previousLink = wrapper.find('[data-test="previous-link"]');
      expect(previousLink.exists()).toBe(false);
    });

    it("shows next page", async () => {
      useFilteredJobsMock.mockReturnValue({ value: [] });
      useCurrentPageMock.mockReturnValue(ref(1));
      usePeviousAndNextPageMock.mockReturnValue({
        previousPage: undefined,
        nextPage: 2,
      });

      const wrapper = mount(JobListings, createConfig());
      await flushPromises();
      const nextPage = wrapper.find('[data-test="next-link"]');
      expect(nextPage.exists()).toBe(true);
    });
  });

  describe("when a user on the last page", () => {
    it("doesn't show next page", async () => {
      useFilteredJobsMock.mockReturnValue({ value: [] });
      useCurrentPageMock.mockReturnValue(ref(2));
      usePeviousAndNextPageMock.mockReturnValue({
        previousPage: 1,
        nextPage: undefined,
      });

      const wrapper = mount(JobListings, createConfig());
      const nextPage = wrapper.find('[data-test="next-link"]');
      await flushPromises();

      expect(nextPage.exists()).toBe(false);
    });
    it("shows previous page", async () => {
      useFilteredJobsMock.mockReturnValue({ value: [] });
      useCurrentPageMock.mockReturnValue(ref(2));
      usePeviousAndNextPageMock.mockReturnValue({
        previousPage: 1,
        nextPage: undefined,
      });

      const wrapper = mount(JobListings, createConfig());
      const previousPage = wrapper.find('[data-test="previous-link"]');
      await flushPromises();

      expect(previousPage.exists()).toBe(true);
    });
  });
});
