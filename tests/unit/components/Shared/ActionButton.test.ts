import { mount } from "@vue/test-utils";
import ActionButton from "@/components/Shared/ActionButton.vue";

describe("ActionButton", () => {
  it("renders text", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "I am text",
      },
    });

    expect(wrapper.text()).toMatch("I am text");
  });

  it("applies one of several css style to the button", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "I am text",
        type: "primary",
      },
    });

    const button = wrapper.find("button");
    expect(button.classes("primary")).toBe(true);
  });
});
