import { cx } from "emotion";
import React from "react";

import { Element } from "components/element";
import { renderAsExoticComponent } from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import { CardFooterItem } from "./card-footer-item";

export type CardFooterProps = ModifierProps;

export const CardFooter = Object.assign(
  renderAsExoticComponent<CardFooterProps, "div">(
    ({ className, ...props }, ref) => (
      <Element {...props} ref={ref} className={cx("card-footer", className)} />
    ),
    "div",
  ),
  { Item: CardFooterItem },
);
