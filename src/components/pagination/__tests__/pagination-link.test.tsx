import Enzyme from "enzyme";
import React from "react";

import { transformHelpers } from "../../../base/helpers";
import { PaginationLink } from "../pagination-link";

import {
  hasProperties,
  makeNodeFactory,
  MakeShallowWrapperFunction,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
} from "../../../__tests__/testing";

const COMPONENT = PaginationLink;
const COMPONENT_NAME = "PaginationLink";
const DEFAULT_ELEMENT = "a";
const BULMA_CLASS_NAME = "pagination-link";

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

    describe("current", () => {
      validateBoolPropType(propTypes, "current");

      [false, true].map(current =>
        it(`should ${current ? "" : "not "}be current`, () => {
          const node = makeNode({ current });
          const wrapper = makeShallowLeafWrapper(node);
          expect(wrapper.hasClass("is-current")).toBe(current);
        }),
      );
    });
  });
});
