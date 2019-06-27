import * as React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import { Level } from "src/components/level/level";
import { LevelItem } from "src/components/level/level-item";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Level;
const DISPLAY_NAME = "Level";
const DEFAULT_ELEMENT = "nav";
const BULMA_CLASS_NAME = "level";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
    Item: LevelItem,
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
  });

  testThemeIntegration(COMPONENT);

  describe("props", () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = COMPONENT;
    const makeShallowWrapper = makeShallowWrapperFactory();

    describe("breakpoint", () => {
      validateStringOrNumberPropType(propTypes, "breakpoint");

      DEFAULTS.breakpoints.forEach(breakpoint => {
        it(`should be ${breakpoint}`, () => {
          const node = <Level breakpoint={breakpoint} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${breakpoint}`)).toBe(true);
        });
      });
    });
  });
});
