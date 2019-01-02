import Enzyme from "enzyme";
import React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "../../../base/theme";
import {
  initialValue as navbarInitialValue,
  NavbarContextValue,
} from "../navbar-context";
import { NavbarMenu } from "../navbar-menu";

import {
  hasProperties,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "../../../__tests__/testing";

const COMPONENT = NavbarMenu;
const COMPONENT_NAME = "NavbarMenu";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "navbar-menu";

const makeNode = makeNodeFactory(COMPONENT);

const makeShallowWrapperInNavbarContextConsumer = (
  node: JSX.Element,
  navbarContextValue: NavbarContextValue = navbarInitialValue,
) => {
  const navbarContextConsumerWrapper = Enzyme.shallow(node);
  const NavbarContextConsumerChildren = navbarContextConsumerWrapper.props()
    .children;
  const navbarContextConsumerChildrenWrapper = Enzyme.shallow(
    <NavbarContextConsumerChildren {...navbarContextValue} />,
  );
  return navbarContextConsumerChildrenWrapper;
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
  const ThemeContextConsumerChildren = (themeContextConsumerWrapper.props() as any)
    .children;
  const wrapper = Enzyme.shallow(
    <ThemeContextConsumerChildren {...themeContextValue} />,
  );
  return wrapper;
};

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeGenericHOCShallowWrapperInContextConsumer,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeGenericHOCShallowWrapperInContextConsumer);

  describe("context", () => {
    describe("active", () => {
      [false, true].map(active =>
        it(`should ${active ? "" : "not "}be active`, () => {
          const node = makeNode({});
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(
            node,
            themeInitialValue,
            Object.assign({}, navbarInitialValue, { active }),
          );
          expect(wrapper.hasClass("is-active")).toBe(active);
        }),
      );
    });
  });
});
