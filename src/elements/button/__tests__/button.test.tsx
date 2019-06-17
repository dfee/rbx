import React from "react";

import { DEFAULTS } from "src/base/helpers/variables";
import { Button, BUTTON_DEFAULTS } from "src/elements/button/button";
import { ButtonGroup } from "src/elements/button/button-group";

import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Button;
const DISPLAY_NAME = "Button";
const DEFAULT_ELEMENT = "button";
const BULMA_CLASS_NAME = "button";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Group: ButtonGroup,
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
    const makeShallowWrapper = makeShallowWrapperFactory();

    describe("color", () => {
      validateStringOrNumberPropType(propTypes, "color");

      DEFAULTS.colors.map(color => {
        it(`should be ${color}`, () => {
          const node = <Button color={color} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        });
      });
    });

    describe("fullwidth", () => {
      validateBoolPropType(propTypes, "fullwidth");

      [false, true].map(fullwidth => {
        it(`should ${fullwidth ? "" : "not "}be fullwidth`, () => {
          const node = <Button fullwidth={fullwidth} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-fullwidth")).toBe(fullwidth);
        });
      });
    });

    describe("inverted", () => {
      validateBoolPropType(propTypes, "inverted");

      [false, true].map(inverted => {
        it(`should ${inverted ? "" : "not "}be inverted`, () => {
          const node = <Button inverted={inverted} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-inverted")).toBe(inverted);
        });
      });
    });

    describe("outlined", () => {
      validateBoolPropType(propTypes, "outlined");

      [false, true].map(outlined => {
        it(`should ${outlined ? "" : "not "}be outlined`, () => {
          const node = <Button outlined={outlined} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-outlined")).toBe(outlined);
        });
      });
    });

    describe("rounded", () => {
      validateBoolPropType(propTypes, "rounded");

      [false, true].map(rounded => {
        it(`should ${rounded ? "" : "not "}be rounded`, () => {
          const node = <Button rounded={rounded} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-rounded")).toBe(rounded);
        });
      });
    });

    describe("selected", () => {
      validateBoolPropType(propTypes, "selected");

      [false, true].map(selected => {
        it(`should ${selected ? "" : "not "}be selected`, () => {
          const node = <Button selected={selected} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-selected")).toBe(selected);
        });
      });
    });

    describe("state", () => {
      validateStringOrNumberPropType(propTypes, "state");

      BUTTON_DEFAULTS.states.map(state => {
        it(`should be ${state}`, () => {
          const node = <Button state={state} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${state}`)).toBe(true);
        });
      });
    });

    describe("static", () => {
      validateBoolPropType(propTypes, "static");

      [false, true].map(isStatic => {
        it(`should ${isStatic ? "" : "not "}be static`, () => {
          const node = <Button static={isStatic} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-static")).toBe(isStatic);
        });
      });
    });

    describe("text", () => {
      validateBoolPropType(propTypes, "text");

      [false, true].map(text => {
        it(`should ${text ? "" : "not "}be text`, () => {
          const node = <Button text={text} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-text")).toBe(text);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      BUTTON_DEFAULTS.sizes.map(size => {
        it(`should be ${size}`, () => {
          const node = <Button size={size} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
