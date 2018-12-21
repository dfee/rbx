import Enzyme from "enzyme";
import React from "react";

import { FieldLabel, FILED_LABEL_SIZES } from "../field-label";

import {
  hasProperties,
  testGenericPropTypes,
  validateOneOfPropType,
} from "../../../__tests__/testing";

describe("FieldLabel component", () => {
  hasProperties(FieldLabel, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<FieldLabel />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<FieldLabel as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <FieldLabel ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".field-label").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<FieldLabel />);
    expect(wrapper.hasClass("field-label")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<FieldLabel className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  FILED_LABEL_SIZES.map(size =>
    it(`should be ${size}`, () => {
      const wrapper = Enzyme.shallow(<FieldLabel size={size} />);
      expect(wrapper.hasClass(`is-${size}`)).toBe(true);
    }),
  );

  describe("propTypes", () => {
    const { propTypes } = FieldLabel;
    testGenericPropTypes(propTypes);
    validateOneOfPropType(propTypes, "size", FILED_LABEL_SIZES);
  });
});
