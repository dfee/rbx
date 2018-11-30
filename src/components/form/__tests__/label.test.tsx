import React from "react";
import renderer from "react-test-renderer";

import { Label } from "../label";

describe("Label component", () => {
  it("should exist", () => {
    expect(Label).toMatchSnapshot();
  });

  it("should have label classname", () => {
    const component = renderer.create(
      <Label>
        Test <a>Give me</a>
      </Label>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should concat classname in props with Bulma classname", () => {
    const component = renderer.create(
      <Label className="other-class this-is-a-test">
        <p>Default</p>
      </Label>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should use inline styles", () => {
    const component = renderer.create(
      <Label style={{ height: 250 }}>
        <p>Default</p>
      </Label>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
