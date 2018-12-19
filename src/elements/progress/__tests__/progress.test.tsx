import Enzyme from "enzyme";
import React from "react";

import { COLORS } from "@/base/helpers";
import { Progress, PROGRESS_SIZES } from "../progress";

import {
  hasProperties,
  testGenericPropTypes,
  validateNumberPropType,
  validateOneOfPropType,
} from "@/__tests__/testing";

describe("Progress component", () => {
  hasProperties(Progress, {
    defaultProps: { as: "progress" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Progress max={100} value={1} />);
    expect(wrapper.is("progress")).toBe(true);
    expect(wrapper.prop("max")).toEqual(100);
    expect(wrapper.prop("value")).toEqual(1);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Progress as={as} max={100} value={1} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLProgressElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Progress ref={ref} max={100} value={1} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".progress").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Progress max={100} value={1} />);
    expect(wrapper.hasClass("progress")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(
      <Progress max={100} value={1} className={className} />,
    );
    expect(wrapper.hasClass(className)).toBe(true);
  });

  COLORS.map(color =>
    it(`should be ${color}`, () => {
      const wrapper = Enzyme.shallow(
        <Progress max={100} value={1} color={color} />,
      );
      expect(wrapper.hasClass(`is-${color}`)).toBe(true);
    }),
  );

  PROGRESS_SIZES.map(size =>
    it(`should be ${size}`, () => {
      const wrapper = Enzyme.shallow(
        <Progress max={100} value={1} size={size} />,
      );
      expect(wrapper.hasClass(`is-${size}`)).toBe(true);
    }),
  );

  describe("propTypes", () => {
    const { propTypes } = Progress;
    testGenericPropTypes(propTypes);
    validateOneOfPropType(propTypes, "color", COLORS);
    validateNumberPropType(propTypes, "max");
    validateOneOfPropType(propTypes, "size", PROGRESS_SIZES);
    validateNumberPropType(propTypes, "value");
  });
});
