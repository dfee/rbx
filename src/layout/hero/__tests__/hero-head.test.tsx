import Enzyme from "enzyme";
import React from "react";

import { HeroHead } from "../hero-head";

import { hasProperties, testGenericPropTypes } from "../../../__tests__/testing";

describe("HeroHead component", () => {
  hasProperties(HeroHead, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<HeroHead />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<HeroHead as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <HeroHead ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".hero-head").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<HeroHead />);
    expect(wrapper.hasClass("hero-head")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<HeroHead className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = HeroHead;
    testGenericPropTypes(propTypes);
  });
});
