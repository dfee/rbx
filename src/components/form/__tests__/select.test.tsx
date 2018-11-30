import React from "react";
import renderer from "react-test-renderer";

import { Select } from "../select";

describe("Select component", () => {
  it("should exist", () => {
    expect(Select).toMatchSnapshot();
  });

  it("should have select classname", () => {
    const component = renderer.create(
      <Select>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </Select>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should concat classname in props with Bulma classname", () => {
    const component = renderer.create(
      <Select className="other-class this-is-a-test">
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </Select>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should use inline styles", () => {
    const component = renderer.create(
      <Select style={{ width: "100%" }}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </Select>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should be large, red, disabled and multioption", () => {
    const component = renderer.create(
      <Select color="danger" size="large" multiple disabled>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </Select>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
