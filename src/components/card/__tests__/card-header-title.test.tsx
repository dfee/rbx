import React from "react";

import {
  CARD_HEADER_TITLE_DEFAULTS,
  CardHeaderTitle,
} from "src/components/card/card-header-title";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
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
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
  });

  testThemeIntegration(COMPONENT);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("align", () => {
      validateStringOrNumberPropType(propTypes, "align");

      CARD_HEADER_TITLE_DEFAULTS.alignments.map(align => {
        it(`should be ${align}`, () => {
          const node = <CardHeaderTitle align={align} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${align}`)).toBe(true);
        });
      });
    });
  });
});
