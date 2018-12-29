import { PanelTab } from "../panel-tab";
import { PanelTabs } from "../panel-tabs";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "../../../__tests__/testing";

const COMPONENT = PanelTabs;
const COMPONENT_NAME = "PanelTabs";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "panel-tabs";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Tab: PanelTab,
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
