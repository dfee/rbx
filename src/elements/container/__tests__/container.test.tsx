import { BREAKPOINTS } from "../../../base/helpers";
import { Container } from "../container";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testTransformHelpersIntegration,
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
    makeShallowWrapper,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testTransformHelpersIntegration(makeNode, makeShallowWrapper);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("breakpoint", () => {
      validateOneOfPropType(propTypes, "breakpoint", BREAKPOINTS);

      BREAKPOINTS.map(breakpoint =>
        it(`should be ${breakpoint}`, () => {
          const node = makeNode({ breakpoint });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${breakpoint}`)).toBe(true);
        }),
      );
    });

    describe("fluid", () => {
      validateBoolPropType(propTypes, "fluid");

      [false, true].map(fluid =>
        it(`should ${fluid ? "" : "not "}be fluid`, () => {
          const node = makeNode({ fluid });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass("is-fluid")).toBe(fluid);
        }),
      );
    });
  });
});
