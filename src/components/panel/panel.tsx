import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { PanelBlock } from "./panel-block";
import { PanelHeading } from "./panel-heading";
import { PanelIcon } from "./panel-icon";
import { PanelTab } from "./panel-tab";

export type PanelProps = HelpersProps;

export const Panel = Object.assign(
  forwardRefAs<PanelProps>(
    ({ className, ...rest }, ref) => (
      <Generic className={classNames("panel", className)} ref={ref} {...rest} />
    ),
    { as: "nav" },
  ),
  {
    Block: PanelBlock,
    Heading: PanelHeading,
    Icon: PanelIcon,
    Tab: PanelTab,
  },
);

Panel.displayName = "Panel";
