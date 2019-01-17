import Enzyme from "enzyme";
import React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "src/base/theme";
import { NavbarItemContainer } from "src/components/navbar/navbar-item-container";
import {
  initialValue as navbarItemInitialValue,
  NavbarItemContextValue,
} from "src/components/navbar/navbar-item-context";

import {
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = NavbarItemContainer;
const DISPLAY_NAME = "Navbar.Item.Container";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "navbar-item";

const makeShallowWrapper = (
  node: JSX.Element,
  navbarItemContextValue: NavbarItemContextValue = navbarItemInitialValue,
) => {
  // render in Context Consumer
  const navbarItemContextConsumerWrapper = Enzyme.shallow(node);
  const NavbarItemContextConsumerChildren = (navbarItemContextConsumerWrapper.props() as {
    children: React.FC<NavbarItemContextValue>;
  }).children;

  return Enzyme.shallow(
    <NavbarItemContextConsumerChildren {...navbarItemContextValue} />,
  );
};

const makeGenericHOCShallowWrapperInContextConsumer = (
  node: JSX.Element,
  themeContextValue: ThemeContextValue = themeInitialValue,
  navbarItemContextValue: NavbarItemContextValue = navbarItemInitialValue,
) => {
  const forwardRefWrapper = makeShallowWrapper(node, navbarItemContextValue);
  const themeContextConsumerWrapper = forwardRefWrapper.dive();
  const ThemeContextConsumerChildren = (themeContextConsumerWrapper.props() as {
    children: React.FC<ThemeContextValue>;
  }).children;

  return Enzyme.shallow(
    <ThemeContextConsumerChildren {...themeContextValue} />,
  );
};

describe(`${DISPLAY_NAME} component`, () => {
  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    makeShallowWrapper: makeGenericHOCShallowWrapperInContextConsumer,
    refProp: "innerRef",
  });

  testThemeIntegration(COMPONENT, {
    makeShallowWrapper: makeGenericHOCShallowWrapperInContextConsumer,
  });

  describe("props", () => {
    describe("active", () => {
      [false, true].map(active => {
        it(`should ${active ? "" : "not "}be active`, () => {
          const node = <NavbarItemContainer active={active} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-active")).toBe(active);
        });
      });
    });

    describe("expanded", () => {
      [false, true].map(expanded => {
        it(`should ${expanded ? "" : "not "}be expanded`, () => {
          const node = <NavbarItemContainer expanded={expanded} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-expanded")).toBe(expanded);
        });
      });
    });

    describe("onClick", () => {
      [false, true].map(hasOnClick => {
        it(`should update context ${
          hasOnClick ? "and call provided onClick" : ""
        }`, () => {
          const onClick = hasOnClick ? jest.fn() : undefined;
          const setActive = jest.fn();
          const node = <NavbarItemContainer onClick={onClick} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(
            node,
            themeInitialValue,
            {
              active: false,
              setActive,
            },
          );
          wrapper.simulate("click");
          if (onClick !== undefined) {
            expect(onClick.mock.calls).toHaveLength(1);
          }
          expect(setActive.mock.calls).toHaveLength(1);
          expect(setActive.mock.calls[0]).toEqual([true]);
        });
      });
    });

    describe("tab", () => {
      [false, true].map(tab => {
        it(`should ${tab ? "" : "not "}be tab`, () => {
          const node = <NavbarItemContainer tab={tab} />;
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-tab")).toBe(tab);
        });
      });
    });
  });
});
