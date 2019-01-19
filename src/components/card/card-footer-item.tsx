import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type CardFooterItemProps = HelpersProps;

export const CardFooterItem = forwardRefAs<HTMLDivElement, CardFooterItemProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("card-footer-item", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);

CardFooterItem.displayName = "Card.Footer.Item";
