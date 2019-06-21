import React from "react";

import {
  BUTTON_GROUP_DEFAULTS,
  ButtonGroup,
} from "src/elements/button/button-group";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = ButtonGroup;
const DISPLAY_NAME = "Button.Group";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "buttons";

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

    describe("hasAddons", () => {
      validateBoolPropType(propTypes, "hasAddons");

      [false, true].forEach(hasAddons => {
        it(`should ${hasAddons ? "" : "not "}have addons`, () => {
          const node = <ButtonGroup hasAddons={hasAddons} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("has-addons")).toBe(hasAddons);
        });
      });
    });

    describe("align", () => {
      validateStringOrNumberPropType(propTypes, "align");

      BUTTON_GROUP_DEFAULTS.alignments.forEach(align => {
        it(`should be ${align}`, () => {
          const node = <ButtonGroup align={align} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${align}`)).toBe(true);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      BUTTON_GROUP_DEFAULTS.sizes.forEach(size => {
        it(`should be ${size}`, () => {
          const node = <ButtonGroup size={size} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`are-${size}`)).toBe(true);
        });
      });
    });
  });
});
