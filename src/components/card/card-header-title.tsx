import { cx } from "emotion";
import React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type CardHeaderTitleProps = ModifierProps;

export const CardHeaderTitle = extendedForwardRef<CardHeaderTitleProps, "div">(
  ({ className, ...props }, ref) => (
    <Element
      {...props}
      ref={ref}
      className={cx("card-header-title", className)}
    />
  ),
  "div",
);
