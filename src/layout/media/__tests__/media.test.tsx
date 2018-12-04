import React from "react";
import renderer from "react-test-renderer";

import { Media } from "../media";

describe("Media component", () => {
  it("should exist", () => {
    expect(Media).toMatchSnapshot();
  });

  it("should expose Level Side and Item", () => {
    expect(Media.Item).toMatchSnapshot();
  });

  it("should have media classname", () => {
    const component = renderer.create(
      <Media>
        <img
          alt="placeholder"
          src="http://bulma.io/images/placeholders/128x128.png"
        />
      </Media>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should be a Media Item", () => {
    const component = renderer.create(
      <Media.Item<"figure"> as="figure" position="left">
        <img
          alt="placeholder"
          src="http://bulma.io/images/placeholders/128x128.png"
        />
      </Media.Item>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should be a Media Content", () => {
    const component = renderer.create(
      <Media.Item<"figure"> as="figure" position="content">
        <img
          alt="placeholder"
          src="http://bulma.io/images/placeholders/128x128.png"
        />
      </Media.Item>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should concat classname in props with Bulma classname", () => {
    const component = renderer.create(
      <Media className="other-class this-is-a-test">
        <p>Default</p>
      </Media>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should use inline styles", () => {
    const component = renderer.create(
      <Media style={{ height: 250 }}>
        <p>Default</p>
      </Media>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
