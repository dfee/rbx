import * as React from "react";

import {
  CARD_HEADER_TITLE_DEFAULTS,
  CardHeaderTitle,
} from "src/components/card/card-header-title";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = CardHeaderTitle;
const DISPLAY_NAME = "Card.Header.Title";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "card-header-title";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
    DEFAULTS: CARD_HEADER_TITLE_DEFAULTS,
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

      CARD_HEADER_TITLE_DEFAULTS.alignments.forEach(align => {
        it(`should be ${align}`, () => {
          const node = <CardHeaderTitle align={align} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${align}`)).toBe(true);
        });
      });
    });
  });
});
