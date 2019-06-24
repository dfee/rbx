import React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import {
  PAGE_LOADER_DEFAULTS,
  PageLoader,
} from "src/elements/page-loader/page-loader";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = PageLoader;
const DISPLAY_NAME = "PageLoader";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "pageloader";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
    VARIABLE_DEFAULTS: PAGE_LOADER_DEFAULTS,
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

    describe("active", () => {
      validateBoolPropType(propTypes, "active");

      [false, true].forEach(active => {
        it(`should ${active ? "" : "not "}be active`, () => {
          const node = <PageLoader active={active} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-active")).toBe(active);
        });
      });
    });

    describe("color", () => {
      validateStringOrNumberPropType(propTypes, "color");

      DEFAULTS.colors.forEach(color => {
        it(`should be ${color}`, () => {
          const node = <PageLoader color={color} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        });
      });
    });

    describe("direction", () => {
      validateStringOrNumberPropType(propTypes, "direction");

      PAGE_LOADER_DEFAULTS.directions.forEach(direction => {
        it(`should be ${direction}`, () => {
          const node = <PageLoader direction={direction} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${direction}`)).toBe(true);
        });
      });
    });
  });
});
