import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type PanelIconProps = HelpersProps;

export const PanelIcon = forwardRefAs<PanelIconProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("panel-icon", className)}
      {...rest}
    />
  ),
  { as: "span" },
);

PanelIcon.displayName = "Panel.Icon";
