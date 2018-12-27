import { HeroFoot } from "../hero-foot";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testTransformHelpersIntegration,
} from "../../../__tests__/testing";

const COMPONENT = HeroFoot;
const COMPONENT_NAME = "HeroFoot";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "hero-foot";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeShallowWrapper,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testTransformHelpersIntegration(makeNode, makeShallowWrapper);
});
