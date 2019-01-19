import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { CardContent } from "./card-content";
import { CardFooter } from "./card-footer";
import { CardHeader } from "./card-header";
import { CardImage } from "./card-image";

export type CardProps = HelpersProps;

export const Card = Object.assign(
  forwardRefAs<HTMLDivElement, CardProps>(
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

Card.displayName = "Card";
