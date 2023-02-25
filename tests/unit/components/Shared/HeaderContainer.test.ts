import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import HeaderContainer from "@/components/Shared/HeaderContainer.vue";

describe("HeaderContainer", () => {
  const renderSlot = (config = {}) => {
    render(HeaderContainer, {
      slots: {
        default: "some text",
      },
      ...config,
    });
  };
  it("alows parent container to provide title content", () => {
    const slots = {
      title: "<h2>I am title</h2>",
    };
    const config = { slots };
    renderSlot(config);

    expect(screen.getByText("I am title")).toBeInTheDocument();
  });

  it("alows parent container to provide sub title content", () => {
    const slots = {
      subtitle: "<h1>SUB Title</h1>",
    };
    const config = { slots };
    renderSlot(config);
    expect(screen.getByText("SUB Title")).toBeInTheDocument();
  });
});
