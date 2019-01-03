import classNames from "classNames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type NumericProps = HelpersProps;

export const Numeric = forwardRefAs<NumericProps, "p">(
  ({ className, ...rest }, ref) => (
    <Generic className={classNames("number", className)} ref={ref} {...rest} />
  ),
  { as: "p" },
);
