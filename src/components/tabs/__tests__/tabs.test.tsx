import React from "react";
import renderer from "react-test-renderer";

import { Tabs } from "../tabs";

describe("Tabs component", () => {
  it("should Exist", () => {
    expect(Tabs).toMatchSnapshot();
  });

  it("should expose Tab", () => {
    expect(Tabs.Tab).toMatchSnapshot();
  });

  it("should have Tabs classname", () => {
    const component = renderer.create(<Tabs>Facebook</Tabs>);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should concat Bulma class with classes in props", () => {
    const component = renderer.create(
      <Tabs className="other-class test">Facebook</Tabs>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render as an html section", () => {
    const component = renderer.create(
      <Tabs<"section"> as="section">This should be a section</Tabs>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should have custom inline styles", () => {
    const component = renderer.create(
      <Tabs<"section"> as="section" style={{ width: 200, zIndex: 1 }}>
        This should be a section with custom styles
      </Tabs>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should accept a react Element as renderAs prop", () => {
    // eslint-disable-next-line react/prop-types
    const Custom = ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p {...props}>
        Custom
        {children}
      </p>
    );
    const component = renderer.create(
      <Tabs<typeof Custom> as={Custom}>This should be a p element</Tabs>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render propertly Inside Tabs", () => {
    const component = renderer.create(
      <Tabs>
        <Tabs.Tab>Tab 1</Tabs.Tab>
        <Tabs.Tab>Tab 2</Tabs.Tab>
        <Tabs.Tab>Tab 3</Tabs.Tab>
      </Tabs>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
