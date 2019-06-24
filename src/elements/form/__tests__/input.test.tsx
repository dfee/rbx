import React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import { Input, INPUT_DEFAULTS } from "src/elements/form/input";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Input;
const DISPLAY_NAME = "Input";
const DEFAULT_ELEMENT = "input";
const BULMA_CLASS_NAME = "input";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
    DEFAULTS: INPUT_DEFAULTS,
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
          const node = <Input color={color} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        });
      });
    });

    describe("readOnly", () => {
      validateBoolPropType(propTypes, "readOnly");

      [false, true].forEach(readOnly => {
        it(`should ${readOnly ? "" : "not "}be readOnly`, () => {
          const node = <Input readOnly={readOnly} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.prop("readOnly")).toBe(readOnly);
        });
      });
    });

    describe("rounded", () => {
      validateBoolPropType(propTypes, "rounded");

      [false, true].forEach(rounded => {
        it(`should ${rounded ? "" : "not "}be rounded`, () => {
          const node = <Input rounded={rounded} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-rounded")).toBe(rounded);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      INPUT_DEFAULTS.sizes.forEach(size => {
        it(`should be ${size}`, () => {
          const node = <Input size={size} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });

    describe("state", () => {
      validateStringOrNumberPropType(propTypes, "state");

      INPUT_DEFAULTS.states.forEach(state => {
        it(`should be ${state}`, () => {
          const node = <Input state={state} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${state}`)).toBe(true);
        });
      });
    });

    describe("static", () => {
      validateBoolPropType(propTypes, "static");

      [false, true].forEach(isStatic => {
        it(`should ${isStatic ? "" : "not "}be static`, () => {
          const node = <Input static={isStatic} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-static")).toBe(isStatic);
          expect(wrapper.prop("readOnly")).toBe(isStatic);
        });
      });
    });

    describe("type", () => {
      validateStringOrNumberPropType(propTypes, "type");

      INPUT_DEFAULTS.types.forEach(isType => {
        it(`should be ${isType}`, () => {
          const node = <Input type={isType} />;
          const wrapper = makeShallowWrapper({ node });
          expect(
            (wrapper.props() as React.InputHTMLAttributes<Element>).type,
          ).toEqual(isType);
        });
      });
    });
  });
});
