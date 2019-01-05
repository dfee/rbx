import { Tile, TILE_KINDS, TILE_SIZES } from "src/grid/tiles/tile";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateOneOfPropType,
} from "src/__tests__/testing";

const COMPONENT = Tile;
const COMPONENT_NAME = "Tile";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "tile";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
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

    describe("kind", () => {
      validateOneOfPropType(propTypes, "kind", TILE_KINDS);

      TILE_KINDS.map(kind => {
        it(`should be ${kind}`, () => {
          const node = makeNode({ kind });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${kind}`)).toBe(true);
        });
      });
    });

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", TILE_SIZES);

      TILE_SIZES.map(size => {
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });

    describe("vertical", () => {
      validateBoolPropType(propTypes, "vertical");

      [false, true].map(vertical => {
        it(`should ${vertical ? "" : "not "}be vertical`, () => {
          const node = makeNode({ vertical });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-vertical")).toBe(vertical);
        });
      });
    });
  });
});
