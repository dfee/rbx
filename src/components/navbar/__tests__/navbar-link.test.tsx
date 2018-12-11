import Enzyme from "enzyme";
import React from "react";

import { NavbarLink } from "../navbar-link";

import { hasProperties } from "@/__tests__/helpers";

describe("NavbarLink component", () => {
  hasProperties(NavbarLink, {
    defaultProps: {
      as: "span",
    },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<NavbarLink />);
    expect(wrapper.is("span")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "div";
    const wrapper = Enzyme.shallow(<NavbarLink as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <NavbarLink ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".navbar-link").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<NavbarLink />);
    expect(wrapper.hasClass("navbar-link")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<NavbarLink className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  [false, true].map(arrowless =>
    it(`should ${arrowless ? "" : "not "} be arrowless`, () => {
      const wrapper = Enzyme.shallow(<NavbarLink arrowless={arrowless} />);
      expect(wrapper.hasClass("is-arrowless")).toBe(arrowless);
    }),
  );
});
