import Enzyme from "enzyme";
import React from "react";

import { Generic } from "src/base/generic";
import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "src/base/theme";

import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = Generic;
const DISPLAY_NAME = "Generic";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = undefined;

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

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: "div" },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
    makeShallowWrapper: makeShallowWrapperInThemeContextConsumer,
  });

  testThemeIntegration(COMPONENT, {
    makeShallowWrapper: makeShallowWrapperInThemeContextConsumer,
  });
});
