import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { Colors } from "@/modifiers/color";
import { tuple } from "@/utils";
import { Select } from "./select";

export const SELECT_CONTAINER_SIZES = tuple("small", "medium", "large");
export type SelectContainerSizes = (typeof SELECT_CONTAINER_SIZES)[number];

export const SELECT_CONTAINER_STATES = tuple("focused", "hovered", "loading");
export type SelectContainerStates = (typeof SELECT_CONTAINER_STATES)[number];

export type SelectContainerModifierProps = Partial<{
  className: string;
  color: Colors;
  fullwidth: boolean;
  rounded: boolean;
  size: SelectContainerSizes;
  state: SelectContainerStates;
}>;

export type SelectContainerProps = ModifierProps & SelectContainerModifierProps;

export const SelectContainer = forwardRefAs<SelectContainerProps, "div">(
  (props, ref) => {
    const {
      as,
      children,
      color,
      fullwidth,
      rounded,
      size,
      state,
      ...rest
    } = transformModifiers(props);
    rest.className = cx("select", rest.className, {
      [`is-${color}`]: color,
      "is-fullwidth": fullwidth,
      "is-loading": state === "loading",
      "is-rounded": rounded,
      [`is-${size}`]: size,
    });

    const mapped = React.Children.map(children, (child, i) => {
      if (
        typeof child === "object" &&
        (child.type === "select" || child.type === Select)
      ) {
        rest.className = cx(rest.className, {
          "is-multiple": child.props.multiple,
        });
        if (state === "focused" || state === "hovered") {
          return React.cloneElement(child, {
            className: cx(`is-${state}`, child.props.className),
          });
        }
        return child;
      }
      return child;
    });

    return React.createElement(as!, { children: mapped, ref, ...rest });
  },
  { as: "div" },
);
