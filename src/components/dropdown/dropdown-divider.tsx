import { cx } from "emotion";
import React from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";

export type DropdownDividerProps = Prefer<
  ModifierProps,
  React.HTMLAttributes<HTMLHRElement>
>;

export const DropdownDivider = React.forwardRef<
  HTMLHRElement,
  DropdownDividerProps
>((props, ref) => {
  const modified = transformModifiers(props);
  modified.className = cx("dropdown-divider", modified.className);
  return <hr ref={ref} {...modified} />;
});
