import { Menu } from "src/components/menu/menu";
import { MenuLabel } from "src/components/menu/menu-label";
import { MenuList } from "src/components/menu/menu-list";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = Menu;
const COMPONENT_NAME = "Menu";
const DEFAULT_ELEMENT = "aside";
const BULMA_CLASS_NAME = "menu";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Label: MenuLabel,
    List: MenuList,
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
