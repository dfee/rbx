import Enzyme from "enzyme";
import React from "react";

import { NavbarMenu } from "../navbar-menu";
import { contextFactory } from "./context";

import {
  hasProperties,
  shallowInContext,
  testGenericPropTypes,
} from "@/__tests__/testing";

describe("NavbarMenu component", () => {
  hasProperties(NavbarMenu, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = shallowInContext(NavbarMenu, contextFactory(), {});
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = shallowInContext(NavbarMenu, contextFactory(), { as });
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <NavbarMenu ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".navbar-menu").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = shallowInContext(NavbarMenu, contextFactory(), {});
    expect(wrapper.hasClass("navbar-menu")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = shallowInContext(NavbarMenu, contextFactory(), {
      className,
    });
    expect(wrapper.hasClass(className)).toBe(true);
  });

  [false, true].map(active =>
    it(`should ${active ? "" : "not "}be active`, () => {
      const wrapper = shallowInContext(
        NavbarMenu,
        contextFactory({ active }),
        {},
      );
      expect(wrapper.hasClass("is-active")).toBe(active);
    }),
  );

  describe("propTypes", () => {
    const { propTypes } = NavbarMenu;
    testGenericPropTypes(propTypes);
  });
});
