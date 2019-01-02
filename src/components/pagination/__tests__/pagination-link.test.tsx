import Enzyme from "enzyme";
import React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "../../../base/theme";
import { PaginationLink } from "../pagination-link";

import {
  hasProperties,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
} from "../../../__tests__/testing";

const COMPONENT = PaginationLink;
const COMPONENT_NAME = "PaginationLink";
const DEFAULT_ELEMENT = "a";
const BULMA_CLASS_NAME = "pagination-link";

const makeNode = makeNodeFactory(COMPONENT);

const makeShallowWrapper = (node: JSX.Element) => Enzyme.shallow(node);

const makeGenericHOCShallowWrapperInContextConsumer = (
  node: JSX.Element,
  themeContextValue: ThemeContextValue = themeInitialValue,
) => {
  const rootWrapper = makeShallowWrapper(node);
  const forwardRefWrapper = rootWrapper.children();
  const themeContextConsumerWrapper = forwardRefWrapper.dive();
  const ThemeContextConsumerChildren = (themeContextConsumerWrapper.props() as any)
    .children;
  const wrapper = Enzyme.shallow(
    <ThemeContextConsumerChildren {...themeContextValue} />,
  );
  return wrapper;
};

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
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

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("current", () => {
      validateBoolPropType(propTypes, "current");

      [false, true].map(current =>
        it(`should ${current ? "" : "not "}be current`, () => {
          const node = makeNode({ current });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-current")).toBe(current);
        }),
      );
    });
  });
});
