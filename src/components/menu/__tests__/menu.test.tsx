import Enzyme from "enzyme";
import React from "react";

import { Menu } from "../menu";
import { MenuLabel } from "../menu-label";
import { MenuList } from "../menu-list";

import { hasProperties, testGenericPropTypes } from "../../../__tests__/testing";

describe("Menu component", () => {
  hasProperties(Menu, {
    Label: MenuLabel,
    List: MenuList,
    defaultProps: { as: "aside" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Menu />);
    expect(wrapper.is("aside")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Menu as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Menu ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".menu").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Menu />);
    expect(wrapper.hasClass("menu")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Menu className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = Menu;
    testGenericPropTypes(propTypes);
  });
});
