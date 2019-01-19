import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type CardContentProps = HelpersProps;

export const CardContent = forwardRefAs<CardContentProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("card-content", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);

CardContent.displayName = "Card.Content";
