import { mount } from "@vue/test-utils";
import ProfileImage from "@/components/Navigation/ProfileImage";

describe("ProfileImage", () => {
  it("renders", () => {
    const wrapper = mount(ProfileImage);
    expect(wrapper.exists()).toBe(true);
  });
});
