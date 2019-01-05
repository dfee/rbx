import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type CardHeaderTitleProps = HelpersProps;

export const CardHeaderTitle = forwardRefAs<CardHeaderTitleProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("card-header-title", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);
