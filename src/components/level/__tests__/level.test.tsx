import React from "react";

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
    Item: LevelItem,
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
  });

  testThemeIntegration(COMPONENT);

  describe("props", () => {
    const { propTypes } = COMPONENT;
    const makeShallowWrapper = makeShallowWrapperFactory();

    describe("breakpoint", () => {
      validateStringOrNumberPropType(propTypes, "breakpoint");

      DEFAULTS.breakpoints.map(breakpoint => {
        it(`should be ${breakpoint}`, () => {
          const node = <Level breakpoint={breakpoint} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${breakpoint}`)).toBe(true);
        });
      });
    });
  });
});
