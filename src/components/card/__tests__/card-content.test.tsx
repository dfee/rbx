import Enzyme from "enzyme";
import React from "react";

import { CardContent } from "../card-content";

import { hasProperties, testGenericPropTypes } from "../../../__tests__/testing";

describe("CardContent component", () => {
  hasProperties(CardContent, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<CardContent />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<CardContent as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <CardContent ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".card-content").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<CardContent />);
    expect(wrapper.hasClass("card-content")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<CardContent className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = CardContent;
    testGenericPropTypes(propTypes);
  });
});
