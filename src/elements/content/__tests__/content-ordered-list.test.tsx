import React from "react";

import {
  CONTENT_ORDERED_LIST_DEFAULTS,
  ContentOrderedList,
} from "src/elements/content/content-ordered-list";
import { ContentOrderedListItem } from "src/elements/content/content-ordered-list-item";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = ContentOrderedList;
const DISPLAY_NAME = "Content.OrderedList";
const DEFAULT_ELEMENT = "ol";
const BULMA_CLASS_NAME = undefined;

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
    Item: ContentOrderedListItem,
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

    describe("type", () => {
      validateStringOrNumberPropType(propTypes, "type");

      CONTENT_ORDERED_LIST_DEFAULTS.types.forEach(isType => {
        it(`should be ${isType}`, () => {
          const node = <ContentOrderedList type={isType} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${isType}`)).toBe(true);
        });
      });
    });
  });
});
