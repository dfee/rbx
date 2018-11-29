import { cx } from "emotion";
import React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";
import { CardHeaderIcon } from "./card-header-icon";
import { CardHeaderTitle } from "./card-header-title";

export type CardHeaderProps = ModifierProps;

export const CardHeader = Object.assign(
  extendedForwardRef<CardHeaderProps, "div">(
    ({ className, ...props }, ref) => (
      <Element {...props} ref={ref} className={cx("card-header", className)} />
    ),
    "div",
  ),
  {
    Icon: CardHeaderIcon,
    Title: CardHeaderTitle,
  },
);
