import { cx } from "emotion";
import React from "react";

import { Element, renderAsExoticComponent } from "@/components/element";
import { ModifierProps } from "@/modifiers";
import { CardContent } from "./card-content";
import { CardFooter } from "./card-footer";
import { CardHeader } from "./card-header";
import { CardImage } from "./card-image";

export type CardModifierProps = Partial<{
  children?: React.ReactNode;
}>;

export type CardProps = ModifierProps & CardModifierProps;

export const Card = Object.assign(
  renderAsExoticComponent<CardProps, "div">(
    ({ className, children, ...props }, ref) => (
      <Element ref={ref} className={cx("card", className)} {...props}>
        {children}
      </Element>
    ),
    "div",
  ),
  {
    Content: CardContent,
    Footer: CardFooter,
    Header: CardHeader,
    Image: CardImage,
  },
);
Card.defaultProps = Object.assign({ children: null }, Card.defaultProps);
