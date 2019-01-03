import classNames from "classNames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { CardHeaderIcon } from "./card-header-icon";
import { CardHeaderTitle } from "./card-header-title";

export type CardHeaderProps = HelpersProps;

export const CardHeader = Object.assign(
  forwardRefAs<CardHeaderProps, "div">(
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
