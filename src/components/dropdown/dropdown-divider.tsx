import { cx } from "emotion";
import React from "react";

import { ModifierProps, modify } from "@/modifiers";

export type DropdownDividerModifierProps = Omit<
  React.HTMLAttributes<HTMLHRElement>,
  "unselectable"
>;

export type DropdownDividerProps = ModifierProps & DropdownDividerModifierProps;

export const DropdownDivider = React.forwardRef<
  HTMLHRElement,
  DropdownDividerProps
>((props, ref) => {
  const modified = modify(props);
  modified.className = cx("dropdown-divider", modified.className);
  return <hr ref={ref} {...modified} />;
});
