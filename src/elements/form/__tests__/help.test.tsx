import { COLORS } from "../../../base/helpers";
import { Help } from "../help";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateOneOfPropType,
} from "../../../__tests__/testing";

const COMPONENT = Help;
const COMPONENT_NAME = "Help";
const DEFAULT_ELEMENT = "p";
const BULMA_CLASS_NAME = "help";

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

  testThemeIntegration(makeNode, makeShallowWrapper);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("color", () => {
      validateOneOfPropType(propTypes, "color", COLORS);

      COLORS.map(color =>
        it(`should be ${color}`, () => {
          const node = makeNode({ color });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        }),
      );
    });
  });
});
