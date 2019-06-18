import React from "react";

import { Tab } from "src/components/tab/tab";
import { TabGroup } from "src/components/tab/tab-group";

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

const COMPONENT = Tab;
const DISPLAY_NAME = "Tab";
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
    Group: TabGroup,
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
      const node = <Tab />;
      const makeShallowWrapper = makeShallowWrapperFactory(
        getWrappingLIShallowWrapper,
      );
      const wrapper = makeShallowWrapper({ node });
      expect(wrapper.is("li")).toBe(true);
    });
  });

  describe("props", () => {
    const { propTypes } = COMPONENT;
    const makeWrappingLIShallowWrapper = makeShallowWrapperFactory(
      getWrappingLIShallowWrapper,
    );

    describe("active", () => {
      validateBoolPropType(propTypes, "active");

      [false, true].map(active => {
        it(`should ${active ? "" : "not "}be active`, () => {
          const node = <Tab active={active} />;
          const wrapper = makeWrappingLIShallowWrapper({ node });
          expect(wrapper.hasClass("is-active")).toBe(active);
        });
      });
    });
  });
});
