import { COLORS } from "../../../base/helpers";
import { Input, INPUT_SIZES, INPUT_STATES, INPUT_TYPES } from "../input";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateOneOfPropType,
} from "../../../__tests__/testing";

const COMPONENT = Input;
const COMPONENT_NAME = "Input";
const DEFAULT_ELEMENT = "input";
const BULMA_CLASS_NAME = "input";

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

  testThemeIntegration(makeNode, makeShallowWrapper);

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

    describe("readOnly", () => {
      validateBoolPropType(propTypes, "readOnly");

      [false, true].map(readOnly =>
        it(`should ${readOnly ? "" : "not "}be readOnly`, () => {
          const node = makeNode({ readOnly });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.prop("readOnly")).toBe(readOnly ? true : undefined);
        }),
      );
    });

    describe("rounded", () => {
      validateBoolPropType(propTypes, "rounded");

      [false, true].map(rounded =>
        it(`should ${rounded ? "" : "not "}be rounded`, () => {
          const node = makeNode({ rounded });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass("is-rounded")).toBe(rounded);
        }),
      );
    });

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", INPUT_SIZES);

      INPUT_SIZES.map(size =>
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        }),
      );
    });

    describe("state", () => {
      validateOneOfPropType(propTypes, "state", INPUT_STATES);

      INPUT_STATES.map(state =>
        it(`should be ${state}`, () => {
          const node = makeNode({ state });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${state}`)).toBe(true);
        }),
      );
    });

    describe("static", () => {
      validateBoolPropType(propTypes, "static");

      [false, true].map(isStatic =>
        it(`should ${isStatic ? "" : "not "}be static`, () => {
          const node = makeNode({ static: isStatic });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass("is-static")).toBe(isStatic);
          expect(wrapper.prop("readOnly")).toBe(isStatic);
        }),
      );
    });

    describe("type", () => {
      validateOneOfPropType(propTypes, "type", INPUT_TYPES);

      INPUT_TYPES.map(type =>
        it(`should be ${type}`, () => {
          const node = makeNode({ type });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.props().type).toEqual(type);
        }),
      );
    });
  });
});
