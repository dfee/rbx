import React from "react";

import { Checkbox } from "../checkbox";
import { Input } from "../input";
import { Label, LABEL_SIZES } from "../label";
import { Radio } from "../radio";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testTransformHelpersIntegration,
  validateBoolPropType,
  validateOneOfPropType,
} from "../../../__tests__/testing";

const COMPONENT = Label;
const COMPONENT_NAME = "Label";
const DEFAULT_ELEMENT = "label";
const BULMA_CLASS_NAME = "label";

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

    describe("disabled", () => {
      validateBoolPropType(propTypes, "disabled");

      [false, true].map(disabled =>
        it(`should ${disabled ? "" : "not "}be disabled`, () => {
          const node = makeNode({ disabled });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass("is-disabled")).toBe(disabled);
        }),
      );
    });

    describe("discriminator", () => {
      [
        { discriminator: "checkbox", className: "checkbox" },
        { discriminator: "input", className: "label" },
        { discriminator: "radio", className: "radio" },
        { discriminator: "string", className: "label" },
        { discriminator: "fragment-radio", className: "radio" },
        { discriminator: "fragment-empty", className: "label" },
        { discriminator: "compound-radio", className: "radio" },
        { discriminator: "empty", className: "label" },
      ].map(({ discriminator, className }) =>
        it(`should have bulma className ${className} for discriminator ${discriminator}`, () => {
          let children: JSX.Element | string | JSX.Element[] | null;
          if (discriminator === "input") {
            children = <Input />;
          } else if (discriminator === "checkbox") {
            children = <Checkbox />;
          } else if (discriminator === "radio") {
            children = <Radio />;
          } else if (discriminator === "fragment-radio") {
            children = <React.Fragment children={<Radio />} />;
          } else if (discriminator === "fragment-empty") {
            children = <React.Fragment />;
          } else if (discriminator === "compound-radio") {
            children = [React.createElement("div"), React.createElement(Radio)];
          } else if (discriminator === "empty") {
            children = null;
          } else {
            children = discriminator;
          }
          const node = makeNode({ children });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(className)).toBe(true);
        }),
      );
    });

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", LABEL_SIZES);

      LABEL_SIZES.map(size =>
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        }),
      );
    });
  });
});
