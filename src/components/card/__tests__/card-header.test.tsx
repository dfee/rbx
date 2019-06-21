import { CardHeader } from "src/components/card/card-header";
import { CardHeaderIcon } from "src/components/card/card-header-icon";
import { CardHeaderTitle } from "src/components/card/card-header-title";
import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = CardHeader;
const DISPLAY_NAME = "Card.Header";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "card-header";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
    Icon: CardHeaderIcon,
    Title: CardHeaderTitle,
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
  });

  testThemeIntegration(COMPONENT);
});
