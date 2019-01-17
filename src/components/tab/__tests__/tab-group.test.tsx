import React from "react";

import { TAB_GROUP_DEFAULTS, TabGroup } from "src/components/tab/tab-group";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = TabGroup;
const DISPLAY_NAME = "Tab.Group";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "tabs";

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

    describe("align", () => {
      validateStringOrNumberPropType(propTypes, "align");

      TAB_GROUP_DEFAULTS.alignments.map(align => {
        it(`should be ${align}`, () => {
          const node = <TabGroup align={align} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${align}`)).toBe(true);
        });
      });
    });

    describe("children", () => {
      it("should wrap children in an ul element", () => {
        const node = <TabGroup children={<div className="foo" />} />;
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
          const node = <TabGroup fullwidth={fullwidth} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-fullwidth")).toBe(fullwidth);
        });
      });
    });

    describe("kind", () => {
      validateStringOrNumberPropType(propTypes, "kind");

      TAB_GROUP_DEFAULTS.kinds.map(kind => {
        it(`should be ${kind}`, () => {
          const node = <TabGroup kind={kind} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${kind}`)).toBe(true);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      TAB_GROUP_DEFAULTS.sizes.map(size => {
        it(`should be ${size}`, () => {
          const node = <TabGroup size={size} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
