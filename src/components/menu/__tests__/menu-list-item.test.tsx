import Enzyme from "enzyme";
import React from "react";

import { MenuList } from "../menu-list";
import { MenuListItem } from "../menu-list-item";

import {
  hasProperties,
  testGenericPropTypes,
  validateBoolPropType,
  validatePropType,
} from "../../../__tests__/testing";

describe("MenuListItem component", () => {
  hasProperties(MenuListItem, {
    defaultProps: { as: "a" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<MenuListItem />);
    const children = wrapper.children();
    expect(children.length).toBe(1);
    expect(children.is("a")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<MenuListItem as={as} />);
    const children = wrapper.children();
    expect(children.length).toBe(1);
    expect(children.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <MenuListItem ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find("li a").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<MenuListItem className={className} />);
    expect(wrapper.find("li a").hasClass(className)).toBe(true);
  });

  it("should be active", () => {
    const wrapper = Enzyme.shallow(<MenuListItem active />);
    expect(wrapper.find("li a").hasClass("is-active")).toBe(true);
  });

  it("should have a submenu", () => {
    const wrapper = Enzyme.shallow(<MenuListItem menu={<MenuList />} />);
    expect(wrapper.children().length).toBe(2);
    expect(wrapper.childAt(0).is("a")).toBe(true);
    expect(wrapper.childAt(1).type()).toBe(MenuList);
  });

  describe("propTypes", () => {
    const { propTypes } = MenuListItem;
    testGenericPropTypes(propTypes);
    validateBoolPropType(propTypes, "active");
    validatePropType(propTypes, "menu", [
      { value: <div />, valid: true, descriptor: "div" },
      { value: {}, valid: false, descriptor: "obj" },
    ]);
  });
});
