import React from "react";
import renderer from "react-test-renderer";

import { Box } from "../box";

describe("Box component", () => {
  it("should Exist", () => {
    expect(Box).toMatchSnapshot();
  });

  it("should have box classname", () => {
    const component = renderer.create(<Box>Facebook</Box>);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should concat Bulma class with classes in props", () => {
    const component = renderer.create(
      <Box className="other-class test">Facebook</Box>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render as an html section", () => {
    const component = renderer.create(
      <Box<"section"> as="section">This should be a section</Box>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should have custom inline styles", () => {
    const component = renderer.create(
      <Box<"section"> as="section" style={{ width: 200, zIndex: 1 }}>
        This should be a section with custom styles
      </Box>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should accept a react Element as renderAs prop", () => {
    const Custom = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p {...props}>
        Custom
        {props.children}
      </p>
    );

    const component = renderer.create(
      <Box<typeof Custom> as={Custom}>This should be a p element</Box>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
