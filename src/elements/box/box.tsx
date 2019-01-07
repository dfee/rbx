import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type BoxProps = HelpersProps;

export const Box = forwardRefAs<BoxProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic className={classNames("box", className)} ref={ref} {...rest} />
  ),
  { as: "div" },
);
