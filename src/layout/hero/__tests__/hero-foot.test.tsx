import Enzyme from "enzyme";
import React from "react";

import { HeroFoot } from "../hero-foot";

import { hasProperties, testGenericPropTypes } from "../../../__tests__/testing";

describe("HeroFoot component", () => {
  hasProperties(HeroFoot, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<HeroFoot />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<HeroFoot as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <HeroFoot ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".hero-foot").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<HeroFoot />);
    expect(wrapper.hasClass("hero-foot")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<HeroFoot className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = HeroFoot;
    testGenericPropTypes(propTypes);
  });
});
