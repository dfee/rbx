import * as Form from "..";

describe("Form component", () => {
  it("should expose all Form elements", () => {
    expect(Form).toMatchSnapshot();
  });
});
