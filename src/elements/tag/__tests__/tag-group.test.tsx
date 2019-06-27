import * as React from "react";

import { TAG_GROUP_DEFAULTS, TagGroup } from "src/elements/tag/tag-group";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = TagGroup;
const DISPLAY_NAME = "Tag.Group";
const DEFAULT_ELEMENT = "span";
const BULMA_CLASS_NAME = "tags";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
    DEFAULTS: TAG_GROUP_DEFAULTS,
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

    describe("gapless", () => {
      validateBoolPropType(propTypes, "gapless");

      [false, true].forEach(gapless => {
        it(`should ${gapless ? "" : "not "}be gapless`, () => {
          const node = <TagGroup gapless={gapless} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("has-addons")).toBe(gapless);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      TAG_GROUP_DEFAULTS.sizes.forEach(size => {
        it(`should be ${size}`, () => {
          const node = <TagGroup size={size} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`are-${size}`)).toBe(true);
        });
      });
    });
  });
});
