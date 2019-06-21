import React from "react";

import { NavbarMenu } from "src/components/navbar/navbar-menu";
import { initialValue as navbarInitialValue } from "src/components/navbar/navbar-context";
import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

import {
  getInnerReactWrapperInNavbarContext,
  makeReactWrapperInNavbarContextFactory,
  makeShallowWrapperInNavbarContextFactory,
} from "./testing";

const COMPONENT = NavbarMenu;
const DISPLAY_NAME = "Navbar.Menu";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "navbar-menu";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
    makeShallowWrapper: makeShallowWrapperInNavbarContextFactory(),
  });

  testThemeIntegration(COMPONENT, {
    makeReactWrapper: makeReactWrapperInNavbarContextFactory(),
    makeShallowWrapper: makeShallowWrapperInNavbarContextFactory(),
  });

  describe("context", () => {
    describe("active", () => {
      [false, true].forEach(active => {
        it(`should ${active ? "" : "not "}be active`, () => {
          const node = <NavbarMenu />;
          const makeReactWrapper = makeReactWrapperInNavbarContextFactory(
            getInnerReactWrapperInNavbarContext,
            { ...navbarInitialValue, active },
          );
          const wrapper = makeReactWrapper({ node });
          expect(wrapper.hasClass("is-active")).toBe(active);
        });
      });
    });
  });
});
