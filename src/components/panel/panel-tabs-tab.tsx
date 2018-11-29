import { cx } from "emotion";
import React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type PanelTabsTabModifierProps = Partial<{
  active: boolean;
}>;

export type PanelTabsTabProps = ModifierProps & PanelTabsTabModifierProps;

export const PanelTabsTab = extendedForwardRef<PanelTabsTabProps, "a">(
  ({ className, active, ...props }, ref) => (
    <Element
      {...props}
      ref={ref}
      className={cx(className, {
        "is-active": active,
      })}
    />
  ),
  "a",
);
PanelTabsTab.defaultProps = Object.assign(
  {
    active: false,
  },
  PanelTabsTab.defaultProps,
);
