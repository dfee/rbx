import React from "react";
import renderer from "react-test-renderer";

import { Generic } from "../generic";

describe("Generic component", () => {
  it("Should Exist", () => {
    expect(Generic).toMatchSnapshot();
  });

  it("should have helpers classnames", () => {
    const component = renderer.create(
      <Generic textColor="white" pull="left">
        Facebook
      </Generic>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should accept a react component as 'as' prop", () => {
    const Custom = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p {...props}>
        Custom
        {props.children}
      </p>
    );

    const component = renderer.create(
      <Generic<typeof Custom> as={Custom}>This should be a p element</Generic>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
