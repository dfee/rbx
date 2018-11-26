import { cx } from "emotion";
import React from "react";

import modifiers, { ModifierProps } from "modifiers";
import { Colors } from "modifiers/colors";

export type TextareaModifierProps = Partial<{
  className: string;
  color: Colors;
  disabled: boolean;
  name: string;
  placeholder: string;
  readOnly: boolean;
  rows: number;
  size: "small" | "medium" | "large";
  style: React.CSSProperties;
  value: string;
}>;

export type TextareaProps = ModifierProps &
  TextareaModifierProps &
  Partial<
    Omit<React.ComponentPropsWithoutRef<"textarea">, "color" | "unselectable">
  >;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      size,
      color,
      readOnly,
      disabled,
      placeholder,
      rows,
      value,
      name,
      ...allProps
    },
    ref,
  ) => {
    const props = modifiers.clean(allProps);
    return (
      <textarea
        name={name}
        {...props}
        ref={ref}
        value={value}
        rows={rows}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        className={cx("textarea", modifiers.classNames(allProps), className, {
          [`is-${size}`]: size,
          [`is-${color}`]: color,
        })}
      />
    );
  },
);
Textarea.defaultProps = {
  disabled: false,
  readOnly: false,
  rows: 4,
};

export default Textarea;
