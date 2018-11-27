import { cx } from "emotion";
import React from "react";

import { classNames, clean, ModifierProps } from "modifiers";

export type DropdownDividerModifierProps = Partial<{
  className: string;
  style: React.CSSProperties;
}>;

export type DropdownDividerProps = ModifierProps & DropdownDividerModifierProps;

export const DropdownDivider = React.forwardRef<
  HTMLHRElement,
  DropdownDividerProps
>(({ className, ...allProps }, ref) => {
  const props = clean(allProps);
  return (
    <hr
      ref={ref}
      {...props}
      className={cx("dropdown-divider", classNames(allProps), className)}
    />
  );
});
