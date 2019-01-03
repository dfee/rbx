import { MenuList } from "src/components/menu/menu-list";
import { MenuListItem } from "src/components/menu/menu-list-item";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = MenuList;
const COMPONENT_NAME = "MenuList";
const DEFAULT_ELEMENT = "ul";
const BULMA_CLASS_NAME = "menu-list";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Item: MenuListItem,
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
