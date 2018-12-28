import { Loader } from "../loader";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testTransformHelpersIntegration,
} from "../../../__tests__/testing";

const COMPONENT = Loader;
const COMPONENT_NAME = "Loader";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "loader";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: {
      as: DEFAULT_ELEMENT,
      children: null,
    },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeShallowWrapper,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testTransformHelpersIntegration(makeNode, makeShallowWrapper);
});
