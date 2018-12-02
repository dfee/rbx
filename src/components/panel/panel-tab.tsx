import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type PanelTabModifierProps = Partial<{
  active: boolean;
}>;

export type PanelTabProps = ModifierProps & PanelTabModifierProps;

export const PanelTab = forwardRefAs<PanelTabProps, "a">((props, ref) => {
  const { active, as, className: cn, ...rest } = transformModifiers(props);
  const className = cx(cn, { "is-active": active }) || undefined;
  return React.createElement(as!, { className, ref, ...rest });
}, "a");

PanelTab.defaultProps = Object.assign({ active: false }, PanelTab.defaultProps);
