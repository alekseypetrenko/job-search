import { useRoute } from "vue-router";
vi.mock("vue-router");

import useCurrentPage from "@/composables/useCurrentPage";

const useRouteMock = useRoute as vi.Mock;

describe("useCurrentPage", () => {
  describe("when query params include page", () => {
    it("return page", () => {
      useRouteMock.mockReturnValue({
        query: {
          page: "5",
        },
      });

      const result = useCurrentPage();
      expect(result.value).toBe(5);
    });
  });

  describe("when query params exclude page", () => {
    it("defaults to page 1", () => {
      useRouteMock.mockReturnValue({
        query: {},
      });

      const result = useCurrentPage();
      expect(result.value).toBe(1);
    });
  });
});
