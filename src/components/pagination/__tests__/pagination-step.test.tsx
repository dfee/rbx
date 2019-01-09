import React from "react";

import {
  PAGINATION_STEP_DEFAULTS,
  PaginationStep,
  PaginationStepProps,
} from "src/components/pagination/pagination-step";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = PaginationStep;
const COMPONENT_NAME = "PaginationStep";
const DEFAULT_ELEMENT = "a";
// const BULMA_CLASS_NAME = "pagination-";

const makeNode = (props: Partial<PaginationStepProps>) => {
  const propsWithDefaults = {
    direction: "next" as PaginationStepProps["direction"],
    ...props,
  };

  return <PaginationStep {...propsWithDefaults} />;
};

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeGenericHOCShallowWrapperInContextConsumer,
    DEFAULT_ELEMENT,
    "pagination-next",
  );

  testThemeIntegration(makeNode, makeGenericHOCShallowWrapperInContextConsumer);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("direction", () => {
      validateStringOrNumberPropType(propTypes, "direction");

      PAGINATION_STEP_DEFAULTS.directions.map(direction => {
        it(`should be ${direction}`, () => {
          const node = makeNode({ direction });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`pagination-${direction}`)).toBe(true);
        });
      });
    });
  });
});
