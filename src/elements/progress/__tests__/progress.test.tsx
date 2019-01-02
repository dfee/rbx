import React from "react";

import { COLORS } from "../../../base/helpers";
import { Progress, PROGRESS_SIZES } from "../progress";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateNumberPropType,
  validateOneOfPropType,
} from "../../../__tests__/testing";

const COMPONENT = Progress;
const COMPONENT_NAME = "Progress";
const DEFAULT_ELEMENT = "progress";
const BULMA_CLASS_NAME = "progress";

// these are required props. we provide them so we only get the errors we expect
const EXTRAS = { max: 10, value: 5 };

const makeNode = (props: Partial<React.ComponentProps<typeof Progress>>) => {
  const finalProps = { ...EXTRAS, ...props };
  return <Progress {...finalProps} />;
};

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
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
      validateOneOfPropType(propTypes, "color", COLORS, EXTRAS);

      COLORS.map(color =>
        it(`should be ${color}`, () => {
          const node = makeNode({ color });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        }),
      );
    });

    describe("max", () => {
      validateNumberPropType(propTypes, "max", { value: 5 });

      it("should have max", () => {
        const max = 20;
        const node = makeNode({ max });
        const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
        expect(wrapper.props().max).toBe(max);
      });
    });

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", PROGRESS_SIZES, EXTRAS);

      PROGRESS_SIZES.map(size =>
        it(`should be ${size}`, () => {
          const node = makeNode({ size, max: 5, value: 10 });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        }),
      );
    });

    describe("value", () => {
      validateNumberPropType(propTypes, "value", { max: 10 });

      it("should have value", () => {
        const value = 0;
        const node = makeNode({ value });
        const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
        expect(wrapper.props().value).toBe(value);
      });
    });
  });
});
