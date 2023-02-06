import { shallowMount } from "@vue/test-utils";

import JobFiltersSidebar from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue";

import { useUniqueOrganizations, useUniqueJobTypes } from "@/store/composables";
jest.mock("@/store/composables");

const useUniqueJobTypesMock = useUniqueJobTypes as jest.Mock;
const useUniqueOrganizationsMock = useUniqueOrganizations as jest.Mock;

describe("JobFiltersSidebar", () => {
  it("allows user to filter jobs by job types", () => {
    useUniqueJobTypesMock.mockReturnValue(new Set(["Full-time", "Part-time"]));
    useUniqueOrganizationsMock.mockReturnValue(new Set(["Airbnb"]));

    const wrapper = shallowMount(JobFiltersSidebar);
    const jobTypesFilter: any = wrapper.findComponent(
      '[data-test="job-types-filter"]',
    );

    const { header, uniqueValues } = jobTypesFilter.props();
    expect(header).toBe("Job Types");
    expect(uniqueValues).toEqual(new Set(["Full-time", "Part-time"]));
  });

  it("allows user to filter jobs by organizations", () => {
    useUniqueJobTypesMock.mockReturnValue(new Set(["Full-time", "Part-time"]));
    useUniqueOrganizationsMock.mockReturnValue(new Set(["Airbnb"]));

    const wrapper = shallowMount(JobFiltersSidebar);
    const orgnizationsFilter: any = wrapper.findComponent(
      '[data-test="organizations-filter"]',
    );

    const { header, uniqueValues } = orgnizationsFilter.props();
    expect(header).toBe("Organizations");
    expect(uniqueValues).toEqual(new Set(["Airbnb"]));
  });
});
