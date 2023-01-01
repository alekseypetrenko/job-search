import { mount } from "@vue/test-utils";
import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";

describe("JobFiltersSidebarOrganizations", () => {
  it("renders uniq list of organizations", async () => {
    const $store = {
      getters: {
        UNIQUE_ORGANIZATIONS: new Set(["Goo", "Amazon"]),
      },
    };
    const wrapper = mount(JobFiltersSidebarOrganizations, {
      global: {
        mocks: {
          $store,
        },
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const organizationLabels = wrapper.findAll("[data-test='organization']");

    const organizations = organizationLabels.map((node) => node.text());
    expect(organizations).toEqual(["Goo", "Amazon"]);
  });
});
