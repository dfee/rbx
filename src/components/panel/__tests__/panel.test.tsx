import { Panel } from "../panel";
import { PanelBlock } from "../panel-block";
import { PanelHeading } from "../panel-heading";
import { PanelIcon } from "../panel-icon";
import { PanelTabs } from "../panel-tabs";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "../../../__tests__/testing";

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
    makeShallowWrapper,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeShallowWrapper);
});
