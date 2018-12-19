import Enzyme from "enzyme";
import React from "react";

import { COLORS } from "@/base/helpers";
import { Input, INPUT_SIZES, INPUT_STATES, INPUT_TYPES } from "../input";

import {
  hasProperties,
  testGenericPropTypes,
  validateBoolPropType,
  validateOneOfPropType,
} from "@/__tests__/testing";

describe("Input component", () => {
  hasProperties(Input, {
    defaultProps: { as: "input" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Input />);
    expect(wrapper.is("input")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Input as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLInputElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Input ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".input").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Input />);
    expect(wrapper.hasClass("input")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Input className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  COLORS.map(color =>
    it(`should be ${color}`, () => {
      const wrapper = Enzyme.shallow(<Input color={color} />);
      expect(wrapper.hasClass(`is-${color}`)).toBe(true);
    }),
  );

  [false, true].map(rounded =>
    it(`should ${rounded ? "" : "not "}be rounded`, () => {
      const wrapper = Enzyme.shallow(<Input rounded={rounded} />);
      expect(wrapper.hasClass("is-rounded")).toBe(rounded);
    }),
  );

  INPUT_SIZES.map(size =>
    it(`should be ${size}`, () => {
      const wrapper = Enzyme.shallow(<Input size={size} />);
      expect(wrapper.hasClass(`is-${size}`)).toBe(true);
    }),
  );

  INPUT_STATES.map(state =>
    it(`should be ${state}`, () => {
      const wrapper = Enzyme.shallow(<Input state={state} />);
      expect(wrapper.hasClass(`is-${state}`)).toBe(true);
    }),
  );

  [false, true].map(isStatic =>
    it(`should ${isStatic ? "" : "not "}be static`, () => {
      const wrapper = Enzyme.shallow(<Input static={isStatic} />);
      expect(wrapper.hasClass("is-static")).toBe(isStatic);
      expect(wrapper.prop("readOnly")).toBe(isStatic);
    }),
  );

  INPUT_TYPES.map(type =>
    it(`should be ${type}`, () => {
      const wrapper = Enzyme.shallow(<Input type={type} />);
      expect(wrapper.prop("type")).toBe(type);
    }),
  );

  describe("propTypes", () => {
    const { propTypes } = Input;
    testGenericPropTypes(propTypes);
    validateOneOfPropType(propTypes, "color", COLORS);
    validateBoolPropType(propTypes, "readOnly");
    validateBoolPropType(propTypes, "rounded");
    validateOneOfPropType(propTypes, "size", INPUT_SIZES);
    validateOneOfPropType(propTypes, "state", INPUT_STATES);
    validateBoolPropType(propTypes, "static");
    validateOneOfPropType(propTypes, "type", INPUT_TYPES);
  });
});
