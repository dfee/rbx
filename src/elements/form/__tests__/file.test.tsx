import Enzyme from "enzyme";
import React from "react";

import { COLORS } from "@/base/helpers";
import { File, FILE_ALIGNMENTS, FILE_SIZES } from "../file";
import { FileCTA } from "../file-cta";
import { FileIcon } from "../file-icon";
import { FileInput } from "../file-input";
import { FileLabel } from "../file-label";
import { FileName } from "../file-name";

import {
  hasProperties,
  testGenericPropTypes,
  validateBoolPropType,
  validateOneOfPropType,
} from "@/__tests__/testing";

describe("File component", () => {
  hasProperties(File, {
    CTA: FileCTA,
    Icon: FileIcon,
    Input: FileInput,
    Label: FileLabel,
    Name: FileName,
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<File />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<File as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <File ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".file").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<File />);
    expect(wrapper.hasClass("file")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<File className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  FILE_ALIGNMENTS.map(align =>
    it(`should be aligned ${align}`, () => {
      const wrapper = Enzyme.shallow(<File align={align} />);
      expect(wrapper.hasClass(`is-${align}`)).toBe(true);
    }),
  );

  [false, true].map(boxed =>
    it(`should ${boxed ? "" : "not "}be boxed`, () => {
      const wrapper = Enzyme.shallow(<File boxed={boxed} />);
      expect(wrapper.hasClass("is-boxed")).toBe(boxed);
    }),
  );

  COLORS.map(color =>
    it(`should be ${color}`, () => {
      const wrapper = Enzyme.shallow(<File color={color} />);
      expect(wrapper.hasClass(`is-${color}`)).toBe(true);
    }),
  );

  [false, true].map(hasName =>
    it(`should ${hasName ? "" : "not "}have name`, () => {
      const wrapper = Enzyme.shallow(<File hasName={hasName} />);
      expect(wrapper.hasClass("has-name")).toBe(hasName);
    }),
  );

  [false, true].map(fullwidth =>
    it(`should ${fullwidth ? "" : "not "}be fullwidth`, () => {
      const wrapper = Enzyme.shallow(<File fullwidth={fullwidth} />);
      expect(wrapper.hasClass("is-fullwidth")).toBe(fullwidth);
    }),
  );

  FILE_SIZES.map(size =>
    it(`should be ${size}`, () => {
      const wrapper = Enzyme.shallow(<File size={size} />);
      expect(wrapper.hasClass(`is-${size}`)).toBe(true);
    }),
  );

  describe("propTypes", () => {
    const { propTypes } = File;
    testGenericPropTypes(propTypes);
    validateOneOfPropType(propTypes, "align", FILE_ALIGNMENTS);
    validateBoolPropType(propTypes, "boxed");
    validateOneOfPropType(propTypes, "color", COLORS);
    validateBoolPropType(propTypes, "fullwidth");
    validateBoolPropType(propTypes, "hasName");
    validateOneOfPropType(propTypes, "size", FILE_SIZES);
  });
});
