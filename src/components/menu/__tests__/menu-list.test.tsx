import { MenuList } from "../menu-list";
import { MenuListItem } from "../menu-list-item";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "../../../__tests__/testing";

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
    makeShallowWrapper,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeShallowWrapper);
});
