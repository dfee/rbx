import { Card } from "src/components/card/card";
import { CardContent } from "src/components/card/card-content";
import { CardFooter } from "src/components/card/card-footer";
import { CardHeader } from "src/components/card/card-header";
import { CardImage } from "src/components/card/card-image";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = Card;
const COMPONENT_NAME = "Card";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "card";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Content: CardContent,
    Footer: CardFooter,
    Header: CardHeader,
    Image: CardImage,
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
