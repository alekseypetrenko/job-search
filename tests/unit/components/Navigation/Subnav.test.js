import { mount } from "@vue/test-utils";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
jest.mock("vuex");
jest.mock("vue-router");

import Subnav from "@/components/Navigation/Subnav.vue";

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
      useRoute.mockReturnValue({
        name: "JobResults",
      });
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
      useRoute.mockReturnValue({
        name: "Home",
      });
      const wrapper = mount(Subnav, createConfig());

      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
