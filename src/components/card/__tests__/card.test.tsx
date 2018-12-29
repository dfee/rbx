import { Card } from "../card";
import { CardContent } from "../card-content";
import { CardFooter } from "../card-footer";
import { CardHeader } from "../card-header";
import { CardImage } from "../card-image";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "../../../__tests__/testing";

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
    makeShallowWrapper,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeShallowWrapper);
});
