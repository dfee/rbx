import { cx } from "emotion";
import React from "react";

import { classNames, clean, ModifierProps } from "@/modifiers";
import { Colors } from "@/modifiers/colors";

export type SelectModifierProps = Partial<{
  children: React.ReactNode;
  className: string;
  color: Colors;
  disabled: boolean;
  loading: boolean;
  multiple: boolean;
  name: string;
  readOnly: boolean;
  size: "small" | "medium" | "large";
  style: React.CSSProperties;
  value: string | number;
}>;

export type SelectProps = ModifierProps &
  SelectModifierProps &
  Partial<
    Omit<
      React.ComponentPropsWithoutRef<"select">,
      "size" | "color" | "unselectable"
    >
  >;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      style,
      size,
      color,
      loading,
      readOnly,
      disabled,
      value,
      multiple,
      children,
      name,
      ...allProps
    },
    ref,
  ) => {
    const props = clean(allProps);
    return (
      <div
        className={cx("select", classNames(allProps), className, {
          [`is-${size}`]: size,
          [`is-${color}`]: color,
          "is-loading": loading,
          "is-multiple": multiple,
        })}
        style={style}
      >
        <select
          {...props}
          ref={ref}
          multiple={multiple}
          value={value}
          readOnly={readOnly}
          disabled={disabled}
          name={name}
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
