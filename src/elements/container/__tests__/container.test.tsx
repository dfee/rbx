import { BREAKPOINTS } from "../../../base/helpers";
import { Container } from "../container";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateOneOfPropType,
} from "../../../__tests__/testing";

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
      validateOneOfPropType(propTypes, "breakpoint", BREAKPOINTS);

      BREAKPOINTS.map(breakpoint =>
        it(`should be ${breakpoint}`, () => {
          const node = makeNode({ breakpoint });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${breakpoint}`)).toBe(true);
        }),
      );
    });

    describe("fluid", () => {
      validateBoolPropType(propTypes, "fluid");

      [false, true].map(fluid =>
        it(`should ${fluid ? "" : "not "}be fluid`, () => {
          const node = makeNode({ fluid });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-fluid")).toBe(fluid);
        }),
      );
    });
  });
});
