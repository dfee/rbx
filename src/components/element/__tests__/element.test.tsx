import React from "react";
import renderer from "react-test-renderer";

import { Element } from "../element";

describe("Element component", () => {
  it("Should Exist", () => {
    expect(Element).toMatchSnapshot();
  });

  it("should have helpers classnames", () => {
    const component = renderer.create(
      <Element textColor="white" pull="left">
        Facebook
      </Element>,
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
      <Element<typeof Custom> as={Custom}>This should be a p element</Element>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
