import React from "react";

import { PaginationEllipsis } from "src/components/pagination/pagination-ellipsis";

import {
  GetInnerReactWrapperFunction,
  GetInnerShallowWrapperFunction,
  hasProperties,
  makeShallowWrapperFactory,
  makeReactWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = PaginationEllipsis;
const DISPLAY_NAME = "Pagination.Ellipsis";
const DEFAULT_ELEMENT = "span";
const BULMA_CLASS_NAME = "pagination-ellipsis";

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
    defaultProps: {
      as: DEFAULT_ELEMENT,
      children: "…",
    },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    makeShallowWrapper: makeShallowWrapperFactory(getLeafShallowWrapper),
  });

  testThemeIntegration(COMPONENT, {
    makeReactWrapper: makeReactWrapperFactory(getLeafReactWrapper),
    makeShallowWrapper: makeShallowWrapperFactory(getLeafShallowWrapper),
  });

  describe("root", () => {
    it("should be li element", () => {
      const node = <PaginationEllipsis />;
      const makeShallowWrapper = makeShallowWrapperFactory(
        getWrappingLIShallowWrapper,
      );
      const wrapper = makeShallowWrapper({ node });
      expect(wrapper.is("li")).toBe(true);
    });
  });
});
