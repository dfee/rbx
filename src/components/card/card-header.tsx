import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { CardHeaderIcon } from "./card-header-icon";
import { CardHeaderTitle } from "./card-header-title";

export type CardHeaderProps = HelpersProps;

export const CardHeader = Object.assign(
  forwardRefAs<CardHeaderProps>(
    ({ className, ...rest }, ref) => (
      <Generic
        className={classNames("card-header", className)}
        ref={ref}
        {...rest}
      />
    ),
    { as: "div" },
  ),
  {
    Icon: CardHeaderIcon,
    Title: CardHeaderTitle,
  },
);

CardHeader.displayName = "Card.Header";
