import { render, screen } from "@testing-library/vue";

import ActionButton from "@/components/Shared/ActionButton.vue";

describe("ActionButton", () => {
  it("renders text", () => {
    render(ActionButton, {
      props: {
        text: "I am text",
        type: "primary",
      },
    });

    const button = screen.getByRole("button", {
      name: /I am text/i,
    });

    expect(button).toBeInTheDocument();
  });

  it("applies one of several css style to the button", () => {
    render(ActionButton, {
      props: {
        text: "I am text",
        type: "primary",
      },
    });

    const button = screen.getByRole("button", {
      name: /I am text/i,
    });

    expect(button).toHaveClass("primary");
  });
});
