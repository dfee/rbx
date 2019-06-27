import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type HeadingProps = HelpersProps;

export const Heading = forwardRefAs<HeadingProps>(
  ({ className, ...rest }, ref) => (
    <Generic ref={ref} className={classNames("heading", className)} {...rest} />
  ),
  { as: "p" },
);

Heading.displayName = "Heading";
