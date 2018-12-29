import { BREAKPOINTS } from "../../../base/helpers";
import { Level } from "../level";
import { LevelItem } from "../level-item";
import { LevelLeft } from "../level-left";
import { LevelRight } from "../level-right";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateOneOfPropType,
} from "../../../__tests__/testing";

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
    makeShallowWrapper,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeShallowWrapper);

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
  });
});
