import React from "react";

import { TagGroup } from "src/elements/tag/tag-group";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
} from "src/__tests__/testing";

const COMPONENT = TagGroup;
const DISPLAY_NAME = "Tag.Group";
const DEFAULT_ELEMENT = "span";
const BULMA_CLASS_NAME = "tags";

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

    describe("size", () => {
      validateBoolPropType(propTypes, "gapless");

      [false, true].map(gapless => {
        it(`should ${gapless ? "" : "not "}be gapless`, () => {
          const node = <TagGroup gapless={gapless} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("has-addons")).toBe(gapless);
        });
      });
    });
  });
});
