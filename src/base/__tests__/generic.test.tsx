import { Generic } from "src/base/generic";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  makeReactWrapperFactory,
  GetInnerShallowWrapperFunction,
  GetInnerReactWrapperFunction,
} from "src/__tests__/testing";
import { DEFAULTS } from "src/base/helpers/variables";

const COMPONENT = Generic;
const DISPLAY_NAME = "Generic";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = undefined;

const getShallowInnerWrapper: GetInnerShallowWrapperFunction = wrapper =>
  wrapper // Component
    .dive(); // Leaf ("as");

const getReactInnerWrapper: GetInnerReactWrapperFunction = wrapper =>
  wrapper // Component
    .children(); // Leaf ("as");

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: "div" },
    DEFAULTS,
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
    makeShallowWrapper: makeShallowWrapperFactory(getShallowInnerWrapper),
  });

  testThemeIntegration(COMPONENT, {
    makeReactWrapper: makeReactWrapperFactory(getReactInnerWrapper),
    makeShallowWrapper: makeShallowWrapperFactory(getShallowInnerWrapper),
  });
});
