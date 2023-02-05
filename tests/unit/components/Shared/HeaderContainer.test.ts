import { mount } from "@vue/test-utils";
import HeaderContainer from "@/components/Shared/HeaderContainer.vue";

describe("HeaderContainer", () => {
  it("alows parent container to provide title content", () => {
    const wrapper = mount(HeaderContainer, {
      slots: {
        title: "<h1>H1 Title</h1>",
      },
    });

    expect(wrapper.text()).toMatch("H1 Title");
  });

  it("alows parent container to provide sub title content", () => {
    const wrapper = mount(HeaderContainer, {
      slots: {
        subtitle: "<h1>SUB Title</h1>",
      },
    });

    expect(wrapper.text()).toMatch("SUB Title");
  });
});
