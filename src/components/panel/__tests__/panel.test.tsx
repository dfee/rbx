import { Panel } from "src/components/panel/panel";
import { PanelBlock } from "src/components/panel/panel-block";
import { PanelHeading } from "src/components/panel/panel-heading";
import { PanelIcon } from "src/components/panel/panel-icon";
import { PanelTabs } from "src/components/panel/panel-tabs";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = Panel;
const COMPONENT_NAME = "Panel";
const DEFAULT_ELEMENT = "nav";
const BULMA_CLASS_NAME = "panel";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Block: PanelBlock,
    Heading: PanelHeading,
    Icon: PanelIcon,
    Tabs: PanelTabs,
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
