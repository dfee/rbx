import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent, {
  RenderAsExoticComponent,
} from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import CardContent from "./components/content";
import CardFooter from "./components/footer";
import CardHeader from "./components/header";
import CardImage from "./components/image";

export type CardModifierProps = Partial<{
  children?: React.ReactNode;
}>;

export type CardProps = ModifierProps & CardModifierProps;

interface Card extends RenderAsExoticComponent<CardProps, "div"> {
  Content: typeof CardContent;
  Image: typeof CardImage;
  Header: typeof CardHeader;
  Footer: typeof CardFooter;
}

const Card: Partial<Card> = renderAsExoticComponent<CardProps, "div">(
  ({ className, children, ...props }, ref) => (
    <Element ref={ref} className={cx("card", className)} {...props}>
      {children}
    </Element>
  ),
  "div",
);
Card.defaultProps = Object.assign({ children: null }, Card.defaultProps);

Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Header = CardHeader;
Card.Image = CardImage;

export default Card as Card;
