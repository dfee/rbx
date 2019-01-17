import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type PanelHeadingProps = HelpersProps;

export const PanelHeading = forwardRefAs<PanelHeadingProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("panel-heading", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);

PanelHeading.displayName = "Panel.Heading";
