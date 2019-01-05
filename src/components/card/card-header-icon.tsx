import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type CardHeaderIconProps = HelpersProps;

export const CardHeaderIcon = forwardRefAs<CardHeaderIconProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("card-header-icon", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);
