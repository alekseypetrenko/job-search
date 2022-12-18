import { mount } from "@vue/test-utils";
import Accordion from "@/components/Shared/Accordion";

describe("Accordion", () => {
  it("renders child", async () => {
    const wrapper = mount(Accordion, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
      props: {
        header: "Test",
      },
      slots: {
        default: "<h3>nested child</h3>",
      },
    });

    expect(wrapper.text()).not.toMatch("nested child");

    const clickableArea = wrapper.find('[data-test="clickable-area"]');
    await clickableArea.trigger("click");
    expect(wrapper.text()).toMatch("nested child");
  });
});
