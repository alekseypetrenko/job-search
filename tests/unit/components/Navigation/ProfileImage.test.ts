import { render, screen } from "@testing-library/vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";

describe("ProfileImage", () => {
  it("renders", () => {
    render(ProfileImage);

    const profileImage = screen.queryByRole("img", {
      name: /user profile image/i,
    });

    expect(profileImage).toBeInTheDocument();
  });
});
