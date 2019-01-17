import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type CardHeaderIconProps = HelpersProps;

export const CardHeaderIcon = forwardRefAs<CardHeaderIconProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("card-header-icon", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);

CardHeaderIcon.displayName = "Card.Header.Icon";
