import { cx } from "emotion";
import React from "react";

import { ModifierProps, modify } from "@/modifiers";

export type CheckboxModifierProps = Partial<{
  checked: boolean;
  disabled: boolean;
  /**
   * The name of the input field Commonly used for
   * [multi-input handling]
   * (https://reactjs.org/docs/forms.html#handling-multiple-inputs)
   */
  name: string;
  value: string;
}>;

export type CheckboxProps = Prefer<
  ModifierProps & CheckboxModifierProps,
  React.HTMLAttributes<HTMLInputElement>
>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const {
      checked,
      children,
      className,
      disabled,
      name,
      style,
      value,
      ...rest
    } = modify(props);
    return (
      <label className={cx("checkbox", className)} style={style}>
        <input
          checked={checked}
          disabled={disabled}
          name={name}
          ref={ref}
          type="checkbox"
          value={value}
          {...rest}
        />
        {children}
      </label>
    );
  },
);

Checkbox.defaultProps = {
  checked: false,
  children: null,
  disabled: false,
};
