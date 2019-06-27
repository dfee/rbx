import * as React from "react";

import { Tile, TILE_DEFAULTS } from "src/grid/tiles/tile";
import {
  hasProperties,
  makeShallowWrapperFactory,
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
    DEFAULTS: TILE_DEFAULTS,
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

    describe("kind", () => {
      validateStringOrNumberPropType(propTypes, "kind");

      TILE_DEFAULTS.kinds.forEach(kind => {
        it(`should be ${kind}`, () => {
          const node = <Tile kind={kind} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${kind}`)).toBe(true);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      TILE_DEFAULTS.sizes.forEach(size => {
        it(`should be ${size}`, () => {
          const node = <Tile size={size} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });

    describe("vertical", () => {
      validateBoolPropType(propTypes, "vertical");

      [false, true].forEach(vertical => {
        it(`should ${vertical ? "" : "not "}be vertical`, () => {
          const node = <Tile vertical={vertical} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-vertical")).toBe(vertical);
        });
      });
    });
  });
});
