import Enzyme from "enzyme";
import React from "react";

import { BreadcrumbItem } from "../breadcrumb-item";

import {
  hasProperties,
  testGenericPropTypes,
  validateBoolPropType,
} from "@/__tests__/testing";

describe("BreadcrumbItem component", () => {
  hasProperties(BreadcrumbItem, {
    defaultProps: { as: "a" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<BreadcrumbItem />);
    expect(wrapper.is("li")).toBe(true);
    const children = wrapper.children();
    expect(children).toHaveLength(1);
    expect(children.first().is("a")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "div";
    const wrapper = Enzyme.shallow(<BreadcrumbItem as={as} />);
    expect(wrapper.is("li")).toBe(true);
    const children = wrapper.children();
    expect(children).toHaveLength(1);
    expect(children.first().is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <BreadcrumbItem ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find("a").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<BreadcrumbItem className={className} />);
    const children = wrapper.children();
    expect(children).toHaveLength(1);
    expect(children.first().hasClass(className)).toBe(true);
  });

  it("should be active", () => {
    const wrapper = Enzyme.shallow(<BreadcrumbItem active />);
    expect(wrapper.hasClass("is-active")).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = BreadcrumbItem;
    testGenericPropTypes(propTypes);
    validateBoolPropType(propTypes, "active");
  });
});
