import React from "react";

import { Tab } from "../tab";
import { Tabs, TABS_ALIGNMENTS, TABS_SIZES, TABS_TYPES } from "../tabs";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateOneOfPropType,
} from "../../../__tests__/testing";

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
      validateOneOfPropType(propTypes, "align", TABS_ALIGNMENTS);

      TABS_ALIGNMENTS.map(align =>
        it(`should be ${align}`, () => {
          const node = makeNode({ align });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${align}`)).toBe(true);
        }),
      );
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

      [false, true].map(fullwidth =>
        it(`should ${fullwidth ? "" : "not "}be fullwidth`, () => {
          const node = makeNode({ fullwidth });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-fullwidth")).toBe(fullwidth);
        }),
      );
    });

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", TABS_SIZES);

      TABS_SIZES.map(size =>
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        }),
      );
    });

    describe("type", () => {
      validateOneOfPropType(propTypes, "type", TABS_TYPES);

      TABS_TYPES.map(type =>
        it(`should be ${type}`, () => {
          const node = makeNode({ type });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${type}`)).toBe(true);
        }),
      );
    });
  });
});
