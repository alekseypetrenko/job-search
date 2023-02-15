import { shallowMount } from "@vue/test-utils";
jest.mock("vuex");

import JobFiltersSidebar from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue";

import {
  useUniqueOrganizations,
  useUniqueJobTypes,
  useUniqueDegrees,
} from "@/store/composables";
jest.mock("@/store/composables");

const useUniqueJobTypesMock = useUniqueJobTypes as jest.Mock;
const useUniqueOrganizationsMock = useUniqueOrganizations as jest.Mock;
const useUniqueDegreesMock = useUniqueDegrees as jest.Mock;

describe("JobFiltersSidebar", () => {
  it("allows user to filter jobs by job types", () => {
    useUniqueJobTypesMock.mockReturnValue(new Set(["Full-time", "Part-time"]));
    useUniqueOrganizationsMock.mockReturnValue(new Set(["Airbnb"]));
    useUniqueDegreesMock.mockReturnValue(["Associate", "Bachelors"]);

    const wrapper = shallowMount(JobFiltersSidebar);
    const jobTypesFilter: any = wrapper.findComponent(
      '[data-test="job-types-filter"]',
    );

    const { uniqueValues, mutation } = jobTypesFilter.props();
    expect(uniqueValues).toEqual(new Set(["Full-time", "Part-time"]));
    expect(mutation).toBe("ADD_SELECTED_JOB_TYPES");
  });

  it("allows user to filter jobs by organizations", () => {
    useUniqueJobTypesMock.mockReturnValue(new Set(["Full-time", "Part-time"]));
    useUniqueOrganizationsMock.mockReturnValue(new Set(["Airbnb"]));
    useUniqueDegreesMock.mockReturnValue(["Associate", "Bachelors"]);

    const wrapper = shallowMount(JobFiltersSidebar);
    const orgnizationsFilter: any = wrapper.findComponent(
      '[data-test="organizations-filter"]',
    );

    const { uniqueValues, mutation } = orgnizationsFilter.props();

    expect(uniqueValues).toEqual(new Set(["Airbnb"]));
    expect(mutation).toBe("ADD_SELECTED_ORGANIZATIONS");
  });

  it("allows user to filter jobs by degrees", () => {
    useUniqueJobTypesMock.mockReturnValue(new Set(["Full-time", "Part-time"]));
    useUniqueOrganizationsMock.mockReturnValue(new Set(["Airbnb"]));
    useUniqueDegreesMock.mockReturnValue(["Associate", "Bachelors"]);

    const wrapper = shallowMount(JobFiltersSidebar);
    const orgnizationsFilter: any = wrapper.findComponent(
      '[data-test="degrees-filter"]',
    );

    const { uniqueValues, mutation } = orgnizationsFilter.props();

    expect(uniqueValues).toEqual(["Associate", "Bachelors"]);
    expect(mutation).toBe("ADD_SELECTED_DEGREES");
  });
});
