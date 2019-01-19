import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type PanelIconProps = HelpersProps;

export const PanelIcon = forwardRefAs<PanelIconProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("panel-icon", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "span" },
);

PanelIcon.displayName = "Panel.Icon";
