import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type HeadingProps = HelpersProps;

export const Heading = forwardRefAs<HeadingProps>(
  ({ className, ...rest }, ref) => (
    <Generic className={classNames("heading", className)} ref={ref} {...rest} />
  ),
  { as: "p" },
);

Heading.displayName = "Heading";
