import { Menu } from "src/components/menu/menu";
import { MenuLabel } from "src/components/menu/menu-label";
import { MenuList } from "src/components/menu/menu-list";

import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = Menu;
const DISPLAY_NAME = "Menu";
const DEFAULT_ELEMENT = "aside";
const BULMA_CLASS_NAME = "menu";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Label: MenuLabel,
    List: MenuList,
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
  });

  testThemeIntegration(COMPONENT);
});
