import { MenuList } from "src/components/menu/menu-list";
import { MenuListItem } from "src/components/menu/menu-list-item";

import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = MenuList;
const DISPLAY_NAME = "Menu.List";
const DEFAULT_ELEMENT = "ul";
const BULMA_CLASS_NAME = "menu-list";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Item: MenuListItem,
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
  });

  testThemeIntegration(COMPONENT);
});
