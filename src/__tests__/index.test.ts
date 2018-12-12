import * as rbx from "..";

describe("rbx", () => {
  it("should export all components", () => {
    expect(rbx).toMatchSnapshot();
  });
});
