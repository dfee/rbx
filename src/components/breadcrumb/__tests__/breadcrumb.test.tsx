import React from "react";

import {
  Breadcrumb,
  BREADCRUMB_DEFAULTS,
} from "src/components/breadcrumb/breadcrumb";
import { BreadcrumbItem } from "src/components/breadcrumb/breadcrumb-item";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Breadcrumb;
const COMPONENT_NAME = "Breadcrumb";
const DEFAULT_ELEMENT = "nav";
const BULMA_CLASS_NAME = "breadcrumb";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Item: BreadcrumbItem,
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

      BREADCRUMB_DEFAULTS.alignments.map(align => {
        it(`should be ${align}`, () => {
          const node = makeNode({ align });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${align}`)).toBe(true);
        });
      });
    });

    describe("children", () => {
      it("should wrap children in ul element", () => {
        const children = <li>foo</li>;
        const node = makeNode({ children });
        const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
        expect(wrapper.children().is("ul")).toBe(true);
        expect(
          wrapper
            .children()
            .children()
            .is("li"),
        ).toBe(true);
        expect(
          wrapper
            .children()
            .children()
            .contains("foo"),
        ).toBe(true);
      });
    });

    describe("separator", () => {
      validateStringOrNumberPropType(propTypes, "separator");

      BREADCRUMB_DEFAULTS.separators.map(separator => {
        it(`should be ${separator}`, () => {
          const node = makeNode({ separator });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`has-${separator}-separator`)).toBe(true);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      BREADCRUMB_DEFAULTS.sizes.map(size => {
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
