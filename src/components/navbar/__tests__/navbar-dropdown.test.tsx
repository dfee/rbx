import React from "react";

import {
  NAVBAR_DROPDOWN_DEFAULTS,
  NavbarDropdown,
} from "src/components/navbar/navbar-dropdown";
import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

import { makeShallowWrapperInNavbarContextFactory } from "./testing";

const COMPONENT = NavbarDropdown;
const DISPLAY_NAME = "Navbar.Dropdown";
const DEFAULT_ELEMENT = "span";
const BULMA_CLASS_NAME = "navbar-dropdown";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
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
    const makeShallowWrapper = makeShallowWrapperInNavbarContextFactory();

    describe("align", () => {
      validateStringOrNumberPropType(propTypes, "align");

      NAVBAR_DROPDOWN_DEFAULTS.alignments.forEach(align => {
        it(`should be aligned ${align}`, () => {
          const node = <NavbarDropdown align={align} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass(`is-${align}`)).toBe(true);
        });
      });
    });

    describe("boxed", () => {
      validateBoolPropType(propTypes, "boxed");

      [false, true].forEach(boxed => {
        it(`should ${boxed ? "" : "not "}be boxed`, () => {
          const node = <NavbarDropdown boxed={boxed} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-boxed")).toBe(boxed);
        });
      });
    });
  });
});
