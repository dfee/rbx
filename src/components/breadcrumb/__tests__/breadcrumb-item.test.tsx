import Enzyme from "enzyme";
import React from "react";

import { transformHelpers } from "../../../base/helpers";
import { BreadcrumbItem } from "../breadcrumb-item";

import {
  hasProperties,
  makeNodeFactory,
  MakeShallowWrapperFunction,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
} from "../../../__tests__/testing";

const COMPONENT = BreadcrumbItem;
const COMPONENT_NAME = "BreadcrumbItem";
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

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeShallowLeafWrapper,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeShallowLeafWrapper);

  describe("root", () => {
    it("should be li element", () => {
      const node = makeNode({});
      const wrapper = makeShallowRootWrapper(node);
      expect(wrapper.is("li")).toBe(true);
    });
  });

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("active", () => {
      validateBoolPropType(propTypes, "active");

      [false, true].map(active =>
        it(`should ${active ? "" : "not "}be active`, () => {
          const node = makeNode({ active });
          const wrapper = makeShallowRootWrapper(node);
          expect(wrapper.hasClass("is-active")).toBe(active);
        }),
      );
    });
  });
});
