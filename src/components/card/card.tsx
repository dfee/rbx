import classNames from "classNames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { CardContent } from "./card-content";
import { CardFooter } from "./card-footer";
import { CardHeader } from "./card-header";
import { CardImage } from "./card-image";

export type CardProps = HelpersProps;

export const Card = Object.assign(
  forwardRefAs<CardProps, "div">(
    ({ className, ...rest }, ref) => (
      <Generic className={classNames("card", className)} ref={ref} {...rest} />
    ),
    { as: "div" },
  ),
  {
    Content: CardContent,
    Footer: CardFooter,
    Header: CardHeader,
    Image: CardImage,
  },
);
