import { mount } from "@vue/test-utils";

import { useFilteredJobs } from "@/store/composables";
jest.mock("@/store/composables");

import Subnav from "@/components/Navigation/Subnav.vue";
import useConfirmRoute from "@/composables/useConfirmRoute";
jest.mock("@/composables/useConfirmRoute");

const useConfirmRouteMock = useConfirmRoute as jest.Mock;
const useFilteredJobsMock = useFilteredJobs as jest.Mock;

describe("Subnav", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe("when the user is on job page", () => {
    it("displays jobs count", () => {
      useConfirmRouteMock.mockReturnValue(true);
      useFilteredJobsMock.mockReturnValue([{ id: 1 }, { id: 2 }]);

      const wrapper = mount(Subnav, createConfig());

      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.text()).toMatch("2 jobs matched");
    });
  });
  describe("when the user is on Home page", () => {
    it("does NOT display jobs count", () => {
      useConfirmRouteMock.mockReturnValue(false);
      useFilteredJobsMock.mockReturnValue([]);

      const wrapper = mount(Subnav, createConfig());

      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
