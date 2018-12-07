import { cx } from "emotion";
import React from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";

export interface RadioModifierProps {
  checked?: boolean;
  disabled?: boolean;
  /**
   * The name of the input field Commonly used for
   * [multi-input handling]
   * (https://reactjs.org/docs/forms.html#handling-multiple-inputs)
   */
  name: string;
  value?: string;
}

export type RadioProps = Prefer<
  ModifierProps & RadioModifierProps,
  React.HTMLAttributes<HTMLInputElement>
>;

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (props, ref) => {
    const {
      checked,
      className,
      children,
      disabled,
      name,
      style,
      value,
      ...rest
    } = transformModifiers(props);
    return (
      <label
        className={cx("radio", className, { "is-disabled": disabled })}
        style={style}
      >
        <input
          checked={checked}
          disabled={disabled}
          name={name}
          ref={ref}
          type="radio"
          value={value}
          {...rest}
        />
        {children}
      </label>
    );
  },
);

Radio.defaultProps = {
  checked: false,
  children: null,
  disabled: false,
};
