import axios from "axios";
jest.mock("axios");

import getJobs from "@/api/getJobs";
const axiosGetMock = axios.get as jest.Mock;

describe("getJobs", () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
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
    expect(axiosGetMock).toHaveBeenCalledWith("http://myfakeapi.com/jobs");
  });

  it("extracts jobs from response", async () => {
    const data = await getJobs();
    expect(data).toEqual([
      {
        id: 1,
        title: "FE dev",
      },
    ]);
  });
});
