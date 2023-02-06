import { mount, RouterLinkStub } from "@vue/test-utils";

import JobListing from "@/components/JobResults/JobListing.vue";

import { createJob } from "../../store/utils";
import { Job } from "@/api/types";

describe("JobListing", () => {
  const createConfig = (job: Job) => ({
    props: {
      job: {
        ...job,
      },
    },
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("renders job title", () => {
    const job = createJob({ title: "Vue Dev" });
    const wrapper = mount(JobListing, createConfig(job));
    expect(wrapper.text()).toMatch("Vue Dev");
  });
  it("renders job organization", () => {
    const job = createJob({ organization: "Facebook" });
    const wrapper = mount(JobListing, createConfig(job));
    expect(wrapper.text()).toMatch("Facebook");
  });
  it("renders job locations", () => {
    const job = createJob({ locations: ["USA", "Canada"] });
    const wrapper = mount(JobListing, createConfig(job));
    expect(wrapper.text()).toMatch("Canada");
    expect(wrapper.text()).toMatch("USA");
  });
  it("renders job qualifications", () => {
    const job = createJob({
      minimumQualifications: ["gql", "api"],
    });
    const wrapper = mount(JobListing, createConfig(job));
    expect(wrapper.text()).toMatch("gql");
    expect(wrapper.text()).toMatch("api");
  });

  it("links to individual job page", () => {
    const job = createJob({ id: 15 });
    const wrapper = mount(JobListing, createConfig(job));
    const jobPageLink = wrapper.findComponent(RouterLinkStub);
    const toProp = jobPageLink.props("to");
    expect(toProp).toBe("/jobs/results/15");
  });
});
