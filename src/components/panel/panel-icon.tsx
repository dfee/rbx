import { cx } from "emotion";
import React from "react";

import { Element, renderAsExoticComponent } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type PanelIconProps = ModifierProps;

export const PanelIcon = renderAsExoticComponent<PanelIconProps, "span">(
  ({ className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("panel-icon", className)} />
  ),
  "span",
);
