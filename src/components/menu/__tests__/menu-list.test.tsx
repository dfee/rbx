import Enzyme from "enzyme";
import React from "react";

import { MenuList } from "../menu-list";
import { MenuListItem } from "../menu-list-item";

import { hasProperties } from "@/__tests__/testing";

describe("MenuList component", () => {
  hasProperties(MenuList, {
    Item: MenuListItem,
    defaultProps: { as: "ul" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<MenuList />);
    expect(wrapper.is("ul")).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLUListElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <MenuList ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".menu-list").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<MenuList />);
    expect(wrapper.hasClass("menu-list")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<MenuList className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
