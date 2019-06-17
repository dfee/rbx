import React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import { File, FILE_DEFAULTS } from "src/elements/form/file";

import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = File;
const DISPLAY_NAME = "File";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "file";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
  });

  testThemeIntegration(COMPONENT);

  describe("props", () => {
    const { propTypes } = COMPONENT;
    const makeShallowWrapper = makeShallowWrapperFactory();

    describe("align", () => {
      validateStringOrNumberPropType(propTypes, "align");

      FILE_DEFAULTS.alignments.map(align => {
        it(`should be ${align}`, () => {
          const node = <File align={align} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${align}`)).toBe(true);
        });
      });
    });

    describe("boxed", () => {
      validateBoolPropType(propTypes, "boxed");

      [false, true].map(boxed => {
        it(`should ${boxed ? "" : "not "}be boxed`, () => {
          const node = <File boxed={boxed} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-boxed")).toBe(boxed);
        });
      });
    });

    describe("color", () => {
      validateStringOrNumberPropType(propTypes, "color");

      DEFAULTS.colors.map(color => {
        it(`should be ${color}`, () => {
          const node = <File color={color} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        });
      });
    });

    describe("fullwidth", () => {
      validateBoolPropType(propTypes, "fullwidth");

      [false, true].map(fullwidth => {
        it(`should ${fullwidth ? "" : "not "}be fullwidth`, () => {
          const node = <File fullwidth={fullwidth} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-fullwidth")).toBe(fullwidth);
        });
      });
    });

    describe("hasName", () => {
      validateBoolPropType(propTypes, "hasName");

      [false, true].map(hasName => {
        it(`should ${hasName ? "" : "not "}have name`, () => {
          const node = <File hasName={hasName} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("has-name")).toBe(hasName);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      FILE_DEFAULTS.sizes.map(size => {
        it(`should be ${size}`, () => {
          const node = <File size={size} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
