import { Generic } from "src/base/generic";

import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  makeReactWrapperFactory,
} from "src/__tests__/testing";

const COMPONENT = Generic;
const DISPLAY_NAME = "Generic";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = undefined;

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: "div" },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
    makeShallowWrapper: makeShallowWrapperFactory(1),
  });

  testThemeIntegration(COMPONENT, {
    makeShallowWrapper: makeShallowWrapperFactory(1),
    makeReactWrapper: makeReactWrapperFactory(1),
  });
});
