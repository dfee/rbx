import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { Colors } from "@/modifiers/color";
import { tuple } from "@/utils";
import { ButtonGroup } from "./button-group";

export const BUTTON_SIZES = tuple("small", "medium", "large");
export type ButtonSizes = (typeof BUTTON_SIZES)[number];

export const BUTTON_STATES = tuple("hovered", "focused", "active", "loading");
export type ButtonStates = (typeof BUTTON_STATES)[number];

export type ButtonModifierProps = Partial<{
  color: Colors;
  disabled: boolean;
  fullwidth: boolean;
  inverted: boolean;
  outlined: boolean;
  reset: boolean;
  rounded: boolean;
  selected: boolean;
  size: ButtonSizes;
  state: ButtonStates;
  static: boolean;
  submit: boolean;
  text: boolean;
}>;

export type ButtonProps = ModifierProps & ButtonModifierProps;

export const Button = Object.assign(
  forwardRefAs<ButtonProps, "button">((props, ref) => {
    const {
      as,
      children,
      color,
      disabled,
      fullwidth,
      inverted,
      onClick, // from HTMLAttributes
      outlined,
      reset,
      rounded,
      selected,
      size,
      state,
      static: isStatic,
      submit,
      text,
      ...rest
    } = transformModifiers(props);
    rest.className = cx("button", rest.className, {
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

    let element = isStatic ? "span" : as!;
    let type: string | undefined;

    if (submit) {
      element = "button";
      type = "submit";
    }
    if (reset) {
      element = "button";
      type = "reset";
    }

    return React.createElement(
      element,
      {
        ...rest,
        disabled,
        onClick: disabled ? undefined : onClick,
        ref,
        tabIndex: disabled ? -1 : 0,
        type,
      },
      children,
    );
  }, "button"),
  { Group: ButtonGroup },
);

Button.defaultProps = Object.assign(
  {
    disabled: false,
    fullwidth: false,
    inverted: false,
    onClick: () => null,
    outlined: false,
    reset: false,
    rounded: false,
    selected: false,
    static: false,
    submit: false,
    text: false,
  },
  Button.defaultProps,
);
