import { cx } from "emotion";
import React from "react";

import { Element } from "@/components/element";
import { renderAsExoticComponent } from "@/components/render-as-exotic-component";
import { ModifierProps } from "@/modifiers";

export type CardHeaderTitleProps = ModifierProps;

export const CardHeaderTitle = renderAsExoticComponent<
  CardHeaderTitleProps,
  "div"
>(
  ({ className, ...props }, ref) => (
    <Element
      {...props}
      ref={ref}
      className={cx("card-header-title", className)}
    />
  ),
  "div",
);
