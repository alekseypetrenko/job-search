import { render, screen } from "@testing-library/vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";

describe("ProfileImage", () => {
  it("renders", () => {
    render(ProfileImage);

    const profileImage = screen.queryByRole("img", {
      name: "User profile image",
    });

    expect(profileImage).toBeInTheDocument();
  });
});
