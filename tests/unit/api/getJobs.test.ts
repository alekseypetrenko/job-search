import axios from "axios";
vi.mock("axios");

import getJobs from "@/api/getJobs.ts";
// const axiosGetMock = axios.get as jest.Mock;

describe("getJobs", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "FE dev",
        },
      ],
    });
  });

  it("fethes jobs that candidate can apply to", async () => {
    await getJobs();
    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/jobs");
  });

  it("extracts jobs from response", async () => {
    const jobs = await getJobs();
    expect(jobs).toEqual([
      {
        id: 1,
        title: "FE dev",
      },
    ]);
  });
});
