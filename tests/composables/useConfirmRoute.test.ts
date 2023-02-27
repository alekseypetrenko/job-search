import { useRoute } from "vue-router";
vi.mock("vue-router");

import useConfirmRoute from "@/composables/useConfirmRoute";

const useRouteMock = useRoute as vi.Mock;

describe("useConfirmRoute", () => {
  it("determines if page route macthes soecified route", () => {
    useRouteMock.mockReturnValue({ name: "Home" });
    const routeName = "Home";

    const result = useConfirmRoute(routeName);
    expect(result.value).toBe(true);
  });
});
