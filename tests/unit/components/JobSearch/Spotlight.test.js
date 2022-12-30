import { mount, flushPromises } from "@vue/test-utils";
import axios from "axios";
jest.mock("axios");

import Spotlight from "@/components/JobSearch/Spotlight.vue";

describe("Spotlight", () => {
  const mockSpotlightResponse = (data = {}) => {
    axios.get.mockResolvedValue({
      data: [
        {
          img: "Some image",
          title: "Title test",
          description: "description",
          ...data,
        },
      ],
    });
  };

  it("provides img to parent component", async () => {
    const data = { img: "Some Image test" };
    mockSpotlightResponse(data);
    const wrapper = mount(Spotlight, {
      slots: {
        default: `
        <template #default="slotProps">
        <h1>{{slotProps.img}}</h1>
        </template>
        `,
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch("Some Image test");
  });
  it("provides title to parent component", async () => {
    const data = { title: "Title test" };
    mockSpotlightResponse(data);
    const wrapper = mount(Spotlight, {
      slots: {
        default: `
        <template #default="slotProps">
        <h1>{{slotProps.title}}</h1>
        </template>
        `,
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch("Title test");
  });
  it("provides description to parent component", async () => {
    const data = { description: "Some description" };
    mockSpotlightResponse(data);
    const wrapper = mount(Spotlight, {
      slots: {
        default: `
        <template #default="slotProps">
        <h1>{{slotProps.description}}</h1>
        </template>
        `,
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch("Some description");
  });
});
