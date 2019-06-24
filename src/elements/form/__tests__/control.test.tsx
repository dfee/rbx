import React from "react";

import { Control, CONTROL_DEFAULTS } from "src/elements/form/control";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Control;
const DISPLAY_NAME = "Control";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "control";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
    DEFAULTS: CONTROL_DEFAULTS,
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

    describe("expanded", () => {
      validateBoolPropType(propTypes, "expanded");

      [false, true].forEach(expanded => {
        it(`should ${expanded ? "" : "not "}be expanded`, () => {
          const node = <Control expanded={expanded} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-expanded")).toBe(expanded);
        });
      });
    });

    describe("iconLeft", () => {
      validateBoolPropType(propTypes, "iconLeft");

      [false, true].forEach(iconLeft => {
        it(`should ${iconLeft ? "" : "not "}have left icon`, () => {
          const node = <Control iconLeft={iconLeft} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("has-icons-left")).toBe(iconLeft);
        });
      });
    });

    describe("iconRight", () => {
      validateBoolPropType(propTypes, "iconRight");

      [false, true].forEach(iconRight => {
        it(`should ${iconRight ? "" : "not "}have right icon`, () => {
          const node = <Control iconRight={iconRight} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("has-icons-right")).toBe(iconRight);
        });
      });
    });

    describe("loading", () => {
      validateBoolPropType(propTypes, "loading");

      [false, true].forEach(loading => {
        it(`should ${loading ? "" : "not "}be loading`, () => {
          const node = <Control loading={loading} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-loading")).toBe(loading);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      CONTROL_DEFAULTS.sizes.forEach(size => {
        it(`should be ${size}`, () => {
          const node = <Control size={size} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
