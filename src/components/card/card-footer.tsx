import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { CardFooterItem } from "./card-footer-item";

export type CardFooterProps = HelpersProps;

export const CardFooter = Object.assign(
  forwardRefAs<CardFooterProps, "div">(
    ({ className, ...rest }, ref) => (
      <Generic
        className={classNames("card-footer", className)}
        ref={ref}
        {...rest}
      />
    ),
    { as: "div" },
  ),
  { Item: CardFooterItem },
);

CardFooter.displayName = "Card.Footer";
