import axios from "axios";
jest.mock("axios");

import getDegrees from "@/api/getDegrees";
const axiosGetMock = axios.get as jest.Mock;

describe("getDegrees", () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          degree: "Associate",
        },
      ],
    });
  });

  it("fethes degrees that candidate can apply to", async () => {
    await getDegrees();
    expect(axiosGetMock).toHaveBeenCalledWith("http://myfakeapi.com/degrees");
  });

  it("extracts degrees from response", async () => {
    const data = await getDegrees();
    expect(data).toEqual([
      {
        id: 1,
        degree: "Associate",
      },
    ]);
  });
});
