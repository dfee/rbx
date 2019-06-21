import { Select, SelectContainer } from "src/elements/form/select";
import { SelectOption } from "src/elements/form/select-option";
import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = Select;
const DISPLAY_NAME = "Select";
const DEFAULT_ELEMENT = "select";
const BULMA_CLASS_NAME = undefined;

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Container: SelectContainer,
    defaultProps: { as: DEFAULT_ELEMENT },
    Option: SelectOption,
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
  });

  testThemeIntegration(COMPONENT);
});
