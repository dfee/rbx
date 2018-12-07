import React from "react";
import renderer from "react-test-renderer";

import { Help } from "../help";

describe("Help component", () => {
  it("should exist", () => {
    expect(Help).toMatchSnapshot();
  });

  it("should have help classname", () => {
    const component = renderer.create(
      <Help>
        <p className="bd-notification is-success">
          <p>Default</p>
          <p>Container</p>
        </p>
      </Help>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should concat classname in props with Bulma classname", () => {
    const component = renderer.create(
      <Help className="other-class this-is-a-test">
        <p>Default</p>
      </Help>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should use inline styles", () => {
    const component = renderer.create(
      <Help style={{ height: 250 }}>
        <p>Default</p>
      </Help>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should be displayed as a successful message", () => {
    const component = renderer.create(
      <Help color="success">
        <p>Default</p>
      </Help>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
