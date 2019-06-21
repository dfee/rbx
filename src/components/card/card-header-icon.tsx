import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type CardHeaderIconProps = HelpersProps;

export const CardHeaderIcon = forwardRefAs<CardHeaderIconProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("card-header-icon", className)}
      {...rest}
    />
  ),
  { as: "div" },
);

CardHeaderIcon.displayName = "Card.Header.Icon";
