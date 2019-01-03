import * as Enzyme from "enzyme";
import * as React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "src/base/theme";
import {
  NavbarItemContainer,
  NavbarItemContainerProps,
} from "src/components/navbar/navbar-item-container";
import {
  initialValue as navbarItemInitialValue,
  NavbarItemContextValue,
} from "src/components/navbar/navbar-item-context";

import {
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

// const COMPONENT = NavbarItemContainer;
const COMPONENT_NAME = "NavbarItemContainer";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "navbar-item";

const makeNode = (props: NavbarItemContainerProps) => (
  <NavbarItemContainer {...props} />
);

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

describe(`${COMPONENT_NAME} component`, () => {
  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeGenericHOCShallowWrapperInContextConsumer,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
    "innerRef",
  );

  testThemeIntegration(makeNode, makeGenericHOCShallowWrapperInContextConsumer);

  describe("props", () => {
    describe("active", () => {
      [false, true].map(active => {
        it(`should ${active ? "" : "not "}be active`, () => {
          const node = makeNode({ active });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-active")).toBe(active);
        });
      });
    });

    describe("onClick", () => {
      [false, true].map(hasOnClick => {
        it(`should update context ${
          hasOnClick ? "and call provided onClick" : ""
        }`, () => {
          const onClick = jest.fn();
          const setActive = jest.fn();
          const node = makeNode({ onClick: hasOnClick ? onClick : undefined });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(
            node,
            themeInitialValue,
            {
              active: false,
              setActive,
            },
          );
          wrapper.simulate("click");
          expect(onClick.mock.calls).toHaveLength(hasOnClick ? 1 : 0);
          expect(setActive.mock.calls).toHaveLength(1);
          expect(setActive.mock.calls[0]).toEqual([true]);
        });
      });
    });
  });
});
