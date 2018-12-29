import Enzyme from "enzyme";
import React from "react";

import { transformHelpers } from "../../../base/helpers";
import { Menu } from "../menu";
import { MenuListItem } from "../menu-list-item";

import {
  hasProperties,
  makeNodeFactory,
  MakeShallowWrapperFunction,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validatePropType,
} from "../../../__tests__/testing";

const COMPONENT = MenuListItem;
const COMPONENT_NAME = "MenuListItem";
const DEFAULT_ELEMENT = "a";
const BULMA_CLASS_NAME = undefined;

const makeNode = makeNodeFactory(COMPONENT);

const makeShallowRootWrapper = (node: JSX.Element) => Enzyme.shallow(node);

export const makeShallowLeafWrapper: MakeShallowWrapperFunction = (
  node,
  contextValue = { transform: transformHelpers },
) => {
  const liWrapper = Enzyme.shallow(node);
  const forwardRefWrapper = liWrapper.children();
  const contextConsumerWrapper = forwardRefWrapper.dive();
  const Children = (contextConsumerWrapper.props() as any).children;
  const wrapper = Enzyme.shallow(<Children {...contextValue} />);
  return wrapper;
};

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  describe("root", () => {
    it("should be li element", () => {
      const node = makeNode({});
      const wrapper = makeShallowRootWrapper(node);
      expect(wrapper.is("li")).toBe(true);
    });
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeShallowLeafWrapper,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeShallowLeafWrapper);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("active", () => {
      validateBoolPropType(propTypes, "active");

      [false, true].map(active =>
        it(`should ${active ? "" : "not "}be active`, () => {
          const node = makeNode({ active });
          const wrapper = makeShallowLeafWrapper(node);
          expect(wrapper.hasClass("is-active")).toBe(active);
        }),
      );
    });

    describe("menu", () => {
      const validMenu = <Menu />;
      const invalidMenu = { title: "string", items: [1, 2, 3] };

      validatePropType(propTypes, "menu", [
        { value: validMenu, valid: true, descriptor: "node" },
        { value: invalidMenu, valid: false, descriptor: "object" },
      ]);

      [<Menu key={1} className="foo" />, null].map(menu =>
        it(`should ${menu ? "" : "not "}have menu`, () => {
          const node = makeNode({ menu });
          const wrapper = makeShallowRootWrapper(node);
          const children = wrapper.children();
          expect(children).toHaveLength(menu ? 2 : 1);
          if (menu) {
            expect(children.at(1).hasClass("foo"));
          }
        }),
      );
    });
  });
});
