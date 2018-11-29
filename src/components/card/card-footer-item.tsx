import { cx } from "emotion";
import React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type CardFooterItemProps = ModifierProps;

export const CardFooterItem = extendedForwardRef<CardFooterItemProps, "div">(
  ({ className, ...props }, ref) => (
    <Element
      {...props}
      ref={ref}
      className={cx("card-footer-item", className)}
    />
  ),
  "div",
);
