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
    Item: ContentOrderedListItem,
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

    describe("type", () => {
      validateStringOrNumberPropType(propTypes, "type");

      CONTENT_ORDERED_LIST_DEFAULTS.types.map(isType => {
        it(`should be ${isType}`, () => {
          const node = <ContentOrderedList type={isType} />;
          const wrapper = makeShallowWrapper({ Component: COMPONENT, node });
          expect(wrapper.hasClass(`is-${isType}`)).toBe(true);
        });
      });
    });
  });
});
