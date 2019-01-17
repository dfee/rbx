import React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import { Hero, HERO_DEFAULTS } from "src/layout/hero/hero";
import { HeroBody } from "src/layout/hero/hero-body";
import { HeroFoot } from "src/layout/hero/hero-foot";
import { HeroHead } from "src/layout/hero/hero-head";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Hero;
const DISPLAY_NAME = "Hero";
const DEFAULT_ELEMENT = "section";
const BULMA_CLASS_NAME = "hero";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Body: HeroBody,
    Foot: HeroFoot,
    Head: HeroHead,
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

    describe("color", () => {
      validateStringOrNumberPropType(propTypes, "color");

      DEFAULTS.colors.map(color => {
        it(`should be ${color}`, () => {
          const node = <Hero color={color} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        });
      });
    });

    describe("gradient", () => {
      validateBoolPropType(propTypes, "gradient");

      [false, true].map(gradient => {
        it(`should ${gradient ? "" : "not "}have gradient`, () => {
          const node = <Hero gradient={gradient} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-bold")).toBe(gradient);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      HERO_DEFAULTS.sizes.map(size => {
        it(`should be ${size}`, () => {
          const node = <Hero size={size} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
