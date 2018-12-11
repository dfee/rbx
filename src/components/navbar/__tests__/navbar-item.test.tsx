import Enzyme from "enzyme";
import React from "react";

import { NavbarItem } from "../navbar-item";

import { hasProperties } from "@/__tests__/helpers";

describe("NavbarItem component", () => {
  hasProperties(NavbarItem, {
    defaultProps: { as: "a" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<NavbarItem />);
    expect(wrapper.is("a")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<NavbarItem as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <NavbarItem ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".navbar-item").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<NavbarItem />);
    expect(wrapper.hasClass("navbar-item")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<NavbarItem className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  [false, true].map(active =>
    it(`should ${active ? "" : "not "} be active`, () => {
      const wrapper = Enzyme.shallow(<NavbarItem active={active} />);
      expect(wrapper.hasClass("is-active")).toBe(active);
    }),
  );

  [false, true].map(dropdown =>
    it(`should ${dropdown ? "" : "not "} be dropdown`, () => {
      const wrapper = Enzyme.shallow(<NavbarItem dropdown={dropdown} />);
      expect(wrapper.hasClass("has-dropdown")).toBe(dropdown);
    }),
  );

  [false, true].map(dropdownUp =>
    it(`should ${dropdownUp ? "" : "not "} be dropdown-up`, () => {
      const wrapper = Enzyme.shallow(<NavbarItem dropdownUp={dropdownUp} />);
      expect(wrapper.hasClass("has-dropdown-up")).toBe(dropdownUp);
    }),
  );

  [false, true].map(hoverable =>
    it(`should ${hoverable ? "" : "not "} be hoverable`, () => {
      const wrapper = Enzyme.shallow(<NavbarItem hoverable={hoverable} />);
      expect(wrapper.hasClass("is-hoverable")).toBe(hoverable);
    }),
  );
});
