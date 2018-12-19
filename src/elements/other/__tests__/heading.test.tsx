import Enzyme from "enzyme";
import React from "react";

import { Heading } from "../heading";

import { hasProperties, testGenericPropTypes } from "@/__tests__/testing";

describe("Heading component", () => {
  hasProperties(Heading, {
    defaultProps: { as: "p" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Heading />);
    expect(wrapper.is("p")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Heading as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLParagraphElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Heading ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".heading").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Heading />);
    expect(wrapper.hasClass("heading")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Heading className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = Heading;
    testGenericPropTypes(propTypes);
  });
});
