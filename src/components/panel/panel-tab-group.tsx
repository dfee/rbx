import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type PanelTabGroupProps = HelpersProps;

export const PanelTabGroup = forwardRefAs<PanelTabGroupProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("panel-tabs", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);

PanelTabGroup.displayName = "Panel.Tab.Group";
