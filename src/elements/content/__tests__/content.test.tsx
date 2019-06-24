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
    defaultProps: { as: DEFAULT_ELEMENT },
    OrderedList: ContentOrderedList,
    VARIABLE_DEFAULTS: CONTENT_DEFAULTS,
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

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      CONTENT_DEFAULTS.sizes.forEach(size => {
        it(`should be ${size}`, () => {
          const node = <Content size={size} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
