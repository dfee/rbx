import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type FieldBodyProps = HelpersProps;

export const FieldBody = forwardRefAs<FieldBodyProps>(
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
