import { cx } from "emotion";
import React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type PanelHeaderProps = ModifierProps;

export const PanelHeader = extendedForwardRef<PanelHeaderProps, "div">(
  ({ className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("panel-heading", className)} />
  ),
  "div",
);
