import React from "react";
import renderer from "react-test-renderer";

import { Container } from "../container";

describe("Container component", () => {
  it("should have container classname", () => {
    const component = renderer.create(
      <Container>
        <p className="bd-notification is-success">
          <p>Default</p>
          <p>Container</p>
        </p>
      </Container>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should have helper classnames", () => {
    const component = renderer.create(
      <Container
        paddingless
        responsive={{
          desktop: {
            hide: {
              value: true,
            },
          },
          touch: {
            display: {
              value: "flex",
            },
          },
          widescreen: {
            display: {
              only: true,
              value: "block",
            },
          },
        }}
      >
        <p className="bd-notification is-success">
          <p>Default</p>
          <p>Container</p>
        </p>
      </Container>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
