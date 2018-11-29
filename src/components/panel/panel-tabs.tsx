import { cx } from "emotion";
import React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";
import { PanelTabsTab } from "./panel-tabs-tab";

export type PanelTabsProps = ModifierProps;

export const PanelTabs = Object.assign(
  extendedForwardRef<PanelTabsProps, "div">(
    ({ className, ...props }, ref) => (
      <Element {...props} ref={ref} className={cx("panel-tabs", className)} />
    ),
    "div",
  ),
  { Tab: PanelTabsTab },
);
