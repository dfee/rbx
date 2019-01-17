import React from "react";

import { Tile, TILE_DEFAULTS } from "src/grid/tiles/tile";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Tile;
const DISPLAY_NAME = "Tile";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "tile";

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

    describe("kind", () => {
      validateStringOrNumberPropType(propTypes, "kind");

      TILE_DEFAULTS.kinds.map(kind => {
        it(`should be ${kind}`, () => {
          const node = <Tile kind={kind} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${kind}`)).toBe(true);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      TILE_DEFAULTS.sizes.map(size => {
        it(`should be ${size}`, () => {
          const node = <Tile size={size} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });

    describe("vertical", () => {
      validateBoolPropType(propTypes, "vertical");

      [false, true].map(vertical => {
        it(`should ${vertical ? "" : "not "}be vertical`, () => {
          const node = <Tile vertical={vertical} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-vertical")).toBe(vertical);
        });
      });
    });
  });
});
