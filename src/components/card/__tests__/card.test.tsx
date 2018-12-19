import Enzyme from "enzyme";
import React from "react";

import { Card } from "../card";
import { CardContent } from "../card-content";
import { CardFooter } from "../card-footer";
import { CardHeader } from "../card-header";
import { CardImage } from "../card-image";

import { hasProperties, testGenericPropTypes } from "@/__tests__/testing";

describe("Card component", () => {
  hasProperties(Card, {
    Content: CardContent,
    Footer: CardFooter,
    Header: CardHeader,
    Image: CardImage,
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Card />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Card as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Card ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".card").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Card />);
    expect(wrapper.hasClass("card")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Card className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = Card;
    testGenericPropTypes(propTypes);
  });
});
