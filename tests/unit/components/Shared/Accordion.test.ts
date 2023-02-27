import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import Accordion from "@/components/Shared/Accordion.vue";

describe("Accordion", () => {
  const renderSlot = (config = {}) => {
    render(Accordion, {
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
  };
  it("renders child content", async () => {
    renderSlot();
    expect(screen.queryByText("nested child")).not.toBeInTheDocument();
    const button = screen.getByRole("button", { name: /Test/i });
    await userEvent.click(button);
    expect(screen.queryByText("nested child")).toBeInTheDocument();
  });

  describe("when we do not provide custom child content", () => {
    it("renders default content", async () => {
      const slots = {};
      const config = { slots };
      renderSlot(config);
      const button = screen.getByRole("button", { name: /Test/i });
      await userEvent.click(button);
      expect(screen.queryByText("Default text")).toBeInTheDocument();
    });
  });
});
