import { cx } from "emotion";
import React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type CardContentProps = ModifierProps;

export const CardContent = extendedForwardRef<CardContentProps, "div">(
  ({ className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("card-content", className)} />
  ),
  "div",
);
