import { cx } from "emotion";
import React from "react";

import { classNames, clean, ModifierProps } from "@/modifiers";

export type RadioModifierProps = Partial<{
  children: React.ReactNode;
  className: string;
  style: React.CSSProperties;
  disabled: boolean;
  checked: boolean;
  value: string;
}> & {
  /**
   * The name of the input field Commonly used for [multi-input handling](https://reactjs.org/docs/forms.html#handling-multiple-inputs)
   */
  name: string;
};

export type RadioProps = ModifierProps &
  RadioModifierProps &
  Partial<Omit<React.ComponentPropsWithoutRef<"input">, "unselectable">>;

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    { className, style, disabled, checked, value, name, children, ...allProps },
    ref,
  ) => {
    const props = clean(allProps);
    return (
      <label
        className={cx("radio", classNames(allProps), className)}
        style={style}
      >
        <input
          {...props}
          ref={ref}
          name={name}
          checked={checked}
          type="radio"
          value={value}
          disabled={disabled}
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
