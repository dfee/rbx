import Enzyme from "enzyme";
import React from "react";

import { List } from "../list";
import { ListItem } from "../list-item";

import {
  hasProperties,
  testGenericPropTypes,
  validateBoolPropType,
} from "../../../__tests__/testing";

describe("List component", () => {
  hasProperties(List, {
    Item: ListItem,
    defaultProps: {
      as: "div",
      hoverable: false,
    },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<List />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<List as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <List ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".list").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<List />);
    expect(wrapper.hasClass("list")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<List className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  it("should be hoverable", () => {
    const wrapper = Enzyme.shallow(<List hoverable />);
    expect(wrapper.hasClass("is-hoverable")).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = List;
    testGenericPropTypes(propTypes);
    validateBoolPropType(propTypes, "hoverable");
  });
});
