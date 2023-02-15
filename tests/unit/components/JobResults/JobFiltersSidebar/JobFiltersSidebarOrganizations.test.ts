import { shallowMount } from "@vue/test-utils";

import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";

import { useUniqueOrganizations } from "@/store/composables";
jest.mock("@/store/composables");

const useUniqueOrganizationsMock = useUniqueOrganizations as jest.Mock;

describe("JobFiltersSidebarOrganizations", () => {
  it("allows user to filter jobs by organizations", () => {
    useUniqueOrganizationsMock.mockReturnValue(new Set(["Airbnb"]));

    const wrapper = shallowMount(JobFiltersSidebarOrganizations);
    const orgnizationsFilter = wrapper.findComponent({
      name: "JobFiltersSidebarCheckboxGroup",
    });

    const { uniqueValues, mutation } = orgnizationsFilter.props();

    expect(uniqueValues).toEqual(new Set(["Airbnb"]));
    expect(mutation).toBe("ADD_SELECTED_ORGANIZATIONS");
  });
});
