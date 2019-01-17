import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type PanelTabGroupProps = HelpersProps;

export const PanelTabGroup = forwardRefAs<PanelTabGroupProps, "div">(
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
