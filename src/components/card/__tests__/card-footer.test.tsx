import { CardFooter } from "src/components/card/card-footer";
import { CardFooterItem } from "src/components/card/card-footer-item";
import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = CardFooter;
const DISPLAY_NAME = "Card.Footer";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "card-footer";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
    Item: CardFooterItem,
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
  });

  testThemeIntegration(COMPONENT);
});
