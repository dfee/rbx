import { COLORS } from "../../../base/helpers";
import { File, FILE_ALIGNMENTS, FILE_SIZES } from "../file";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testTransformHelpersIntegration,
  validateBoolPropType,
  validateOneOfPropType,
} from "../../../__tests__/testing";

const COMPONENT = File;
const COMPONENT_NAME = "File";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "file";

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

    describe("align", () => {
      validateOneOfPropType(propTypes, "align", FILE_ALIGNMENTS);

      FILE_ALIGNMENTS.map(align =>
        it(`should be ${align}`, () => {
          const node = makeNode({ align });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${align}`)).toBe(true);
        }),
      );
    });

    describe("boxed", () => {
      validateBoolPropType(propTypes, "boxed");

      [false, true].map(boxed =>
        it(`should ${boxed ? "" : "not "}be boxed`, () => {
          const node = makeNode({ boxed });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass("is-boxed")).toBe(boxed);
        }),
      );
    });

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

    describe("fullwidth", () => {
      validateBoolPropType(propTypes, "fullwidth");

      [false, true].map(fullwidth =>
        it(`should ${fullwidth ? "" : "not "}be fullwidth`, () => {
          const node = makeNode({ fullwidth });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass("is-fullwidth")).toBe(fullwidth);
        }),
      );
    });

    describe("hasName", () => {
      validateBoolPropType(propTypes, "hasName");

      [false, true].map(hasName =>
        it(`should ${hasName ? "" : "not "}have name`, () => {
          const node = makeNode({ hasName });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass("has-name")).toBe(hasName);
        }),
      );
    });

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", FILE_SIZES);

      FILE_SIZES.map(size =>
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        }),
      );
    });
  });
});
