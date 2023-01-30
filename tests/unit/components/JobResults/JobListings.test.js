import { ref } from "vue";

import {
  shallowMount,
  flushPromises,
  RouterLinkStub,
  mount,
} from "@vue/test-utils";
import JobListings from "@/components/JobResults/JobListings";

import { useFilteredJobs, useFetchJobsDispatch } from "@/store/composables";
jest.mock("@/store/composables");

import useCurrentPage from "@/composables/useCurrentPage";
jest.mock("@/composables/useCurrentPage");

import usePeviousAndNextPage from "@/composables/usePeviousAndNextPage";
jest.mock("@/composables/usePeviousAndNextPage");

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
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue({ value: 2 });
      usePeviousAndNextPage.mockReturnValue(
        { previousPage: 1 },
        { nextPage: 3 },
      );

      shallowMount(JobListings, createConfig());
      expect(useFetchJobsDispatch).toHaveBeenCalled();
    });
  });

  it("creates job listing for a maximum of 10 jobs", async () => {
    useFilteredJobs.mockReturnValue({ value: Array(15).fill({}) });
    useCurrentPage.mockReturnValue({ value: 1 });
    usePeviousAndNextPage.mockReturnValue(
      { previousPage: undefined },
      { nextPage: 2 },
    );

    const wrapper = shallowMount(JobListings, createConfig());
    await flushPromises();
    const jobListingsList = wrapper.findAll('[data-test="job-listing"]');
    expect(jobListingsList).toHaveLength(10);
  });

  it("displays page number ", () => {
    useFilteredJobs.mockReturnValue({ value: [] });
    useCurrentPage.mockReturnValue(ref(5));
    usePeviousAndNextPage.mockReturnValue({ previousPage: 4 }, { nextPage: 6 });

    const wrapper = shallowMount(JobListings, createConfig());
    expect(wrapper.text()).toMatch("Page 5");
  });

  describe("when a user is on the first page ", () => {
    it("doesn't show previous page", () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue(ref(1));
      usePeviousAndNextPage.mockReturnValue(
        { previousPage: undefined },
        { nextPage: 2 },
      );

      const wrapper = mount(JobListings, createConfig());
      const previousLink = wrapper.find('[data-test="previous-link"]');
      expect(previousLink.exists()).toBe(false);
    });

    it("shows next page", async () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue(ref(1));
      usePeviousAndNextPage.mockReturnValue({
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
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue(ref(2));
      usePeviousAndNextPage.mockReturnValue(
        { previousPage: 1 },
        { nextPage: undefined },
      );

      const wrapper = mount(JobListings, createConfig());
      const nextPage = wrapper.find('[data-test="next-link"]');
      await flushPromises();

      expect(nextPage.exists()).toBe(false);
    });
    it("shows previous page", async () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue(ref(2));
      usePeviousAndNextPage.mockReturnValue(
        { previousPage: 1 },
        { nextPage: undefined },
      );

      const wrapper = mount(JobListings, createConfig());
      const previousPage = wrapper.find('[data-test="previous-link"]');
      await flushPromises();

      expect(previousPage.exists()).toBe(true);
    });
  });
});
