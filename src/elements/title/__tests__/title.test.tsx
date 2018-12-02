import React from "react";
import renderer from "react-test-renderer";

import { Title } from "../title";

describe("Title component", () => {
  it("should exist", () => {
    expect(Title).toMatchSnapshot();
  });

  it("should have title classname", () => {
    const component = renderer.create(
      <Title>
        Test <a>Give me</a>
      </Title>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should concat classname in props with Bulma classname", () => {
    const component = renderer.create(
      <Title className="other-class this-is-a-test">
        <p>Default</p>
      </Title>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should use inline styles", () => {
    const component = renderer.create(
      <Title style={{ height: 250 }}>
        <p>Default</p>
      </Title>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should be a subtitle with size rendered as P", () => {
    const component = renderer.create(
      <Title<"p"> size={3} subtitle as="p">
        Subtitle
      </Title>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should not be spaced because is subtitle", () => {
    const component = renderer.create(
      <Title<"p"> spaced subtitle as="p">
        Subtitle
      </Title>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should be spaced", () => {
    const component = renderer.create(
      <Title<"p"> spaced as="p">
        Subtitle
      </Title>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
