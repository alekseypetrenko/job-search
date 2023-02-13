import { mount } from "@vue/test-utils";
import { useStore } from "vuex";
jest.mock("vuex");
const useStoreMock = useStore as jest.Mock;

import { useRouter } from "vue-router";
jest.mock("vue-router");
const useRouterMock = useRouter as jest.Mock;

import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";

describe("JobFiltersSidebarCheckboxGroup", () => {
  const createConfig = (props = {}) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    props: {
      header: "Some header",
      uniqueValues: new Set(["ValueA", "ValueB"]),
      mutation: "Some mutation",
      ...props,
    },
  });

  it("renders uniq list of job types", async () => {
    useStoreMock.mockReturnValue({ commit: jest.fn(), subscribe: jest.fn() });

    const props = {
      uniqueValues: new Set(["ValueA", "ValueB"]),
    };
    const wrapper = mount(JobFiltersSidebarCheckboxGroup, createConfig(props));
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const inputTypesLabels = wrapper.findAll("[data-test='value']");
    const inputValues = inputTypesLabels.map((node) => node.text());
    expect(inputValues).toEqual(["ValueA", "ValueB"]);
  });

  describe("when user click checkbox", () => {
    it("communicates that user has selected checkbox for value", async () => {
      const commit = jest.fn();
      useStoreMock.mockReturnValue({ commit, subscribe: jest.fn() });
      useRouterMock.mockReturnValue({ push: jest.fn() });

      const props = {
        mutation: "SOME_MUTATION",
        uniqueValues: new Set(["Full-time"]),
      };

      const wrapper = mount(
        JobFiltersSidebarCheckboxGroup,
        createConfig(props),
      );

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      const fullTimeInput = wrapper.find("[data-test='Full-time']");
      await fullTimeInput.setValue(true);

      expect(commit).toHaveBeenCalledWith("SOME_MUTATION", ["Full-time"]);
    });

    it("navigates user to the first page", async () => {
      const push = jest.fn();
      useRouterMock.mockReturnValue({ push });

      const props = {
        uniqueValues: new Set(["Full-time"]),
      };

      const wrapper = mount(
        JobFiltersSidebarCheckboxGroup,
        createConfig(props),
      );

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      const fullTimeInput = wrapper.find("[data-test='Full-time']");
      await fullTimeInput.setValue(true);

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
