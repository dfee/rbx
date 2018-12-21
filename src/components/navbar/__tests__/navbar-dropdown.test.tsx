import Enzyme from "enzyme";
import React from "react";

import { NavbarDropdown } from "../navbar-dropdown";

import {
  hasProperties,
  testGenericPropTypes,
  validateBoolPropType,
} from "../../../__tests__/testing";

describe("NavbarDropdown component", () => {
  hasProperties(NavbarDropdown, {
    defaultProps: { as: "span" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<NavbarDropdown />);
    expect(wrapper.is("span")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "div";
    const wrapper = Enzyme.shallow(<NavbarDropdown as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <NavbarDropdown ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".navbar-dropdown").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<NavbarDropdown />);
    expect(wrapper.hasClass("navbar-dropdown")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<NavbarDropdown className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  [false, true].map(right =>
    it(`should ${right ? "" : "not "} be right`, () => {
      const wrapper = Enzyme.shallow(<NavbarDropdown right={right} />);
      expect(wrapper.hasClass("is-right")).toBe(right);
    }),
  );

  [false, true].map(boxed =>
    it(`should ${boxed ? "" : "not "} be boxed`, () => {
      const wrapper = Enzyme.shallow(<NavbarDropdown boxed={boxed} />);
      expect(wrapper.hasClass("is-boxed")).toBe(boxed);
    }),
  );

  describe("propTypes", () => {
    const { propTypes } = NavbarDropdown;
    testGenericPropTypes(propTypes);
    validateBoolPropType(propTypes, "boxed");
    validateBoolPropType(propTypes, "right");
  });
});
