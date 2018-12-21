import Enzyme from "enzyme";
import React from "react";

import { Title, TITLE_SIZES } from "../title";

import {
  hasProperties,
  testGenericPropTypes,
  validateBoolPropType,
  validateOneOfPropType,
} from "../../../__tests__/testing";

describe("Title component", () => {
  hasProperties(Title, {
    defaultProps: { as: "h1" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Title />);
    expect(wrapper.is("h1")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "div";
    const wrapper = Enzyme.shallow(<Title as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLHeadingElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Title ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".title").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Title className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  TITLE_SIZES.map(size =>
    it(`should be ${size}`, () => {
      const wrapper = Enzyme.shallow(<Title size={size} />);
      expect(wrapper.hasClass(`is-${size}`)).toBe(true);
    }),
  );

  [false, true].map(spaced =>
    it(`should ${spaced ? "" : "not "}be spaced`, () => {
      const wrapper = Enzyme.shallow(<Title spaced={spaced} />);
      expect(wrapper.hasClass("is-spaced")).toBe(spaced);
    }),
  );

  [false, true].map(subtitle =>
    it(`should ${subtitle ? "" : "not "}be subtitle`, () => {
      const wrapper = Enzyme.shallow(<Title subtitle={subtitle} />);
      expect(wrapper.hasClass(subtitle ? "subtitle" : "title")).toBe(true);
    }),
  );

  describe("propTypes", () => {
    const { propTypes } = Title;
    testGenericPropTypes(propTypes);
    validateOneOfPropType(propTypes, "size", TITLE_SIZES);
    validateBoolPropType(propTypes, "spaced");
    validateBoolPropType(propTypes, "subtitle");
  });
});
