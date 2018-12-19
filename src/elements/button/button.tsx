import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
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
  onClick: React.MouseEventHandler<any>;
  outlined: boolean;
  rounded: boolean;
  selected: boolean;
  size: ButtonSizes;
  state: ButtonStates;
  static: boolean;
  text: boolean;
}>;

export type ButtonProps = HelpersProps & ButtonModifierProps;

const propTypes = {
  ...genericPropTypes,
  color: PropTypes.oneOf(COLORS),
  disabled: PropTypes.bool,
  fullwidth: PropTypes.bool,
  inverted: PropTypes.bool,
  onClick: PropTypes.func,
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
  {
    Group: ButtonGroup,
    propTypes,
  },
);
