import Enzyme from "enzyme";
import React from "react";

import { Image } from "../image";
import { ImageContainer } from "../image-container";

import {
  hasProperties,
  testGenericPropTypes,
  validateBoolPropType,
} from "@/__tests__/testing";

describe("Image component", () => {
  hasProperties(Image, {
    Container: ImageContainer,
    defaultProps: { as: "img" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Image />);
    expect(wrapper.is("img")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Image as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLImageElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Image ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find("img").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Image className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = Image;
    testGenericPropTypes(propTypes);
    validateBoolPropType(propTypes, "rounded");
  });
});
