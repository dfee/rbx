import { COLORS } from "src/base/helpers";
import {
  Textarea,
  TEXTAREA_SIZES,
  TEXTAREA_STATES,
} from "src/elements/form/textarea";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateOneOfPropType,
} from "src/__tests__/testing";

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

    describe("fixedSize", () => {
      validateBoolPropType(propTypes, "fixedSize");

      [false, true].map(fixedSize => {
        it(`should ${fixedSize ? "" : "not "}be fixed size`, () => {
          const node = makeNode({ fixedSize });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("has-fixed-size")).toBe(fixedSize);
        });
      });
    });

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", TEXTAREA_SIZES);

      TEXTAREA_SIZES.map(size => {
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });

    describe("state", () => {
      validateOneOfPropType(propTypes, "state", TEXTAREA_STATES);

      TEXTAREA_STATES.map(state => {
        it(`should be ${state}`, () => {
          const node = makeNode({ state });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${state}`)).toBe(true);
        });
      });
    });
  });
});
