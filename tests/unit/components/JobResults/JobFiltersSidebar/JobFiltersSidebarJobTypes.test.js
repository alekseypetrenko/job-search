import { mount } from "@vue/test-utils";
import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";

describe("JobFiltersSidebarJobTypes", () => {
  const createConfig = ($store) => ({
    global: {
      mocks: {
        $store,
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it("renders uniq list of job types", async () => {
    const $store = {
      getters: {
        UNIQUE_JOB_TYPES: new Set(["Full-time", "Part-time"]),
      },
    };
    const wrapper = mount(JobFiltersSidebarJobTypes, createConfig($store));
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const jobTypesLabels = wrapper.findAll("[data-test='job-type']");

    const jobTypes = jobTypesLabels.map((node) => node.text());
    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });

  it("communicates that user has selected checkbox for job types", async () => {
    const commit = jest.fn();
    const $store = {
      getters: {
        UNIQUE_JOB_TYPES: new Set(["Full-time", "Part-time"]),
      },
      commit,
    };
    const wrapper = mount(JobFiltersSidebarJobTypes, createConfig($store));

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const fullTimeInput = wrapper.find("[data-test='Full-time']");
    await fullTimeInput.setChecked();

    expect(commit).toHaveBeenCalledWith("ADD_SELECTED_JOB_TYPES", [
      "Full-time",
    ]);
  });
});
