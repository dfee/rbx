import { DEFAULTS } from "src/base/helpers/variables";
import { Level } from "src/components/level/level";
import { LevelItem } from "src/components/level/level-item";
import { LevelLeft } from "src/components/level/level-left";
import { LevelRight } from "src/components/level/level-right";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateOneOfPropType,
} from "src/__tests__/testing";

const COMPONENT = Level;
const COMPONENT_NAME = "Level";
const DEFAULT_ELEMENT = "nav";
const BULMA_CLASS_NAME = "level";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Item: LevelItem,
    Left: LevelLeft,
    Right: LevelRight,
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
      validateOneOfPropType(propTypes, "breakpoint", DEFAULTS.breakpoints);

      DEFAULTS.breakpoints.map(breakpoint => {
        it(`should be ${breakpoint}`, () => {
          const node = makeNode({ breakpoint });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${breakpoint}`)).toBe(true);
        });
      });
    });
  });
});
