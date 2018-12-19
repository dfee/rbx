import Enzyme from "enzyme";
import React from "react";

import { ListItem } from "../list-item";

import { hasProperties } from "@/__tests__/testing";

describe("ListItem component", () => {
  hasProperties(ListItem, {
    defaultProps: {
      active: false,
      as: "a",
    },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<ListItem />);
    expect(wrapper.is("a")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<ListItem as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <ListItem ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".list-item").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<ListItem />);
    expect(wrapper.hasClass("list-item")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<ListItem className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  /**
   * Props
   */
  it("should be active", () => {
    const wrapper = Enzyme.shallow(<ListItem active />);
    expect(wrapper.hasClass("is-active")).toBe(true);
  });
});
