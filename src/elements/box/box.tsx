import classNames from "classNames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type BoxProps = HelpersProps;

export const Box = Object.assign(
  forwardRefAs<BoxProps, "div">(
    ({ className, ...rest }, ref) => (
      <Generic className={classNames("box", className)} ref={ref} {...rest} />
    ),
    { as: "div" },
  ),
);
