import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type HeadingProps = HelpersProps;

export const Heading = forwardRefAs<HeadingProps, "p">(
  ({ className, ...rest }, ref) => (
    <Generic className={classNames("heading", className)} ref={ref} {...rest} />
  ),
  { as: "p" },
);

Heading.displayName = "Heading";
