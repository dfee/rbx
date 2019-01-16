import Enzyme from "enzyme";
import React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "src/base/theme";
import { PaginationEllipsis } from "src/components/pagination/pagination-ellipsis";

import {
  hasProperties,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = PaginationEllipsis;
const COMPONENT_NAME = "PaginationEllipsis";
const DEFAULT_ELEMENT = "span";
const BULMA_CLASS_NAME = "pagination-ellipsis";

const makeNode = makeNodeFactory(COMPONENT);

const makeShallowWrapper = (node: JSX.Element) => Enzyme.shallow(node);

const makeGenericHOCShallowWrapperInContextConsumer = (
  node: JSX.Element,
  themeContextValue: ThemeContextValue = themeInitialValue,
) => {
  const rootWrapper = makeShallowWrapper(node);
  const forwardRefWrapper = rootWrapper.children();
  const themeContextConsumerWrapper = forwardRefWrapper.dive();
  const ThemeContextConsumerChildren = (themeContextConsumerWrapper.props() as {
    children: React.FC<ThemeContextValue>;
  }).children;

  return Enzyme.shallow(
    <ThemeContextConsumerChildren {...themeContextValue} />,
  );
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
    makeGenericHOCShallowWrapperInContextConsumer,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeGenericHOCShallowWrapperInContextConsumer);

  describe("root", () => {
    it("should be li element", () => {
      const node = makeNode({});
      const wrapper = makeShallowWrapper(node);
      expect(wrapper.is("li")).toBe(true);
    });
  });
});
