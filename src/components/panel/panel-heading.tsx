import classNames from "classNames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

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
