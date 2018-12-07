import React from "react";
import renderer from "react-test-renderer";

import { COLORS } from "@/modifiers/color";
import { Hero } from "../hero";

describe("Hero component", () => {
  it("should exist", () => {
    expect(Hero).toMatchSnapshot();
  });

  it("should expose Hero head, body and footer", () => {
    expect(Hero.Head).toMatchSnapshot();
    expect(Hero.Body).toMatchSnapshot();
    expect(Hero.Foot).toMatchSnapshot();
  });

  it("should have hero classname", () => {
    const component = renderer.create(
      <Hero>
        Test <a>Give me</a>
      </Hero>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should concat classname in props with Bulma classname", () => {
    const component = renderer.create(
      <Hero className="other-class this-is-a-test">
        <p>Default</p>
      </Hero>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should use inline styles", () => {
    const component = renderer.create(
      <Hero style={{ height: 250 }}>
        <p>Default</p>
      </Hero>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should use gradient style", () => {
    const component = renderer.create(
      <Hero color="primary" gradient>
        <p>Default</p>
      </Hero>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render Hero with hero head, body and footer", () => {
    const component = renderer.create(
      <Hero size="fullheight" color="primary">
        <Hero.Head<"header"> as="header">
          <div className="bd-notification is-info">Header</div>
        </Hero.Head>
        <Hero.Body>Body</Hero.Body>
        <Hero.Foot<"footer"> as="footer">
          <div className="bd-notification is-danger">Footer</div>
        </Hero.Foot>
      </Hero>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  COLORS.map(color =>
    it(`should use use color ${color}`, () => {
      const component = renderer.create(
        <Hero color={color}>
          <p>Default {color}</p>
        </Hero>,
      );
      expect(component.toJSON()).toMatchSnapshot();
    }),
  );
});
