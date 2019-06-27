import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type PanelTabGroupProps = HelpersProps;

export const PanelTabGroup = forwardRefAs<PanelTabGroupProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("panel-tabs", className)}
      {...rest}
    />
  ),
  { as: "div" },
);

PanelTabGroup.displayName = "Panel.Tab.Group";
