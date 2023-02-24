import { mount } from "@vue/test-utils";

const useStoreMock = useStore as jest.Mock;

import JobFiltersSidebarPrompt from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarPrompt.vue";

describe("JobFiltersSidebarPrompt", () => {
  describe("when user clicks clear filters button", () => {
    it("send message to clear all users selection", async () => {
      const commit = jest.fn();
      useStoreMock.mockReturnValue({ commit });
      const wrapper = mount(JobFiltersSidebarPrompt);
      const button = wrapper.find("[data-test='clear-all-filters']");
      await button.trigger("click");
      expect(commit).toHaveBeenCalledWith("CLEAR_USER_JOB_FILTER_SELECTIONS");
    });
  });
});
