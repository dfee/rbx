import { COLORS } from "../../../base/helpers";
import { Tile, TILE_KINDS, TILE_SIZES } from "../tile";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testTransformHelpersIntegration,
  validateBoolPropType,
  validateOneOfPropType,
} from "../../../__tests__/testing";

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
    makeShallowWrapper,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testTransformHelpersIntegration(makeNode, makeShallowWrapper);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("color", () => {
      validateOneOfPropType(propTypes, "color", COLORS);

      COLORS.map(color =>
        it(`should be ${color}`, () => {
          const node = makeNode({ color });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        }),
      );
    });

    describe("kind", () => {
      validateOneOfPropType(propTypes, "kind", TILE_KINDS);

      TILE_KINDS.map(kind =>
        it(`should be ${kind}`, () => {
          const node = makeNode({ kind });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${kind}`)).toBe(true);
        }),
      );
    });

    describe("notification", () => {
      validateBoolPropType(propTypes, "notification");

      [false, true].map(notification =>
        it(`should ${notification ? "" : "not "}be notification`, () => {
          const node = makeNode({ notification });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass("notification")).toBe(notification);
        }),
      );
    });

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", TILE_SIZES);

      TILE_SIZES.map(size =>
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        }),
      );
    });

    describe("vertical", () => {
      validateBoolPropType(propTypes, "vertical");

      [false, true].map(vertical =>
        it(`should ${vertical ? "" : "not "}be vertical`, () => {
          const node = makeNode({ vertical });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass("is-vertical")).toBe(vertical);
        }),
      );
    });
  });
});
