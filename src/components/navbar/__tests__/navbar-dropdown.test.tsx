import React from "react";

import {
  NAVBAR_DROPDOWN_DEFAULTS,
  NavbarDropdown,
} from "src/components/navbar/navbar-dropdown";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = NavbarDropdown;
const DISPLAY_NAME = "Navbar.Dropdown";
const DEFAULT_ELEMENT = "span";
const BULMA_CLASS_NAME = "navbar-dropdown";

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

      NAVBAR_DROPDOWN_DEFAULTS.alignments.map(align => {
        it(`should be aligned ${align}`, () => {
          const node = <NavbarDropdown align={align} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass(`is-${align}`)).toBe(true);
        });
      });
    });

    describe("boxed", () => {
      validateBoolPropType(propTypes, "boxed");

      [false, true].map(boxed => {
        it(`should ${boxed ? "" : "not "}be boxed`, () => {
          const node = <NavbarDropdown boxed={boxed} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-boxed")).toBe(boxed);
        });
      });
    });
  });
});
