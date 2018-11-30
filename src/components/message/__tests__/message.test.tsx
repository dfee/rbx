import React from "react";
import renderer from "react-test-renderer";

import { Message } from "../message";

describe("Message component", () => {
  it("should Exist", () => {
    expect(Message).toMatchSnapshot();
  });

  it("should have message classnames", () => {
    const component = renderer.create(
      <Message>
        <Message.Header>Lorem Ipsum</Message.Header>
        <Message.Body>Lorem Ipsum</Message.Body>
      </Message>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should concat Bulma class with classes in props", () => {
    const component = renderer.create(
      <Message className="other-class">
        <Message.Header>Lorem Ipsum</Message.Header>
        <Message.Body>Lorem Ipsum</Message.Body>
      </Message>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render as an html section", () => {
    const component = renderer.create(
      <Message<"section"> as="section">This should be a section</Message>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should have custom inline styles", () => {
    const component = renderer.create(
      <Message<"section"> as="section" style={{ width: 200, zIndex: 1 }}>
        This should be a section with custom styles
      </Message>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should accept a react Element as renderAs prop", () => {
    const Custom = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p {...props}>
        Custom
        {props.children || null}
      </p>
    );

    const component = renderer.create(
      <Message<typeof Custom> as={Custom}>This should be a p element</Message>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
