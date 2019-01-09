import { DEFAULTS } from "src/base/helpers/variables";
import { Container } from "src/elements/container/container";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Container;
const COMPONENT_NAME = "Container";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "container";

const makeNode = makeNodeFactory(COMPONENT);

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

    describe("breakpoint", () => {
      validateStringOrNumberPropType(propTypes, "breakpoint");

      DEFAULTS.breakpoints.map(breakpoint => {
        it(`should be ${breakpoint}`, () => {
          const node = makeNode({ breakpoint });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${breakpoint}`)).toBe(true);
        });
      });
    });

    describe("fluid", () => {
      validateBoolPropType(propTypes, "fluid");

      [false, true].map(fluid => {
        it(`should ${fluid ? "" : "not "}be fluid`, () => {
          const node = makeNode({ fluid });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-fluid")).toBe(fluid);
        });
      });
    });
  });
});
