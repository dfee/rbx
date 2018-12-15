import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";

export type PanelTabModifierProps = Partial<{
  active: boolean;
  className: string;
}>;

export type PanelTabProps = ModifierProps & PanelTabModifierProps;

export const PanelTab = forwardRefAs<PanelTabProps, "a">(
  (props, ref) => {
    const { active, as, className: cn, ...rest } = transformModifiers(props);
    const className = classNames(cn, { "is-active": active }) || undefined;
    return React.createElement(as!, { className, ref, ...rest });
  },
  { as: "a" },
);
