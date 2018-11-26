import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent, {
  RenderAsExoticComponent,
} from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import CardFooterItem from "./CardFooterItem";

export type CardFooterProps = ModifierProps;

type CardFooter = RenderAsExoticComponent<CardFooterProps, "div"> & {
  Item: typeof CardFooterItem;
};

const CardFooter: Partial<CardFooter> = renderAsExoticComponent<
  CardFooterProps,
  "div"
>(
  ({ className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("card-footer", className)} />
  ),
  "div",
);

CardFooter.Item = CardFooterItem;

export default CardFooter as CardFooter;
