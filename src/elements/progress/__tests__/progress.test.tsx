import * as React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import { Progress, PROGRESS_DEFAULTS } from "src/elements/progress/progress";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateNumberPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Progress;
const COMPONENT_NAME = "Progress";
const DEFAULT_ELEMENT = "progress";
const BULMA_CLASS_NAME = "progress";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: {
      as: DEFAULT_ELEMENT,
      max: 100,
      value: 0,
    },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeGenericHOCShallowWrapperInContextConsumer,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeGenericHOCShallowWrapperInContextConsumer);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("color", () => {
      validateStringOrNumberPropType(propTypes, "color");

      DEFAULTS.colors.map(color => {
        it(`should be ${color}`, () => {
          const node = makeNode({ color });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        });
      });
    });

    describe("max", () => {
      validateNumberPropType(propTypes, "max");

      it("should have max", () => {
        const max = 20;
        const node = makeNode({ max });
        const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
        expect(
          (wrapper.props() as React.ProgressHTMLAttributes<Element>).max,
        ).toBe(max);
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      PROGRESS_DEFAULTS.sizes.map(size => {
        it(`should be ${size}`, () => {
          const node = makeNode({ size, max: 5, value: 10 });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });

    describe("value", () => {
      validateNumberPropType(propTypes, "value");

      it("should have value", () => {
        const value = 0;
        const node = makeNode({ value });
        const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
        expect(
          (wrapper.props() as React.ProgressHTMLAttributes<Element>).value,
        ).toBe(value);
      });
    });
  });
});
