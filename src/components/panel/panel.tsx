import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { PanelBlock } from "./panel-block";
import { PanelHeading } from "./panel-heading";
import { PanelIcon } from "./panel-icon";
import { PanelTabs } from "./panel-tabs";

export type PanelProps = HelpersProps;

export const Panel = Object.assign(
  forwardRefAs<PanelProps, "nav">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("panel", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "nav" },
  ),
  {
    Block: PanelBlock,
    Heading: PanelHeading,
    Icon: PanelIcon,
    Tabs: PanelTabs,
    propTypes: genericPropTypes,
  },
);
