import { cx } from "emotion";
import React from "react";

import modifiers, { ModifierProps } from "modifiers";

export type RadioModifierProps = Partial<{
  children: React.ReactNode;
  className: string;
  style: {};
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

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    { className, style, disabled, checked, value, name, children, ...allProps },
    ref,
  ) => {
    const props = modifiers.clean(allProps);
    return (
      <label
        className={cx("radio", modifiers.classNames(allProps), className)}
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

export default Radio;
