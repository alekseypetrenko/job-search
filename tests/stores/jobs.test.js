import { createPinia, setActivePinia } from "pinia";
import { useJobsStore } from "@/stores/jobs";

import axios from "axios";
vi.mock("axios");

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores job listings", () => {
    const store = useJobsStore();
    expect(store.jobs).toEqual([]);
  });
});

describe("actions", () => {
  describe("FETCH_JOBS", () => {
    it("makes API requets and store jobs", async () => {
      axios.get.mockResolvedValue({
        data: [
          { id: 1, job: "Vue" },
          { id: 2, job: "React" },
        ],
      });

      const store = useJobsStore();
      await store.FETCH_JOBS();
      expect(store.jobs).toEqual([
        { id: 1, job: "Vue" },
        { id: 2, job: "React" },
      ]);
    });
  });
});
