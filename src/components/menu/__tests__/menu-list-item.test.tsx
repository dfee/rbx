import React from "react";

import { Menu } from "src/components/menu/menu";
import { MenuListItem } from "src/components/menu/menu-list-item";

import {
  GetInnerReactWrapperFunction,
  GetInnerShallowWrapperFunction,
  hasProperties,
  makeReactWrapperFactory,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validatePropType,
} from "src/__tests__/testing";

const COMPONENT = MenuListItem;
const DISPLAY_NAME = "Menu.List.Item";
const DEFAULT_ELEMENT = "a";
const BULMA_CLASS_NAME = undefined;

const getWrappingLIShallowWrapper: GetInnerShallowWrapperFunction = wrapper =>
  wrapper // Component
    .dive(); // Wrapping LI

const getLeafShallowWrapper: GetInnerShallowWrapperFunction = wrapper =>
  wrapper // Component
    .dive() // Wrapping LI
    .children() // Generic
    .dive(); // Leaf ("as")

const getLeafReactWrapper: GetInnerReactWrapperFunction = wrapper =>
  wrapper // Component
    .children() // Wrapping LI
    .children() // Generic
    .children(); // Leaf ("as")

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  describe("root", () => {
    it("should be li element", () => {
      const node = <MenuListItem />;
      const makeShallowWrapper = makeShallowWrapperFactory(
        getWrappingLIShallowWrapper,
      );
      const wrapper = makeShallowWrapper({ node });
      expect(wrapper.is("li")).toBe(true);
    });
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    makeShallowWrapper: makeShallowWrapperFactory(getLeafShallowWrapper),
  });

  testThemeIntegration(COMPONENT, {
    makeShallowWrapper: makeShallowWrapperFactory(getLeafShallowWrapper),
    makeReactWrapper: makeReactWrapperFactory(getLeafReactWrapper),
  });

  describe("props", () => {
    const { propTypes } = COMPONENT;
    const makeWrappingLIShallowWrapper = makeShallowWrapperFactory(
      getWrappingLIShallowWrapper,
    );
    const makeLeafShallowWrapper = makeShallowWrapperFactory(
      getLeafShallowWrapper,
    );

    describe("active", () => {
      validateBoolPropType(propTypes, "active");

      [false, true].map(active => {
        it(`should ${active ? "" : "not "}be active`, () => {
          const node = <MenuListItem active={active} />;
          const wrapper = makeLeafShallowWrapper({ node });
          expect(wrapper.hasClass("is-active")).toBe(active);
        });
      });
    });

    describe("menu", () => {
      const validMenu = <Menu />;
      const invalidMenu = { title: "string", items: [1, 2, 3] };

      validatePropType(propTypes, "menu", [
        { value: validMenu, valid: true, descriptor: "node" },
        { value: invalidMenu, valid: false, descriptor: "object" },
      ]);

      [<Menu key={1} className="foo" />, undefined].map(menu => {
        const isMenu = menu !== undefined;
        it(`should ${isMenu ? "" : "not "}have menu`, () => {
          const node = <MenuListItem menu={menu} />;
          const wrapper = makeWrappingLIShallowWrapper({ node });
          const children = wrapper.children();
          expect(children).toHaveLength(isMenu ? 2 : 1);
          if (isMenu) {
            expect(children.at(1).hasClass("foo"));
          }
        });
      });
    });
  });
});
