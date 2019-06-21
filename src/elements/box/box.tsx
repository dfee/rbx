import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type BoxProps = HelpersProps;

export const Box = forwardRefAs<BoxProps>(
  ({ className, ...rest }, ref) => (
    <Generic ref={ref} className={classNames("box", className)} {...rest} />
  ),
  { as: "div" },
);

Box.displayName = "Box";
