import React from "react";

import { Control, CONTROL_DEFAULTS } from "src/elements/form/control";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Control;
const DISPLAY_NAME = "Control";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "control";

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

    describe("expanded", () => {
      validateBoolPropType(propTypes, "expanded");

      [false, true].map(expanded => {
        it(`should ${expanded ? "" : "not "}be expanded`, () => {
          const node = <Control expanded={expanded} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-expanded")).toBe(expanded);
        });
      });
    });

    describe("iconLeft", () => {
      validateBoolPropType(propTypes, "iconLeft");

      [false, true].map(iconLeft => {
        it(`should ${iconLeft ? "" : "not "}have left icon`, () => {
          const node = <Control iconLeft={iconLeft} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("has-icons-left")).toBe(iconLeft);
        });
      });
    });

    describe("iconRight", () => {
      validateBoolPropType(propTypes, "iconRight");

      [false, true].map(iconRight => {
        it(`should ${iconRight ? "" : "not "}have right icon`, () => {
          const node = <Control iconRight={iconRight} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("has-icons-right")).toBe(iconRight);
        });
      });
    });

    describe("loading", () => {
      validateBoolPropType(propTypes, "loading");

      [false, true].map(loading => {
        it(`should ${loading ? "" : "not "}be loading`, () => {
          const node = <Control loading={loading} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-loading")).toBe(loading);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      CONTROL_DEFAULTS.sizes.map(size => {
        it(`should be ${size}`, () => {
          const node = <Control size={size} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
