import React from "react";
import renderer from "react-test-renderer";

import { Input } from "../input";

describe("Input component", () => {
  it("should exist", () => {
    expect(Input).toMatchSnapshot();
  });

  it("should have input classname", () => {
    const component = renderer.create(<Input />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should concat classname in props with Bulma classname", () => {
    const component = renderer.create(
      <Input className="other-class this-is-a-test" />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should use inline styles", () => {
    const component = renderer.create(<Input style={{ height: 250 }} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should be type email and a with success colors", () => {
    const component = renderer.create(<Input color="success" type="email" />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should be large and readOnly", () => {
    const component = renderer.create(<Input readOnly size="large" />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should be disabled with placeholder and value", () => {
    const component = renderer.create(
      <Input value="TEST" disabled placeholder="hello tests" />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
