import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";
import { Colors } from "../../base/helpers";
import { tuple } from "../../utils";
import { ButtonGroup } from "./button-group";

export const BUTTON_SIZES = tuple("small", "medium", "large");
export type ButtonSizes = (typeof BUTTON_SIZES)[number];

export const BUTTON_STATES = tuple("hovered", "focused", "active", "loading");
export type ButtonStates = (typeof BUTTON_STATES)[number];

export type ButtonModifierProps = Partial<{
  className: string;
  color: Colors;
  disabled: boolean;
  fullwidth: boolean;
  inverted: boolean;
  outlined: boolean;
  onClick: React.MouseEventHandler<any>;
  rounded: boolean;
  selected: boolean;
  size: ButtonSizes;
  state: ButtonStates;
  static: boolean;
  text: boolean;
}>;

export type ButtonProps = HelpersProps & ButtonModifierProps;

export const Button = Object.assign(
  forwardRefAs<ButtonProps, "button">(
    (props, ref) => {
      const {
        as,
        children,
        color,
        disabled,
        fullwidth,
        inverted,
        onClick,
        outlined,
        rounded,
        selected,
        size,
        state,
        static: isStatic,
        text,
        ...rest
      } = transformHelpers(props);
      rest.className = classNames("button", rest.className, {
        [`is-${color}`]: color,
        [`is-${size}`]: size,
        [`is-${state}`]: state,
        "is-fullwidth": fullwidth,
        "is-inverted": inverted,
        "is-outlined": outlined,
        "is-rounded": rounded,
        "is-selected": selected,
        "is-static": isStatic,
        "is-text": text,
      });

      return React.createElement(
        as!,
        {
          disabled,
          onClick: disabled ? undefined : onClick,
          ref,
          tabIndex: disabled ? -1 : 0,
          ...rest,
        },
        children,
      );
    },
    { as: "button" },
  ),
  { Group: ButtonGroup },
);
