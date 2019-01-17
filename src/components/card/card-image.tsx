import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type CardImageProps = HelpersProps;

export const CardImage = forwardRefAs<CardImageProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("card-image", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);

CardImage.displayName = "Card.Image";
