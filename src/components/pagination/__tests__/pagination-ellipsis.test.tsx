import Enzyme from "enzyme";
import React from "react";

import { transformHelpers } from "../../../base/helpers";
import { PaginationEllipsis } from "../pagination-ellipsis";

import {
  hasProperties,
  makeNodeFactory,
  MakeShallowWrapperFunction,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "../../../__tests__/testing";

const COMPONENT = PaginationEllipsis;
const COMPONENT_NAME = "PaginationEllipsis";
const DEFAULT_ELEMENT = "span";
const BULMA_CLASS_NAME = "pagination-ellipsis";

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
    defaultProps: {
      as: DEFAULT_ELEMENT,
      children: "…",
    },
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
});
