import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type PanelHeadingProps = HelpersProps;

export const PanelHeading = forwardRefAs<PanelHeadingProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("panel-heading", className)}
      {...rest}
    />
  ),
  { as: "div" },
);

PanelHeading.displayName = "Panel.Heading";
