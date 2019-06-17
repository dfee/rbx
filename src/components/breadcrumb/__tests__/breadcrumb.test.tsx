import React from "react";

import {
  Breadcrumb,
  BREADCRUMB_DEFAULTS,
} from "src/components/breadcrumb/breadcrumb";
import { BreadcrumbItem } from "src/components/breadcrumb/breadcrumb-item";

import {
  hasProperties,
  makeShallowWrapperFactory2,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Breadcrumb;
const DISPLAY_NAME = "Breadcrumb";
const DEFAULT_ELEMENT = "nav";
const BULMA_CLASS_NAME = "breadcrumb";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Item: BreadcrumbItem,
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
  });

  testThemeIntegration(COMPONENT);

  describe("props", () => {
    const { propTypes } = COMPONENT;
    const makeShallowWrapper = makeShallowWrapperFactory2();

    describe("align", () => {
      validateStringOrNumberPropType(propTypes, "align");

      BREADCRUMB_DEFAULTS.alignments.map(align => {
        it(`should be ${align}`, () => {
          const node = <Breadcrumb align={align} />;
          const wrapper = makeShallowWrapper({ Component: COMPONENT, node });
          expect(wrapper.hasClass(`is-${align}`)).toBe(true);
        });
      });
    });

    describe("children", () => {
      it("should wrap children in ul element", () => {
        const children = <li>foo</li>;
        const node = <Breadcrumb children={children} />;
        const wrapper = makeShallowWrapper({ Component: COMPONENT, node });
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
          const node = <Breadcrumb separator={separator} />;
          const wrapper = makeShallowWrapper({ Component: COMPONENT, node });
          expect(wrapper.hasClass(`has-${separator}-separator`)).toBe(true);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      BREADCRUMB_DEFAULTS.sizes.map(size => {
        it(`should be ${size}`, () => {
          const node = <Breadcrumb size={size} />;
          const wrapper = makeShallowWrapper({ Component: COMPONENT, node });
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
