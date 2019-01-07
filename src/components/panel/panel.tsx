import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { PanelBlock } from "./panel-block";
import { PanelHeading } from "./panel-heading";
import { PanelIcon } from "./panel-icon";
import { PanelTabs } from "./panel-tabs";

export type PanelProps = HelpersProps;

export const Panel = Object.assign(
  forwardRefAs<PanelProps, "nav">(
    ({ className, ...rest }, ref) => (
      <Generic className={classNames("panel", className)} ref={ref} {...rest} />
    ),
    { as: "nav" },
  ),
  {
    Block: PanelBlock,
    Heading: PanelHeading,
    Icon: PanelIcon,
    Tabs: PanelTabs,
  },
);
