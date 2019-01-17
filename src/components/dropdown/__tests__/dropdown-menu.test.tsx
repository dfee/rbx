import { DropdownMenu } from "src/components/dropdown/dropdown-menu";

import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = DropdownMenu;
const DISPLAY_NAME = "Dropdown.Menu";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "dropdown-menu";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    displayName: DISPLAY_NAME,
    defaultElement: DEFAULT_ELEMENT,
  });

  testThemeIntegration(COMPONENT);
});
