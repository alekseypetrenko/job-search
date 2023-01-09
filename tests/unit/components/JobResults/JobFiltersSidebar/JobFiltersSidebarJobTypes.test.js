import { mount } from "@vue/test-utils";
import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";

describe("JobFiltersSidebarJobTypes", () => {
  const createConfig = ($store, $router) => ({
    global: {
      mocks: {
        $store,
        $router,
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it("renders uniq list of job types", async () => {
    const $router = {
      push: jest.fn(),
    };

    const $store = {
      getters: {
        UNIQUE_JOB_TYPES: new Set(["Full-time", "Part-time"]),
      },
    };
    const wrapper = mount(
      JobFiltersSidebarJobTypes,
      createConfig($store, $router),
    );
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const jobTypesLabels = wrapper.findAll("[data-test='job-type']");

    const jobTypes = jobTypesLabels.map((node) => node.text());
    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });

  describe("when user click checkbox", () => {
    it("communicates that user has selected checkbox for job types", async () => {
      const $router = {
        push: jest.fn(),
      };
      const commit = jest.fn();
      const $store = {
        getters: {
          UNIQUE_JOB_TYPES: new Set(["Full-time", "Part-time"]),
        },
        commit,
      };
      const wrapper = mount(
        JobFiltersSidebarJobTypes,
        createConfig($store, $router),
      );

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      const fullTimeInput = wrapper.find("[data-test='Full-time']");
      await fullTimeInput.setChecked();

      expect(commit).toHaveBeenCalledWith("ADD_SELECTED_JOB_TYPES", [
        "Full-time",
      ]);
    });

    it("navigates user to the first page", async () => {
      const $store = {
        getters: {
          UNIQUE_JOB_TYPES: new Set(["Full-time", "Part-time"]),
        },
        commit: jest.fn(),
      };
      const push = jest.fn();
      const $router = {
        push,
      };
      const wrapper = mount(
        JobFiltersSidebarJobTypes,
        createConfig($store, $router),
      );

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      const fullTimeInput = wrapper.find("[data-test='Full-time']");
      await fullTimeInput.setChecked();

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
