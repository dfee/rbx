import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type CardImageProps = HelpersProps;

export const CardImage = forwardRefAs<CardImageProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("card-image", className)}
      {...rest}
    />
  ),
  { as: "div" },
);

CardImage.displayName = "Card.Image";
