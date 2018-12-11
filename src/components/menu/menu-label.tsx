import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type MenuLabelModifierProps = Partial<{ className: string }>;

export type MenuLabelProps = ModifierProps & MenuLabelModifierProps;

export const MenuLabel = forwardRefAs<MenuLabelProps, "p">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("menu-label", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "p" },
);
