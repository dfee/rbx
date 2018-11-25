import { cx } from "emotion";
import React from "react";

import modifiers, { ModifierProps } from "modifiers";

export type DropdownDividerModifierProps = Partial<{
  className: string;
  style: {};
}>;

export type DropdownDividerProps = ModifierProps & DropdownDividerModifierProps;

const DropdownDivider = React.forwardRef<HTMLHRElement, DropdownDividerProps>(
  ({ className, ...allProps }, ref) => {
    const props = modifiers.clean(allProps);
    return (
      <hr
        ref={ref}
        {...props}
        className={cx(
          "dropdown-divider",
          modifiers.classNames(allProps),
          className,
        )}
      />
    );
  },
);

export default DropdownDivider;
