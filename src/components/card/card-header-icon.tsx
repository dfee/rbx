import { cx } from "emotion";
import React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type CardHeaderIconProps = ModifierProps;

export const CardHeaderIcon = extendedForwardRef<
  CardHeaderIconProps,
  "div"
>(
  ({ className, ...props }, ref) => (
    <Element
      {...props}
      ref={ref}
      className={cx("card-header-icon", className)}
    />
  ),
  "div",
);
