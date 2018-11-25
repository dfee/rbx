import { cx } from "emotion";
import React from "react";

import modifiers, { ModifierProps } from "modifiers";

export type CheckboxModifierProps = Partial<{
  checked: boolean;
  children: React.ReactNode;
  className: string;
  disabled: boolean;
  /**
   * The name of the input field Commonly used for [multi-input handling](https://reactjs.org/docs/forms.html#handling-multiple-inputs)
   */
  name: string;
  style: {};
  value: string;
}>;

export type CheckboxProps = ModifierProps &
  CheckboxModifierProps &
  Partial<Omit<React.ComponentPropsWithoutRef<"input">, "unselectable">>;

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className, style, disabled, value, children, checked, name, ...allProps },
    ref,
  ) => {
    const props = modifiers.clean(allProps);
    return (
      <label
        className={cx("checkbox", modifiers.classNames(allProps), className)}
        style={style}
      >
        <input
          {...props}
          ref={ref}
          name={name}
          type="checkbox"
          value={value}
          disabled={disabled}
          checked={checked}
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

export default Checkbox;
