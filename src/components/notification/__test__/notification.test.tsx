import React from "react";
import renderer from "react-test-renderer";

import Notification from "..";

describe("Notification component", () => {
  it("Should exist", () => {
    expect(Notification).toMatchSnapshot();
  });

  it("Should have notification classname", () => {
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

  it("Should concat classname in props with Bulma classname", () => {
    const component = renderer.create(
      <Notification className="other-class this-is-a-test">
        <p>Default</p>
      </Notification>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("Should use inline styles", () => {
    const component = renderer.create(
      <Notification style={{ height: 250 }}>
        <p>Default</p>
      </Notification>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("Should render as Section", () => {
    const component = renderer.create(
      <Notification renderAs="section">
        <p>Default</p>
      </Notification>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("Should use color black", () => {
    const component = renderer.create(
      <Notification color={"black" as "black"}>
        <p>Default</p>
      </Notification>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
