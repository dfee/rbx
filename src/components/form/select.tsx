import { cx } from "emotion";
import React from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";
import { Colors } from "@/modifiers/color";

export type SelectModifierProps = Partial<{
  color: Colors;
  disabled: boolean;
  loading: boolean;
  multiple: boolean;
  name: string;
  readOnly: boolean;
  size: "small" | "medium" | "large";
  value: string | number;
}>;

export type SelectProps = Prefer<
  ModifierProps & SelectModifierProps,
  React.HTMLAttributes<HTMLSelectElement>
>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const {
      children,
      className,
      color,
      disabled,
      loading,
      multiple,
      name,
      size,
      style,
      value,
      ...rest
    } = transformModifiers(props);
    return (
      <div
        className={cx("select", className, {
          [`is-${size}`]: size,
          [`is-${color}`]: color,
          "is-loading": loading,
          "is-multiple": multiple,
        })}
        style={style}
      >
        <select
          disabled={disabled}
          multiple={multiple}
          name={name}
          ref={ref}
          value={value}
          {...rest}
        >
          {children}
        </select>
      </div>
    );
  },
);

Select.defaultProps = {
  children: null,
  disabled: false,
  loading: false,
  multiple: false,
  readOnly: false,
};
