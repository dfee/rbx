import { COLORS } from "src/base/helpers/variables";
import { Hero, HERO_SIZES } from "src/layout/hero/hero";
import { HeroBody } from "src/layout/hero/hero-body";
import { HeroFoot } from "src/layout/hero/hero-foot";
import { HeroHead } from "src/layout/hero/hero-head";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateOneOfPropType,
} from "src/__tests__/testing";

const COMPONENT = Hero;
const COMPONENT_NAME = "Hero";
const DEFAULT_ELEMENT = "section";
const BULMA_CLASS_NAME = "hero";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Body: HeroBody,
    Foot: HeroFoot,
    Head: HeroHead,
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeGenericHOCShallowWrapperInContextConsumer,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeGenericHOCShallowWrapperInContextConsumer);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("color", () => {
      validateOneOfPropType(propTypes, "color", COLORS);

      COLORS.map(color => {
        it(`should be ${color}`, () => {
          const node = makeNode({ color });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        });
      });
    });

    describe("gradient", () => {
      validateBoolPropType(propTypes, "gradient");

      [false, true].map(gradient => {
        it(`should ${gradient ? "" : "not "}have gradient`, () => {
          const node = makeNode({ gradient });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-bold")).toBe(gradient);
        });
      });
    });

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", HERO_SIZES);

      HERO_SIZES.map(size => {
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
