import Enzyme from "enzyme";
import React from "react";

import { Delete, DELETE_SIZES } from "../delete";

import {
  hasProperties,
  testGenericPropTypes,
  validateOneOfPropType,
} from "@/__tests__/testing";

describe("Delete component", () => {
  hasProperties(Delete, {
    defaultProps: { as: "a" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Delete />);
    expect(wrapper.is("a")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Delete as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Delete ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".delete").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Delete />);
    expect(wrapper.hasClass("delete")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Delete className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  DELETE_SIZES.map(size => {
    it(`should be size ${size}`, () => {
      const wrapper = Enzyme.shallow(<Delete size={size} />);
      expect(wrapper.hasClass(`is-${size}`)).toBe(true);
    });
  });

  describe("propTypes", () => {
    const { propTypes } = Delete;
    testGenericPropTypes(propTypes);
    validateOneOfPropType(propTypes, "size", DELETE_SIZES);
  });
});
