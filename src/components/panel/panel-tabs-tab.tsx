import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type PanelTabsTabModifierProps = Partial<{
  active: boolean;
}>;

export type PanelTabsTabProps = ModifierProps & PanelTabsTabModifierProps;

export const PanelTabsTab = asExoticComponent<PanelTabsTabProps, "a">(
  (props, ref) => {
    const { active, as, className: cn, ...rest } = transformModifiers(props);
    const className = cx(cn, { "is-active": active }) || undefined;
    return React.createElement(as!, { className, ref, ...rest });
  },
  "a",
);

PanelTabsTab.defaultProps = Object.assign(
  { active: false },
  PanelTabsTab.defaultProps,
);
