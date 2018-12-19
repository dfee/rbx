import Enzyme from "enzyme";
import React from "react";

import { DropdownContent } from "../dropdown-content";

import { hasProperties, testGenericPropTypes } from "@/__tests__/testing";

describe("DropdownContent component", () => {
  hasProperties(DropdownContent, {
    defaultProps: { as: "div" },
  });

  it("should render as the default component", () => {
    const wrapper = Enzyme.shallow(<DropdownContent />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<DropdownContent as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <DropdownContent ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".dropdown-content").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<DropdownContent />);
    expect(wrapper.hasClass("dropdown-content")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<DropdownContent className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = DropdownContent;
    testGenericPropTypes(propTypes);
  });
});
