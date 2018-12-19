import Enzyme from "enzyme";
import React from "react";

import { NavbarDivider } from "../navbar-divider";

import { hasProperties } from "@/__tests__/testing";

describe("NavbarDivider component", () => {
  hasProperties(NavbarDivider, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<NavbarDivider />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<NavbarDivider as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <NavbarDivider ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".navbar-divider").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<NavbarDivider />);
    expect(wrapper.hasClass("navbar-divider")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<NavbarDivider className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
