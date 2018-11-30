import React from "react";
import renderer from "react-test-renderer";

import { COLORS } from "@/modifiers/color";
import { Notification } from "../notification";

describe("Notification component", () => {
  it("should exist", () => {
    expect(Notification).toMatchSnapshot();
  });

  it("should have notification classname", () => {
    const component = renderer.create(
      <Notification>
        <img
          alt="placeholder"
          src="http://bulma.io/images/placeholders/128x128.png"
        />
      </Notification>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should concat classname in props with Bulma classname", () => {
    const component = renderer.create(
      <Notification className="other-class this-is-a-test">
        <p>Default</p>
      </Notification>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should use inline styles", () => {
    const component = renderer.create(
      <Notification style={{ height: 250 }}>
        <p>Default</p>
      </Notification>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render as Section", () => {
    const component = renderer.create(
      <Notification<"section"> as="section">
        <p>Default</p>
      </Notification>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  COLORS.map(color =>
    it(`should use color ${color}`, () => {
      const component = renderer.create(
        <Notification color={color}>
          <p>Default {color}</p>
        </Notification>,
      );
      expect(component.toJSON()).toMatchSnapshot();
    }),
  );
});
