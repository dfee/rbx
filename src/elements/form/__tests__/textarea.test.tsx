import * as React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import { Textarea, TEXTAREA_DEFAULTS } from "src/elements/form/textarea";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Textarea;
const DISPLAY_NAME = "Textarea";
const DEFAULT_ELEMENT = "textarea";
const BULMA_CLASS_NAME = "textarea";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: {
      as: DEFAULT_ELEMENT,
      rows: 4,
    },
    DEFAULTS: TEXTAREA_DEFAULTS,
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
  });

  testThemeIntegration(COMPONENT);

  describe("props", () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = COMPONENT;

    const makeShallowWrapper = makeShallowWrapperFactory();

    describe("color", () => {
      validateStringOrNumberPropType(propTypes, "color");

      DEFAULTS.colors.forEach(color => {
        it(`should be ${color}`, () => {
          const node = <Textarea color={color} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        });
      });
    });

    describe("fixedSize", () => {
      validateBoolPropType(propTypes, "fixedSize");

      [false, true].forEach(fixedSize => {
        it(`should ${fixedSize ? "" : "not "}be fixed size`, () => {
          const node = <Textarea fixedSize={fixedSize} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("has-fixed-size")).toBe(fixedSize);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      TEXTAREA_DEFAULTS.sizes.forEach(size => {
        it(`should be ${size}`, () => {
          const node = <Textarea size={size} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });

    describe("state", () => {
      validateStringOrNumberPropType(propTypes, "state");

      TEXTAREA_DEFAULTS.states.forEach(state => {
        it(`should be ${state}`, () => {
          const node = <Textarea state={state} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${state}`)).toBe(true);
        });
      });
    });
  });
});
