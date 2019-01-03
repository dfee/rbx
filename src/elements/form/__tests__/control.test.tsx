import { Control, CONTROL_SIZES } from "src/elements/form/control";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateOneOfPropType,
} from "src/__tests__/testing";

const COMPONENT = Control;
const COMPONENT_NAME = "Control";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "control";

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

    describe("expanded", () => {
      validateBoolPropType(propTypes, "expanded");

      [false, true].map(expanded => {
        it(`should ${expanded ? "" : "not "}be expanded`, () => {
          const node = makeNode({ expanded });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-expanded")).toBe(expanded);
        });
      });
    });

    describe("iconLeft", () => {
      validateBoolPropType(propTypes, "iconLeft");

      [false, true].map(iconLeft => {
        it(`should ${iconLeft ? "" : "not "}have left icon`, () => {
          const node = makeNode({ iconLeft });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("has-icons-left")).toBe(iconLeft);
        });
      });
    });

    describe("iconRight", () => {
      validateBoolPropType(propTypes, "iconRight");

      [false, true].map(iconRight => {
        it(`should ${iconRight ? "" : "not "}have right icon`, () => {
          const node = makeNode({ iconRight });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("has-icons-right")).toBe(iconRight);
        });
      });
    });

    describe("loading", () => {
      validateBoolPropType(propTypes, "loading");

      [false, true].map(loading => {
        it(`should ${loading ? "" : "not "}be loading`, () => {
          const node = makeNode({ loading });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-loading")).toBe(loading);
        });
      });
    });

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", CONTROL_SIZES);

      CONTROL_SIZES.map(size => {
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
