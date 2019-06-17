import Enzyme from "enzyme";
import React from "react";

import { BreadcrumbItem } from "src/components/breadcrumb/breadcrumb-item";

import {
  hasProperties,
  makeShallowWrapperFactory2,
  makeReactWrapperFactory2,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  GetInnerShallowWrapperFunction,
  GetInnerReactWrapperFunction,
} from "src/__tests__/testing";

const COMPONENT = BreadcrumbItem;
const DISPLAY_NAME = "Breadcrumb.Item";
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

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
    makeShallowWrapper: makeShallowWrapperFactory2(getLeafShallowWrapper),
  });

  testThemeIntegration(COMPONENT, {
    makeShallowWrapper: makeShallowWrapperFactory2(getLeafShallowWrapper),
    makeReactWrapper: makeReactWrapperFactory2(getLeafReactWrapper),
  });

  describe("root", () => {
    it("should be li element", () => {
      const node = <BreadcrumbItem />;
      const wrapper = Enzyme.shallow(node);
      expect(wrapper.is("li")).toBe(true);
    });
  });

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("active", () => {
      validateBoolPropType(propTypes, "active");

      [false, true].map(active => {
        it(`should ${active ? "" : "not "}be active`, () => {
          const makeShallowWrapper = makeShallowWrapperFactory2(
            getWrappingLIShallowWrapper,
          );
          const node = <BreadcrumbItem active={active} />;
          const wrapper = makeShallowWrapper({ Component: COMPONENT, node });
          expect(wrapper.hasClass("is-active")).toBe(active);
        });
      });
    });
  });
});
