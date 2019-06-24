import React from "react";

import { TAB_GROUP_DEFAULTS, TabGroup } from "src/components/tab/tab-group";
import {
  hasProperties,
  makeShallowWrapperFactory,
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
    VARIABLE_DEFAULTS: TAB_GROUP_DEFAULTS,
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
  });

  testThemeIntegration(COMPONENT);

  describe("props", () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = COMPONENT;

    const makeShallowWrapper = makeShallowWrapperFactory();

    describe("align", () => {
      validateStringOrNumberPropType(propTypes, "align");

      TAB_GROUP_DEFAULTS.alignments.forEach(align => {
        it(`should be ${align}`, () => {
          const node = <TabGroup align={align} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${align}`)).toBe(true);
        });
      });
    });

    describe("children", () => {
      it("should wrap children in an ul element", () => {
        const node = (
          <TabGroup>
            <div className="foo" />
          </TabGroup>
        );
        const wrapper = makeShallowWrapper({ node });
        const children = wrapper.children();
        expect(children.is("ul")).toBe(true);
        expect(children.children().is("div")).toBe(true);
        expect(children.children().hasClass("foo")).toBe(true);
      });
    });

    describe("fullwidth", () => {
      validateBoolPropType(propTypes, "fullwidth");

      [false, true].forEach(fullwidth => {
        it(`should ${fullwidth ? "" : "not "}be fullwidth`, () => {
          const node = <TabGroup fullwidth={fullwidth} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-fullwidth")).toBe(fullwidth);
        });
      });
    });

    describe("kind", () => {
      validateStringOrNumberPropType(propTypes, "kind");

      TAB_GROUP_DEFAULTS.kinds.forEach(kind => {
        it(`should be ${kind}`, () => {
          const node = <TabGroup kind={kind} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${kind}`)).toBe(true);
        });
      });
    });

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      TAB_GROUP_DEFAULTS.sizes.forEach(size => {
        it(`should be ${size}`, () => {
          const node = <TabGroup size={size} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        });
      });
    });
  });
});
