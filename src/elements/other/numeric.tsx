import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type NumericProps = HelpersProps;

export const Numeric = forwardRefAs<NumericProps>(
  ({ className, ...rest }, ref) => (
    <Generic ref={ref} className={classNames("number", className)} {...rest} />
  ),
  { as: "p" },
);

Numeric.displayName = "Numeric";
