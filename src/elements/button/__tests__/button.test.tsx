import { COLORS } from "src/base/helpers/variables";
import {
  Button,
  BUTTON_SIZES,
  BUTTON_STATES,
} from "src/elements/button/button";
import { ButtonGroup } from "src/elements/button/button-group";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateOneOfPropType,
} from "src/__tests__/testing";

const COMPONENT = Button;
const COMPONENT_NAME = "Button";
const DEFAULT_ELEMENT = "button";
const BULMA_CLASS_NAME = "button";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Group: ButtonGroup,
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

    describe("disabled", () => {
      validateBoolPropType(propTypes, "disabled");

      [false, true].map(disabled => {
        it(`should ${disabled ? "" : "not "}be disabled`, () => {
          const node = makeNode({ disabled });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.prop("disabled")).toBe(disabled);
        });
      });
    });

    describe("fullwidth", () => {
      validateBoolPropType(propTypes, "fullwidth");

      [false, true].map(fullwidth => {
        it(`should ${fullwidth ? "" : "not "}be fullwidth`, () => {
          const node = makeNode({ fullwidth });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-fullwidth")).toBe(fullwidth);
        });
      });
    });

    describe("inverted", () => {
      validateBoolPropType(propTypes, "inverted");

      [false, true].map(inverted => {
        it(`should ${inverted ? "" : "not "}be inverted`, () => {
          const node = makeNode({ inverted });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-inverted")).toBe(inverted);
        });
      });
    });

    describe("outlined", () => {
      validateBoolPropType(propTypes, "outlined");

      [false, true].map(outlined => {
        it(`should ${outlined ? "" : "not "}be outlined`, () => {
          const node = makeNode({ outlined });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-outlined")).toBe(outlined);
        });
      });
    });

    describe("rounded", () => {
      validateBoolPropType(propTypes, "rounded");

      [false, true].map(rounded => {
        it(`should ${rounded ? "" : "not "}be rounded`, () => {
          const node = makeNode({ rounded });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-rounded")).toBe(rounded);
        });
      });
    });

    describe("selected", () => {
      validateBoolPropType(propTypes, "selected");

      [false, true].map(selected => {
        it(`should ${selected ? "" : "not "}be selected`, () => {
          const node = makeNode({ selected });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-selected")).toBe(selected);
        });
      });
    });

    describe("state", () => {
      BUTTON_STATES.map(state => {
        it(`should be ${state}`, () => {
          const node = makeNode({ state });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${state}`)).toBe(true);
        });
      });
    });

    describe("static", () => {
      validateBoolPropType(propTypes, "static");

      [false, true].map(isStatic => {
        it(`should ${isStatic ? "" : "not "}be static`, () => {
          const node = makeNode({ static: isStatic });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-static")).toBe(isStatic);
        });
      });
    });

    describe("text", () => {
      validateBoolPropType(propTypes, "text");

      [false, true].map(text => {
        it(`should ${text ? "" : "not "}be text`, () => {
          const node = makeNode({ text });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-text")).toBe(text);
        });
      });
    });

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", BUTTON_SIZES);

      BUTTON_SIZES.map(size => {
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
