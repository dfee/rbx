import Enzyme from "enzyme";
import React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "src/base/theme";
import {
  initialValue as navbarInitialValue,
  NavbarContextValue,
} from "src/components/navbar/navbar-context";
import { NavbarMenu } from "src/components/navbar/navbar-menu";

import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = NavbarMenu;
const DISPLAY_NAME = "Navbar.Menu";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "navbar-menu";

const makeShallowWrapperInNavbarContextConsumer = (
  node: JSX.Element,
  navbarContextValue: NavbarContextValue = navbarInitialValue,
) => {
  const navbarContextConsumerWrapper = Enzyme.shallow(node);
  const NavbarContextConsumerChildren = (navbarContextConsumerWrapper.props() as {
    children: React.FC<NavbarContextValue>;
  }).children;

  return Enzyme.shallow(
    <NavbarContextConsumerChildren {...navbarContextValue} />,
  );
};

const makeGenericHOCShallowWrapperInContextConsumer = (
  node: JSX.Element,
  themeContextValue: ThemeContextValue = themeInitialValue,
  navbarContextValue: NavbarContextValue = navbarInitialValue,
) => {
  const navbarContextConsumerChildrenWrapper = makeShallowWrapperInNavbarContextConsumer(
    node,
    navbarContextValue,
  );
  const themeContextConsumerWrapper = navbarContextConsumerChildrenWrapper.dive();
  const ThemeContextConsumerChildren = (themeContextConsumerWrapper.props() as {
    children: React.FC<ThemeContextValue>;
  }).children;

  return Enzyme.shallow(
    <ThemeContextConsumerChildren {...themeContextValue} />,
  );
};

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    makeShallowWrapper: makeGenericHOCShallowWrapperInContextConsumer,
  });

  testThemeIntegration(COMPONENT, {
    makeShallowWrapper: makeGenericHOCShallowWrapperInContextConsumer,
  });

  describe("context", () => {
    describe("active", () => {
      [false, true].map(active => {
        it(`should ${active ? "" : "not "}be active`, () => {
          const node = <NavbarMenu />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(
            node,
            themeInitialValue,
            { ...navbarInitialValue, active },
          );
          expect(wrapper.hasClass("is-active")).toBe(active);
        });
      });
    });
  });
});
