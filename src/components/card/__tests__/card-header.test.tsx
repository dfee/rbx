import { CardHeader } from "src/components/card/card-header";
import { CardHeaderIcon } from "src/components/card/card-header-icon";
import { CardHeaderTitle } from "src/components/card/card-header-title";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = CardHeader;
const COMPONENT_NAME = "CardHeader";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "card-header";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Icon: CardHeaderIcon,
    Title: CardHeaderTitle,
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeGenericHOCShallowWrapperInContextConsumer,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeGenericHOCShallowWrapperInContextConsumer);
});
