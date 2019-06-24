import React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import { Icon, ICON_DEFAULTS } from "src/elements/icon/icon";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Icon;
const DISPLAY_NAME = "Icon";
const DEFAULT_ELEMENT = "span";
const BULMA_CLASS_NAME = "icon";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
    VARIABLE_DEFAULTS: ICON_DEFAULTS,
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

    describe("color", () => {
      validateStringOrNumberPropType(propTypes, "color");

      DEFAULTS.colors.forEach(color => {
        it(`should be ${color}`, () => {
          const node = <Icon color={color} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`has-text-${color}`)).toBe(true);
        });
      });
    });

    describe("align", () => {
      validateStringOrNumberPropType(propTypes, "align");

      ICON_DEFAULTS.alignments.forEach(align => {
        it(`should be aligned ${align}`, () => {
          const node = <Icon align={align} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${align}`)).toBe(true);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      ICON_DEFAULTS.sizes.forEach(size => {
        it(`should be ${size}`, () => {
          const node = <Icon size={size} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
