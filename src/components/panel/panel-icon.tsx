import { cx } from "emotion";
import React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type PanelIconProps = ModifierProps;

export const PanelIcon = extendedForwardRef<PanelIconProps, "span">(
  ({ className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("panel-icon", className)} />
  ),
  "span",
);
