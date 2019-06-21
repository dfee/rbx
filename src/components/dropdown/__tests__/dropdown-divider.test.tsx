import { DropdownDivider } from "src/components/dropdown/dropdown-divider";
import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = DropdownDivider;
const DISPLAY_NAME = "Dropdown.Divider";
const DEFAULT_ELEMENT = "hr";
const BULMA_CLASS_NAME = "dropdown-divider";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
  });

  testThemeIntegration(COMPONENT);
});
