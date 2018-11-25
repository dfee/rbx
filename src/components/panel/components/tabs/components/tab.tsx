import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type PanelTabsTabModifierProps = Partial<{
  active: boolean;
}>;

export type PanelTabsTabProps = ModifierProps & PanelTabsTabModifierProps;

const PanelTabsTab = renderAsExoticComponent<PanelTabsTabProps, "a">(
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

export default PanelTabsTab;
