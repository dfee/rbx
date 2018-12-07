import { cx } from "emotion";
import React from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";
import { Colors } from "@/modifiers/color";
import { tuple } from "@/utils";
import { Option } from "./option";

export const SELECT_SIZES = tuple("small", "medium", "large");
export type SelectSizes = (typeof SELECT_SIZES)[number];

export const SELECT_STATES = tuple("focused", "hovered", "loading");
export type SelectStates = (typeof SELECT_STATES)[number];

export type SelectModifierProps = Partial<{
  color: Colors;
  disabled: boolean;
  fullwidth: boolean;
  multiple: boolean;
  multipleSize: number;
  name: string;
  rounded: boolean;
  size: SelectSizes;
  state: SelectStates;
  value: string | number;
}>;

export type SelectProps = Prefer<
  ModifierProps & SelectModifierProps,
  React.HTMLAttributes<HTMLSelectElement>
>;

export const Select = Object.assign(
  React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
    const {
      children,
      className,
      color,
      disabled,
      fullwidth,
      multiple,
      multipleSize,
      name,
      rounded,
      size,
      state,
      style,
      value,
      ...rest
    } = transformModifiers(props);
    return (
      <div
        className={cx("select", className, {
          [`is-${color}`]: color,
          "is-fullwidth": fullwidth,
          "is-loading": state === "loading",
          "is-multiple": multiple,
          "is-rounded": rounded,
          [`is-${size}`]: size,
        })}
        style={style}
      >
        <select
          className={cx({
            "is-focused": state === "focused",
            "is-hovered": state === "hovered",
          })}
          disabled={disabled}
          multiple={multiple}
          name={name}
          ref={ref}
          value={value}
          size={multipleSize}
          {...rest}
        >
          {children}
        </select>
      </div>
    );
  }),
  {
    Option,
    defaultProps: {
      children: null,
      disabled: false,
      loading: false,
      multiple: false,
    },
  },
);
