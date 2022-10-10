import { mount } from "@vue/test-utils";
import ProfileImage from "@/components/ProfileImage";

describe("ProfileImage", () => {
  it("renders", () => {
    const wrapper = mount(ProfileImage);
    expect(wrapper.exists()).toBe(true);
  });
});
