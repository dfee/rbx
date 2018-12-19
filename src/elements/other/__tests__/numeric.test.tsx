import Enzyme from "enzyme";
import React from "react";

import { Numeric } from "../numeric";

import { hasProperties, testGenericPropTypes } from "@/__tests__/testing";

describe("Numeric component", () => {
  hasProperties(Numeric, {
    defaultProps: { as: "p" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Numeric />);
    expect(wrapper.is("p")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Numeric as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLParagraphElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Numeric ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".number").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Numeric />);
    expect(wrapper.hasClass("number")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Numeric className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = Numeric;
    testGenericPropTypes(propTypes);
  });
});
