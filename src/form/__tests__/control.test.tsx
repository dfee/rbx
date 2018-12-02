import React from "react";
import renderer from "react-test-renderer";

import { Control } from "../control";

describe("Control component", () => {
  it("should exist", () => {
    expect(Control).toMatchSnapshot();
  });

  it("should have control classname", () => {
    const component = renderer.create(
      <Control>
        <p className="bd-notification is-success">
          <p>Default</p>
          <p>Container</p>
        </p>
      </Control>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should concat classname in props with Bulma classname", () => {
    const component = renderer.create(
      <Control className="other-class this-is-a-test">
        <p>Default</p>
      </Control>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should use inline styles", () => {
    const component = renderer.create(
      <Control style={{ height: 250 }}>
        <p>Default</p>
      </Control>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render as a html section element", () => {
    const component = renderer.create(
      <Control<"section"> as="section">
        <p>Default</p>
      </Control>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should be fullwidth, loading and size = large", () => {
    const component = renderer.create(
      <Control fullwidth loading size="large">
        <p>Default</p>
      </Control>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
