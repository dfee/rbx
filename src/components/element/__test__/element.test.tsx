import React from "react";
import renderer from "react-test-renderer";
import { Element } from "..";

describe("Element component", () => {
  it("Should Exist", () => {
    expect(Element).toMatchSnapshot();
  });

  it("Should have helpers classnames", () => {
    const component = renderer.create(
      <Element textColor={"white" as "white"} pull={"left" as "left"}>
        Facebook
      </Element>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("Should accept a react Element as renderAs prop", () => {
    const Custom = (
      props: React.ComponentProps<"p"> & { children: React.ReactNode },
    ) => (
      <p {...props}>
        Custom
        {props.children}
      </p>
    );

    const component = renderer.create(
      <Element renderAs={Custom}>This should be a p element</Element>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
