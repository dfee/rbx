import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type FieldBodyProps = HelpersProps;

export const FieldBody = forwardRefAs<HTMLDivElement, FieldBodyProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("field-body", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);

FieldBody.displayName = "Field.Body";
