import Enzyme from "enzyme";
import React from "react";

import { FieldBody } from "../field-body";

import { hasProperties, testGenericPropTypes } from "@/__tests__/testing";

describe("FieldBody component", () => {
  hasProperties(FieldBody, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<FieldBody />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<FieldBody as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <FieldBody ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".field-body").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<FieldBody />);
    expect(wrapper.hasClass("field-body")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<FieldBody className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = FieldBody;
    testGenericPropTypes(propTypes);
  });
});
