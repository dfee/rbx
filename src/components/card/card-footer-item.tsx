import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type CardFooterItemProps = HelpersProps;

export const CardFooterItem = forwardRefAs<CardFooterItemProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("card-footer-item", className)}
      {...rest}
    />
  ),
  { as: "div" },
);

CardFooterItem.displayName = "Card.Footer.Item";
