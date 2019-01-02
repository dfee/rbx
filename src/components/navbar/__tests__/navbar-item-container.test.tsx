import Enzyme from "enzyme";
import React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "../../../base/theme";
import {
  NavbarItemContainer,
  NavbarItemContainerProps,
} from "../navbar-item-container";
import {
  initialValue as navbarItemInitialValue,
  NavbarItemContextValue,
} from "../navbar-item-context";

import {
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "../../../__tests__/testing";

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
  const NavbarItemContextConsumerChildren = navbarItemContextConsumerWrapper.props()
    .children;
  const wrapper = Enzyme.shallow(
    <NavbarItemContextConsumerChildren {...navbarItemContextValue} />,
  );
  return wrapper;
};

const makeGenericHOCShallowWrapperInContextConsumer = (
  node: JSX.Element,
  themeContextValue: ThemeContextValue = themeInitialValue,
  navbarItemContextValue: NavbarItemContextValue = navbarItemInitialValue,
) => {
  const forwardRefWrapper = makeShallowWrapper(node, navbarItemContextValue);
  const themeContextConsumerWrapper = forwardRefWrapper.dive();
  const ThemeContextConsumerChildren = (themeContextConsumerWrapper.props() as any)
    .children;
  const wrapper = Enzyme.shallow(
    <ThemeContextConsumerChildren {...themeContextValue} />,
  );
  return wrapper;
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
      [false, true].map(active =>
        it(`should ${active ? "" : "not "}be active`, () => {
          const node = makeNode({ active });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-active")).toBe(active);
        }),
      );
    });

    describe("onClick", () => {
      [false, true].map(hasOnClick =>
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
        }),
      );
    });
  });
});
