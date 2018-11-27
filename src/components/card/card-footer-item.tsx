import { cx } from "emotion";
import React from "react";

import { Element, renderAsExoticComponent } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type CardFooterItemProps = ModifierProps;

export const CardFooterItem = renderAsExoticComponent<
  CardFooterItemProps,
  "div"
>(
  ({ className, ...props }, ref) => (
    <Element
      {...props}
      ref={ref}
      className={cx("card-footer-item", className)}
    />
  ),
  "div",
);
