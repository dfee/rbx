import React from "react";

import { Content, CONTENT_DEFAULTS } from "src/elements/content/content";
import { ContentOrderedList } from "src/elements/content/content-ordered-list";

import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Content;
const DISPLAY_NAME = "Content";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "content";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    OrderedList: ContentOrderedList,
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

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      CONTENT_DEFAULTS.sizes.map(size => {
        it(`should be ${size}`, () => {
          const node = <Content size={size} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
