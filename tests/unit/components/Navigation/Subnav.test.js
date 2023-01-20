import { mount } from "@vue/test-utils";
import { useStore } from "vuex";
jest.mock("vuex");

import Subnav from "@/components/Navigation/Subnav.vue";
import useConfirmRoute from "@/composables/useConfirmRoute";
jest.mock("@/composables/useConfirmRoute");

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
      useConfirmRoute.mockReturnValue(true);
      useStore.mockReturnValue({
        getters: {
          FILTERED_JOBS: [{ id: 1 }, { id: 2 }],
        },
      });

      const wrapper = mount(Subnav, createConfig());

      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.text()).toMatch("2 jobs matched");
    });
  });
  describe("when the user is on Home page", () => {
    it("does NOT display jobs count", () => {
      useConfirmRoute.mockReturnValue(false);

      const wrapper = mount(Subnav, createConfig());

      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
