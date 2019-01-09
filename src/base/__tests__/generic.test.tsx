import * as Enzyme from "enzyme";
import * as React from "react";

import { Generic } from "src/base/generic";
import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "src/base/theme";

import {
  hasProperties,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = Generic;
const COMPONENT_NAME = "Generic";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = undefined;

const makeNode = makeNodeFactory(Generic);

const makeShallowWrapperInThemeContextConsumer = (
  node: JSX.Element,
  contextValue: ThemeContextValue = themeInitialValue,
) => {
  const contextConsumerWrapper = Enzyme.shallow(node);
  const Children = (contextConsumerWrapper.props() as {
    children(context: ThemeContextValue): JSX.Element;
  }).children;

  return Enzyme.shallow(<Children {...contextValue} />);
};

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: "div" },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeShallowWrapperInThemeContextConsumer,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeShallowWrapperInThemeContextConsumer);
});
