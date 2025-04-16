import { jest } from "@jest/globals";

import { testJest } from "../controllers/user.controller.js";

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("testJest Controller", () => {
  test("testJest returns 200 with message", () => {
    const res = mockResponse();

    testJest({}, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "pong!" });
  });
});
