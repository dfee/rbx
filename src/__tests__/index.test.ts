import * as rbx from "src";

describe("rbx", () => {
  it("should export all components", () => {
    expect(rbx).toMatchSnapshot();
  });
});
