import Enzyme from "enzyme";
import React from "react";

import { IMAGE_CONTAINER_SIZES, ImageContainer } from "../image-container";

import {
  hasProperties,
  testGenericPropTypes,
  validateOneOfPropType,
} from "@/__tests__/testing";

describe("ImageContainer component", () => {
  hasProperties(ImageContainer, {
    defaultProps: { as: "figure" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<ImageContainer />);
    expect(wrapper.is("figure")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "div";
    const wrapper = Enzyme.shallow(<ImageContainer as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <ImageContainer ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".image").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<ImageContainer />);
    expect(wrapper.hasClass("image")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<ImageContainer className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  IMAGE_CONTAINER_SIZES.map(size =>
    it(`should be ${size}`, () => {
      const wrapper = Enzyme.shallow(<ImageContainer size={size} />);
      if (typeof size === "number") {
        expect(wrapper.hasClass(`is-${size}x${size}`)).toBe(true);
      } else {
        expect(wrapper.hasClass(`is-${size}`)).toBe(true);
      }
    }),
  );

  describe("propTypes", () => {
    const { propTypes } = ImageContainer;
    testGenericPropTypes(propTypes);
    validateOneOfPropType(propTypes, "size", IMAGE_CONTAINER_SIZES);
  });
});
