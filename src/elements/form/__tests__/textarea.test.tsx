import { COLORS } from "../../../base/helpers";
import { Textarea, TEXTAREA_SIZES, TEXTAREA_STATES } from "../textarea";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testTransformHelpersIntegration,
  validateBoolPropType,
  validateOneOfPropType,
} from "../../../__tests__/testing";

const COMPONENT = Textarea;
const COMPONENT_NAME = "Textarea";
const DEFAULT_ELEMENT = "textarea";
const BULMA_CLASS_NAME = "textarea";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: {
      as: DEFAULT_ELEMENT,
      rows: 4,
    },
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

    describe("fixedSize", () => {
      validateBoolPropType(propTypes, "fixedSize");

      [false, true].map(fixedSize =>
        it(`should ${fixedSize ? "" : "not "}be fixed size`, () => {
          const node = makeNode({ fixedSize });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass("has-fixed-size")).toBe(fixedSize);
        }),
      );
    });

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", TEXTAREA_SIZES);

      TEXTAREA_SIZES.map(size =>
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        }),
      );
    });

    describe("state", () => {
      validateOneOfPropType(propTypes, "state", TEXTAREA_STATES);

      TEXTAREA_STATES.map(state =>
        it(`should be ${state}`, () => {
          const node = makeNode({ state });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${state}`)).toBe(true);
        }),
      );
    });
  });
});
