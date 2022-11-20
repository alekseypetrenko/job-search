import { mount, RouterLinkStub } from "@vue/test-utils";

import JobListing from "@/components/JobResults/JobListing";

describe("JobListing", () => {
  const createJobProps = (jobProps = {}) => ({
    title: "Vue Dev",
    organization: "Facebook",
    ...jobProps,
  });
  const createConfig = (jobProps) => ({
    props: {
      job: {
        ...jobProps,
      },
    },
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("renders job title", () => {
    const jobProps = createJobProps({ title: "Vue Dev" });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Vue Dev");
  });
  it("renders job organization", () => {
    const jobProps = createJobProps({ organization: "Facebook" });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Facebook");
  });
  it("renders job locations", () => {
    const jobProps = createJobProps({ locations: ["USA", "Canada"] });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Canada");
    expect(wrapper.text()).toMatch("USA");
  });
  it("renders job qualifications", () => {
    const jobProps = createJobProps({
      minimumQualifications: ["gql", "api"],
    });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("gql");
    expect(wrapper.text()).toMatch("api");
  });

  it("links to individual job page", () => {
    const jobProps = createJobProps({ id: 15 });
    const wrapper = mount(JobListing, createConfig(jobProps));
    const jobPageLink = wrapper.findComponent(RouterLinkStub);
    const toProp = jobPageLink.props("to");
    expect(toProp).toBe("/jobs/results/15");
  });
});
