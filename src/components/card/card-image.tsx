import classNames from "classNames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

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
