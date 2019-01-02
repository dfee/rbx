import { NavbarDropdown } from "../navbar-dropdown";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
} from "../../../__tests__/testing";

const COMPONENT = NavbarDropdown;
const COMPONENT_NAME = "NavbarDropdown";
const DEFAULT_ELEMENT = "span";
const BULMA_CLASS_NAME = "navbar-dropdown";

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

    describe("boxed", () => {
      validateBoolPropType(propTypes, "boxed");

      [false, true].map(boxed =>
        it(`should ${boxed ? "" : "not "}be boxed`, () => {
          const node = makeNode({ boxed });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-boxed")).toBe(boxed);
        }),
      );
    });

    describe("right", () => {
      validateBoolPropType(propTypes, "right");

      [false, true].map(right =>
        it(`should ${right ? "" : "not "}be right`, () => {
          const node = makeNode({ right });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-right")).toBe(right);
        }),
      );
    });
  });
});
