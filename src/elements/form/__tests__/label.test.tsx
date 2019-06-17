import React from "react";

import { Checkbox } from "src/elements/form/checkbox";
import { Input } from "src/elements/form/input";
import { Label, LABEL_DEFAULTS } from "src/elements/form/label";
import { Radio } from "src/elements/form/radio";

import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Label;
const DISPLAY_NAME = "Label";
const DEFAULT_ELEMENT = "label";
const BULMA_CLASS_NAME = "label";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
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

    describe("disabled", () => {
      validateBoolPropType(propTypes, "disabled");

      [false, true].map(disabled => {
        it(`should ${disabled ? "" : "not "}be disabled`, () => {
          const node = <Label disabled={disabled} />;
          const wrapper = makeShallowWrapper({ Component: COMPONENT, node });
          expect(wrapper.hasClass("is-disabled")).toBe(disabled);
        });
      });
    });

    describe("discriminator", () => {
      [
        { discriminator: "input", className: "label" },
        { discriminator: "checkbox-as-component", className: "checkbox" },
        { discriminator: "checkbox-as-input", className: "checkbox" },
        { discriminator: "radio-as-component", className: "radio" },
        { discriminator: "radio-as-input", className: "radio" },
        { discriminator: "string", className: "label" },
        { discriminator: "fragment-radio", className: "radio" },
        { discriminator: "fragment-empty", className: "label" },
        { discriminator: "compound-radio", className: "radio" },
        { discriminator: "empty", className: "label" },
      ].map(({ discriminator, className }) => {
        it(`should have bulma className ${className} for discriminator ${discriminator}`, () => {
          let children: JSX.Element | string | JSX.Element[] | undefined;
          if (discriminator === "input") {
            children = <Input />;
          } else if (discriminator === "checkbox-as-input") {
            children = (
              <input type="checkbox" value="checkbox" aria-checked={false} />
            );
          } else if (discriminator === "checkbox-as-component") {
            children = <Checkbox />;
          } else if (discriminator === "radio-as-component") {
            children = <Radio />;
          } else if (discriminator === "radio-as-input") {
            children = (
              <input type="radio" value="radio" aria-checked={false} />
            );
          } else if (discriminator === "fragment-radio") {
            children = <React.Fragment children={<Radio />} />;
          } else if (discriminator === "fragment-empty") {
            children = <React.Fragment />;
          } else if (discriminator === "compound-radio") {
            // children = [React.createElement("div"), React.createElement(Radio)];
            children = [<div key={0} />, <Radio key={1} />];
          } else if (discriminator === "empty") {
            children = undefined;
          } else {
            children = discriminator;
          }
          const node = <Label children={children} />;
          const wrapper = makeShallowWrapper({ Component: COMPONENT, node });
          expect(wrapper.hasClass(className)).toBe(true);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      LABEL_DEFAULTS.sizes.map(size => {
        it(`should be ${size}`, () => {
          const node = <Label size={size} />;
          const wrapper = makeShallowWrapper({ Component: COMPONENT, node });
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
