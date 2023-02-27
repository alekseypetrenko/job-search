import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import axios from "axios";
vi.mock("axios");
const axiosGetMock = axios.get as Mock;

import Spotlight from "@/components/JobSearch/Spotlight.vue";

describe("Spotlight", () => {
  const mockSpotlightResponse = (data = {}) => {
    axiosGetMock.mockResolvedValue({
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
    render(Spotlight, {
      slots: {
        default: `
        <template #default="slotProps">
        <h1>{{slotProps.img}}</h1>
        </template>
        `,
      },
    });
    const imageText = await screen.findByText("Some Image test");
    expect(imageText).toBeInTheDocument();
  });
  it("provides title to parent component", async () => {
    const data = { title: "Title test" };
    mockSpotlightResponse(data);
    render(Spotlight, {
      slots: {
        default: `
        <template #default="slotProps">
        <h1>{{slotProps.title}}</h1>
        </template>
        `,
      },
    });
    const titleText = await screen.findByText("Title test");
    expect(titleText).toBeInTheDocument();
  });
  it("provides description to parent component", async () => {
    const data = { description: "Some description" };
    mockSpotlightResponse(data);
    render(Spotlight, {
      slots: {
        default: `
        <template #default="slotProps">
        <h1>{{slotProps.description}}</h1>
        </template>
        `,
      },
    });
    const decription = await screen.findByText("Some description");
    expect(decription).toBeInTheDocument();
  });
});
