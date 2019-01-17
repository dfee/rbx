import { Card } from "src/components/card/card";
import { CardContent } from "src/components/card/card-content";
import { CardFooter } from "src/components/card/card-footer";
import { CardHeader } from "src/components/card/card-header";
import { CardImage } from "src/components/card/card-image";

import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = Card;
const DISPLAY_NAME = "Card";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "card";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Content: CardContent,
    Footer: CardFooter,
    Header: CardHeader,
    Image: CardImage,
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
  });

  testThemeIntegration(COMPONENT);
});
