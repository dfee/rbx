import React from "react";

import {
  MEDIA_ITEM_DEFAULTS,
  MediaItem,
} from "src/components/media/media-item";

import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = MediaItem;
const DISPLAY_NAME = "Media.Item";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "media-content";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: {
      align: "content",
      as: DEFAULT_ELEMENT,
    },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
  });

  testThemeIntegration(COMPONENT);

  describe("propTypes", () => {
    const { propTypes } = COMPONENT;
    const makeShallowWrapper = makeShallowWrapperFactory();

    describe("align", () => {
      validateStringOrNumberPropType(propTypes, "align");

      MEDIA_ITEM_DEFAULTS.alignments.map(align => {
        it(`should be ${align}`, () => {
          const node = <MediaItem align={align} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`media-${align}`)).toBe(true);
        });
      });
    });
  });
});
