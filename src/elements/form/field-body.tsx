import classNames from "classNames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type FieldBodyProps = HelpersProps;

export const FieldBody = forwardRefAs<FieldBodyProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("field-body", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);
