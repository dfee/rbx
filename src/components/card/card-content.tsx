import classNames from "classNames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type CardContentProps = HelpersProps;

export const CardContent = forwardRefAs<CardContentProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("card-content", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);
