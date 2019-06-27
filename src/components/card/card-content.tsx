import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type CardContentProps = HelpersProps;

export const CardContent = forwardRefAs<CardContentProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("card-content", className)}
      {...rest}
    />
  ),
  { as: "div" },
);

CardContent.displayName = "Card.Content";
