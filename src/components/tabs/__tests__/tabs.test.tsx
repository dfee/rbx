import * as React from "react";

import { Tab } from "src/components/tabs/tab";
import { Tabs, TABS_DEFAULTS } from "src/components/tabs/tabs";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Tabs;
const COMPONENT_NAME = "Tabs";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "tabs";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Tab,
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

    describe("align", () => {
      validateStringOrNumberPropType(propTypes, "align");

      TABS_DEFAULTS.alignments.map(align => {
        it(`should be ${align}`, () => {
          const node = makeNode({ align });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${align}`)).toBe(true);
        });
      });
    });

    describe("children", () => {
      it("should wrap children in an ul element", () => {
        const node = makeNode({ children: <div className="foo" /> });
        const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
        const children = wrapper.children();
        expect(children.is("ul")).toBe(true);
        expect(children.children().is("div")).toBe(true);
        expect(children.children().hasClass("foo")).toBe(true);
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

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      TABS_DEFAULTS.sizes.map(size => {
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });

    describe("type", () => {
      validateStringOrNumberPropType(propTypes, "type");

      TABS_DEFAULTS.types.map(isType => {
        it(`should be ${isType}`, () => {
          const node = makeNode({ type: isType });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${isType}`)).toBe(true);
        });
      });
    });
  });
});
