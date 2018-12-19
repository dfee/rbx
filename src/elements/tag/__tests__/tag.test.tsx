import Enzyme from "enzyme";
import React from "react";

import { COLORS } from "@/base/helpers";
import { Tag, TAG_SIZES } from "../tag";
import { TagGroup } from "../tag-group";

import {
  hasProperties,
  testGenericPropTypes,
  validateBoolPropType,
  validateOneOfPropType,
} from "@/__tests__/testing";

describe("Tag component", () => {
  hasProperties(Tag, {
    Group: TagGroup,
    defaultProps: { as: "span" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Tag />);
    expect(wrapper.is("span")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "div";
    const wrapper = Enzyme.shallow(<Tag as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLSpanElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Tag ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".tag").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Tag />);
    expect(wrapper.hasClass("tag")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Tag className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  COLORS.map(color =>
    it(`should be ${color}`, () => {
      const wrapper = Enzyme.shallow(<Tag color={color} />);
      expect(wrapper.hasClass(`is-${color}`)).toBe(true);
    }),
  );

  [false, true].map(isDelete =>
    it(`should ${isDelete ? "" : "not "}be delete`, () => {
      const wrapper = Enzyme.shallow(<Tag delete={isDelete} />);
      expect(wrapper.hasClass("is-delete")).toBe(isDelete);
    }),
  );

  [false, true].map(rounded =>
    it(`should ${rounded ? "" : "not "}be rounded`, () => {
      const wrapper = Enzyme.shallow(<Tag rounded={rounded} />);
      expect(wrapper.hasClass("is-rounded")).toBe(rounded);
    }),
  );

  TAG_SIZES.map(size =>
    it(`should be ${size}`, () => {
      const wrapper = Enzyme.shallow(<Tag size={size} />);
      expect(wrapper.hasClass(`is-${size}`)).toBe(true);
    }),
  );

  describe("propTypes", () => {
    const { propTypes } = Tag;
    testGenericPropTypes(propTypes);
    validateOneOfPropType(propTypes, "color", COLORS);
    validateBoolPropType(propTypes, "delete"),
      validateBoolPropType(propTypes, "rounded"),
      validateOneOfPropType(propTypes, "size", TAG_SIZES);
  });
});
