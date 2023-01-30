import usePeviousAndNextPage from "@/composables/usePeviousAndNextPage";

describe("usePeviousAndNextPage", () => {
  it("calculates page before curent one", () => {
    const currentPage = { value: 8 };
    const maxPage = { value: 10 };
    const { previousPage } = usePeviousAndNextPage(currentPage, maxPage);
    expect(previousPage.value).toBe(7);
  });

  describe("when current page is the first page", () => {
    it("does not provide previous page", () => {
      const currentPage = { value: 1 };
      const maxPage = { value: 10 };
      const { previousPage } = usePeviousAndNextPage(currentPage, maxPage);
      expect(previousPage.value).toBeUndefined();
    });
  });

  it("calculates next page", () => {
    const currentPage = { value: 1 };
    const maxPage = { value: 10 };
    const { nextPage } = usePeviousAndNextPage(currentPage, maxPage);
    expect(nextPage.value).toBe(2);
  });

  describe("when current page is the last page", () => {
    it("does not provide the next page", () => {
      const currentPage = { value: 10 };
      const maxPage = { value: 10 };
      const { nextPage } = usePeviousAndNextPage(currentPage, maxPage);
      expect(nextPage.value).toBeUndefined();
    });
  });
});
