import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type NumericProps = HelpersProps;

export const Numeric = forwardRefAs<NumericProps>(
  ({ className, ...rest }, ref) => (
    <Generic className={classNames("number", className)} ref={ref} {...rest} />
  ),
  { as: "p" },
);

Numeric.displayName = "Numeric";
