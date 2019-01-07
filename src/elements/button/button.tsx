import classNames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { COLORS, Colors } from "../../base/helpers";
import { tuple } from "../../utils";
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
  rounded: boolean;
  selected: boolean;
  size: ButtonSizes;
  state: ButtonStates;
  static: boolean; // tslint:disable-line:no-reserved-keywords
  text: boolean;
}>;

export type ButtonProps = HelpersProps & ButtonModifierProps;

const propTypes = {
  color: PropTypes.oneOf(COLORS),
  disabled: PropTypes.bool,
  fullwidth: PropTypes.bool,
  inverted: PropTypes.bool,
  outlined: PropTypes.bool,
  rounded: PropTypes.bool,
  selected: PropTypes.bool,
  size: PropTypes.oneOf(BUTTON_SIZES),
  state: PropTypes.oneOf(BUTTON_STATES),
  static: PropTypes.bool,
  text: PropTypes.bool,
};

export const Button = Object.assign(
  forwardRefAs<ButtonProps, "button">(
    (
      {
        className,
        color,
        fullwidth,
        inverted,
        outlined,
        rounded,
        selected,
        size,
        state,
        static: isStatic,
        text,
        ...rest
      },
      ref,
    ) => (
      <Generic
        className={classNames(
          "button",
          {
            [`is-${color}`]: color,
            "is-fullwidth": fullwidth,
            "is-inverted": inverted,
            "is-outlined": outlined,
            "is-rounded": rounded,
            "is-selected": selected,
            [`is-${size}`]: size,
            [`is-${state}`]: state,
            "is-static": isStatic,
            "is-text": text,
          },
          className,
        )}
        ref={ref}
        {...rest}
      />
    ),
    { as: "button" },
  ),
  {
    Group: ButtonGroup,
    propTypes,
  },
);
