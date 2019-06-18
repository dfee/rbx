import React from "react";

import { PaginationLink } from "src/components/pagination/pagination-link";

import {
  GetInnerReactWrapperFunction,
  GetInnerShallowWrapperFunction,
  makeReactWrapperFactory,
  makeShallowWrapperFactory,
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
} from "src/__tests__/testing";

const COMPONENT = PaginationLink;
const DISPLAY_NAME = "Pagination.Link";
const DEFAULT_ELEMENT = "a";
const BULMA_CLASS_NAME = "pagination-link";

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
      const node = <PaginationLink />;
      const makeShallowWrapper = makeShallowWrapperFactory(
        getWrappingLIShallowWrapper,
      );
      const wrapper = makeShallowWrapper({ node });
      expect(wrapper.is("li")).toBe(true);
    });
  });

  describe("props", () => {
    const { propTypes } = COMPONENT;
    const makeShallowWrapper = makeShallowWrapperFactory(getLeafShallowWrapper);

    describe("current", () => {
      validateBoolPropType(propTypes, "current");

      [false, true].map(current => {
        it(`should ${current ? "" : "not "}be current`, () => {
          const node = <PaginationLink current={current} />;
          const wrapper = makeShallowWrapper({ node });
          expect(wrapper.hasClass("is-current")).toBe(current);
        });
      });
    });
  });
});
