import React from "react";

import {
  LEVEL_ITEM_DEFAULTS,
  LevelItem,
} from "src/components/level/level-item";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = LevelItem;
const DISPLAY_NAME = "Level.Item";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "level-item";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
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

    describe("align", () => {
      validateStringOrNumberPropType(propTypes, "align");

      LEVEL_ITEM_DEFAULTS.alignments.forEach(align => {
        it(`should be ${align}`, () => {
          const node = <LevelItem align={align} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(BULMA_CLASS_NAME)).not.toBe(true);
          expect(wrapper.hasClass(`level-${align}`)).toBe(true);
        });
      });
    });
  });
});
