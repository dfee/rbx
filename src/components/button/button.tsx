import { cx } from "emotion";
import React from "react";

import { renderAsExoticComponent } from "components/render-as-exotic-component";
import { classNames, clean, ModifierProps } from "modifiers";
import { Colors } from "modifiers/colors";
import { ButtonGroup } from "./button-group";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ButtonModifierProps = Partial<{
  size: "small" | "medium" | "large";
  state: "hover" | "focus" | "active" | "loading";
  color: Colors;
  outlined: boolean;
  inverted: boolean;
  submit: boolean;
  reset: boolean;
  loading: boolean;
  fullwidth: boolean;
  disabled: boolean;
  remove: boolean;
  isSelected: boolean;
  isStatic: boolean;
  rounded: boolean;
  text: boolean;
}>;

interface ButtonProps
  extends ModifierProps,
    ButtonModifierProps,
    Partial<
      Omit<
        React.ComponentPropsWithoutRef<"a" | "button" | "span">,
        "color" | "unselectable"
      >
    > {
  children?: React.ReactNode;
  renderAs?: "a" | "button" | "span" | React.ComponentType<any>;
  onClick?: React.MouseEventHandler<any>;
}

export const Button = Object.assign(
  renderAsExoticComponent<ButtonProps, "button">(
    (
      {
        children,
        className,
        renderAs,
        color,
        size,
        outlined,
        inverted,
        state,
        submit,
        reset,
        fullwidth,
        loading,
        disabled,
        remove,
        isSelected,
        isStatic,
        rounded,
        onClick,
        text,
        ...allProps
      },
      ref,
    ) => {
      let element = isStatic ? "span" : renderAs!;
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
          ref,
          tabIndex: disabled ? -1 : 0,
          ...clean(allProps),
          className: cx(className, classNames(allProps), {
            button: !remove,
            delete: remove,
            [`is-${color}`]: color,
            [`is-${size}`]: size,
            [`is-${state}`]: state,
            "is-fullwidth": fullwidth,
            "is-inverted": inverted,
            "is-loading": loading,
            "is-outlined": outlined,
            "is-rounded": rounded,
            "is-selected": isSelected,
            "is-static": isStatic,
            "is-text": text,
          }),
          disabled,
          onClick: disabled ? undefined : onClick,
          type,
        },
        children,
      );
    },
    "button",
  ),
  { Group: ButtonGroup },
);

Button.defaultProps = Object.assign(
  {
    disabled: false,
    fullwidth: false,
    inverted: false,
    isSelected: false,
    isStatic: false,
    loading: false,
    onClick: () => null,
    outlined: false,
    remove: false,
    reset: false,
    rounded: false,
    submit: false,
    text: false,
  },
  Button.defaultProps,
);
