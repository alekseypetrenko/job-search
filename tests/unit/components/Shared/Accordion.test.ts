import { mount } from "@vue/test-utils";
import Accordion from "@/components/Shared/Accordion.vue";

describe("Accordion", () => {
  const createConfig = (config = {}) => ({
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
    ...config,
  });

  it("renders child", async () => {
    const slots = {
      default: "<h3>another nested child</h3>",
    };
    const config = { slots };
    const wrapper = mount(Accordion, createConfig(config));

    expect(wrapper.text()).not.toMatch("another nested child");

    const clickableArea = wrapper.find('[data-test="clickable-area"]');
    await clickableArea.trigger("click");
    expect(wrapper.text()).toMatch("another nested child");
  });

  describe("when we do not provide custom child content", () => {
    it("renders default content", async () => {
      const slots = {};
      const config = { slots };
      const wrapper = mount(Accordion, createConfig(config));

      const clickableArea = wrapper.find('[data-test="clickable-area"]');
      await clickableArea.trigger("click");
      expect(wrapper.text()).toMatch("Default text");
    });
  });
});
